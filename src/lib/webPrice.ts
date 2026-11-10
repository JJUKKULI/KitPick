// ═══════════════════════════════════════════════════════════════════
// AI 웹검색 최저가 (네이버 쇼핑 검색 API 2026-07-31 종료 대체)
//   OpenAI Responses API + web_search 도구로 국내 쇼핑몰 판매가를 찾고
//   정가 기준 이상치(0.5~4배 밖)를 제거해 가격순 목록으로 반환
//   ※ 가격 조회 공급자를 바꿀 때는 이 파일만 교체하면 됨
// ═══════════════════════════════════════════════════════════════════

export interface WebPriceItem {
  title: string;
  price: number;
  mallName: string;
  link: string;
  image: string;
}

const MODEL = process.env.OPENAI_PRICE_MODEL || 'gpt-4.1-mini';

function extractText(data: any): string {
  if (typeof data?.output_text === 'string') return data.output_text;
  const parts: string[] = [];
  for (const item of data?.output ?? []) {
    if (item?.type !== 'message') continue;
    for (const c of item.content ?? []) {
      if (c?.type === 'output_text' && typeof c.text === 'string') parts.push(c.text);
    }
  }
  return parts.join('\n');
}

// 모델이 JSON 대신 마크다운 표로 답한 경우 대비: | 쇼핑몰 | 가격 | 상품명 | 링크 | 행 파싱
export function parseMarkdownTable(text: string): any[] {
  const rows: any[] = [];
  for (const line of text.split('\n')) {
    if (!line.trim().startsWith('|') || /^\|\s*-/.test(line.trim())) continue;
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    if (cells.length < 3) continue;
    const link = (line.match(/\((https?:\/\/[^)\s]+)\)/) ?? line.match(/https?:\/\/[^\s|)]+/) ?? [])[1] ?? (line.match(/https?:\/\/[^\s|)]+/) ?? [])[0];
    const priceCell = cells.find(c => /^[\d,]+\s*원?$/.test(c.replace(/\s/g, '')));
    if (!link || !priceCell) continue;
    const textCells = cells.filter(c => c !== priceCell && !c.includes('http'));
    rows.push({ mallName: textCells[0] ?? '', title: textCells.slice(1).join(' ') || textCells[0] || '', price: priceCell, link });
  }
  return rows;
}

// 중고·개인 거래 플랫폼 제외
const USED_MARKETS = ['번개장터', 'bunjang', '당근', 'daangn', '중고나라', 'joongna', '헬로마켓', '중고', '미개봉)'];

function parseJsonArray(text: string): any[] {
  const m = text.match(/\[[\s\S]*\]/);
  if (!m) return [];
  try { const v = JSON.parse(m[0]); return Array.isArray(v) ? v : []; } catch { return []; }
}

async function callResponses(apiKey: string, prompt: string, toolType: string): Promise<Response> {
  return fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      tools: [{ type: toolType, search_context_size: 'medium', user_location: { type: 'approximate', country: 'KR' } }],
      input: prompt,
    }),
    signal: AbortSignal.timeout(45000),
  });
}

// ── 검색 정확도 필터 ───────────────────────────────────────────────────
const GRADE_TOKENS = ['RE/100', 'HGUC', 'HGCE', 'HGBF', 'HGAC', 'HG', 'RG', 'MGEX', 'MGSD', 'MG', 'PG', 'EG', 'SDCS', 'SDEX', 'SD', 'BB'];
// 버전·바리에이션 그룹: 대상(등급+기체명)과 상품명이 같은 그룹을 "둘 다 가지거나 둘 다 없어야" 같은 제품
//   예) 대상 'MG Ver.Ka' ↔ 상품명에도 Ver.Ka 필요 / 대상 'MG' ↔ Ver.Ka·2.0·언리쉬드 붙은 상품은 제외
const VARIANT_GROUPS: string[][] = [
  ['VER.KA', 'VERKA', 'VER KA', '버카', '카토키'],
  ['VER.2.0', 'VER 2.0', 'VER2.0', '2.0'],
  ['VER.3.0', 'VER 3.0', '3.0'],
  ['UNLEASHED', '언리쉬드', '언리시드'],
  ['REVIVE', '리바이브'], ['REBUILD', '리빌드'], ['ORIGIN', '오리진'], ['THUNDERBOLT', '썬더볼트'],
  // 별개 기체(같은 계열이지만 다른 키트)
  ['BANSHEE', '밴시'], ['PHENEX', '페넥스'], ['FULL ARMOR', '풀아머', '풀 아머'], ['NORN', '노른'],
  ['개수형'], ['LUPUS', '루프스'], ['REX', '렉스'], ['EW'], ['ZERO', '제로'], ['DARK MATTER', '다크'],
  ['QAN', '퀀타'], ['RAISER', '라이저'], ['INFINITE', '인피니트'], ['MIGHTY', '마이티'], ['PERFECT', '퍼펙트'],
  ['ASSAULT', '어썰트'], ['SHROUD', '슈라우드'], ['AILE', '에일'],
  // 한정·특수판 (대상에 없으면 항상 제외)
  ['CLEAR', '클리어'], ['LIMITED', '한정'], ['P-BANDAI', 'PREMIUM BANDAI', '프리미엄 반다이', '프반'],
  ['EXPO', '엑스포', '이벤트'], ['METALLIC', '메탈릭', '코팅', 'COATING', '도금'], ['컬러', 'COLOR'],
  // 본품이 아닌 것
  ['PARTS', '파츠', '확장', '디테일업'], ['DECAL', '데칼', '디칼', '스티커'], ['LED', '유닛'], ['액션베이스', 'ACTION BASE', '스탠드'],
];

function hasAlias(textUpper: string, alias: string): boolean {
  const a = alias.toUpperCase();
  if (/^[A-Z0-9.\- ]{1,4}$/.test(a)) {
    const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^A-Z0-9])${esc}([^A-Z0-9]|$)`).test(textUpper);
  }
  return textUpper.includes(a);
}
const hasGroup = (textUpper: string, g: string[]) => g.some(a => hasAlias(textUpper, a));

const norm = (t: string) => t.toUpperCase().replace(/[\s\-_.·:()]/g, '');
const gradeOf = (g: string) => (g.toUpperCase().match(/RE\/100|MGEX|MGSD|HGUC|HGCE|HGBF|HGAC|HG|RG|MG|PG|EG|SDCS|SDEX|SD|BB/) ?? [''])[0];
const gradeFamily = (g: string) => (g.startsWith('HG') ? 'HG' : g.startsWith('SD') || g === 'BB' ? 'SD' : g);

export function isSameProduct(title: string, grade: string, gundamName: string): boolean {
  const T = norm(title);
  const target = gradeFamily(gradeOf(grade));
  // 1) 등급 일치: 대상 등급 계열이 있어야 하고, 다른 등급 계열은 없어야 함
  const found = GRADE_TOKENS.filter(g => new RegExp(`(^|[^A-Z])${g.replace('/', '\\/')}([^A-Z]|$)`, 'i').test(title.toUpperCase()));
  const fams = new Set(found.map(gradeFamily));
  if (target && !fams.has(target)) return false;
  if ([...fams].some(f => f !== target)) return false;
  // 2) 기체 일치: 형식번호(있으면) 또는 기체명 핵심어가 포함
  const mn = (gundamName.match(/^([A-Z][A-Za-z0-9[\]\/.+]*-[A-Za-z0-9[\]\/.+\-]+)\s/) ?? [])[1];
  const core = gundamName.replace(mn ?? '', '').replace(/건담|GUNDAM/gi, '').trim();
  const hasModel = mn ? T.includes(norm(mn)) : false;
  const hasCore = core ? T.includes(norm(core)) : false;
  if (!hasModel && !hasCore) return false;
  // 3) 버전·바리에이션·한정판 그룹 일치 (대상과 상품명이 같아야 함)
  const TU = title.toUpperCase(), GU = `${grade} ${gundamName}`.toUpperCase();
  if (VARIANT_GROUPS.some(g => hasGroup(TU, g) !== hasGroup(GU, g))) return false;
  return true;
}

export interface PriceCandidate extends WebPriceItem { accepted: boolean; reason: string }
export interface PriceSearchResult { items: WebPriceItem[]; candidates: PriceCandidate[]; rawText: string; error?: string }

/** 진단용: 후보 전체와 제외 사유까지 반환 */
export async function searchWebPricesDetailed(
  productName: string,
  officialPrice?: number | null,
  match?: { grade: string; gundamName: string },
): Promise<PriceSearchResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !productName) return { items: [], candidates: [], rawText: '', error: 'OPENAI_API_KEY 또는 검색어 없음' };

  const prompt = `웹검색으로 대한민국 온라인 쇼핑몰에서 "${productName}" (반다이 건프라 프라모델) 판매 페이지를 찾아 판매가를 알려줘.
- 반다이남코코리아몰, 건담베이스 등 공식 판매처를 먼저 찾고, 쿠팡·11번가·G마켓·옥션·하비 전문몰도 찾아봐
- 상품명 표기가 조금 달라도 같은 제품으로 보이면 후보에 포함 (예: 자쿠 ↔ 자쿠Ⅱ/자쿠2, 띄어쓰기·한영 표기 차이)
- 확실하지 않아도 후보로 넣어도 됨 (최종 판별은 우리가 함). 단 블로그·커뮤니티·검색결과 페이지와 중고는 제외
- title 은 판매 페이지에 표시된 상품명 그대로, price 는 원화 정수 판매가
- 중고 거래 플랫폼(번개장터·당근·중고나라 등)은 제외
표나 설명 없이, 코드블록도 없이 JSON 배열만 출력 (최대 8개, 정말 없을 때만 []):
[{"mallName":"쇼핑몰 이름","price":12345,"title":"상품명","link":"https://상품페이지"}]`;

  try {
    let res = await callResponses(apiKey, prompt, 'web_search');
    if (res.status === 400) res = await callResponses(apiKey, prompt, 'web_search_preview');
    if (!res.ok) {
      const body = (await res.text()).slice(0, 300);
      console.error('[webPrice] OpenAI error', res.status, body);
      return { items: [], candidates: [], rawText: '', error: `OpenAI ${res.status}: ${body}` };
    }
    const data = await res.json();
    const rawText = extractText(data);
    const json = parseJsonArray(rawText);
    const raw = json.length ? json : parseMarkdownTable(rawText);

    const official = Number(officialPrice) || 0;
    const seen = new Set<string>();
    const candidates: PriceCandidate[] = raw.map((r: any) => {
      const i: WebPriceItem = {
        title:    String(r?.title ?? productName).slice(0, 120),
        price:    Math.round(Number(String(r?.price ?? '').replace(/[^\d.]/g, ''))),
        mallName: String(r?.mallName ?? '').slice(0, 40) || '온라인 쇼핑몰',
        link:     String(r?.link ?? ''),
        image:    '',
      };
      let reason = '';
      if (!/^https?:\/\//.test(i.link)) reason = '링크 없음';
      else if (USED_MARKETS.some(w => `${i.mallName} ${i.title} ${i.link}`.toLowerCase().includes(w.toLowerCase()))) reason = '중고·개인 거래';
      else if (!(i.price >= 1000 && i.price <= 2000000)) reason = '가격 형식 오류';
      else if (official && !(i.price >= official * 0.5 && i.price <= official * 4)) reason = `정가(${official}) 0.5~4배 범위 밖`;
      else if (match && !isSameProduct(i.title, match.grade, match.gundamName)) reason = '상품명 불일치 (등급·기체·버전·한정판 필터)';
      else { const k = `${i.mallName}|${i.price}`; if (seen.has(k)) reason = '중복'; else seen.add(k); }
      return { ...i, accepted: !reason, reason: reason || '통과' };
    });
    const items = candidates.filter(c => c.accepted)
      .map(({ accepted: _a, reason: _r, ...rest }) => rest)
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);
    return { items, candidates, rawText };
  } catch (e) {
    console.error('[webPrice] failed', e);
    return { items: [], candidates: [], rawText: '', error: String(e) };
  }
}

export async function searchWebPrices(
  productName: string,
  officialPrice?: number | null,
  match?: { grade: string; gundamName: string },
): Promise<WebPriceItem[] | null> {
  const r = await searchWebPricesDetailed(productName, officialPrice, match);
  return r.error ? null : r.items;
}
