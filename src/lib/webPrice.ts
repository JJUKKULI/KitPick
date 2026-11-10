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

const MODEL = process.env.OPENAI_PRICE_MODEL || 'gpt-4o-mini';

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
      tools: [{ type: toolType, search_context_size: 'low', user_location: { type: 'approximate', country: 'KR' } }],
      input: prompt,
    }),
    signal: AbortSignal.timeout(45000),
  });
}

export async function searchWebPrices(
  productName: string,
  officialPrice?: number | null,
): Promise<WebPriceItem[] | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !productName) return null;

  const prompt = `웹검색으로 대한민국 온라인 쇼핑몰에서 판매 중인 "${productName}" (반다이 건프라, 새 제품)의 현재 판매가를 찾아줘.
규칙:
- 실제 상품 판매 페이지만 (쿠팡, 11번가, G마켓, 옥션, 건담베이스, 반다이남코코리아몰, 하비 전문몰 등)
- 중고, 해외 직구 엔화/달러 가격, 묶음·세트, 다른 등급(HG/RG/MG/PG 구분) 상품은 제외
- 가격은 원화 정수
반드시 JSON 배열만 출력 (최대 5개, 없으면 []):
[{"mallName":"쇼핑몰 이름","price":12345,"title":"상품명","link":"https://상품페이지"}]`;

  try {
    let res = await callResponses(apiKey, prompt, 'web_search');
    if (res.status === 400) res = await callResponses(apiKey, prompt, 'web_search_preview');
    if (!res.ok) {
      console.error('[webPrice] OpenAI error', res.status, (await res.text()).slice(0, 300));
      return null;
    }
    const data = await res.json();
    const raw = parseJsonArray(extractText(data));

    const official = Number(officialPrice) || 0;
    const seen = new Set<string>();
    const items: WebPriceItem[] = raw
      .map((r: any) => ({
        title:    String(r?.title ?? productName).slice(0, 120),
        price:    Math.round(Number(String(r?.price ?? '').replace(/[^\d.]/g, ''))),
        mallName: String(r?.mallName ?? '').slice(0, 40) || '온라인 쇼핑몰',
        link:     String(r?.link ?? ''),
        image:    '',
      }))
      .filter(i => /^https?:\/\//.test(i.link) && i.price >= 1000 && i.price <= 2000000)
      .filter(i => !official || (i.price >= official * 0.5 && i.price <= official * 4))
      .filter(i => { const k = `${i.mallName}|${i.price}`; if (seen.has(k)) return false; seen.add(k); return true; })
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);

    return items;
  } catch (e) {
    console.error('[webPrice] failed', e);
    return null;
  }
}
