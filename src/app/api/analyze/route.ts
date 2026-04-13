import { NextResponse } from 'next/server';

// ── 요청 타입 ──────────────────────────────────────────────────────────────
interface AnalyzeRequest {
  productId: string;
  name: string;
  grade: string;
  series: string;
  price: number;
  previousPrice: number;
  priceHistory: { date: string; price: number }[];
  sentiment: { positive: number; neutral: number; negative: number };
  popularity: number;
  communityComments: { comment: string; sentiment: string }[];
  releaseDate?: string;
}

// ── 응답 타입 ──────────────────────────────────────────────────────────────
interface AnalyzeResult {
  decision: 'buy' | 'wait' | 'watch' | 'trending';
  reasoning: string;   // 짧은 한 줄 이유
  aiInsight: string;   // 상세 인사이트 (2~4문장)
  confidence: number;  // 0~100
}

// ── 결정 기준 설명 ─────────────────────────────────────────────────────────
const DECISION_GUIDE = `
결정 기준:
- buy: 가격이 역대 저점 근처이고 커뮤니티 호감도가 높으며 재고가 충분할 때
- wait: 가격이 비정상적으로 높거나 재판/대규모 입고가 임박했을 때
- watch: 가격은 안정적이나 추가 하락 가능성이 있거나 재고가 서서히 줄 때
- trending: 최근 커뮤니티 관심이 폭발적으로 증가하고 재고 소진 속도가 빠를 때
`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_API_KEY가 설정되지 않았습니다.' }, { status: 500 });
  }

  let body: AnalyzeRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 });
  }

  const {
    name, grade, series, price, previousPrice,
    priceHistory, sentiment, popularity, communityComments, releaseDate,
  } = body;

  // 가격 변동률 계산
  const priceChangePct = (((price - previousPrice) / previousPrice) * 100).toFixed(1);
  const priceMin = Math.min(...priceHistory.map(h => h.price));
  const priceMax = Math.max(...priceHistory.map(h => h.price));
  const priceRange = `최저 $${priceMin.toFixed(2)} ~ 최고 $${priceMax.toFixed(2)}`;

  // 커뮤니티 댓글 요약 (최대 5개)
  const commentSummary = communityComments
    .slice(0, 5)
    .map(c => `[${c.sentiment}] ${c.comment}`)
    .join('\n');

  const prompt = `당신은 프라모델·피규어·서브컬처 굿즈 시장 전문 AI 분석가입니다.
아래 제품 데이터를 분석하여 구매 결정을 내려주세요.

## 제품 정보
- 이름: ${name} (${grade})
- 시리즈: ${series}
- 출시일: ${releaseDate ?? '정보 없음'}

## 가격 데이터
- 현재 가격: $${price.toFixed(2)}
- 이전 가격: $${previousPrice.toFixed(2)} (변동: ${priceChangePct}%)
- 6개월 가격 범위: ${priceRange}
- 가격 추이: ${priceHistory.map(h => `${h.date}=$${h.price}`).join(', ')}

## 커뮤니티 데이터
- 관심도(Hype Score): ${popularity}/100
- 여론: 긍정 ${sentiment.positive}% / 중립 ${sentiment.neutral}% / 부정 ${sentiment.negative}%
- 주요 댓글:
${commentSummary || '댓글 없음'}

${DECISION_GUIDE}

## 응답 형식 (반드시 아래 JSON만 출력)
{
  "decision": "buy" | "wait" | "watch" | "trending",
  "reasoning": "구매 결정 이유를 한국어로 1~2문장으로 요약",
  "aiInsight": "시장 상황과 구매 타이밍에 대한 심층 분석을 한국어로 2~4문장으로 작성",
  "confidence": 0~100 사이의 숫자
}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        max_tokens: 500,
        messages: [
          { role: 'system', content: '당신은 프라모델 시장 분석 전문가입니다. 항상 지정된 JSON 형식으로만 응답합니다.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: `OpenAI 오류: ${err.error?.message ?? res.statusText}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content ?? '{}';

    let result: AnalyzeResult;
    try {
      result = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'AI 응답 파싱 실패' }, { status: 502 });
    }

    // 유효성 검증
    const validDecisions = ['buy', 'wait', 'watch', 'trending'];
    if (!validDecisions.includes(result.decision)) {
      result.decision = 'watch';
    }
    result.confidence = Math.min(100, Math.max(0, Number(result.confidence) || 70));

    return NextResponse.json(result);

  } catch (err) {
    console.error('[/api/analyze]', err);
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
