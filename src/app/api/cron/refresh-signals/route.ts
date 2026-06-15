import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  naverSearch, analyzeSentiment, computePopularity, computeDecision,
} from '@/lib/signals';

// ═══════════════════════════════════════════════════════════════════
// Vercel Cron: 6시간마다 — 전체 기체 신호 갱신 (트렌드 대시보드 실데이터)
//   • 네이버 카페+블로그 total → 관심도(popularity)
//   • 상위 N개 기체 → GPT 여론 분석 (비용 관리)
//   • 등급별 → 구매신호(decision) = 실가격 + 여론 + 관심도
//   ?limit=  처리할 기체 수 (기본 60),  ?offset=  시작 위치 (분할 실행용)
//   ?gpt=    GPT 여론 분석할 상위 기체 수 (기본 20)
// ═══════════════════════════════════════════════════════════════════

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit    = Math.min(200, Number(searchParams.get('limit')  ?? '60'));
  const offset   = Math.max(0,   Number(searchParams.get('offset') ?? '0'));
  const gptLimit = Math.max(0,   Number(searchParams.get('gpt')    ?? '20'));

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // 등급 목록 (관심도 desc) — 기체 단위로 묶어서 네이버 호출 최소화
  const { data: grades, error } = await supabase
    .from('gundam_grades')
    .select('id, gundam_id, official_price, current_price, popularity, gundams(name)')
    .order('popularity', { ascending: false })
    .range(offset, offset + limit * 4); // 기체당 평균 ~여러 등급 → 여유있게

  if (error || !grades?.length) {
    return NextResponse.json({ message: '처리할 등급 없음', updated: 0 });
  }

  // 기체별 그룹핑
  const byGundam = new Map<string, { name: string; grades: typeof grades }>();
  for (const g of grades) {
    const gid  = g.gundam_id as string;
    const name = (g.gundams as { name?: string } | null)?.name ?? '';
    if (!byGundam.has(gid)) byGundam.set(gid, { name, grades: [] });
    byGundam.get(gid)!.grades.push(g);
  }

  let processedGundams = 0;
  let updatedGrades    = 0;
  let gptUsed          = 0;
  const errors: string[] = [];
  const now = new Date().toISOString();

  for (const [gundamId, { name, grades: gGrades }] of byGundam) {
    if (processedGundams >= limit) break;
    if (!name) continue;

    try {
      const query = `${name} 건프라`;
      const [cafe, blog] = await Promise.all([
        naverSearch('cafearticle', query, 15),
        naverSearch('blog', query, 10),
      ]);
      const popularity = computePopularity(cafe.total, blog.total);

      // 관심도 0 (검색 실패) → 이 기체는 건너뜀 (기존값 유지)
      if (popularity === 0 && cafe.items.length === 0 && blog.items.length === 0) {
        processedGundams++;
        continue;
      }

      // 상위 기체만 GPT 여론 분석
      let sentiment = { positive: 70, neutral: 20, negative: 10 };
      let hasSentiment = false;
      let topComments: { comment: string; sentiment: string; source?: string }[] = [];

      if (gptUsed < gptLimit) {
        const snippets = [...cafe.items, ...blog.items]
          .map(x => [x.title, x.desc].filter(Boolean).join(' — '))
          .filter(Boolean);
        const analyzed = await analyzeSentiment(name, snippets);
        if (analyzed) {
          sentiment    = analyzed.sentiment;
          topComments  = analyzed.topComments;
          hasSentiment = true;
          gptUsed++;
        }
      }

      // 여론 분석 안 한 기체는 중립 가정(70)으로 구매신호 계산
      const positiveForDecision = hasSentiment ? sentiment.positive : 70;

      // 기체 단위 업데이트 (관심도 + 여론[분석한 경우만])
      const gundamUpdate: Record<string, number> = { popularity };
      if (hasSentiment) {
        gundamUpdate.sentiment_positive = sentiment.positive;
        gundamUpdate.sentiment_neutral  = sentiment.neutral;
        gundamUpdate.sentiment_negative = sentiment.negative;
      }
      await supabase.from('gundam_grades').update(gundamUpdate).eq('gundam_id', gundamId);

      // 여론 캐시 저장 (분석한 경우)
      if (hasSentiment) {
        await supabase.from('community_stats').delete().eq('gundam_id', gundamId).eq('source', 'naver');
        await supabase.from('community_stats').insert({
          gundam_id:          gundamId,
          grade_id:           gGrades[0]?.id ?? null,
          source:             'naver',
          mention_count:      cafe.items.length + blog.items.length,
          sentiment_positive: sentiment.positive,
          sentiment_neutral:  sentiment.neutral,
          sentiment_negative: sentiment.negative,
          top_comments:       topComments,
          collected_at:       now,
        });
      }

      // 등급별 구매신호 계산 (각 등급의 실가격 기준)
      for (const gr of gGrades) {
        const decision = computeDecision({
          officialPrice: gr.official_price,
          currentPrice:  gr.current_price,
          positive:      positiveForDecision,
          popularity,
        });
        await supabase.from('gundam_grades').update({ decision }).eq('id', gr.id);
        updatedGrades++;
      }

      processedGundams++;
      await new Promise(r => setTimeout(r, 400)); // 네이버 부하 방지
    } catch (e) {
      errors.push(`${name}: ${String(e)}`);
    }
  }

  return NextResponse.json({
    message: '신호 갱신 완료',
    processedGundams,
    updatedGrades,
    gptUsed,
    errors: errors.length ? errors.slice(0, 5) : undefined,
  });
}
