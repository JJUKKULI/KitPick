// ═══════════════════════════════════════════════════════════════════
// KitPick 신호 엔진 — 실신호에서 관심도/구매신호/여론을 계산
//   • 관심도(popularity): 네이버 카페+블로그 검색 total(전체 결과 수) 로그 스케일
//   • 구매신호(decision):  실가격(정가 대비 프리미엄) + 여론 + 관심도 규칙 기반
//   • 여론(sentiment):     GPT-4o-mini (community route / cron 에서 호출)
// ═══════════════════════════════════════════════════════════════════

export type DecisionType = 'buy' | 'wait' | 'watch' | 'trending';

export interface Sentiment { positive: number; neutral: number; negative: number }
export interface TopComment { comment: string; sentiment: 'positive' | 'neutral' | 'negative'; source?: string }

const NAVER_CLIENT_ID     = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

export function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'")
    .trim();
}

// ── 네이버 검색 (카페 / 블로그) — total(전체 결과 수) + 스니펫 반환 ──────
export async function naverSearch(
  kind: 'cafearticle' | 'blog',
  query: string,
  display: number,
): Promise<{ total: number; items: { title: string; desc: string }[] }> {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return { total: 0, items: [] };
  try {
    const params = new URLSearchParams({ query, display: String(display), sort: 'sim' });
    const res = await fetch(`https://openapi.naver.com/v1/search/${kind}.json?${params}`, {
      headers: {
        'X-Naver-Client-Id':     NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { total: 0, items: [] };
    const data = await res.json();
    const items = (data.items ?? []).map((it: { title?: string; description?: string }) => ({
      title: stripTags(it.title ?? ''),
      desc:  stripTags(it.description ?? ''),
    }));
    return { total: Number(data.total) || items.length, items };
  } catch {
    return { total: 0, items: [] };
  }
}

// ── 관심도 산출: 카페+블로그 total 로그 스케일 (0~100) ─────────────────
//   total 10 → ~17,  100 → ~33,  1k → ~50,  10k → ~67,  100k → ~83,  1M → 100
export function computePopularity(cafeTotal: number, blogTotal: number): number {
  const total = Math.max(0, (cafeTotal || 0) + (blogTotal || 0));
  if (total <= 0) return 0;
  const score = (Math.log10(total + 1) / 6) * 100;
  return Math.min(100, Math.max(0, Math.round(score)));
}

// ── 구매신호 산출: 실가격 프리미엄 + 여론 + 관심도 규칙 기반 ───────────
export function computeDecision(opts: {
  officialPrice?: number | null;
  currentPrice?:  number | null;
  positive?:      number;   // 여론 긍정 %
  popularity?:    number;   // 0~100
}): DecisionType {
  const { officialPrice, currentPrice, positive = 0, popularity = 0 } = opts;

  if (currentPrice && officialPrice && officialPrice > 0) {
    const premium = ((currentPrice - officialPrice) / officialPrice) * 100;
    if (premium >= 15) return 'wait';                       // 정가 대비 15%↑ 프리미엄
    if (premium <= 3 && positive >= 50) return 'buy';       // 정가 근접 + 비호감 아님
    if (popularity >= 85) return 'trending';                // 가격 애매하나 관심 급증
    return 'watch';
  }
  // 가격 정보 없음 → 관심도 기반
  if (popularity >= 85) return 'trending';
  return 'watch';
}

// ── 여론 합계 100 정규화 ───────────────────────────────────────────────
export function clampSentiment(s: Partial<Sentiment>): Sentiment {
  let p = Math.max(0, Math.round(Number(s.positive) || 0));
  let n = Math.max(0, Math.round(Number(s.neutral)  || 0));
  let g = Math.max(0, Math.round(Number(s.negative) || 0));
  const sum = p + n + g;
  if (sum === 0) return { positive: 70, neutral: 20, negative: 10 };
  p = Math.round((p / sum) * 100);
  n = Math.round((n / sum) * 100);
  g = 100 - p - n;
  if (g < 0) { n += g; g = 0; }
  return { positive: p, neutral: n, negative: Math.max(0, g) };
}

// ── GPT-4o-mini 여론 분석 ──────────────────────────────────────────────
export async function analyzeSentiment(
  gundamName: string,
  snippets: string[],
): Promise<{ sentiment: Sentiment; topComments: TopComment[] } | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || snippets.length === 0) return null;

  const corpus = snippets.slice(0, 25).map((s, i) => `${i + 1}. ${s}`).join('\n');
  const prompt = `다음은 건프라 "${gundamName}"에 대한 네이버 카페·블로그 게시글 제목과 요약입니다.
이 글들을 종합해 수집가들의 여론을 분석하세요.

## 게시글
${corpus}

## 응답 형식 (반드시 JSON만 출력)
{
  "positive": 0~100,
  "neutral": 0~100,
  "negative": 0~100,
  "topComments": [
    { "comment": "대표 의견을 한국어 한 문장으로 요약", "sentiment": "positive | neutral | negative" }
  ]
}
- positive + neutral + negative 합은 100
- topComments 는 서로 다른 관점의 대표 의견 정확히 3개
- 광고/판매글은 제외하고 실사용·평가 위주로 판단`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:           'gpt-4o-mini',
        temperature:     0.3,
        max_tokens:      500,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: '건프라 커뮤니티 여론 분석 전문가. 실제 글 내용 기반으로 판단하고 JSON만 출력.' },
          { role: 'user',   content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;

    const data   = await res.json();
    const raw    = data.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(raw);

    const sentiment = clampSentiment(parsed);
    const topComments: TopComment[] = Array.isArray(parsed.topComments)
      ? parsed.topComments
          .slice(0, 3)
          .map((c: { comment?: string; sentiment?: string }) => ({
            comment:   String(c.comment ?? '').slice(0, 200),
            sentiment: (['positive', 'neutral', 'negative'].includes(c.sentiment ?? '')
              ? c.sentiment : 'neutral') as TopComment['sentiment'],
            source:    'naver',
          }))
          .filter((c: TopComment) => c.comment.length > 0)
      : [];

    return { sentiment, topComments };
  } catch {
    return null;
  }
}
