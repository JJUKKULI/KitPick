'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionCard } from '@/components/product/DecisionCard';
import type { DecisionType } from '@/types';

type FilterType = DecisionType | 'all';

const filters: { id: FilterType; label: string; color?: string }[] = [
  { id: 'all',      label: '전체' },
  { id: 'buy',      label: '구매 추천', color: 'text-decision-buy' },
  { id: 'wait',     label: '기다리세요', color: 'text-decision-wait' },
  { id: 'watch',    label: '지켜보세요', color: 'text-decision-watch' },
  { id: 'trending', label: '트렌딩', color: 'text-decision-trending' },
];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockProducts.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.decision === activeFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.series.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">구매 결정 피드</h1>
        <p className="text-zinc-400">실시간 시장 분석과 구매 추천.</p>
      </div>

      {/* 필터 & 검색 */}
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

      {/* 카드 그리드 */}
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
    </div>
  );
}
