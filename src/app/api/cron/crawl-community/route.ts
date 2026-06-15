import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { crawlDCPosts, analyzeSentimentDC } from '@/lib/crawler/dcinsideCrawler';

// ═══════════════════════════════════════════════════════════════════
// Vercel Cron: 매주 월/목 04:00 KST — DCInside 커뮤니티 여론 수집
// ═══════════════════════════════════════════════════════════════════

export const maxDuration = 300;

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // 이미지 있고 인기도 높은 기체 우선 (API 절약)
  const { data: grades } = await supabase
    .from('gundam_grades')
    .select('id, gundams(id, name, image_url)')
    .order('popularity', { ascending: false })
    .limit(30);

  if (!grades?.length) {
    return NextResponse.json({ message: '처리할 기체 없음', updated: 0 });
  }

  let updated = 0;
  const errors: string[] = [];

  for (const grade of grades) {
    const g = grade.gundams as unknown;
    const gundam = (Array.isArray(g) ? g[0] : g) as { id: string; name: string } | null;
    if (!gundam) continue;

    try {
      // 1. DCInside 크롤링
      const posts = await crawlDCPosts(gundam.name, 20);
      if (posts.length === 0) continue;

      // 2. GPT 감성 분석
      const sentiment = await analyzeSentimentDC(posts, gundam.name);

      // 3. community_stats 테이블에 저장
      const { error } = await supabase
        .from('community_stats')
        .upsert({
          product_id:         grade.id,
          source:             'dcinside',
          mention_count:      sentiment.mentionCount,
          sentiment_positive: sentiment.positive,
          sentiment_neutral:  sentiment.neutral,
          sentiment_negative: sentiment.negative,
          top_comments:       sentiment.topComments,
          crawled_at:         new Date().toISOString(),
        }, { onConflict: 'product_id,source' });

      if (error) { errors.push(`${gundam.name}: ${error.message}`); continue; }

      // 4. gundam_grades 테이블 sentiment 직접 업데이트
      await supabase
        .from('gundam_grades')
        .update({
          sentiment_positive: sentiment.positive,
          sentiment_neutral:  sentiment.neutral,
          sentiment_negative: sentiment.negative,
        })
        .eq('id', grade.id);

      updated++;
      await new Promise(r => setTimeout(r, 1500)); // API 부하 방지
    } catch (e) {
      errors.push(`${gundam.name}: ${String(e)}`);
    }
  }

  return NextResponse.json({
    message: `커뮤니티 여론 업데이트 완료`,
    updated,
    errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
  });
}
