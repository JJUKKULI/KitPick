import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  naverSearch, analyzeSentiment, computePopularity, computeDecision,
  type Sentiment, type TopComment, type DecisionType,
} from '@/lib/signals';

// ═══════════════════════════════════════════════════════════════════
// GET /api/community?gradeId=XXX&gundamName=YYY
//   네이버 카페(15)+블로그(10) 검색 → 관심도(total) + 여론(GPT) 산출
//   → 구매신호(가격+여론+관심도) 계산 → gundam_grades 실데이터 저장
//   community_stats(source='naver') 6시간 캐시 (delete-then-insert)
// ═══════════════════════════════════════════════════════════════════

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const CACHE_HOURS = 6;

interface CommunityResult {
  sentiment:    Sentiment;
  mentionCount: number;
  popularity:   number;
  decision:     DecisionType;
  topComments:  TopComment[];
  collectedAt:  string;
  cached:       boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gradeId    = searchParams.get('gradeId');
  const gundamName = (searchParams.get('gundamName') ?? '').trim();

  if (!gradeId) {
    return NextResponse.json({ error: 'gradeId 필요' }, { status: 400 });
  }

  const supabase = await createClient();

  // 1. grade 정보 (gundam_id, 가격, 여론 폴백값)
  const { data: grade, error: gradeErr } = await supabase
    .from('gundam_grades')
    .select('id, gundam_id, official_price, current_price, popularity, sentiment_positive, decision, gundams(name)')
    .eq('id', gradeId)
    .single();

  if (gradeErr || !grade) {
    return NextResponse.json({ error: '등급 정보 없음' }, { status: 404 });
  }

  const gundamId   = grade.gundam_id as string;
  const searchName = gundamName || ((grade.gundams as { name?: string } | null)?.name ?? '');

  // 2. 캐시 확인 (gundam_id 기준 — 여론·관심도는 기체 단위)
  const { data: cached } = await supabase
    .from('community_stats')
    .select('mention_count, sentiment_positive, sentiment_neutral, sentiment_negative, top_comments, collected_at')
    .eq('gundam_id', gundamId)
    .eq('source', 'naver')
    .order('collected_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const fresh = cached?.collected_at
    && (Date.now() - new Date(cached.collected_at).getTime()) < CACHE_HOURS * 3600 * 1000;

  if (fresh && cached) {
    const sentiment: Sentiment = {
      positive: cached.sentiment_positive ?? 70,
      neutral:  cached.sentiment_neutral  ?? 20,
      negative: cached.sentiment_negative ?? 10,
    };
    const popularity = grade.popularity ?? 0;
    const decision = computeDecision({
      officialPrice: grade.official_price,
      currentPrice:  grade.current_price,
      positive:      sentiment.positive,
      popularity,
    });
    return NextResponse.json({
      sentiment,
      mentionCount: cached.mention_count ?? 0,
      popularity,
      decision,
      topComments:  (cached.top_comments as TopComment[]) ?? [],
      collectedAt:  cached.collected_at,
      cached:       true,
    } as CommunityResult);
  }

  // 3. 네이버 카페+블로그 검색 (total = 관심도, items = 여론 분석용)
  if (!searchName) {
    return NextResponse.json({ error: '검색어 없음' }, { status: 400 });
  }
  const query = `${searchName} 건프라`;
  const [cafe, blog] = await Promise.all([
    naverSearch('cafearticle', query, 15),
    naverSearch('blog', query, 10),
  ]);

  const snippets = [...cafe.items, ...blog.items]
    .map(x => [x.title, x.desc].filter(Boolean).join(' — '))
    .filter(Boolean);
  const mentionCount = snippets.length;
  const popularity   = computePopularity(cafe.total, blog.total);

  // 검색 실패(0건) → 만료 캐시라도, 없으면 기존 DB값 유지
  if (mentionCount === 0 && popularity === 0) {
    const fallbackSentiment: Sentiment = {
      positive: cached?.sentiment_positive ?? grade.sentiment_positive ?? 70,
      neutral:  cached?.sentiment_neutral  ?? 20,
      negative: cached?.sentiment_negative ?? 10,
    };
    return NextResponse.json({
      sentiment:    fallbackSentiment,
      mentionCount: cached?.mention_count ?? 0,
      popularity:   grade.popularity ?? 0,
      decision:     (grade.decision as DecisionType) ?? 'watch',
      topComments:  (cached?.top_comments as TopComment[]) ?? [],
      collectedAt:  cached?.collected_at ?? new Date().toISOString(),
      cached:       true,
    } as CommunityResult);
  }

  // 4. 여론 분석 (GPT)
  const analyzed = await analyzeSentiment(searchName, snippets);
  const sentiment   = analyzed?.sentiment ?? {
    positive: grade.sentiment_positive ?? 70, neutral: 20, negative: 10,
  };
  const topComments = analyzed?.topComments ?? [];
  const decision = computeDecision({
    officialPrice: grade.official_price,
    currentPrice:  grade.current_price,
    positive:      sentiment.positive,
    popularity,
  });
  const now = new Date().toISOString();

  // 5. 저장 (실데이터 영속화)
  try {
    // community_stats 캐시 (delete-then-insert — 표현식 유니크 인덱스 회피)
    await supabase.from('community_stats').delete().eq('gundam_id', gundamId).eq('source', 'naver');
    await supabase.from('community_stats').insert({
      gundam_id:          gundamId,
      grade_id:           gradeId,
      source:             'naver',
      mention_count:      mentionCount,
      sentiment_positive: sentiment.positive,
      sentiment_neutral:  sentiment.neutral,
      sentiment_negative: sentiment.negative,
      top_comments:       topComments,
      collected_at:       now,
    });

    // gundam_grades: 여론·관심도 = 기체 단위(전체 등급), 구매신호 = 해당 등급
    await supabase.from('gundam_grades').update({
      sentiment_positive: sentiment.positive,
      sentiment_neutral:  sentiment.neutral,
      sentiment_negative: sentiment.negative,
      popularity,
    }).eq('gundam_id', gundamId);

    await supabase.from('gundam_grades').update({ decision }).eq('id', gradeId);
  } catch (e) {
    console.error('[/api/community] 저장 실패', e);
  }

  return NextResponse.json({
    sentiment, mentionCount, popularity, decision, topComments,
    collectedAt: now, cached: false,
  } as CommunityResult);
}
