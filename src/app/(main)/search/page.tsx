'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search, Loader2, ExternalLink, ShoppingCart,
  Star, TrendingDown, TrendingUp, Minus, Package,
} from 'lucide-react';

interface NaverItem {
  title:    string;
  price:    number;
  mallName: string;
  link:     string;
  image:    string;
  brand:    string;
  category: string;
}

// 가격 표시
function priceLabel(p: number) {
  return p >= 1000 ? `${p.toLocaleString('ko-KR')}원` : '-';
}

function NaverResultCard({ item, index, onDetail }: { item: NaverItem; index: number; onDetail: (item: NaverItem) => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onDetail(item)}
      className="bg-surface border border-surface-border rounded-xl overflow-hidden hover:border-brand-500/40 transition-all group cursor-pointer"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* 이미지 */}
      <div className="h-44 w-full bg-surface-raised relative overflow-hidden flex items-center justify-center">
        {item.image && !imgError ? (
          <img
            src={item.image}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-3"
          />
        ) : (
          <Package className="w-12 h-12 text-zinc-700" />
        )}
        {item.brand && (
          <div className="absolute bottom-2 left-2 bg-surface-overlay/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-zinc-400 border border-surface-border">
            {item.brand}
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="p-4">
        <p className="text-xs text-zinc-500 mb-1 truncate">{item.category || item.mallName}</p>
        <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2 mb-3 leading-snug group-hover:text-brand-400 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-white">{priceLabel(item.price)}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{item.mallName}</div>
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-medium rounded-lg transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            구매
          </a>
        </div>
      </div>
    </div>
  );
}

function SearchContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const initialQ     = searchParams.get('q') ?? '';
  const [query,   setQuery]   = useState(initialQ);
  const [results, setResults] = useState<NaverItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error,   setError]   = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 초기 쿼리 자동 검색
  useEffect(() => {
    if (initialQ) doSearch(initialQ);
    inputRef.current?.focus();
  }, []);

  function handleDetail(item: NaverItem) {
    const url = `/product/naver?q=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}`;
    router.push(url);
  }

  async function doSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    setError('');
    setSearched(true);
    router.replace(`/search?q=${encodeURIComponent(q)}`, { scroll: false });

    try {
      const res = await fetch(`/api/price?query=${encodeURIComponent(q)}&mode=search`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? '검색 실패');
        setResults([]);
      } else {
        setResults(data.results ?? []);
      }
    } catch {
      setError('네트워크 오류');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    doSearch(query);
  }

  const SUGGESTIONS = [
    'HG 에어리얼 리빌드', 'HGUC 나이팅게일', 'MG νガンダム Ver.Ka',
    'RG 유니콘 건담', 'HG 윙건담 EW', 'PG 스트라이크 건담',
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-6 h-6 text-brand-500" />
          <h1 className="text-3xl font-bold text-white">제품 검색</h1>
        </div>
        <p className="text-zinc-400 text-sm">건프라, 피규어, 프라모델 — 네이버 쇼핑에서 실시간으로 검색해요</p>
      </div>

      {/* 검색창 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="예: HG 에어리얼 리빌드, MG 프리덤, HGUC 나이팅게일..."
              className="w-full bg-surface border border-surface-border rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-base"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-4 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            검색
          </button>
        </div>
      </form>

      {/* 추천 검색어 */}
      {!searched && (
        <div className="mb-8">
          <p className="text-xs text-zinc-600 mb-3 uppercase tracking-wider font-medium">추천 검색어</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); doSearch(s); }}
                className="px-4 py-2 bg-surface border border-surface-border hover:border-brand-500/40 hover:bg-surface-raised text-zinc-400 hover:text-brand-400 rounded-lg text-sm transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 로딩 */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          <p className="text-zinc-400 text-sm">네이버 쇼핑에서 검색 중...</p>
        </div>
      )}

      {/* 에러 */}
      {error && !loading && (
        <div className="text-center py-16 border border-dashed border-brand-500/20 rounded-2xl">
          <p className="text-brand-400 text-sm mb-2">{error}</p>
          <p className="text-zinc-600 text-xs">NAVER_CLIENT_ID / SECRET을 확인해주세요</p>
        </div>
      )}

      {/* 결과 */}
      {!loading && searched && !error && (
        <>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">"{query}"</span> 검색 결과
              {results.length > 0 && <span className="ml-2 text-zinc-600">{results.length}개</span>}
            </p>
          </div>

          {results.length > 0 && (
            <p className="text-xs text-zinc-600 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" />
              카드를 클릭하면 AI 구매 분석과 쇼핑몰 최저가를 확인할 수 있어요
            </p>
          )}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((item, i) => (
                <NaverResultCard key={`${item.link}-${i}`} item={item} index={i} onDetail={handleDetail} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-surface-border rounded-2xl">
              <Search className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm">"{query}"에 대한 검색 결과가 없어요</p>
              <p className="text-zinc-600 text-xs mt-1">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </>
      )}

      {/* 초기 화면 */}
      {!searched && !loading && (
        <div className="text-center py-24 border border-dashed border-surface-border rounded-2xl">
          <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-base font-medium mb-2">찾고 싶은 건프라를 검색해보세요</p>
          <p className="text-zinc-600 text-sm">네이버 쇼핑과 연동해 실시간 가격과 이미지를 보여드려요</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
