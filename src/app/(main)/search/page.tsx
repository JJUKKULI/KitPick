'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionCard } from '@/components/product/DecisionCard';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import type { DecisionType } from '@/types';

const DECISION_FILTERS: { id: DecisionType | 'all'; label: string }[] = [
  { id: 'all',      label: '전체' },
  { id: 'buy',      label: '구매 추천' },
  { id: 'wait',     label: '기다리세요' },
  { id: 'watch',    label: '지켜보세요' },
  { id: 'trending', label: '트렌딩' },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const results = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.series.toLowerCase().includes(q.toLowerCase()) ||
      p.grade.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>검색 결과</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">
          "{q}"
        </h1>
        <p className="text-zinc-400 text-sm">
          {results.length > 0
            ? `${results.length}개의 키트를 찾았습니다`
            : '검색 결과가 없습니다'}
        </p>
      </div>

      {/* 필터 바 */}
      {results.length > 0 && (
        <div className="flex items-center justify-between mb-6 bg-surface border border-surface-border p-3 rounded-xl">
          <div className="flex flex-wrap gap-2">
            {DECISION_FILTERS.map((f) => {
              const count =
                f.id === 'all'
                  ? results.length
                  : results.filter((p) => p.decision === f.id).length;
              if (count === 0 && f.id !== 'all') return null;
              return (
                <button
                  key={f.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-surface-raised border border-transparent hover:border-surface-border transition-all"
                >
                  {f.id !== 'all' && (
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      f.id === 'buy'      ? 'bg-decision-buy' :
                      f.id === 'wait'     ? 'bg-decision-wait' :
                      f.id === 'watch'    ? 'bg-decision-watch' :
                      'bg-decision-trending'
                    }`} />
                  )}
                  {f.label}
                  <span className="text-xs text-zinc-600">({count})</span>
                </button>
              );
            })}
          </div>
          <button className="p-2 border border-surface-border rounded-lg text-zinc-400 hover:text-white hover:bg-surface-raised transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 결과 그리드 */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {results.map((product, i) => (
            <DecisionCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        /* 결과 없음 */
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          <div className="w-16 h-16 bg-surface-raised rounded-2xl flex items-center justify-center mb-4 border border-surface-border">
            <Search className="w-7 h-7 text-zinc-600" />
          </div>
          <p className="text-white font-semibold mb-2">"{q}"에 대한 결과가 없어요</p>
          <p className="text-sm text-zinc-500 mb-6 text-center max-w-xs">
            키트명, 시리즈명, 등급으로 다시 검색해보세요
          </p>
          {/* 검색 제안 */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-zinc-600 mb-1">이런 키트는 어때요?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {mockProducts.slice(0, 4).map((p) => (
                <DecisionBadge key={p.id} decision={p.decision} size="sm" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <div className="h-8 w-48 bg-surface-raised rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-72 bg-surface-raised rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
