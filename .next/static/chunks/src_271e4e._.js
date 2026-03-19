(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_271e4e._.js", {

"[project]/src/components/ui/DecisionBadge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DecisionBadge": (()=>DecisionBadge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
;
;
const config = {
    buy: {
        label: '구매 추천',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
        colors: 'bg-decision-buy/10 text-decision-buy border-decision-buy/20'
    },
    wait: {
        label: '기다리세요',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        colors: 'bg-decision-wait/10 text-decision-wait border-decision-wait/20'
    },
    watch: {
        label: '지켜보세요',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
        colors: 'bg-decision-watch/10 text-decision-watch border-decision-watch/20'
    },
    trending: {
        label: '트렌딩',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"],
        colors: 'bg-decision-trending/10 text-decision-trending border-decision-trending/20'
    }
};
const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2 font-medium'
};
function DecisionBadge({ decision, size = 'md', className = '' }) {
    const { label, icon: Icon, colors } = config[decision];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `inline-flex items-center rounded-full border ${colors} ${sizeClasses[size]} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
            }, void 0, false, {
                fileName: "[project]/src/components/ui/DecisionBadge.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/DecisionBadge.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/DecisionBadge.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = DecisionBadge;
var _c;
__turbopack_refresh__.register(_c, "DecisionBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/SentimentBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SentimentBar": (()=>SentimentBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SentimentBar({ positive, neutral, negative, className = '', showLabels = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col gap-1.5 ${className}`,
        children: [
            showLabels && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-xs font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-decision-buy",
                        children: [
                            positive,
                            "% 긍정"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/SentimentBar.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-400",
                        children: [
                            neutral,
                            "% 중립"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/SentimentBar.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-brand-500",
                        children: [
                            negative,
                            "% 부정"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/SentimentBar.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/SentimentBar.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 w-full flex rounded-full overflow-hidden bg-surface-raised",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full bg-decision-buy transition-all duration-500",
                        style: {
                            width: `${positive}%`
                        },
                        title: `긍정: ${positive}%`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SentimentBar.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full bg-zinc-600 transition-all duration-500",
                        style: {
                            width: `${neutral}%`
                        },
                        title: `중립: ${neutral}%`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SentimentBar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full bg-brand-500 transition-all duration-500",
                        style: {
                            width: `${negative}%`
                        },
                        title: `부정: ${negative}%`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SentimentBar.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/SentimentBar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/SentimentBar.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = SentimentBar;
var _c;
__turbopack_refresh__.register(_c, "SentimentBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/wishlistStore.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useWishlistStore": (()=>useWishlistStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useWishlistStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        wishlist: [],
        toggle: (id)=>set((state)=>({
                    wishlist: state.wishlist.includes(id) ? state.wishlist.filter((wid)=>wid !== id) : [
                        ...state.wishlist,
                        id
                    ]
                })),
        isWished: (id)=>get().wishlist.includes(id),
        clear: ()=>set({
                wishlist: []
            })
    }), {
    name: 'kitpick-wishlist'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/product/DecisionCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DecisionCard": (()=>DecisionCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$DecisionBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/DecisionBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SentimentBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/SentimentBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$wishlistStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/store/wishlistStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
function DecisionCard({ product, index = 0 }) {
    _s();
    const { toggle, isWished } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$wishlistStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"])();
    const wished = isWished(product.id);
    const priceDiff = product.price - product.previousPrice;
    const isPriceDown = priceDiff < 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.4,
            delay: index * 0.1
        },
        whileHover: {
            y: -4
        },
        className: "group",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full bg-surface border border-surface-border rounded-xl overflow-hidden transition-colors duration-300 group-hover:border-surface-border-light group-hover:bg-surface-raised flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-40 w-full bg-gradient-to-br from-surface-raised to-surface-overlay relative flex items-center justify-center border-b border-surface-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 text-zinc-700"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-3 right-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$DecisionBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecisionBadge"], {
                                decision: product.decision,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/DecisionCard.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.preventDefault();
                                toggle(product.id);
                            },
                            className: `absolute top-3 left-3 p-1.5 rounded-full border transition-all duration-200 ${wished ? 'bg-brand-500/20 border-brand-500/40 text-brand-400' : 'bg-black/40 border-white/10 text-zinc-500 hover:text-brand-400 hover:border-brand-500/30'}`,
                            "aria-label": wished ? '찜 해제' : '찜하기',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: `w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/DecisionCard.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-zinc-300 border border-white/10",
                            children: product.grade
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/product/${product.id}`,
                    className: "flex flex-col flex-grow p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-1 text-xs text-zinc-500 font-medium tracking-wide uppercase",
                            children: product.series
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-zinc-100 mb-3 line-clamp-1 group-hover:text-brand-400 transition-colors",
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-end gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl font-bold text-white",
                                    children: [
                                        "$",
                                        product.price.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                priceDiff !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `flex items-center text-sm font-medium mb-1 ${isPriceDown ? 'text-decision-buy' : 'text-brand-500'}`,
                                    children: [
                                        isPriceDown ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                            className: "w-3 h-3 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 80,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                            className: "w-3 h-3 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, this),
                                        Math.abs(priceDiff).toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                priceDiff === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center text-sm font-medium mb-1 text-zinc-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                            className: "w-3 h-3 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        " 보합"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-zinc-400 line-clamp-2 mb-6 flex-grow",
                            children: product.reasoning
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-auto pt-4 border-t border-surface-border grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-zinc-500 mb-1.5",
                                            children: "인기도"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-1.5 w-full bg-surface-raised rounded-full overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full bg-zinc-300 rounded-full",
                                                style: {
                                                    width: `${product.popularity}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/product/DecisionCard.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-zinc-500 mb-1.5",
                                            children: "여론"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SentimentBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SentimentBar"], {
                                            positive: product.sentiment.positive,
                                            neutral: product.sentiment.neutral,
                                            negative: product.sentiment.negative,
                                            showLabels: false,
                                            className: "mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/DecisionCard.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/DecisionCard.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/DecisionCard.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/product/DecisionCard.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(DecisionCard, "R2ezaCgg3EMy3kzHATqPHiXYCws=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$wishlistStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"]
    ];
});
_c = DecisionCard;
var _c;
__turbopack_refresh__.register(_c, "DecisionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/data/mockData.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "mockProducts": (()=>mockProducts),
    "mockTrends": (()=>mockTrends),
    "mockUserProfile": (()=>mockUserProfile)
});
const mockProducts = [
    {
        id: 'p1',
        name: 'RX-78-2 건담 (Revive)',
        series: '기동전사 건담',
        grade: 'HGUC 1/144',
        price: 12.99,
        previousPrice: 15.99,
        decision: 'buy',
        reasoning: '평균 대비 20% 하락. 높은 커뮤니티 호감도와 충분한 재고로 지금이 구매 적기입니다.',
        popularity: 92,
        sentiment: {
            positive: 85,
            neutral: 10,
            negative: 5
        },
        priceHistory: [
            {
                date: '1월',
                price: 15.99
            },
            {
                date: '2월',
                price: 15.99
            },
            {
                date: '3월',
                price: 14.5
            },
            {
                date: '4월',
                price: 14.5
            },
            {
                date: '5월',
                price: 13.99
            },
            {
                date: '6월',
                price: 12.99
            }
        ],
        communityComments: [
            {
                id: 'c1',
                user: 'GunplaBuilder99',
                comment: '가성비 클래식. Revive의 가동성은 이 가격대 최고입니다.',
                sentiment: 'positive',
                date: '2일 전'
            },
            {
                id: 'c2',
                user: 'MechaFan',
                comment: '방패 색분리는 스티커가 필요하지만 전체적으로 좋아요.',
                sentiment: 'neutral',
                date: '1주 전'
            }
        ],
        aiInsight: '과거 데이터상 이 키트가 $12 아래로 내려간 적이 거의 없습니다. 현재 커뮤니티 호감도 85%와 최근 재입고를 고려하면, 연말 가격 상승 전 지금 구매하는 것이 최적입니다.',
        releaseDate: '2015-07-25'
    },
    {
        id: 'p2',
        name: '에어리얼 리빌드',
        series: '수성의 마녀',
        grade: 'HG 1/144',
        price: 34.5,
        previousPrice: 22.0,
        decision: 'wait',
        reasoning: '인위적 품귀로 56% 가격 폭등 중. 다음 달 대규모 재판 예정.',
        popularity: 98,
        sentiment: {
            positive: 60,
            neutral: 15,
            negative: 25
        },
        priceHistory: [
            {
                date: '1월',
                price: 22.0
            },
            {
                date: '2월',
                price: 24.5
            },
            {
                date: '3월',
                price: 28.0
            },
            {
                date: '4월',
                price: 32.0
            },
            {
                date: '5월',
                price: 35.0
            },
            {
                date: '6월',
                price: 34.5
            }
        ],
        communityComments: [
            {
                id: 'c3',
                user: 'SulettaForgetta',
                comment: '되팔이들이 시장 망치는 중. 절대 25달러 이상 주지 마세요!',
                sentiment: 'negative',
                date: '5시간 전'
            },
            {
                id: 'c4',
                user: 'PlasticAddict',
                comment: '조립 경험은 훌륭해요. 근데 재판 기다리는 게 맞아요.',
                sentiment: 'neutral',
                date: '1일 전'
            }
        ],
        aiInsight: '반다이가 3분기 재판을 공식 발표했습니다. 현재 2차 시장 가격은 심각하게 부풀려져 있습니다. 3~4주 기다리면 30~40% 절약 가능합니다.',
        releaseDate: '2023-03-18'
    },
    {
        id: 'p3',
        name: '사자비 Ver.Ka',
        series: '역습의 샤아',
        grade: 'MG 1/100',
        price: 95.0,
        previousPrice: 95.0,
        decision: 'watch',
        reasoning: '가격은 안정적이나 주요 유통사 재고가 천천히 줄어드는 중. 급락 또는 재고 부족 알림을 모니터링하세요.',
        popularity: 88,
        sentiment: {
            positive: 95,
            neutral: 4,
            negative: 1
        },
        priceHistory: [
            {
                date: '1월',
                price: 90.0
            },
            {
                date: '2월',
                price: 95.0
            },
            {
                date: '3월',
                price: 95.0
            },
            {
                date: '4월',
                price: 95.0
            },
            {
                date: '5월',
                price: 95.0
            },
            {
                date: '6월',
                price: 95.0
            }
        ],
        communityComments: [
            {
                id: 'c5',
                user: 'RedComet',
                comment: '가장 완벽한 사자비. MG 컬렉터라면 반드시 소장해야 합니다.',
                sentiment: 'positive',
                date: '3주 전'
            }
        ],
        aiInsight: '이 키트는 매우 안정적인 가격 하한선을 유지합니다. $85 이하로 발견되면 즉시 구매 신호입니다.',
        releaseDate: '2013-12-14'
    },
    {
        id: 'p4',
        name: '윙 건담 제로 EW (Ver.Ka)',
        series: '건담 W',
        grade: 'MG 1/100',
        price: 55.0,
        previousPrice: 65.0,
        decision: 'trending',
        reasoning: '바이럴 커스텀 빌드 영상 이후 커뮤니티 관심 폭발. 재고 소진 속도 평소 3배.',
        popularity: 95,
        sentiment: {
            positive: 88,
            neutral: 10,
            negative: 2
        },
        priceHistory: [
            {
                date: '1월',
                price: 65.0
            },
            {
                date: '2월',
                price: 62.0
            },
            {
                date: '3월',
                price: 60.0
            },
            {
                date: '4월',
                price: 58.0
            },
            {
                date: '5월',
                price: 55.0
            },
            {
                date: '6월',
                price: 55.0
            }
        ],
        communityComments: [
            {
                id: 'c6',
                user: 'AngelWings',
                comment: '새 날개 기믹이 너무 예쁩니다. 구버전보다 훨씬 좋아요.',
                sentiment: 'positive',
                date: '12시간 전'
            }
        ],
        aiInsight: '지난 48시간 동안 판매 속도가 312% 증가했습니다. 원하신다면 품절 전에 지금 바로 확보하세요.',
        releaseDate: '2020-11-28'
    },
    {
        id: 'p5',
        name: '제타 건담 Ver.Ka',
        series: '기동전사 Z 건담',
        grade: 'MG 1/100',
        price: 68.0,
        previousPrice: 75.0,
        decision: 'buy',
        reasoning: '최근 재입고로 가격 정상화. 변형 기믹이 높은 평가를 받고 있습니다.',
        popularity: 85,
        sentiment: {
            positive: 90,
            neutral: 8,
            negative: 2
        },
        priceHistory: [
            {
                date: '1월',
                price: 85.0
            },
            {
                date: '2월',
                price: 80.0
            },
            {
                date: '3월',
                price: 78.0
            },
            {
                date: '4월',
                price: 75.0
            },
            {
                date: '5월',
                price: 70.0
            },
            {
                date: '6월',
                price: 68.0
            }
        ],
        communityComments: [],
        aiInsight: '초기 출시 열기가 가라앉으며 가격이 안정화됐습니다. 이 고평가 키트의 최적 진입 시점입니다.',
        releaseDate: '2023-04-29'
    },
    {
        id: 'p6',
        name: '칼리번',
        series: '수성의 마녀',
        grade: 'HG 1/144',
        price: 28.0,
        previousPrice: 22.0,
        decision: 'wait',
        reasoning: '시리즈 종영 후 열기 프리미엄 지속 중. 2차 재판 때까지 기다리는 것을 권장합니다.',
        popularity: 99,
        sentiment: {
            positive: 92,
            neutral: 5,
            negative: 3
        },
        priceHistory: [
            {
                date: '1월',
                price: 22.0
            },
            {
                date: '2월',
                price: 22.0
            },
            {
                date: '3월',
                price: 25.0
            },
            {
                date: '4월',
                price: 30.0
            },
            {
                date: '5월',
                price: 32.0
            },
            {
                date: '6월',
                price: 28.0
            }
        ],
        communityComments: [],
        aiInsight: '가격이 소폭 하락 중이나 여전히 MSRP보다 27% 높습니다. 2개월 대기를 권장합니다.',
        releaseDate: '2023-07-15'
    }
];
const mockTrends = {
    stats: {
        totalTracked: 1245,
        buySignals: 84,
        avgHypeScore: 76,
        reprintsDetected: 12
    },
    releaseRadar: [
        {
            id: 'r1',
            name: '데스티니 건담 Spec II',
            date: '다음 주',
            hype: 98
        },
        {
            id: 'r2',
            name: '내러티브 건담 C-Packs Ver.Ka',
            date: '2주 후',
            hype: 92
        },
        {
            id: 'r3',
            name: '겔구그 메나스',
            date: '다음 달',
            hype: 85
        }
    ],
    reprintSignals: [
        {
            id: 'rep1',
            name: '나이팅게일 (HGUC)',
            confidence: 95,
            timeframe: '2024 Q3'
        },
        {
            id: 'rep2',
            name: 'Ex-S 건담 (MG)',
            confidence: 82,
            timeframe: '2024 Q4'
        },
        {
            id: 'rep3',
            name: '페넬로페 (HGUC)',
            confidence: 78,
            timeframe: '미정'
        }
    ]
};
const mockUserProfile = {
    username: 'NewtypeBuilder',
    memberSince: '2023',
    stats: {
        decisionsSaved: 42,
        watchlistCount: 15,
        moneySaved: 128.5
    },
    favoriteSeries: [
        '수성의 마녀',
        '역습의 샤아',
        'Z 건담',
        '철혈의 오펀스'
    ],
    watchlist: [
        mockProducts[2],
        mockProducts[5]
    ],
    savedDecisions: [
        {
            product: mockProducts[0],
            date: '2일 전'
        },
        {
            product: mockProducts[4],
            date: '1주 전'
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/LandingSearch.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "LandingSearch": (()=>LandingSearch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/data/mockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
const RECENT_KEY = 'kitpick-recent-searches';
function saveRecent(query) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        const prev = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
        localStorage.setItem(RECENT_KEY, JSON.stringify([
            query,
            ...prev.filter((q)=>q !== query)
        ].slice(0, 5)));
    } catch  {}
}
// 인기 태그 (추후 실데이터 교체)
const HOT_TAGS = [
    '사자비 Ver.Ka',
    '수성의 마녀',
    'MG 윙건담',
    'HG 에어리얼',
    'PG 유니콘'
];
function LandingSearch() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [focused, setFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 실시간 미리보기
    const preview = query.trim().length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].filter((p)=>p.name.toLowerCase().includes(query.toLowerCase()) || p.series.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];
    function handleSearch(value) {
        const q = value.trim();
        if (!q) return;
        saveRecent(q);
        setFocused(false);
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-3 bg-surface border rounded-2xl px-5 py-4 transition-all duration-200 shadow-xl shadow-black/30 ${focused ? 'border-brand-500/70 ring-2 ring-brand-500/20' : 'border-surface-border-light'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "w-5 h-5 text-zinc-400 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "text",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        onFocus: ()=>setFocused(true),
                        onBlur: ()=>setTimeout(()=>setFocused(false), 150),
                        onKeyDown: (e)=>e.key === 'Enter' && handleSearch(query),
                        placeholder: "키트명, 시리즈, 등급으로 검색...",
                        className: "flex-1 bg-transparent text-base text-white placeholder:text-zinc-600 focus:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleSearch(query),
                        className: "shrink-0 bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors",
                        children: [
                            "검색 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                                lineNumber: 76,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            focused && preview.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 right-0 mt-2 bg-surface-overlay border border-surface-border rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50",
                children: preview.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onMouseDown: ()=>{
                            saveRecent(p.name);
                            router.push(`/product/${p.id}`);
                        },
                        className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-raised transition-colors text-left border-b border-surface-border last:border-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 rounded-lg bg-surface-raised border border-surface-border shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-white font-medium truncate",
                                        children: p.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-zinc-500",
                                        children: [
                                            p.grade,
                                            " · ",
                                            p.series
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs font-semibold shrink-0 ${p.decision === 'buy' ? 'text-decision-buy' : p.decision === 'wait' ? 'text-decision-wait' : p.decision === 'watch' ? 'text-decision-watch' : 'text-decision-trending'}`,
                                children: p.decision === 'buy' ? '구매추천' : p.decision === 'wait' ? '기다리세요' : p.decision === 'watch' ? '지켜보세요' : '트렌딩'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this)
                        ]
                    }, p.id, true, {
                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-center gap-2 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-zinc-600",
                        children: "인기:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LandingSearch.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    HOT_TAGS.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSearch(tag),
                            className: "px-3 py-1 bg-surface-raised border border-surface-border rounded-full text-xs text-zinc-400 hover:text-white hover:border-brand-500/40 transition-colors",
                            children: tag
                        }, tag, false, {
                            fileName: "[project]/src/components/ui/LandingSearch.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/LandingSearch.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/LandingSearch.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(LandingSearch, "bum9PplimYBDu0tttQXlzeEDWmQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LandingSearch;
var _c;
__turbopack_refresh__.register(_c, "LandingSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_271e4e._.js.map