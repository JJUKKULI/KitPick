import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const decision = searchParams.get('decision');
  const search   = searchParams.get('search');
  const id       = searchParams.get('id');
  const limit    = Number(searchParams.get('limit') ?? '20');

  const supabase = await createClient();

  // 단일 제품 + 댓글 조회
  if (id) {
    const { data: product, error } = await supabase
      .from('products')
      .select('*, community_comments(*)')
      .eq('id', id)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ product: mapProduct(product) });
  }

  // 목록 조회
  let query = supabase
    .from('products')
    .select('*, community_comments(id, user_name, comment, sentiment, posted_at)')
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (decision && decision !== 'all') query = query.eq('decision', decision);
  if (search) query = query.or(`name.ilike.%${search}%,series.ilike.%${search}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    products: (data ?? []).map(mapProduct),
    count: data?.length ?? 0,
  });
}

// Supabase 컬럼 → 프론트 타입 매핑
function mapProduct(p: Record<string, any>) {
  return {
    id:            p.id,
    name:          p.name,
    series:        p.series,
    grade:         p.grade,
    price:         Number(p.price),
    previousPrice: Number(p.prev_price),
    decision:      p.decision,
    reasoning:     p.reasoning ?? '',
    popularity:    p.popularity ?? 0,
    aiInsight:     p.ai_insight ?? '',
    releaseDate:   p.release_date ?? '',
    imageUrl:      p.image_url ?? null,
    sentiment: {
      positive: p.sentiment_positive ?? 70,
      neutral:  p.sentiment_neutral  ?? 20,
      negative: p.sentiment_negative ?? 10,
    },
    priceHistory: Array.isArray(p.price_history) ? p.price_history : [],
    communityComments: (p.community_comments ?? []).map((c: any) => ({
      id:        c.id,
      user:      c.user_name,
      comment:   c.comment,
      sentiment: c.sentiment ?? 'neutral',
      date:      c.posted_at ?? '최근',
    })),
  };
}
