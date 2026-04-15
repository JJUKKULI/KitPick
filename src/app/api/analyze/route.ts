import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface AnalyzeRequest {
  productId:   string;
  name:        string;
  grade:       string;
  series:      string;
  price:       number;
  previousPrice: number;
  officialPrice?: number;
  priceHistory:  { date: string; price: number }[];
  sentiment:   { positive: number; neutral: number; negative: number };
  popularity:  number;
  communityComments: { comment: string; sentiment: string }[];
  releaseDate?: string;
  stockStatus?: string;
  reprintHistory?: { date: string; note: string }[];
  mentionCount?: number;
}

const DECISION_GUIDE = `
## 결정 기준 (엄격하게 적용)
- buy:      정가 이하 또는 6개월 최저가 근접 + 커뮤니티 호감도 75% 이상 + 재고 안정
- wait:     정가 대비 15% 이상 프리미엄 OR 재판/입고 임박 공식 확인
- watch:    가격 안정적이나 하락 여지 있음 OR 신제품 출시 후 리뷰 대기
- trending: 최근 7일 커뮤니티 언급 급증 OR 재판 루머 확산 OR 재고 소진 가속

## 신뢰도 기준
- 90~100: 가격 데이터 30일 이상 + 커뮤니티 데이터 충분
- 70~89:  가격 데이터 있음 + 커뮤니티 데이터 부분적
- 50~69:  제한된 데이터 기반 추론
`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_API_KEY 미설정' }, { status: 500 });
  }

  let body: AnalyzeRequest;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: '잘못된 요청' }, { status: 400 }); }

  const {
    name, grade, series, price, previousPrice, officialPrice,
    priceHistory, sentiment, popularity, communityComments,
    releaseDate, stockStatus, reprintHistory, mentionCount,
  } = body;

  // ── 분석 데이터 준비 ──────────────────────────────────────────────────
  const officialPriceKRW = officialPrice ?? previousPrice;
  const premiumRate = officialPriceKRW > 0
    ? (((price - officialPriceKRW) / officialPriceKRW) * 100).toFixed(1)
    : '0';

  const priceMin = priceHistory.length > 0 ? Math.min(...priceHistory.map(h => h.price)) : price;
  const priceMax = priceHistory.length > 0 ? Math.max(...priceHistory.map(h => h.price)) : price;

  // 가격 추세 계산 (최근 7일 vs 이전 7일)
  const recentPrices  = priceHistory.slice(-7).map(h => h.price);
  const previousPrices = priceHistory.slice(-14, -7).map(h => h.price);
  const recentAvg  = recentPrices.length  > 0 ? recentPrices.reduce((a,b) => a+b,0) / recentPrices.length  : price;
  const previousAvg = previousPrices.length > 0 ? previousPrices.reduce((a,b) => a+b,0) / previousPrices.length : price;
  const priceTrend = recentAvg > previousAvg * 1.03 ? '상승' : recentAvg < previousAvg * 0.97 ? '하락' : '보합';

  const commentSummary = communityComments
    .slice(0, 8)
    .map(c => `[${c.sentiment}] ${c.comment}`)
    .join('\n');

  const reprintSummary = (reprintHistory ?? []).length > 0
    ? (reprintHistory ?? []).map(r => `${r.date}: ${r.note}`).join(', ')
    : '재판 이력 없음';

  const prompt = `당신은 건프라/프라모델 시장 전문 가격 분석 AI입니다.
아래 실제 시장 데이터를 종합 분석하여 구매 결정을 내려주세요.

## 제품 정보
- 제품명: ${name} (${grade})
- 시리즈: ${series}
- 출시일: ${releaseDate ?? '정보 없음'}
- 재고 상태: ${stockStatus ?? '알 수 없음'}

## 가격 분석 (핵심)
- 정가: ${officialPriceKRW.toLocaleString()}원
- 현재 최저가: ${price.toLocaleString()}원
- 정가 대비: ${Number(premiumRate) > 0 ? '+' : ''}${premiumRate}% (${Number(premiumRate) > 0 ? '프리미엄' : '할인'})
- 30일 최저가: ${priceMin.toLocaleString()}원
- 30일 최고가: ${priceMax.toLocaleString()}원
- 최근 가격 추세: ${priceTrend}
- 30일 가격 이력: ${priceHistory.slice(-10).map(h => `${h.date}:${h.price.toLocaleString()}원`).join(' → ')}

## 재판/이력
- ${reprintSummary}

## 커뮤니티 데이터
- 최근 7일 언급 수: ${mentionCount ?? '알 수 없음'}건
- 관심도 스코어: ${popularity}/100
- 여론: 긍정 ${sentiment.positive}% / 중립 ${sentiment.neutral}% / 부정 ${sentiment.negative}%
- 주요 댓글:
${commentSummary || '댓글 데이터 없음'}

${DECISION_GUIDE}

## 응답 형식 (반드시 JSON만 출력)
{
  "decision": "buy | wait | watch | trending",
  "reasoning": "한국어로 2문장 이내 핵심 이유 (가격 데이터 수치 포함)",
  "aiInsight": "한국어로 3~4문장 심층 분석 (정가 대비 %, 가격 추세, 재판 이력, 구매 타이밍 근거 포함)",
  "confidence": 0~100,
  "buyTarget": "목표 구매가 (예: 정가 22,000원 or 현재가 유지)",
  "keyRisks": ["주요 리스크 1", "주요 리스크 2"]
}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:           'gpt-4o-mini',
        temperature:     0.2,
        max_tokens:      600,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: '건프라/프라모델 시장 가격 분석 전문가. 실제 수치 기반으로 분석하고 JSON만 출력.' },
          { role: 'user',   content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: `OpenAI 오류: ${err.error?.message}` }, { status: 502 });
    }

    const data   = await res.json();
    const raw    = data.choices?.[0]?.message?.content ?? '{}';
    const result = JSON.parse(raw);

    // 유효성 검증
    if (!['buy','wait','watch','trending'].includes(result.decision)) {
      result.decision = 'watch';
    }
    result.confidence = Math.min(100, Math.max(0, Number(result.confidence) || 70));

    // 분석 결과 DB 저장 (products 테이블 업데이트)
    if (body.productId && result.decision) {
      const supabase = await createClient();
      await supabase.from('products').update({
        decision:   result.decision,
        reasoning:  result.reasoning,
        ai_insight: result.aiInsight,
        popularity: popularity,
        sentiment_positive: sentiment.positive,
        sentiment_neutral:  sentiment.neutral,
        sentiment_negative: sentiment.negative,
      }).eq('id', body.productId);
    }

    return NextResponse.json(result);

  } catch (err) {
    console.error('[/api/analyze]', err);
    return NextResponse.json({ error: '분석 오류' }, { status: 500 });
  }
}
