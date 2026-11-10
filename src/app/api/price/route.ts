import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { searchWebPrices, searchWebPricesDetailed } from '@/lib/webPrice';

export const maxDuration = 60;

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

  // 가격 필터: 0원 또는 이상치 제거 (1,000원 미만 / 2,000,000원 초과)
  const price = Number(item.lprice);
  if (!price || price < 1000 || price > 2000000) return false;

  // 브랜드가 명시된 경우 반다이 계열만 허용
  const brand = (item.brand ?? '').toLowerCase();
  if (brand && !['bandai', 'バンダイ', '반다이', 'bandai spirits', ''].some(b => brand.includes(b))) {
    // 브랜드가 있지만 반다이가 아닌 경우 → 카테고리로 재판단
    if (!categoryOk) return false;
  }

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
  const hasBandai = lower.includes('반다이') || lower.includes('bandai');

  // 등급 키워드 있고 반다이 없으면 반다이 추가
  if (hasGrade && !hasBandai) return `${raw} 반다이`;
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

  // ── 네이버 쇼핑 검색 API는 2026-07-31 종료 → AI 웹검색 최저가로 대체 ──
  //    gradeId 기준 24시간 캐시(community_stats, source='webprice:<gradeId>')
  //    실패해도 502 대신 200 + fallback(DB 마지막 가격)으로 응답해 페이지가 깨지지 않게 함
  const gradeId  = searchParams.get('gradeId');
  const official = Number(searchParams.get('official') ?? '0');
  if (!gradeId) return NextResponse.json({ results: [], source: 'none', total: 0 });

  const db = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : await createClient();
  const cacheSource = `webprice:${gradeId}`;

  const { data: grade } = await db
    .from('gundam_grades')
    .select('id, gundam_id, grade, current_price, last_price_updated, gundams(name)')
    .eq('id', gradeId)
    .maybeSingle();
  const fallback = () => NextResponse.json({
    results: [], source: 'fallback', total: 0,
    lastPrice: grade?.current_price ?? null, lastUpdated: grade?.last_price_updated ?? null,
  });
  if (!grade) return fallback();

  // 진단 모드: &debug=1 → 캐시 무시, 후보 전체와 제외 사유 반환 (저장 안 함)
  if (searchParams.get('debug') === '1') {
    const gName = ((grade as any).gundams?.name as string | undefined) ?? '';
    const q = gName ? `${grade.grade} ${gName}` : rawQuery;
    const r = await searchWebPricesDetailed(q, official, gName ? { grade: grade.grade, gundamName: gName } : undefined);
    return NextResponse.json({ debug: true, query: q, official, dbCurrentPrice: grade.current_price, ...r });
  }

  const { data: cached } = await db
    .from('community_stats')
    .select('top_comments, collected_at')
    .eq('gundam_id', grade.gundam_id)
    .eq('source', cacheSource)
    .order('collected_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (cached?.collected_at && Date.now() - new Date(cached.collected_at).getTime() < 24 * 3600 * 1000) {
    const results = (cached.top_comments as any[]) ?? [];
    if (results.length) return NextResponse.json({ results, source: 'web', checkedAt: cached.collected_at, total: results.length });
  }

  // 검색어: DB 기준 '등급 형식번호 기체명' (URL의 query보다 우선)
  const gundamName = ((grade as any).gundams?.name as string | undefined) ?? '';
  const name = gundamName
    ? `${grade.grade} ${gundamName}`
    : rawQuery.replace(/건프라|반다이/g, ' ').replace(/\s+/g, ' ').trim();
  const results = await searchWebPrices(name, official, gundamName ? { grade: grade.grade, gundamName } : undefined);
  if (!results || results.length === 0) return fallback();

  const now = new Date().toISOString();
  try {
    await db.from('community_stats').delete().eq('gundam_id', grade.gundam_id).eq('source', cacheSource);
    await db.from('community_stats').insert({
      gundam_id: grade.gundam_id, grade_id: gradeId, source: cacheSource,
      mention_count: results.length, top_comments: results, collected_at: now,
    });
    await db.from('gundam_grades').update({ current_price: results[0].price, last_price_updated: now }).eq('id', gradeId);
    await db.from('price_history_daily').upsert(
      { grade_id: gradeId, price: results[0].price, mall_name: results[0].mallName, recorded_at: now.slice(0, 10) },
      { onConflict: 'grade_id,recorded_at' },
    );
  } catch (e) {
    console.error('[/api/price] 캐시 저장 실패', e);
  }
  return NextResponse.json({ results, source: 'web', checkedAt: now, total: results.length });
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
