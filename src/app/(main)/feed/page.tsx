'use client';

import { useState } from 'react';
import {
  Search, SlidersHorizontal, BookOpen,
  ChevronDown, ChevronUp, Sparkles, Calendar,
  ShoppingCart, Clock, Eye, Flame,
  TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionCard } from '@/components/product/DecisionCard';
import type { DecisionType, Product } from '@/types';

// ─── 피드 필터 ────────────────────────────────────────────────────────────

type FilterType = DecisionType | 'all';

const filters: { id: FilterType; label: string; color?: string }[] = [
  { id: 'all',      label: '전체' },
  { id: 'buy',      label: '구매 추천',  color: 'text-decision-buy' },
  { id: 'wait',     label: '기다리세요', color: 'text-decision-wait' },
  { id: 'watch',    label: '지켜보세요', color: 'text-decision-watch' },
  { id: 'trending', label: '트렌딩',     color: 'text-decision-trending' },
];

// ─── 저널 Mock 데이터 ─────────────────────────────────────────────────────

interface JournalEntry {
  id: string;
  weekLabel: string;
  dateRange: string;
  headline: string;
  summary: string;
  aiComment: string;
  buyPicks: Product[];
  waitList: Product[];
  watchList: Product[];
  trending: Product[];
  stats: { analyzed: number; buySignals: number; reprintAlerts: number };
}

const mockJournals: JournalEntry[] = [
  {
    id: 'j1', weekLabel: '3월 3주차', dateRange: '2026.03.16 – 03.22',
    headline: '에어리얼 리빌드 재판 임박 — 지금 사면 손해',
    summary: '이번 주 핵심은 재판 타이밍입니다. 에어리얼 리빌드와 칼리번이 대규모 재판을 앞두고 있어 현재 프리미엄 가격에 구매하는 것은 비추천입니다. 반면 클래식 건담 라인업은 가격이 안정권에 접어들어 구매 적기입니다.',
    aiComment: '이번 주 트렌드는 수성의 마녀 시리즈 재판 공시입니다. 3분기 공급 확대 예정으로 현재 프리미엄가를 지불할 이유가 없습니다. 장기 보유 관점에서는 클래식 HGUC 라인이 안정적 가치를 유지하고 있어 중장기 컬렉터에게 적합합니다.',
    buyPicks: [mockProducts[0], mockProducts[4]],
    waitList: [mockProducts[1], mockProducts[5]],
    watchList: [mockProducts[2]],
    trending: [mockProducts[3]],
    stats: { analyzed: 86, buySignals: 12, reprintAlerts: 3 },
  },
  {
    id: 'j2', weekLabel: '3월 2주차', dateRange: '2026.03.09 – 03.15',
    headline: '윙 건담 EW 바이럴 급등 — 재고 소진 전 확보 필요',
    summary: '소셜 미디어 커스텀 빌드 영상 바이럴로 윙 건담 EW 수요가 폭발했습니다. 현재 가격 하락세와 맞물려 구매 황금기입니다. MG 라인업 전반이 정상 가격대로 돌아오는 추세입니다.',
    aiComment: '윙 건담 EW의 판매 속도는 48시간 기준 312% 증가를 기록했습니다. 이 수준의 수요 급등은 통상 2~3주 내 재고 부족으로 이어집니다. 현재 $55 가격대는 최근 3년 최저점에 근접합니다.',
    buyPicks: [mockProducts[4]],
    waitList: [mockProducts[5]],
    watchList: [mockProducts[2]],
    trending: [mockProducts[3]],
    stats: { analyzed: 74, buySignals: 9, reprintAlerts: 1 },
  },
  {
    id: 'j3', weekLabel: '3월 1주차', dateRange: '2026.03.02 – 03.08',
    headline: '사자비 Ver.Ka — $85 이하 발견 시 즉시 구매 신호',
    summary: '지난주는 전반적으로 관망세였습니다. 사자비 Ver.Ka는 지속적으로 $95 가격 하한선을 유지 중입니다. $85 이하 출현 시 즉시 구매가 권장됩니다.',
    aiComment: '사자비 Ver.Ka는 MG 프리미엄 라인 중 가장 안정적인 가격 유지력을 보이는 키트입니다. 10년 이상 $90~$100 범위를 벗어난 사례가 드물어, 컬렉터블 관점에서 신뢰도 높은 장기 투자 대상입니다.',
    buyPicks: [mockProducts[0]],
    waitList: [mockProducts[1]],
    watchList: [mockProducts[2]],
    trending: [],
    stats: { analyzed: 61, buySignals: 7, reprintAlerts: 2 },
  },
];

// ─── 저널 내부 컴포넌트 ───────────────────────────────────────────────────

const decisionMeta: Record<DecisionType, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  buy:      { label: '구매 추천',  icon: ShoppingCart, color: 'text-decision-buy',      bg: 'bg-decision-buy/10 border-decision-buy/20' },
  wait:     { label: '기다리세요', icon: Clock,        color: 'text-decision-wait',     bg: 'bg-decision-wait/10 border-decision-wait/20' },
  watch:    { label: '지켜보세요', icon: Eye,          color: 'text-decision-watch',    bg: 'bg-decision-watch/10 border-decision-watch/20' },
  trending: { label: '트렌딩',     icon: Flame,        color: 'text-decision-trending', bg: 'bg-decision-trending/10 border-decision-trending/20' },
};

function PriceIcon({ current, prev }: { current: number; prev: number }) {
  if (current < prev) return <TrendingDown className="w-3.5 h-3.5 text-decision-buy" />;
  if (current > prev) return <TrendingUp   className="w-3.5 h-3.5 text-decision-wait" />;
  return <Minus className="w-3.5 h-3.5 text-zinc-500" />;
}

function ProductRow({ product }: { product: Product }) {
  const pct    = (((product.price - product.previousPrice) / product.previousPrice) * 100).toFixed(1);
  const isDown = product.price < product.previousPrice;
  const meta   = decisionMeta[product.decision];
  const Icon   = meta.icon;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-surface-border last:border-0 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${meta.bg} ${meta.color}`}>
          <Icon className="w-3 h-3" />{meta.label}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-200 truncate">{product.name}</p>
          <p className="text-xs text-zinc-500">{product.grade}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <PriceIcon current={product.price} prev={product.previousPrice} />
        <span className={`text-xs font-semibold ${isDown ? 'text-decision-buy' : product.price > product.previousPrice ? 'text-decision-wait' : 'text-zinc-400'}`}>
          {isDown ? '' : '+'}{pct}%
        </span>
        <span className="text-sm font-bold text-zinc-100">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

function JournalCard({ entry, defaultOpen }: { entry: JournalEntry; defaultOpen?: boolean }) {
  const [open,    setOpen]    = useState(defaultOpen ?? false);
  const [showAI,  setShowAI]  = useState(false);
  const [showAll, setShowAll] = useState(false);

  const allProducts  = [...entry.buyPicks, ...entry.trending, ...entry.watchList, ...entry.waitList];
  const PREVIEW      = 3;
  const visible      = showAll ? allProducts : allProducts.slice(0, PREVIEW);

  return (
    <article className="bg-surface border border-surface-border rounded-2xl overflow-hidden">
      {/* 헤더 (항상 보임) */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-surface-raised/30 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-400">
              <Calendar className="w-3 h-3" />{entry.weekLabel}
            </span>
            <span className="text-xs text-zinc-600">{entry.dateRange}</span>
          </div>
          <h3 className="text-base font-bold text-zinc-100 leading-snug mb-2">{entry.headline}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-zinc-500">분석 {entry.stats.analyzed}개</span>
            <span className="text-zinc-700">·</span>
            <span className="text-xs text-decision-buy font-medium">구매신호 {entry.stats.buySignals}개</span>
            <span className="text-zinc-700">·</span>
            <span className="text-xs text-decision-watch font-medium">재판알림 {entry.stats.reprintAlerts}개</span>
          </div>
        </div>
        <div className="shrink-0 mt-1 text-zinc-500">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* 펼쳐진 내용 */}
      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-surface-border">
          <p className="pt-4 text-sm text-zinc-400 leading-relaxed">{entry.summary}</p>

          {/* AI 인사이트 */}
          <div className="bg-surface-raised rounded-xl border border-surface-border overflow-hidden">
            <button
              onClick={() => setShowAI(!showAI)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface-overlay/30 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-brand-400">
                <Sparkles className="w-4 h-4" />AI 주간 인사이트
              </span>
              {showAI ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
            </button>
            {showAI && (
              <p className="px-4 pb-4 pt-3 text-sm text-zinc-400 leading-relaxed border-t border-surface-border">
                {entry.aiComment}
              </p>
            )}
          </div>

          {/* 제품 목록 */}
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">이번 주 주요 제품</p>
            <div className="bg-surface-raised rounded-xl border border-surface-border px-4">
              {visible.map((p) => <ProductRow key={`${entry.id}-${p.id}`} product={p} />)}
            </div>
            {allProducts.length > PREVIEW && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-2 w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-1.5 flex items-center justify-center gap-1"
              >
                {showAll
                  ? <><ChevronUp className="w-3.5 h-3.5" />접기</>
                  : <><ChevronDown className="w-3.5 h-3.5" />{allProducts.length - PREVIEW}개 더 보기</>}
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

// ─── 메인 피드 페이지 ─────────────────────────────────────────────────────

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery,  setSearchQuery]  = useState('');

  const filtered = mockProducts.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.decision === activeFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.series.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 w-full">

      {/* ── 헤더 ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">구매 결정 피드</h1>
        <p className="text-zinc-400">실시간 시장 분석과 구매 추천.</p>
      </div>

      {/* ── 필터 & 검색 ── */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8 bg-surface border border-surface-border p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-surface-raised text-white border border-surface-border-light shadow-sm'
                  : `bg-transparent text-zinc-400 hover:bg-surface-raised/50 border border-transparent hover:border-surface-border ${filter.color ?? ''}`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-grow lg:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="키트, 시리즈 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-64 bg-surface-base border border-surface-border rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
          <button className="p-2 border border-surface-border rounded-lg text-zinc-400 hover:text-white hover:bg-surface-raised transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── 제품 카드 그리드 ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <DecisionCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-surface-border border-dashed rounded-xl">
          <p className="text-zinc-500">검색 조건에 맞는 제품이 없습니다.</p>
        </div>
      )}

      {/* ── 구분선 + 주간 저널 섹션 ── */}
      <div className="mt-16 mb-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-surface-border" />
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400 shrink-0">
          <BookOpen className="w-4 h-4 text-brand-500" />
          주간 구매 결정 피드
        </div>
        <div className="flex-1 h-px bg-surface-border" />
      </div>

      <div className="space-y-4">
        {mockJournals.map((entry, i) => (
          <JournalCard key={entry.id} entry={entry} defaultOpen={i === 0} />
        ))}
      </div>

    </div>
  );
}
