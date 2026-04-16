import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const NAVER_CLIENT_ID     = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

// ── 네이버 카테고리 기반 프라모델 판별 ───────────────────────────────────
// 실제 건프라/프라모델은 아래 카테고리로 분류됨
const PLASTIC_MODEL_CATEGORIES = [
  '건프라', '프라모델', '완구/취미', '취미/게임', '취미/레저',
  'model kit', 'gunpla',
];

// 확실히 제외할 카테고리
const EXCLUDE_CATEGORIES = [
  '도서', '음반', '영상', 'dvd', '블루레이', '게임', '카드',
  '스포츠', '식품', '의류', '화장품',
];

// 제목에서 제외할 키워드
const EXCLUDE_TITLE_KEYWORDS = [
  '데칼', '데칼시트', '마킹씰', '마킹 씰',
  '도료', '물감', 'mr.color', 'mr color', '타미야컬러',
  '베이스', 'base' /* 단, 건담베이스 제외 처리 별도 */,
  '부품', '파츠 교체', '개조 파츠',
  '스티커시트', '워터데칼',
  '소설', '만화책', '설정집', '일러스트',
  'blu-ray', 'bluray', 'dvd', '영상물',
  '카드팩', '트레이딩카드',
  '피규어라이즈', 'figurerise', // 피규어라이즈는 별도 라인 (선택적 제외)
  '초합금', '혼프라',
];

// 프라모델 등급 키워드 (이게 있으면 확실히 건프라)
const GRADE_KEYWORDS = [
  'hguc', 'hgce', 'hgibo', 'hg 1/', 'hg1/', ' hg ',
  'mg 1/', 'mg1/', ' mg ',
  'rg 1/', 'rg1/', ' rg ',
  'pg 1/', 'pg1/', ' pg ',
  'sd ', 'entry grade', 'eg ',
  '1/144', '1/100', '1/60', '1/72', '1/48',
  '프라모델 키트', '건프라 키트',
];

function isPlasticModelKit(item: any): boolean {
  const title    = stripTags(item.title ?? '').toLowerCase();
  const cat1     = (item.category1 ?? '').toLowerCase();
  const cat2     = (item.category2 ?? '').toLowerCase();
  const cat3     = (item.category3 ?? '').toLowerCase();
  const cat4     = (item.category4 ?? '').toLowerCase();
  const allCats  = `${cat1} ${cat2} ${cat3} ${cat4}`;

  // 1순위: 카테고리가 프라모델/건프라이면 통과 (가장 신뢰도 높음)
  const categoryOk = PLASTIC_MODEL_CATEGORIES.some(c => allCats.includes(c));

  // 카테고리가 확실히 다른 분야이면 제외
  if (EXCLUDE_CATEGORIES.some(c => allCats.includes(c))) return false;

  // 제목에 제외 키워드 있으면 제거
  // 단, "건담베이스" 처럼 베이스가 브랜드명인 경우 예외 처리
  for (const kw of EXCLUDE_TITLE_KEYWORDS) {
    if (kw === 'base' || kw === '베이스') {
      // "건담베이스", "건담 베이스" 한정판은 허용
      if (title.includes('건담베이스') || title.includes('건담 베이스')) continue;
    }
    if (title.includes(kw)) return false;
  }

  // 가격 0원 제거
  if (!item.lprice || Number(item.lprice) === 0) return false;

  // 2순위: 카테고리 OK이거나 등급 키워드 있으면 통과
  if (categoryOk) return true;
  if (GRADE_KEYWORDS.some(k => title.includes(k))) return true;

  // 카테고리도 불명확하고 등급도 없으면 제외
  return false;
}

// ── 검색 쿼리 보완 ─────────────────────────────────────────────────────
function buildSearchQuery(raw: string): string {
  const lower = raw.toLowerCase();
  const hasGrade = GRADE_KEYWORDS.some(k => lower.includes(k.trim()));
  const hasModelKeyword = lower.includes('건프라') || lower.includes('프라모델') || lower.includes('반다이');

  if (hasGrade || hasModelKeyword) return raw;

  // 키워드 없으면 "건프라 반다이" 추가로 카테고리 좁히기
  return `${raw} 건프라 반다이`;
}

// ── 네이버 API 호출 ────────────────────────────────────────────────────
async function searchNaver(query: string, display = 20): Promise<any[] | null> {
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

function mapItem(item: any) {
  return {
    title:    stripTags(item.title ?? ''),
    price:    Number(item.lprice) || 0,
    mallName: item.mallName ?? '',
    link:     item.link ?? '',
    image:    item.image ?? '',
    brand:    item.brand ?? '',
    category: [item.category1, item.category2, item.category3, item.category4]
      .filter(Boolean).join(' > '),
  };
}

// ── GET: 실시간 검색 ───────────────────────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery   = searchParams.get('query') ?? searchParams.get('q') ?? '';
  const product_id = searchParams.get('product_id');
  const mode       = searchParams.get('mode') ?? 'search';

  if (!rawQuery && !product_id) {
    return NextResponse.json({ error: 'query 파라미터 필요' }, { status: 400 });
  }
  if (!NAVER_CLIENT_ID) {
    return NextResponse.json({ error: 'NAVER_CLIENT_ID 미설정' }, { status: 500 });
  }

  // 가격 히스토리 전용
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

  const searchQuery = buildSearchQuery(rawQuery);
  const rawItems    = await searchNaver(searchQuery, 30); // 30개 가져와서 필터
  if (!rawItems) return NextResponse.json({ error: '네이버 검색 실패' }, { status: 502 });

  // 카테고리 + 키워드 기반 필터
  let filtered = rawItems.filter(isPlasticModelKit);

  // 필터 결과가 없으면 쿼리를 더 구체화해서 재시도
  if (filtered.length === 0) {
    const retryQuery = `${rawQuery} 프라모델 1/144 OR 1/100`;
    const retryItems = await searchNaver(retryQuery, 20);
    if (retryItems) {
      filtered = retryItems.filter(isPlasticModelKit);
    }
  }

  // 그래도 없으면 가격 있는 것만
  const finalItems = filtered.length > 0
    ? filtered
    : rawItems.filter(i => Number(i.lprice) > 0).slice(0, 5);

  const results = finalItems.slice(0, 10).map(mapItem);

  // 가격 히스토리 (product_id 있을 때)
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
    const rawQ    = product.naver_query ?? product.name;
    const searchQ = buildSearchQuery(rawQ);
    const rawItems = await searchNaver(searchQ, 30);
    if (!rawItems?.length) { results.push({ name: product.name, updated: false }); continue; }

    const filtered = rawItems.filter(isPlasticModelKit);
    const finalItems = filtered.length > 0
      ? filtered
      : rawItems.filter(i => Number(i.lprice) > 0);
    if (!finalItems.length) { results.push({ name: product.name, updated: false }); continue; }

    const prices   = finalItems.map(i => Number(i.lprice)).filter(p => p > 0);
    const minPrice = Math.min(...prices);
    const today    = new Date().toISOString().split('T')[0];

    await supabase.from('price_history_daily').upsert(
      { product_id: product.id, source: 'naver', price: minPrice, recorded_at: today },
      { onConflict: 'product_id,source,recorded_at' }
    );

    const updates: Record<string, unknown> = {
      price: minPrice,
      last_price_updated: new Date().toISOString(),
    };
    if (!product.image_url && finalItems[0]?.image) {
      updates.image_url = finalItems[0].image;
    }
    await supabase.from('products').update(updates).eq('id', product.id);
    results.push({ name: product.name, price: minPrice, updated: true });
    await new Promise(r => setTimeout(r, 300));
  }

  return NextResponse.json({
    message: '완료',
    updated: results.filter(r => (r as any).updated).length,
    results,
  });
}
