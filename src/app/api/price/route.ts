import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const NAVER_CLIENT_ID     = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

interface NaverShopItem {
  title:       string;  // 상품명 (HTML 태그 포함)
  link:        string;
  image:       string;
  lprice:      string;  // 최저가
  hprice:      string;  // 최고가
  mallName:    string;  // 쇼핑몰명
  productId:   string;
  productType: string;
  brand:       string;
  maker:       string;
  category1:   string;
  category2:   string;
}

// HTML 태그 제거
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

// 네이버 쇼핑 검색 (최저가 반환)
async function searchNaverShopping(query: string): Promise<{
  minPrice: number;
  maxPrice: number;
  items: NaverShopItem[];
  imageUrl: string | null;
} | null> {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return null;

  try {
    const params = new URLSearchParams({
      query,
      display: '5',
      sort: 'asc',  // 가격 낮은 순
      filter: 'naverpay',
    });

    const res = await fetch(
      `https://openapi.naver.com/v1/search/shop.json?${params}`,
      {
        headers: {
          'X-Naver-Client-Id':     NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    const items: NaverShopItem[] = data.items ?? [];
    if (items.length === 0) return null;

    const prices = items
      .map(i => Number(i.lprice))
      .filter(p => p > 0);

    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      items,
      imageUrl: items[0]?.image ?? null,
    };
  } catch { return null; }
}

// POST: 모든 제품 가격 일괄 업데이트
export async function POST() {
  if (!NAVER_CLIENT_ID) {
    return NextResponse.json(
      { error: 'NAVER_CLIENT_ID가 설정되지 않았습니다. .env.local을 확인하세요.' },
      { status: 500 }
    );
  }

  const supabase = await createClient();

  // 네이버 검색어가 있는 제품 전체 조회
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, naver_query, official_price, image_url')
    .not('naver_query', 'is', null);

  if (error || !products?.length) {
    return NextResponse.json({ error: '제품 없음', detail: error?.message }, { status: 404 });
  }

  const results: { name: string; price: number | null; updated: boolean }[] = [];

  for (const product of products) {
    const query = product.naver_query ?? product.name;
    const naverData = await searchNaverShopping(query);

    if (!naverData) {
      results.push({ name: product.name, price: null, updated: false });
      await new Promise(r => setTimeout(r, 300)); // 네이버 API 요청 간격
      continue;
    }

    const currentPrice = naverData.minPrice;
    const today = new Date().toISOString().split('T')[0];

    // 1. price_history_daily 적재
    await supabase
      .from('price_history_daily')
      .upsert(
        { product_id: product.id, source: 'naver', price: currentPrice, recorded_at: today },
        { onConflict: 'product_id,source,recorded_at' }
      );

    // 2. products 현재가 + 이미지 업데이트
    const updates: Record<string, unknown> = {
      price:              currentPrice,
      last_price_updated: new Date().toISOString(),
    };
    // 이미지가 없으면 네이버 썸네일로 보완
    if (!product.image_url && naverData.imageUrl) {
      updates.image_url = naverData.imageUrl;
    }

    await supabase
      .from('products')
      .update(updates)
      .eq('id', product.id);

    results.push({ name: product.name, price: currentPrice, updated: true });

    // 네이버 API 호출 간격 (초당 10회 제한)
    await new Promise(r => setTimeout(r, 200));
  }

  return NextResponse.json({
    message: '가격 업데이트 완료',
    updated: results.filter(r => r.updated).length,
    total:   results.length,
    results,
  });
}

// GET: 특정 제품 실시간 가격 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query      = searchParams.get('query');
  const product_id = searchParams.get('product_id');

  if (!query && !product_id) {
    return NextResponse.json({ error: 'query 또는 product_id 파라미터 필요' }, { status: 400 });
  }

  if (!NAVER_CLIENT_ID) {
    return NextResponse.json({ error: 'NAVER_CLIENT_ID 미설정' }, { status: 500 });
  }

  let searchQuery = query;

  // product_id로 검색어 조회
  if (product_id && !query) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('products')
      .select('naver_query, name')
      .eq('id', product_id)
      .single();
    searchQuery = data?.naver_query ?? data?.name ?? '';
  }

  if (!searchQuery) {
    return NextResponse.json({ error: '검색어 없음' }, { status: 400 });
  }

  const result = await searchNaverShopping(searchQuery);
  if (!result) {
    return NextResponse.json({ error: '검색 결과 없음' }, { status: 404 });
  }

  // 가격 히스토리 함께 반환 (30일)
  const supabase = await createClient();
  let priceHistory: { date: string; price: number }[] = [];

  if (product_id) {
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

  return NextResponse.json({
    query:        searchQuery,
    minPrice:     result.minPrice,
    maxPrice:     result.maxPrice,
    imageUrl:     result.imageUrl,
    priceHistory,
    topShops:     result.items.slice(0, 3).map(i => ({
      name:  stripTags(i.title).slice(0, 40),
      price: Number(i.lprice),
      mall:  i.mallName,
      url:   i.link,
      image: i.image,
    })),
  });
}
