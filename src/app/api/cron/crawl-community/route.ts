import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { crawlRuliwebPosts, analyzeSentimentSimple } from '@/lib/crawler/ruliwebCrawler';

// ═══════════════════════════════════════════════════════════════════
// Vercel Cron: 매주 월/목 04:00 KST — 커뮤니티 여론 자동 수집
// Featured(주역) 기체만 수집 → API 부하 최소화
// ═══════════════════════════════════════════════════════════════════

export const maxDuration = 300;

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Featured 기체 + 최근 미수집 기체 우선
  const { data: gundams, error } = await supabase
    .from('gundams')
    .select('id, name, is_featured')
    .or('is_featured.eq.true')
    .limit(40);

  if (error || !gundams) {
    return NextResponse.json({ error: 'Failed to fetch gundams', detail: error?.message }, { status: 500 });
  }

  const results = { crawled: 0, stored: 0, errors: 0, total: gundams.length };

  for (let i = 0; i < gundams.length; i++) {
    const gundam = gundams[i];
    try {
      const posts = await crawlRuliwebPosts(gundam.name, 20);
      if (posts.length === 0) { results.errors++; continue; }

      results.crawled++;

      const sentiment = analyzeSentimentSimple(posts);

      // 상위 3개 게시물 (추천 수 기준)
      const topComments = posts
        .sort((a, b) => b.recommend - a.recommend)
        .slice(0, 3)
        .map(p => ({
          title: p.title,
          recommend: p.recommend,
          views: p.views,
          url: p.url,
        }));

      // community_stats 저장 (upsert)
      const today = new Date().toISOString().slice(0, 10);
      const { error: insertErr } = await supabase
        .from('community_stats')
        .upsert({
          gundam_id:          gundam.id,
          source:             'ruliweb',
          mention_count:      sentiment.mentionCount,
          sentiment_positive: sentiment.positive,
          sentiment_neutral:  sentiment.neutral,
          sentiment_negative: sentiment.negative,
          top_comments:       topComments,
          collected_at:       new Date().toISOString(),
        }, {
          onConflict: 'gundam_id,source',
          ignoreDuplicates: false,
        });

      if (!insertErr) results.stored++;
      else results.errors++;

      // 건담별 HG 등급 대표로 gundam_grades의 감성 데이터도 갱신
      await supabase
        .from('gundam_grades')
        .update({
          sentiment_positive: sentiment.positive,
          sentiment_neutral:  sentiment.neutral,
          sentiment_negative: sentiment.negative,
          popularity:         Math.min(100, 50 + sentiment.mentionCount * 2),
        })
        .eq('gundam_id', gundam.id);

    } catch {
      results.errors++;
    }

    // Rate limit
    if (i < gundams.length - 1) {
      await new Promise(r => setTimeout(r, 800));
    }
  }

  return NextResponse.json({
    success:   true,
    timestamp: new Date().toISOString(),
    ...results,
  });
}
