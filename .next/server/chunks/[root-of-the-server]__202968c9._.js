module.exports = {

"[project]/.next-internal/server/app/api/crawl/journal/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "classifyCategory": (()=>classifyCategory),
    "deduplicateArticles": (()=>deduplicateArticles),
    "extractPrice": (()=>extractPrice),
    "extractProductName": (()=>extractProductName),
    "extractTags": (()=>extractTags),
    "formatPubDate": (()=>formatPubDate),
    "isRecent": (()=>isRecent),
    "parseRSSItems": (()=>parseRSSItems),
    "safeFetch": (()=>safeFetch)
});
function isRecent(dateStr, days = 30) {
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return true; // 날짜 파싱 실패 시 통과
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return d >= cutoff;
    } catch  {
        return true;
    }
}
function formatPubDate(pubDate) {
    try {
        const d = new Date(pubDate);
        const now = new Date();
        const diffMin = (now.getTime() - d.getTime()) / 1000 / 60;
        if (diffMin < 60) return `${Math.floor(diffMin)}분 전`;
        if (diffMin < 1440) return `${Math.floor(diffMin / 60)}시간 전`;
        if (diffMin < 10080) return `${Math.floor(diffMin / 1440)}일 전`;
        return d.toLocaleDateString('ko-KR');
    } catch  {
        return '최근';
    }
}
function classifyCategory(title, defaultCat) {
    if ([
        '재판',
        '재발매',
        '재입고',
        '2차',
        '3차',
        '재생산'
    ].some((k)=>title.includes(k))) return 'reprint';
    if ([
        '발매',
        '신작',
        '예약',
        '공개',
        '발표',
        '신제품',
        '출시',
        '발売'
    ].some((k)=>title.includes(k))) return 'release';
    if ([
        '세일',
        '할인',
        '특가',
        '핫딜',
        '쿠폰',
        '이벤트 가격'
    ].some((k)=>title.includes(k))) return 'deal';
    if ([
        '리뷰',
        '후기',
        '조립',
        '완성',
        '도색',
        '개봉기'
    ].some((k)=>title.includes(k))) return 'review';
    if ([
        '이벤트',
        '전시',
        '행사',
        '캠페인'
    ].some((k)=>title.includes(k))) return 'event';
    return defaultCat;
}
// ── 태그 추출 ─────────────────────────────────────────────────────────────
const TAG_KEYWORDS = [
    'HG',
    'MG',
    'RG',
    'PG',
    'HGUC',
    'HGCE',
    'HGIBO',
    'SD',
    'NG',
    'Ver.Ka',
    '건담',
    '피규어',
    '프라모델',
    '반다이',
    '굿스마일',
    '코토부키야',
    '재판',
    '발매',
    '예약',
    '한정',
    '특가',
    '리뷰',
    '수성의 마녀',
    'SEED',
    'UC',
    '역습의 샤아',
    '철혈의 오펀스',
    'DESTINY'
];
function extractTags(title) {
    return TAG_KEYWORDS.filter((k)=>title.includes(k));
}
// ── 제품명 추출 (간단한 패턴 매칭) ───────────────────────────────────────
const GRADE_PATTERN = /(?:HG|MG|RG|PG|HGUC|HGCE|HGIBO|SD)\s+[가-힣\w\s\-\.]+/i;
function extractProductName(title) {
    const m = title.match(GRADE_PATTERN);
    return m ? m[0].trim().slice(0, 50) : null;
}
function extractPrice(text) {
    const m = text.match(/[\d,]+원|¥[\d,]+|\$[\d,.]+/);
    return m ? m[0] : null;
}
function deduplicateArticles(articles) {
    const seenTitles = new Set();
    const seenUrls = new Set();
    return articles.filter((a)=>{
        const titleKey = a.title.replace(/\s+/g, '').slice(0, 30);
        if (seenTitles.has(titleKey) || seenUrls.has(a.source_url)) return false;
        seenTitles.add(titleKey);
        seenUrls.add(a.source_url);
        return true;
    });
}
function parseRSSItems(xml) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while((m = itemRegex.exec(xml)) !== null){
        const block = m[1];
        const get = (tag)=>{
            const r = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
            return r ? r[1].trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<[^>]+>/g, '') : '';
        };
        const title = get('title');
        if (title.length < 4) continue;
        // Google News 형식: "제목 - 출처" 분리
        const dashIdx = title.lastIndexOf(' - ');
        items.push({
            title: dashIdx > 0 ? title.slice(0, dashIdx) : title,
            link: get('link'),
            description: get('description').slice(0, 300),
            pubDate: get('pubDate'),
            sourceName: dashIdx > 0 ? title.slice(dashIdx + 3) : ''
        });
    }
    return items;
}
async function safeFetch(url, timeoutMs = 10000) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
                'Cache-Control': 'no-cache'
            },
            signal: AbortSignal.timeout(timeoutMs),
            next: {
                revalidate: 0
            }
        });
        if (!res.ok) return null;
        return await res.text();
    } catch  {
        return null;
    }
}
}}),
"[project]/src/lib/crawler/officialCrawler.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "crawlOfficial": (()=>crawlOfficial)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)");
;
// 공식 채널 Google News RSS (봇 차단 없음)
const OFFICIAL_RSS = [
    {
        url: 'https://news.google.com/rss/search?q=반다이남코+건담+신제품&hl=ko&gl=KR&ceid=KR:ko',
        source_name: '반다이남코 공식'
    },
    {
        url: 'https://news.google.com/rss/search?q=건담+공식+발매+발표+2025&hl=ko&gl=KR&ceid=KR:ko',
        source_name: '건담 공식'
    },
    {
        url: 'https://news.google.com/rss/search?q=site:kr.gundam-official.com+OR+site:bnkrmall.co.kr&hl=ko&gl=KR&ceid=KR:ko',
        source_name: '건담 공식'
    }
];
// 반다이 일본 공식 뉴스 RSS (직접 접근)
const BANDAI_JP_RSS = 'https://www.bandai.co.jp/news/rss/';
async function crawlOfficial(recentDays = 30) {
    const results = [];
    for (const rss of OFFICIAL_RSS){
        const xml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(rss.url);
        if (!xml) continue;
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(xml);
        for (const item of items.slice(0, 8)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
            const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, 'release');
            results.push({
                source: 'official',
                source_name: item.sourceName || rss.source_name,
                category,
                title: item.title,
                product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                release_date: null,
                price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractPrice"])(item.description),
                summary: item.description || `${rss.source_name} 공식 소식: ${item.title}`,
                source_url: item.link,
                tags: [
                    '공식',
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title)
                ],
                posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                is_hot: category === 'release' || category === 'reprint',
                comment_count: 0
            });
        }
    }
    // 반다이 일본 RSS 직접 시도
    const bandaiXml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(BANDAI_JP_RSS);
    if (bandaiXml) {
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(bandaiXml);
        for (const item of items.slice(0, 5)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
            results.push({
                source: 'official',
                source_name: '반다이 일본',
                category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, 'release'),
                title: item.title,
                product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                release_date: null,
                price: null,
                summary: item.description || item.title,
                source_url: item.link || 'https://www.bandai.co.jp',
                tags: [
                    '반다이',
                    '공식',
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title)
                ],
                posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                is_hot: true,
                comment_count: 0
            });
        }
    }
    return results;
}
}}),
"[project]/src/lib/crawler/shopCrawler.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "crawlShops": (()=>crawlShops)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)");
;
// 판매사이트는 직접 크롤링 차단이 강함 → Google News RSS + 사이트명 검색으로 우회
const SHOP_RSS = [
    {
        url: 'https://news.google.com/rss/search?q=건프라+예약+재입고+특가&hl=ko&gl=KR&ceid=KR:ko',
        source_name: '쇼핑몰',
        default_cat: 'deal'
    },
    {
        url: 'https://news.google.com/rss/search?q=건담붐+OR+1004건담+OR+하비팩토리+신제품&hl=ko&gl=KR&ceid=KR:ko',
        source_name: '국내 쇼핑몰',
        default_cat: 'release'
    },
    {
        url: 'https://news.google.com/rss/search?q=건프라+재입고+예약+2025&hl=ko&gl=KR&ceid=KR:ko',
        source_name: '쇼핑몰',
        default_cat: 'reprint'
    }
];
// 직접 파싱 가능한 경우 시도 (JSON API가 있는 사이트)
const DIRECT_SHOPS = [
    {
        name: '건담붐',
        url: 'https://gundamboom.com',
        rss: 'https://gundamboom.com/rss'
    }
];
async function crawlShops(recentDays = 30) {
    const results = [];
    for (const rss of SHOP_RSS){
        const xml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(rss.url);
        if (!xml) continue;
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(xml);
        for (const item of items.slice(0, 8)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
            // 판매 관련 키워드 없으면 스킵
            const shopKeywords = [
                '예약',
                '재입고',
                '특가',
                '신제품',
                '발매',
                '입고',
                '판매',
                '세일',
                '할인'
            ];
            if (!shopKeywords.some((k)=>item.title.includes(k))) continue;
            const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, rss.default_cat);
            const price = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractPrice"])(item.description) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractPrice"])(item.title);
            results.push({
                source: 'shop',
                source_name: item.sourceName || rss.source_name,
                category,
                title: item.title,
                product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                release_date: null,
                price,
                summary: item.description || `${item.title} — 쇼핑몰 소식`,
                source_url: item.link,
                tags: [
                    '쇼핑',
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title)
                ],
                posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                is_hot: category === 'deal' || category === 'reprint',
                comment_count: 0
            });
        }
    }
    // 직접 접근 시도 (RSS가 있는 사이트)
    for (const shop of DIRECT_SHOPS){
        const xml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(shop.rss);
        if (!xml) continue;
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(xml);
        for (const item of items.slice(0, 5)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
            results.push({
                source: 'shop',
                source_name: shop.name,
                category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, 'release'),
                title: item.title,
                product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                release_date: null,
                price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractPrice"])(item.description),
                summary: item.description || item.title,
                source_url: item.link || shop.url,
                tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title),
                posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                is_hot: false,
                comment_count: 0
            });
        }
    }
    return results;
}
}}),
"[project]/src/lib/crawler/communityCrawler.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "crawlCommunity": (()=>crawlCommunity)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)");
;
// ── 루리웹 — RSS 제공 ────────────────────────────────────────────────────
// 루리웹은 게시판별 RSS를 제공함 (직접 접근 가능)
const RULIWEB_RSS_LIST = [
    {
        url: 'https://bbs.ruliweb.com/family/232/board/300016',
        rss: 'https://bbs.ruliweb.com/family/232/board/300016?view=rss',
        name: '루리웹 프라모델'
    },
    {
        url: 'https://bbs.ruliweb.com/hobby/board/300543',
        rss: 'https://bbs.ruliweb.com/hobby/board/300543?view=rss',
        name: '루리웹 건프라'
    }
];
// ── 디시 / 아카라이브 — Google News RSS로 수집 ──────────────────────────
const COMMUNITY_RSS = [
    {
        url: 'https://news.google.com/rss/search?q=건프라+리뷰+후기+site:dcinside.com&hl=ko&gl=KR&ceid=KR:ko',
        name: '디시인사이드',
        defaultCat: 'community'
    },
    {
        url: 'https://news.google.com/rss/search?q=프라모델+리뷰+arca.live&hl=ko&gl=KR&ceid=KR:ko',
        name: '아카라이브',
        defaultCat: 'community'
    },
    {
        url: 'https://news.google.com/rss/search?q=건프라+커뮤니티+인기+2025&hl=ko&gl=KR&ceid=KR:ko',
        name: '건프라 커뮤니티',
        defaultCat: 'community'
    }
];
// ── 루리웹 HTML 직접 파싱 (RSS 실패 시 폴백) ────────────────────────────
function parseRuliwebHTML(html, boardName) {
    const results = [];
    // 루리웹 게시글 제목/링크 패턴
    const rowRegex = /<tr[^>]*class="[^"]*table_body[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
    let rowMatch;
    while(rowRegex.exec(html) !== null){
        // 제목 추출
        const titleMatch = html.match(/class="subject_link[^"]*"[^>]*href="([^"]+)"[^>]*title="([^"]+)"/);
        if (!titleMatch) continue;
        const [, href, title] = titleMatch;
        if (title.length < 5) continue;
        // 댓글수
        const replyMatch = html.match(/class="replycount[^"]*"[^>]*>\s*(\d+)\s*</);
        const commentCount = replyMatch ? Number(replyMatch[1]) : 0;
        // 시간
        const timeMatch = html.match(/class="time[^"]*"[^>]*>([^<]+)</);
        const postedAt = timeMatch ? timeMatch[1].trim() : '최근';
        results.push({
            source: 'community',
            source_name: boardName,
            category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(title, 'community'),
            title,
            product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(title),
            release_date: null,
            price: null,
            summary: `${boardName} 게시글: ${title}`,
            source_url: href.startsWith('http') ? href : `https://bbs.ruliweb.com${href}`,
            tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(title),
            posted_at: postedAt,
            is_hot: commentCount > 30,
            comment_count: commentCount
        });
        if (results.length >= 10) break;
    }
    return results;
}
async function crawlCommunity(recentDays = 30) {
    const results = [];
    // 1. 루리웹 RSS 시도
    for (const board of RULIWEB_RSS_LIST){
        const xml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(board.rss);
        if (xml && xml.includes('<item>')) {
            const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(xml);
            for (const item of items.slice(0, 10)){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
                const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, 'community');
                results.push({
                    source: 'community',
                    source_name: board.name,
                    category,
                    title: item.title,
                    product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                    release_date: null,
                    price: null,
                    summary: item.description || `${board.name}: ${item.title}`,
                    source_url: item.link || board.url,
                    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title),
                    posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                    is_hot: category === 'reprint' || category === 'release',
                    comment_count: 0
                });
            }
        } else {
            // RSS 실패 시 HTML 직접 파싱 시도
            const html = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(board.url);
            if (html) {
                const parsed = parseRuliwebHTML(html, board.name);
                results.push(...parsed);
            }
        }
    }
    // 2. Google News RSS로 디시/아카라이브 수집
    for (const source of COMMUNITY_RSS){
        const xml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(source.url);
        if (!xml) continue;
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(xml);
        for (const item of items.slice(0, 6)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
            // 건프라/프라모델 관련 키워드 없으면 스킵
            const relevant = [
                '건프라',
                '건담',
                '프라모델',
                '피규어',
                'HG',
                'MG',
                'RG',
                'PG'
            ].some((k)=>item.title.includes(k));
            if (!relevant) continue;
            results.push({
                source: 'community',
                source_name: item.sourceName || source.name,
                category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, source.defaultCat),
                title: item.title,
                product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                release_date: null,
                price: null,
                summary: item.description || item.title,
                source_url: item.link,
                tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title),
                posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                is_hot: false,
                comment_count: 0
            });
        }
    }
    return results;
}
}}),
"[project]/src/lib/crawler/journalCrawler.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "crawlJournal": (()=>crawlJournal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)");
;
const JOURNAL_RSS = [
    // 아카라이브 스케일모델 채널 (Google News 경유)
    {
        url: 'https://news.google.com/rss/search?q=프라모델+arca.live+scalemodel&hl=ko&gl=KR&ceid=KR:ko',
        name: '아카라이브',
        defaultCat: 'release'
    },
    // 건프라 전문 리뷰/저널
    {
        url: 'https://news.google.com/rss/search?q=건프라+리뷰+2025+조립+완성&hl=ko&gl=KR&ceid=KR:ko',
        name: '건프라 저널',
        defaultCat: 'review'
    },
    // 피규어 관련 저널
    {
        url: 'https://news.google.com/rss/search?q=피규어+리뷰+굿스마일+코토부키야+2025&hl=ko&gl=KR&ceid=KR:ko',
        name: '피규어 저널',
        defaultCat: 'review'
    },
    // 스케일모델 / 프라모델 전반
    {
        url: 'https://news.google.com/rss/search?q=프라모델+스케일모델+신제품+한국&hl=ko&gl=KR&ceid=KR:ko',
        name: '프라모델 저널',
        defaultCat: 'release'
    }
];
async function crawlJournal(recentDays = 30) {
    const results = [];
    for (const rss of JOURNAL_RSS){
        const xml = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])(rss.url);
        if (!xml) continue;
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRSSItems"])(xml);
        for (const item of items.slice(0, 8)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(item.pubDate, recentDays)) continue;
            // 건프라/프라모델/피규어 관련 키워드 필터
            const relevant = [
                '건프라',
                '건담',
                '프라모델',
                '피규어',
                'HG',
                'MG',
                'RG',
                '조립',
                '리뷰',
                '굿스마일',
                '코토부키야'
            ].some((k)=>item.title.includes(k) || item.description.includes(k));
            if (!relevant) continue;
            results.push({
                source: 'journal',
                source_name: item.sourceName || rss.name,
                category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyCategory"])(item.title, rss.defaultCat),
                title: item.title,
                product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(item.title),
                release_date: null,
                price: null,
                summary: item.description || `${rss.name}: ${item.title}`,
                source_url: item.link,
                tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(item.title),
                posted_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatPubDate"])(item.pubDate),
                is_hot: false,
                comment_count: 0
            });
        }
    }
    return results;
}
}}),
"[project]/src/lib/crawler/youtubeCrawler.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "crawlYoutube": (()=>crawlYoutube)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)");
;
// ── 건프라/피규어 유튜버 채널 ID ─────────────────────────────────────────
// 채널명으로 검색하거나 직접 채널 ID 입력
const CHANNELS = [
    {
        name: '지식공장장',
        handle: '지식공장장',
        searchQuery: '건프라 지식공장장'
    },
    {
        name: '후디덕덕',
        handle: '후디덕덕',
        searchQuery: '건프라 후디덕덕'
    },
    {
        name: '동찌',
        handle: '동찌',
        searchQuery: '건프라 동찌'
    },
    {
        name: '애니캐스트',
        handle: '애니캐스트',
        searchQuery: '건프라 피규어 애니캐스트'
    },
    {
        name: '위키피규어',
        handle: '위키피규어',
        searchQuery: '피규어 위키피규어'
    },
    {
        name: 'SD HOBBY',
        handle: 'SDHOBBY',
        searchQuery: '건프라 SDHOBBY'
    }
];
const YT_API_BASE = 'https://www.googleapis.com/youtube/v3';
// ── YouTube API: 채널 최신 영상 검색 ─────────────────────────────────────
async function fetchChannelVideos(apiKey, channelName, searchQuery, maxResults = 5) {
    const params = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        q: searchQuery,
        maxResults: String(maxResults),
        order: 'date',
        key: apiKey,
        regionCode: 'KR',
        relevanceLanguage: 'ko'
    });
    try {
        const res = await fetch(`${YT_API_BASE}/search?${params}`, {
            signal: AbortSignal.timeout(10000)
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (data.items ?? []).map((item)=>({
                videoId: item.id?.videoId ?? '',
                title: item.snippet?.title ?? '',
                description: item.snippet?.description ?? '',
                publishedAt: item.snippet?.publishedAt ?? ''
            })).filter((v)=>v.videoId);
    } catch  {
        return [];
    }
}
// ── YouTube 자막 추출 (자동 자막 timedtext API) ───────────────────────────
async function fetchTranscript(videoId) {
    try {
        // 자동 자막 URL (한국어 우선)
        const urls = [
            `https://www.youtube.com/api/timedtext?lang=ko&v=${videoId}&fmt=json3`,
            `https://www.youtube.com/api/timedtext?lang=ko-KR&v=${videoId}&fmt=json3`
        ];
        for (const url of urls){
            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                },
                signal: AbortSignal.timeout(8000)
            });
            if (!res.ok) continue;
            const data = await res.json();
            if (!data.events?.length) continue;
            // 텍스트 추출 및 합치기
            const text = data.events.flatMap((e)=>e.segs?.map((s)=>s.utf8) ?? []).join(' ').replace(/\n/g, ' ').trim().slice(0, 2000); // 최대 2000자 (GPT 토큰 절약)
            if (text.length > 50) return text;
        }
        // 자막 없으면 description 사용
        return '';
    } catch  {
        return '';
    }
}
// ── GPT로 영상 내용 요약 + 제품 정보 추출 ─────────────────────────────────
async function summarizeWithGPT(openaiKey, title, description, transcript) {
    const content = transcript || description;
    if (!content || content.length < 30) {
        return {
            summary: description.slice(0, 200) || title,
            product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(title),
            price: null,
            tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(title)
        };
    }
    const prompt = `다음은 건프라/피규어 유튜브 영상 제목과 내용이다.
제목: ${title}
내용: ${content.slice(0, 1500)}

아래 JSON 형식으로만 응답해:
{
  "summary": "영상 핵심 내용 2~3문장 요약 (한국어)",
  "product": "언급된 주요 제품명 (없으면 null)",
  "price": "언급된 가격 (없으면 null)",
  "tags": ["관련 태그 최대 5개"]
}`;
    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.2,
                max_tokens: 300,
                response_format: {
                    type: 'json_object'
                },
                messages: [
                    {
                        role: 'system',
                        content: '건프라/피규어 전문 분석기. JSON만 출력.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            }),
            signal: AbortSignal.timeout(15000)
        });
        if (!res.ok) throw new Error('GPT error');
        const data = await res.json();
        const result = JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
        return {
            summary: result.summary || description.slice(0, 200),
            product: result.product || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(title),
            price: result.price || null,
            tags: Array.isArray(result.tags) ? result.tags : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(title)
        };
    } catch  {
        return {
            summary: description.slice(0, 200) || title,
            product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(title),
            price: null,
            tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(title)
        };
    }
}
async function crawlYoutube(recentDays = 30) {
    const ytApiKey = process.env.YOUTUBE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!ytApiKey) {
        console.warn('[youtube] YOUTUBE_API_KEY 없음 — YouTube 크롤링 스킵');
        return [];
    }
    const results = [];
    for (const channel of CHANNELS){
        try {
            const videos = await fetchChannelVideos(ytApiKey, channel.name, channel.searchQuery, 5);
            for (const video of videos){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRecent"])(video.publishedAt, recentDays)) continue;
                // 건프라/피규어 관련 영상만 필터
                const relevant = [
                    '건프라',
                    '건담',
                    '프라모델',
                    '피규어',
                    'HG',
                    'MG',
                    'RG',
                    'PG',
                    '조립',
                    '리뷰'
                ].some((k)=>video.title.includes(k) || video.description.includes(k));
                if (!relevant) continue;
                // 자막 추출 (가능한 경우)
                const transcript = await fetchTranscript(video.videoId);
                // GPT 요약 (API 키 있는 경우)
                const analyzed = openaiKey ? await summarizeWithGPT(openaiKey, video.title, video.description, transcript) : {
                    summary: video.description.slice(0, 200) || video.title,
                    product: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractProductName"])(video.title),
                    price: null,
                    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTags"])(video.title)
                };
                // 게시일 포맷
                const d = new Date(video.publishedAt);
                const now = new Date();
                const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
                const postedAt = diffDays === 0 ? '오늘' : diffDays === 1 ? '어제' : `${diffDays}일 전`;
                results.push({
                    source: 'youtube',
                    source_name: channel.name,
                    category: 'review',
                    title: video.title,
                    product: analyzed.product,
                    release_date: null,
                    price: analyzed.price,
                    summary: analyzed.summary,
                    source_url: `https://www.youtube.com/watch?v=${video.videoId}`,
                    tags: [
                        '유튜브',
                        channel.name,
                        ...analyzed.tags
                    ],
                    posted_at: postedAt,
                    is_hot: diffDays <= 3,
                    comment_count: 0
                });
            }
            // YouTube API 할당량 보호 (채널 간 딜레이)
            await new Promise((r)=>setTimeout(r, 500));
        } catch (e) {
            console.error(`[youtube:${channel.name}]`, e);
        }
    }
    return results;
}
}}),
"[project]/src/lib/crawler/processor.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "runCrawlers": (()=>runCrawlers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$officialCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/officialCrawler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$shopCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/shopCrawler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$communityCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/communityCrawler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$journalCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/journalCrawler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$youtubeCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/youtubeCrawler.ts [app-route] (ecmascript)");
;
;
;
;
;
;
// ── CrawledArticle → journal_articles 테이블 형태 변환 ─────────────────
function toDBRow(a) {
    // category 값 검증 (DB CHECK constraint 대응)
    const validCategories = [
        'reprint',
        'release',
        'community',
        'deal',
        'review',
        'event'
    ];
    const category = validCategories.includes(a.category) ? a.category : 'community';
    return {
        category,
        source: a.source_name,
        source_url: a.source_url || null,
        title: a.title.slice(0, 500),
        summary: a.summary?.slice(0, 1000) || null,
        tags: a.tags ?? [],
        posted_at: a.posted_at || null,
        comment_count: a.comment_count ?? 0,
        is_hot: a.is_hot ?? false,
        // 추가 메타 (journal_articles 확장 컬럼)
        product_name: a.product || null,
        price: a.price || null,
        source_type: a.source
    };
}
async function runCrawlers(supabase, options = {}) {
    const { recentDays = 30, sources = [
        'official',
        'shop',
        'community',
        'journal',
        'youtube'
    ] } = options;
    const errors = [];
    const allArticles = [];
    const bySource = {};
    // 소스별 크롤러 실행
    const crawlers = [
        {
            key: 'official',
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$officialCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crawlOfficial"])(recentDays)
        },
        {
            key: 'shop',
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$shopCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crawlShops"])(recentDays)
        },
        {
            key: 'community',
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$communityCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crawlCommunity"])(recentDays)
        },
        {
            key: 'journal',
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$journalCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crawlJournal"])(recentDays)
        },
        {
            key: 'youtube',
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$youtubeCrawler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crawlYoutube"])(recentDays)
        }
    ];
    for (const { key, fn } of crawlers){
        if (!sources.includes(key)) continue;
        try {
            const result = await fn();
            allArticles.push(...result);
            bySource[key] = result.length;
        } catch (e) {
            const msg = `[${key}] ${e instanceof Error ? e.message : '오류'}`;
            errors.push(msg);
            console.error(msg);
            bySource[key] = 0;
        }
    }
    // 중복 제거
    const unique = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deduplicateArticles"])(allArticles);
    if (unique.length === 0) {
        return {
            total: 0,
            inserted: 0,
            skipped: 0,
            errors,
            bySource
        };
    }
    // Supabase upsert
    const dbRows = unique.map(toDBRow);
    const { data, error } = await supabase.from('journal_articles').upsert(dbRows, {
        onConflict: 'title',
        ignoreDuplicates: true
    }).select('id');
    if (error) {
        errors.push(`DB 저장 오류: ${error.message}`);
        return {
            total: unique.length,
            inserted: 0,
            skipped: unique.length,
            errors,
            bySource
        };
    }
    return {
        total: unique.length,
        inserted: data?.length ?? 0,
        skipped: unique.length - (data?.length ?? 0),
        errors,
        bySource
    };
}
}}),
"[project]/src/app/api/crawl/journal/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$processor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/crawler/processor.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    let body = {};
    try {
        body = await request.json();
    } catch  {}
    const options = {
        recentDays: body.recentDays ?? 30,
        sources: body.sources ?? [
            'official',
            'shop',
            'community',
            'journal',
            'youtube'
        ]
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$crawler$2f$processor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runCrawlers"])(supabase, options);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: result.inserted > 0 ? '크롤링 완료' : '수집된 새 기사 없음',
        inserted: result.inserted,
        total: result.total,
        skipped: result.skipped,
        bySource: result.bySource,
        errors: result.errors.length > 0 ? result.errors : undefined
    });
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sourceType = searchParams.get('source_type'); // youtube | official | shop | community | journal
    const limit = Number(searchParams.get('limit') ?? '30');
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from('journal_articles').select('*').order('crawled_at', {
        ascending: false
    }).limit(limit);
    if (category && category !== 'all') query = query.eq('category', category);
    if (sourceType) query = query.eq('source_type', sourceType);
    const { data, error } = await query;
    if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: error.message
    }, {
        status: 500
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        articles: data ?? [],
        count: data?.length ?? 0
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__202968c9._.js.map