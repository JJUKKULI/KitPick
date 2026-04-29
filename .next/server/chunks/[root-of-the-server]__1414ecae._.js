module.exports = {

"[project]/.next-internal/server/app/api/products/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/products/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const decision = searchParams.get('decision');
    const search = searchParams.get('search');
    const id = searchParams.get('id');
    const limit = Number(searchParams.get('limit') ?? '20');
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // 단일 제품 — community_stats + price_history_daily 포함
    if (id) {
        const [productRes, statsRes, historyRes, commentsRes] = await Promise.all([
            supabase.from('products').select('*').eq('id', id).single(),
            supabase.from('product_community_stats').select('*').eq('product_id', id).single(),
            supabase.from('price_history_daily').select('recorded_at, price').eq('product_id', id).order('recorded_at', {
                ascending: true
            }).limit(30),
            supabase.from('community_comments').select('id, user_name, comment, sentiment, posted_at').eq('product_id', id).order('posted_at', {
                ascending: false
            }).limit(10)
        ]);
        if (!productRes.data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            product: mapProduct(productRes.data, statsRes.data ?? null, historyRes.data ?? [], commentsRes.data ?? [])
        });
    }
    // 목록 조회 — community_stats 조인
    let query = supabase.from('products').select('*, product_community_stats(*)').order('updated_at', {
        ascending: false
    }).limit(limit);
    if (decision && decision !== 'all') query = query.eq('decision', decision);
    if (search) {
        query = query.or(`name.ilike.%${search}%,series.ilike.%${search}%,grade.ilike.%${search}%`);
    }
    const { data, error } = await query;
    if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: error.message
    }, {
        status: 500
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        products: (data ?? []).map((p)=>{
            const stats = Array.isArray(p.product_community_stats) ? p.product_community_stats[0] : p.product_community_stats;
            return mapProduct(p, stats ?? null, [], []);
        }),
        count: data?.length ?? 0
    });
}
function mapProduct(p, stats, dailyHistory, comments) {
    // 가격 히스토리: daily 우선, 없으면 jsonb 폴백
    const priceHistory = dailyHistory.length > 0 ? dailyHistory.map((row)=>({
            date: new Date(row.recorded_at).toLocaleDateString('ko-KR', {
                month: 'short',
                day: 'numeric'
            }),
            price: row.price
        })) : Array.isArray(p.price_history) ? p.price_history : [];
    // 감성 데이터: community_stats 우선, 없으면 products 컬럼
    const sentiment = {
        positive: stats?.positive_ratio ?? p.sentiment_positive ?? 70,
        neutral: stats?.neutral_ratio ?? p.sentiment_neutral ?? 20,
        negative: stats?.negative_ratio ?? p.sentiment_negative ?? 10
    };
    // 커뮤니티 댓글: community_comments 테이블 우선, 없으면 stats.top_comments
    const communityComments = comments.length > 0 ? comments.map((c)=>({
            id: c.id,
            user: c.user_name,
            comment: c.comment,
            sentiment: c.sentiment ?? 'neutral',
            date: c.posted_at ?? '최근'
        })) : Array.isArray(stats?.top_comments) ? stats.top_comments.map((c, i)=>({
            id: `stat-${i}`,
            user: c.user ?? '익명',
            comment: c.comment ?? '',
            sentiment: c.sentiment ?? 'neutral',
            date: '최근'
        })) : [];
    return {
        id: p.id,
        name: p.name,
        series: p.series,
        grade: p.grade,
        price: Number(p.price),
        previousPrice: Number(p.prev_price),
        officialPrice: p.official_price ? Number(p.official_price) : null,
        decision: p.decision,
        reasoning: p.reasoning ?? '',
        popularity: stats?.hype_score ?? p.popularity ?? 0,
        aiInsight: p.ai_insight ?? '',
        releaseDate: p.release_date ?? '',
        imageUrl: p.image_url ?? null,
        stockStatus: p.stock_status ?? 'unknown',
        reprintHistory: Array.isArray(p.reprint_history) ? p.reprint_history : [],
        mentionCount: stats?.mention_count ?? 0,
        sentiment,
        priceHistory,
        communityComments
    };
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__1414ecae._.js.map