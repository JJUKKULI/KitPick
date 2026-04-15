import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const NAVER_CLIENT_ID     = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

// ── 네이버 쇼핑 검색 ──────────────────────────────────────────────────────
async function searchNaver(query: string, display = 10) {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return null;
  try {
    const params = new URLSearchParams({ query, display: String(display), sort: 'asc' });
    const res = await fetch(`https://openapi.naver.com/v1/search/shop.json?${params}`, {
      headers: {
        'X-Naver-Client-Id':     NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.items ?? [];
  } catch { return null; }
}

// ── GET: 실시간 검색 (검색창에서 호출) ───────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query      = searchParams.get('query') ?? searchParams.get('q') ?? '';
  const product_id = searchParams.get('product_id');
  const mode       = searchParams.get('mode') ?? 'search'; // search | history

  if (!query && !product_id) {
    return NextResponse.json({ error: 'query 파라미터 필요' }, { status: 400 });
  }
  if (!NAVER_CLIENT_ID) {
    return NextResponse.json({ error: 'NAVER_CLIENT_ID 미설정' }, { status: 500 });
  }

  // 가격 히스토리만 조회
  if (mode === 'history' && product_id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('price_history_daily')
      .select('recorded_at, price')
      .eq('product_id', product_id)
      .order('recorded_at', { ascending: true })
      .limit(30);
    return NextResponse.json({
      priceHistory: (data ?? []).map(row => ({
        date:  new Date(row.recorded_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        price: row.price,
      })),
    });
  }

  // 실시간 네이버 검색
  const items = await searchNaver(query, 10);
  if (!items) return NextResponse.json({ error: '네이버 검색 실패' }, { status: 502 });

  const results = items.map((item: any) => ({
    title:       stripTags(item.title ?? ''),
    price:       Number(item.lprice) || 0,
    mallName:    item.mallName ?? '',
    link:        item.link ?? '',
    image:       item.image ?? '',
    brand:       item.brand ?? '',
    category:    [item.category1, item.category2, item.category3].filter(Boolean).join(' > '),
    productType: item.productType ?? '',
  }));

  // 세부 검색인 경우(product_id 있음): 히스토리도 같이 반환
  let priceHistory: { date: string; price: number }[] = [];
  if (product_id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('price_history_daily')
      .select('recorded_at, price')
      .eq('product_id', product_id)
      .order('recorded_at', { ascending: true })
      .limit(30);
    priceHistory = (data ?? []).map(row => ({
      date:  new Date(row.recorded_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      price: row.price,
    }));
  }

  return NextResponse.json({ results, priceHistory, total: results.length });
}

// ── POST: 시드 제품 가격 일괄 업데이트 ───────────────────────────────────
export async function POST() {
  if (!NAVER_CLIENT_ID) {
    return NextResponse.json({ error: 'NAVER_CLIENT_ID 미설정' }, { status: 500 });
  }
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('id, name, naver_query, image_url')
    .not('naver_query', 'is', null);

  if (!products?.length) return NextResponse.json({ error: '제품 없음' }, { status: 404 });

  const results = [];
  for (const product of products) {
    const items = await searchNaver(product.naver_query ?? product.name, 5);
    if (!items?.length) { results.push({ name: product.name, updated: false }); continue; }

    const prices = items.map((i: any) => Number(i.lprice)).filter((p: number) => p > 0);
    if (!prices.length) continue;
    const minPrice = Math.min(...prices);
    const today = new Date().toISOString().split('T')[0];

    await supabase.from('price_history_daily').upsert(
      { product_id: product.id, source: 'naver', price: minPrice, recorded_at: today },
      { onConflict: 'product_id,source,recorded_at' }
    );

    const updates: any = { price: minPrice, last_price_updated: new Date().toISOString() };
    // 이미지 없으면 네이버 첫 번째 썸네일로 업데이트
    if (!product.image_url && items[0]?.image) {
      updates.image_url = items[0].image;
    }
    await supabase.from('products').update(updates).eq('id', product.id);
    results.push({ name: product.name, price: minPrice, updated: true });
    await new Promise(r => setTimeout(r, 200));
  }
  return NextResponse.json({ message: '완료', updated: results.filter(r => (r as any).updated).length, results });
}
