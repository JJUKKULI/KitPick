'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

const RECENT_KEY = 'kitpick-recent-searches';

function saveRecent(query: string) {
  if (typeof window === 'undefined') return;
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([query, ...prev.filter((q) => q !== query)].slice(0, 5))
    );
  } catch {}
}

// 인기 태그 (추후 실데이터 교체)
const HOT_TAGS = ['사자비 Ver.Ka', '수성의 마녀', 'MG 윙건담', 'HG 에어리얼', 'PG 유니콘'];

export function LandingSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 실시간 미리보기
  const preview =
    query.trim().length > 0
      ? mockProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.series.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
      : [];

  function handleSearch(value: string) {
    const q = value.trim();
    if (!q) return;
    saveRecent(q);
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* 검색 인풋 */}
      <div
        className={`flex items-center gap-3 bg-surface border rounded-2xl px-5 py-4 transition-all duration-200 shadow-xl shadow-black/30 ${
          focused
            ? 'border-brand-500/70 ring-2 ring-brand-500/20'
            : 'border-surface-border-light'
        }`}
      >
        <Search className="w-5 h-5 text-zinc-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="키트명, 시리즈, 등급으로 검색..."
          className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-600 focus:outline-none"
        />
        <button
          onClick={() => handleSearch(query)}
          className="shrink-0 bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          검색 <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 드롭다운 미리보기 */}
      {focused && preview.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-overlay border border-surface-border rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          {preview.map((p) => (
            <button
              key={p.id}
              onMouseDown={() => {
                saveRecent(p.name);
                router.push(`/product/${p.id}`);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-raised transition-colors text-left border-b border-surface-border last:border-0"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-raised border border-surface-border shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{p.name}</div>
                <div className="text-xs text-zinc-500">{p.grade} · {p.series}</div>
              </div>
              <span className={`text-xs font-semibold shrink-0 ${
                p.decision === 'buy'      ? 'text-decision-buy' :
                p.decision === 'wait'     ? 'text-decision-wait' :
                p.decision === 'watch'    ? 'text-decision-watch' :
                'text-decision-trending'
              }`}>
                {p.decision === 'buy' ? '구매추천' :
                 p.decision === 'wait' ? '기다리세요' :
                 p.decision === 'watch' ? '지켜보세요' : '트렌딩'}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 인기 태그 */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-xs text-zinc-600">인기:</span>
        {HOT_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleSearch(tag)}
            className="px-3 py-1 bg-surface-raised border border-surface-border rounded-full text-xs text-zinc-400 hover:text-white hover:border-brand-500/40 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
