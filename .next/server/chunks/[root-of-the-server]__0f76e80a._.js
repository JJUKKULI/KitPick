module.exports = {

"[project]/.next-internal/server/app/api/community/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createClient": (()=>createClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://jxyvtdwzknrcoycvhuyo.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eXZ0ZHd6a25yY295Y3ZodXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDQ2NzYsImV4cCI6MjA4OTI4MDY3Nn0.mm8VHVkyHudBeNtQryBc_3xTHPWAMLTiNqiOV_X6gNs"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Server Component에서 호출된 경우 무시 (읽기 전용)
                }
            }
        }
    });
}
}}),
"[project]/src/lib/signals.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// ═══════════════════════════════════════════════════════════════════
// KitPick 신호 엔진 — 실신호에서 관심도/구매신호/여론을 계산
//   • 관심도(popularity): 네이버 카페+블로그 검색 total(전체 결과 수) 로그 스케일
//   • 구매신호(decision):  실가격(정가 대비 프리미엄) + 여론 + 관심도 규칙 기반
//   • 여론(sentiment):     GPT-4o-mini (community route / cron 에서 호출)
// ═══════════════════════════════════════════════════════════════════
__turbopack_context__.s({
    "analyzeSentiment": (()=>analyzeSentiment),
    "clampSentiment": (()=>clampSentiment),
    "computeDecision": (()=>computeDecision),
    "computePopularity": (()=>computePopularity),
    "naverSearch": (()=>naverSearch),
    "stripTags": (()=>stripTags)
});
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
function stripTags(html) {
    return html.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").trim();
}
async function naverSearch(kind, query, display) {
    if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return {
        total: 0,
        items: []
    };
    try {
        const params = new URLSearchParams({
            query,
            display: String(display),
            sort: 'sim'
        });
        const res = await fetch(`https://openapi.naver.com/v1/search/${kind}.json?${params}`, {
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
            },
            signal: AbortSignal.timeout(8000)
        });
        if (!res.ok) return {
            total: 0,
            items: []
        };
        const data = await res.json();
        const items = (data.items ?? []).map((it)=>({
                title: stripTags(it.title ?? ''),
                desc: stripTags(it.description ?? '')
            }));
        return {
            total: Number(data.total) || items.length,
            items
        };
    } catch  {
        return {
            total: 0,
            items: []
        };
    }
}
function computePopularity(cafeTotal, blogTotal) {
    const total = Math.max(0, (cafeTotal || 0) + (blogTotal || 0));
    if (total <= 0) return 0;
    const score = Math.log10(total + 1) / 6 * 100;
    return Math.min(100, Math.max(0, Math.round(score)));
}
function computeDecision(opts) {
    const { officialPrice, currentPrice, positive = 0, popularity = 0 } = opts;
    if (currentPrice && officialPrice && officialPrice > 0) {
        const premium = (currentPrice - officialPrice) / officialPrice * 100;
        if (premium >= 15) return 'wait'; // 정가 대비 15%↑ 프리미엄
        if (premium <= 3 && positive >= 50) return 'buy'; // 정가 근접 + 비호감 아님
        if (popularity >= 85) return 'trending'; // 가격 애매하나 관심 급증
        return 'watch';
    }
    // 가격 정보 없음 → 관심도 기반
    if (popularity >= 85) return 'trending';
    return 'watch';
}
function clampSentiment(s) {
    let p = Math.max(0, Math.round(Number(s.positive) || 0));
    let n = Math.max(0, Math.round(Number(s.neutral) || 0));
    let g = Math.max(0, Math.round(Number(s.negative) || 0));
    const sum = p + n + g;
    if (sum === 0) return {
        positive: 70,
        neutral: 20,
        negative: 10
    };
    p = Math.round(p / sum * 100);
    n = Math.round(n / sum * 100);
    g = 100 - p - n;
    if (g < 0) {
        n += g;
        g = 0;
    }
    return {
        positive: p,
        neutral: n,
        negative: Math.max(0, g)
    };
}
async function analyzeSentiment(gundamName, snippets) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || snippets.length === 0) return null;
    const corpus = snippets.slice(0, 25).map((s, i)=>`${i + 1}. ${s}`).join('\n');
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
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.3,
                max_tokens: 500,
                response_format: {
                    type: 'json_object'
                },
                messages: [
                    {
                        role: 'system',
                        content: '건프라 커뮤니티 여론 분석 전문가. 실제 글 내용 기반으로 판단하고 JSON만 출력.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            }),
            signal: AbortSignal.timeout(20000)
        });
        if (!res.ok) return null;
        const data = await res.json();
        const raw = data.choices?.[0]?.message?.content ?? '{}';
        const parsed = JSON.parse(raw);
        const sentiment = clampSentiment(parsed);
        const topComments = Array.isArray(parsed.topComments) ? parsed.topComments.slice(0, 3).map((c)=>({
                comment: String(c.comment ?? '').slice(0, 200),
                sentiment: [
                    'positive',
                    'neutral',
                    'negative'
                ].includes(c.sentiment ?? '') ? c.sentiment : 'neutral',
                source: 'naver'
            })).filter((c)=>c.comment.length > 0) : [];
        return {
            sentiment,
            topComments
        };
    } catch  {
        return null;
    }
}
}}),
"[project]/src/app/api/community/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "dynamic": (()=>dynamic),
    "maxDuration": (()=>maxDuration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/signals.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
const maxDuration = 30;
const CACHE_HOURS = 6;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const gradeId = searchParams.get('gradeId');
    const gundamName = (searchParams.get('gundamName') ?? '').trim();
    if (!gradeId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'gradeId 필요'
        }, {
            status: 400
        });
    }
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. grade 정보 (gundam_id, 가격, 여론 폴백값)
    const { data: grade, error: gradeErr } = await supabase.from('gundam_grades').select('id, gundam_id, official_price, current_price, popularity, sentiment_positive, decision, gundams(name)').eq('id', gradeId).single();
    if (gradeErr || !grade) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: '등급 정보 없음'
        }, {
            status: 404
        });
    }
    const gundamId = grade.gundam_id;
    const searchName = gundamName || (grade.gundams?.name ?? '');
    // 2. 캐시 확인 (gundam_id 기준 — 여론·관심도는 기체 단위)
    const { data: cached } = await supabase.from('community_stats').select('mention_count, sentiment_positive, sentiment_neutral, sentiment_negative, top_comments, collected_at').eq('gundam_id', gundamId).eq('source', 'naver').order('collected_at', {
        ascending: false
    }).limit(1).maybeSingle();
    const fresh = cached?.collected_at && Date.now() - new Date(cached.collected_at).getTime() < CACHE_HOURS * 3600 * 1000;
    if (fresh && cached) {
        const sentiment = {
            positive: cached.sentiment_positive ?? 70,
            neutral: cached.sentiment_neutral ?? 20,
            negative: cached.sentiment_negative ?? 10
        };
        const popularity = grade.popularity ?? 0;
        const decision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeDecision"])({
            officialPrice: grade.official_price,
            currentPrice: grade.current_price,
            positive: sentiment.positive,
            popularity
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            sentiment,
            mentionCount: cached.mention_count ?? 0,
            popularity,
            decision,
            topComments: cached.top_comments ?? [],
            collectedAt: cached.collected_at,
            cached: true
        });
    }
    // 3. 네이버 카페+블로그 검색 (total = 관심도, items = 여론 분석용)
    if (!searchName) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: '검색어 없음'
        }, {
            status: 400
        });
    }
    const query = `${searchName} 건프라`;
    const [cafe, blog] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["naverSearch"])('cafearticle', query, 15),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["naverSearch"])('blog', query, 10)
    ]);
    const snippets = [
        ...cafe.items,
        ...blog.items
    ].map((x)=>[
            x.title,
            x.desc
        ].filter(Boolean).join(' — ')).filter(Boolean);
    const mentionCount = snippets.length;
    const popularity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computePopularity"])(cafe.total, blog.total);
    // 검색 실패(0건) → 만료 캐시라도, 없으면 기존 DB값 유지
    if (mentionCount === 0 && popularity === 0) {
        const fallbackSentiment = {
            positive: cached?.sentiment_positive ?? grade.sentiment_positive ?? 70,
            neutral: cached?.sentiment_neutral ?? 20,
            negative: cached?.sentiment_negative ?? 10
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            sentiment: fallbackSentiment,
            mentionCount: cached?.mention_count ?? 0,
            popularity: grade.popularity ?? 0,
            decision: grade.decision ?? 'watch',
            topComments: cached?.top_comments ?? [],
            collectedAt: cached?.collected_at ?? new Date().toISOString(),
            cached: true
        });
    }
    // 4. 여론 분석 (GPT)
    const analyzed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeSentiment"])(searchName, snippets);
    const sentiment = analyzed?.sentiment ?? {
        positive: grade.sentiment_positive ?? 70,
        neutral: 20,
        negative: 10
    };
    const topComments = analyzed?.topComments ?? [];
    const decision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeDecision"])({
        officialPrice: grade.official_price,
        currentPrice: grade.current_price,
        positive: sentiment.positive,
        popularity
    });
    const now = new Date().toISOString();
    // 5. 저장 (실데이터 영속화)
    try {
        // community_stats 캐시 (delete-then-insert — 표현식 유니크 인덱스 회피)
        await supabase.from('community_stats').delete().eq('gundam_id', gundamId).eq('source', 'naver');
        await supabase.from('community_stats').insert({
            gundam_id: gundamId,
            grade_id: gradeId,
            source: 'naver',
            mention_count: mentionCount,
            sentiment_positive: sentiment.positive,
            sentiment_neutral: sentiment.neutral,
            sentiment_negative: sentiment.negative,
            top_comments: topComments,
            collected_at: now
        });
        // gundam_grades: 여론·관심도 = 기체 단위(전체 등급), 구매신호 = 해당 등급
        await supabase.from('gundam_grades').update({
            sentiment_positive: sentiment.positive,
            sentiment_neutral: sentiment.neutral,
            sentiment_negative: sentiment.negative,
            popularity
        }).eq('gundam_id', gundamId);
        await supabase.from('gundam_grades').update({
            decision
        }).eq('id', gradeId);
    } catch (e) {
        console.error('[/api/community] 저장 실패', e);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        sentiment,
        mentionCount,
        popularity,
        decision,
        topComments,
        collectedAt: now,
        cached: false
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__0f76e80a._.js.map