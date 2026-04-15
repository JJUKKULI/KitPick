import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const decision = searchParams.get('decision');
  const search   = searchParams.get('search');
  const id       = searchParams.get('id');
  const limit    = Number(searchParams.get('limit') ?? '20');

  const supabase = await createClient();

  // 단일 제품 — community_stats + price_history_daily 포함
  if (id) {
    const [productRes, statsRes, historyRes, commentsRes] = await Promise.all([
      supabase.from('products').select('*').eq('id', id).single(),
      supabase.from('product_community_stats').select('*').eq('product_id', id).single(),
      supabase.from('price_history_daily')
        .select('recorded_at, price')
        .eq('product_id', id)
        .order('recorded_at', { ascending: true })
        .limit(30),
      supabase.from('community_comments')
        .select('id, user_name, comment, sentiment, posted_at')
        .eq('product_id', id)
        .order('posted_at', { ascending: false })
        .limit(10),
    ]);

    if (!productRes.data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      product: mapProduct(
        productRes.data,
        statsRes.data ?? null,
        historyRes.data ?? [],
        commentsRes.data ?? [],
      ),
    });
  }

  // 목록 조회 — community_stats 조인
  let query = supabase
    .from('products')
    .select('*, product_community_stats(*)')
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (decision && decision !== 'all') query = query.eq('decision', decision);
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,series.ilike.%${search}%,grade.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    products: (data ?? []).map(p => {
      const stats = Array.isArray(p.product_community_stats)
        ? p.product_community_stats[0]
        : p.product_community_stats;
      return mapProduct(p, stats ?? null, [], []);
    }),
    count: data?.length ?? 0,
  });
}

function mapProduct(
  p: Record<string, any>,
  stats: Record<string, any> | null,
  dailyHistory: { recorded_at: string; price: number }[],
  comments: any[],
) {
  // 가격 히스토리: daily 우선, 없으면 jsonb 폴백
  const priceHistory = dailyHistory.length > 0
    ? dailyHistory.map(row => ({
        date:  new Date(row.recorded_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        price: row.price,
      }))
    : (Array.isArray(p.price_history) ? p.price_history : []);

  // 감성 데이터: community_stats 우선, 없으면 products 컬럼
  const sentiment = {
    positive: stats?.positive_ratio ?? p.sentiment_positive ?? 70,
    neutral:  stats?.neutral_ratio  ?? p.sentiment_neutral  ?? 20,
    negative: stats?.negative_ratio ?? p.sentiment_negative ?? 10,
  };

  // 커뮤니티 댓글: community_comments 테이블 우선, 없으면 stats.top_comments
  const communityComments = comments.length > 0
    ? comments.map(c => ({
        id:        c.id,
        user:      c.user_name,
        comment:   c.comment,
        sentiment: c.sentiment ?? 'neutral',
        date:      c.posted_at ?? '최근',
      }))
    : (Array.isArray(stats?.top_comments) ? stats.top_comments.map((c: any, i: number) => ({
        id:        `stat-${i}`,
        user:      c.user ?? '익명',
        comment:   c.comment ?? '',
        sentiment: c.sentiment ?? 'neutral',
        date:      '최근',
      })) : []);

  return {
    id:            p.id,
    name:          p.name,
    series:        p.series,
    grade:         p.grade,
    price:         Number(p.price),
    previousPrice: Number(p.prev_price),
    officialPrice: p.official_price ? Number(p.official_price) : null,
    decision:      p.decision,
    reasoning:     p.reasoning    ?? '',
    popularity:    stats?.hype_score ?? p.popularity ?? 0,
    aiInsight:     p.ai_insight   ?? '',
    releaseDate:   p.release_date ?? '',
    imageUrl:      p.image_url    ?? null,
    stockStatus:   p.stock_status ?? 'unknown',
    reprintHistory: Array.isArray(p.reprint_history) ? p.reprint_history : [],
    mentionCount:  stats?.mention_count ?? 0,
    sentiment,
    priceHistory,
    communityComments,
  };
}
