'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Loader2 } from 'lucide-react';

const RECENT_KEY = 'kitpick-recent-searches';
function saveRecent(query: string) {
  if (typeof window === 'undefined') return;
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev.filter(q => q !== query)].slice(0, 5)));
  } catch {}
}

interface NaverItem { title: string; price: number; mallName: string; link: string; image: string; }
const HOT_TAGS = ['에어리얼 리빌드', '나이팅게일 HGUC', 'MG 뉴건담 Ver.Ka', 'HG 윙건담 EW', 'RG 유니콘'];

export function LandingSearch() {
  const router = useRouter();
  const [query,     setQuery]     = useState('');
  const [focused,   setFocused]   = useState(false);
  const [preview,   setPreview]   = useState<NaverItem[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // 디바운스 → 네이버 실시간 미리보기
  useEffect(() => {
    if (!query.trim()) { setPreview([]); return; }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/gundam?type=search&q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setPreview((data.gundams ?? []).slice(0, 5));
        }
      } catch {}
      finally { setSearching(false); }
    }, 400);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  function handleSearch(value: string) {
    const q = value.trim();
    if (!q) return;
    saveRecent(q);
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`flex items-center gap-3 bg-surface border rounded-2xl px-5 py-4 transition-all duration-200 shadow-xl shadow-black/30 ${focused ? 'border-brand-500/70 ring-2 ring-brand-500/20' : 'border-surface-border-light'}`}>
        {searching ? <Loader2 className="w-5 h-5 text-zinc-400 shrink-0 animate-spin" /> : <Search className="w-5 h-5 text-zinc-400 shrink-0" />}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
          placeholder="건프라, 피규어, 프라모델 이름으로 검색..."
          className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-600 focus:outline-none"
        />
        <button onClick={() => handleSearch(query)} className="shrink-0 bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors">
          검색 <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 네이버 실시간 미리보기 */}
      {focused && preview.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-overlay border border-surface-border rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          {preview.map((item, i) => (
            <button key={i}
              onMouseDown={() => { saveRecent(item.name); router.push(`/gundam/${item.id}`); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-raised transition-colors text-left border-b border-surface-border last:border-0">
              {item.image_url
                ? <img src={item.image_url} alt="" className="w-9 h-9 rounded-lg object-contain bg-surface-raised border border-surface-border shrink-0" />
                : <div className="w-9 h-9 rounded-lg bg-surface-raised border border-surface-border flex items-center justify-center shrink-0 text-zinc-600 text-xs font-bold">G</div>}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{item.name}</div>
                <div className="text-xs text-zinc-500">{(item.gundam_series as any)?.short_name ?? ''} {item.pilot ? `· ${item.pilot}` : ''}</div>
              </div>
              <span className="text-xs text-zinc-600 shrink-0">분석 보기 →</span>
            </button>
          ))}
          <div className="px-4 py-2 text-right">
            <button onMouseDown={() => handleSearch(query)} className="text-xs text-brand-400 hover:text-brand-300">
              "{query}" 전체 검색 →
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-xs text-zinc-600">인기:</span>
        {HOT_TAGS.map(tag => (
          <button key={tag} onClick={() => handleSearch(tag)}
            className="px-3 py-1 bg-surface-raised border border-surface-border rounded-full text-xs text-zinc-400 hover:text-white hover:border-brand-500/40 transition-colors">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
