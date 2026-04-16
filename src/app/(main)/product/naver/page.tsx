'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Sparkles, Loader2, RefreshCw, ShoppingCart,
  ExternalLink, TrendingDown, TrendingUp, Package, AlertCircle, Search,
} from 'lucide-react';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { toast } from '@/components/ui/Toast';
import type { DecisionType } from '@/types';

// ── 타입 ──────────────────────────────────────────────────────────────────
interface NaverItem {
  title: string; price: number; mallName: string; link: string; image: string;
}

interface AnalyzeResult {
  decision: DecisionType; reasoning: string; aiInsight: string;
  confidence: number; buyTarget: string; keyRisks: string[];
}

interface GradeResult {
  grade: { id: string; label: string; scale: string; badge?: string };
  found: boolean; price: number | null;
  mallName: string; link: string; image: string; title: string;
}

function priceLabel(p: number) {
  return p >= 1000 ? `${p.toLocaleString('ko-KR')}원` : '-';
}

// ── 등급별 가격 비교 컴포넌트 ─────────────────────────────────────────────
function GradePriceTable({ gundamName }: { gundamName: string }) {
  const [grades,   setGrades]   = useState<GradeResult[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);

  async function loadGrades() {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/price/grades?name=${encodeURIComponent(gundamName)}`);
      if (res.ok) {
        const data = await res.json();
        setGrades(data.results ?? []);
      }
    } catch {}
    finally { setLoading(false); }
  }

  return (
    <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-brand-500" />
          등급별 최저가 비교
        </h3>
        {!searched ? (
          <button onClick={loadGrades}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500/10 border border-brand-500/30 text-brand-400 hover:bg-brand-500/20 transition-all">
            <Search className="w-3.5 h-3.5" /> 가격 조회
          </button>
        ) : loading ? (
          <span className="text-xs text-zinc-500 flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin" /> 조회 중...
          </span>
        ) : (
          <button onClick={loadGrades} className="text-xs text-zinc-600 hover:text-zinc-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> 새로고침
          </button>
        )}
      </div>

      {!searched && (
        <div className="py-8 text-center">
          <ShoppingCart className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
          <p className="text-sm text-zinc-500">가격 조회 버튼을 눌러<br />등급별 최저가를 확인하세요</p>
        </div>
      )}

      {loading && (
        <div className="divide-y divide-surface-border animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <div className="w-14 h-5 bg-surface-raised rounded-full" />
              <div className="w-20 h-4 bg-surface-raised rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && searched && grades.length > 0 && (
        <div className="divide-y divide-surface-border">
          {grades.map(item => (
            <div key={item.grade.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-raised/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${item.grade.badge ?? 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30'}`}>
                  {item.grade.label}
                </span>
                <span className="text-xs text-zinc-600 hidden sm:block">{item.grade.scale}</span>
              </div>
              {item.found && item.price ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 group shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-decision-buy">{priceLabel(item.price)}</div>
                    <div className="text-[10px] text-zinc-600">{item.mallName}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand-400 transition-colors" />
                </a>
              ) : (
                <span className="text-xs text-zinc-600">조회되지 않습니다</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────────────
function NaverProductPage() {
  const params     = useSearchParams();
  const query      = params.get('q') ?? '';
  const fromImage  = params.get('image') ?? null;

  const [items,     setItems]     = useState<NaverItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [aiResult,  setAiResult]  = useState<AnalyzeResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [imgError,  setImgError]  = useState(false);

  // 건담 기본 이름 (등급 제거)
  const gundamBaseName = query
    .replace(/^(SD|HG|RG|MG|PG|HGUC|HGCE|EG|NG)\s+/i, '')
    .replace(/\s*Ver\.Ka\s*/i, '')
    .replace(/\s*1\/\d+\s*/g, '')
    .trim();

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/price?query=${encodeURIComponent(query)}&mode=search`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setItems(data?.results ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [query]);

  const minPrice  = items.length ? Math.min(...items.map(i => i.price).filter(p => p > 0)) : 0;
  const maxPrice  = items.length ? Math.max(...items.map(i => i.price).filter(p => p > 0)) : 0;
  const mainImage = (!imgError && (fromImage || items[0]?.image)) || null;

  async function handleAnalyze() {
    if (!query || analyzing) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 'naver-' + encodeURIComponent(query),
          name: query, grade: 'HG', series: '건담',
          price: minPrice, previousPrice: minPrice, officialPrice: null,
          priceHistory: items.slice(0, 5).map(item => ({ date: item.mallName, price: item.price })),
          sentiment: { positive: 70, neutral: 20, negative: 10 },
          popularity: 70, communityComments: [],
          stockStatus: items.length > 0 ? 'in_stock' : 'unknown',
          mentionCount: items.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast('error', 'AI 분석 실패', data.error); return; }
      setAiResult(data);
      toast('success', 'AI 분석 완료!', `${data.decision.toUpperCase()} · 신뢰도 ${data.confidence}%`);
    } catch { toast('error', '오류 발생'); }
    finally { setAnalyzing(false); }
  }

  if (!query) return <div className="p-10 text-zinc-500">검색어가 없습니다.</div>;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <Link href="/search" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 검색으로 돌아가기
        </Link>
        <span className="text-xs text-zinc-600 bg-surface border border-surface-border px-3 py-1.5 rounded-lg">
          네이버 쇼핑 실시간
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-brand-500 mr-3" />
          <span className="text-zinc-400">네이버 쇼핑 검색 중...</span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10">

          {/* 왼쪽 */}
          <div className="space-y-6">
            {/* 이미지 */}
            <div className="aspect-square w-full bg-surface border border-surface-border rounded-2xl overflow-hidden flex items-center justify-center">
              {mainImage && !imgError ? (
                <img src={mainImage} alt={query} onError={() => setImgError(true)} className="w-full h-full object-contain p-6" />
              ) : (
                <Package className="w-16 h-16 text-zinc-700" />
              )}
            </div>

            {/* 등급별 최저가 */}
            <GradePriceTable gundamName={gundamBaseName} />

            {/* 현재 검색 쇼핑몰 */}
            {items.length > 0 && (
              <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-zinc-400" /> 검색 결과 쇼핑몰
                  </h3>
                  <span className="text-xs text-zinc-600">{items.length}개</span>
                </div>
                <div className="divide-y divide-surface-border">
                  {items.slice(0, 5).map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 hover:bg-surface-raised transition-colors group">
                      <div className="flex items-center gap-2 min-w-0">
                        {i === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-decision-buy/10 text-decision-buy border border-decision-buy/20 font-bold shrink-0">최저</span>}
                        <span className="text-sm text-zinc-300 truncate">{item.mallName}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-sm font-bold ${i === 0 ? 'text-decision-buy' : 'text-white'}`}>{priceLabel(item.price)}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand-400 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{gundamBaseName}</h1>
              <p className="text-sm text-zinc-500 mb-4">"{query}" 검색 기준 분석</p>
              {aiResult ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <DecisionBadge decision={aiResult.decision} size="lg" />
                  <span className="text-xs text-zinc-500 bg-surface-raised px-2.5 py-1 rounded-full border border-surface-border">
                    AI 분석 · 신뢰도 {aiResult.confidence}%
                  </span>
                </div>
              ) : (
                <p className="text-sm text-zinc-500">AI 분석 버튼을 눌러 구매 결정을 확인하세요</p>
              )}
            </div>

            {/* 가격 요약 */}
            {items.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface border border-surface-border rounded-xl p-4">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-decision-buy" /> 검색 최저가
                  </div>
                  <div className="text-2xl font-bold text-decision-buy">{priceLabel(minPrice)}</div>
                  <div className="text-xs text-zinc-600 mt-1">{items[0]?.mallName}</div>
                </div>
                <div className="bg-surface border border-surface-border rounded-xl p-4">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-brand-400" /> 검색 최고가
                  </div>
                  <div className="text-2xl font-bold text-zinc-300">{priceLabel(maxPrice)}</div>
                  <div className="text-xs text-zinc-600 mt-1">{items.length}개 쇼핑몰 기준</div>
                </div>
              </div>
            )}

            {/* AI 인사이트 */}
            <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-brand-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI 시장 인사이트
                </h3>
                <button onClick={handleAnalyze} disabled={analyzing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-60 bg-brand-500/10 border-brand-500/30 text-brand-400 hover:bg-brand-500/20">
                  {analyzing
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />분석 중...</>
                    : <><RefreshCw className="w-3.5 h-3.5" />{aiResult ? '재분석' : 'AI 분석'}</>}
                </button>
              </div>
              {analyzing ? (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="w-5 h-5 text-brand-400 animate-spin shrink-0" />
                  <p className="text-sm text-zinc-300">네이버 최저가 기반 GPT 분석 중...</p>
                </div>
              ) : aiResult ? (
                <div className="space-y-3">
                  <p className="text-zinc-300 text-sm leading-relaxed">{aiResult.aiInsight}</p>
                  {aiResult.buyTarget && (
                    <div className="flex items-center gap-2 text-xs pt-2 border-t border-brand-500/10">
                      <ShoppingCart className="w-3.5 h-3.5 text-decision-buy" />
                      <span className="text-zinc-400">목표 구매가:</span>
                      <span className="text-decision-buy font-medium">{aiResult.buyTarget}</span>
                    </div>
                  )}
                  {aiResult.keyRisks?.length > 0 && (
                    <div className="flex items-start gap-2 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                      <span className="text-zinc-500">{aiResult.keyRisks.join(' · ')}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-zinc-600 text-sm py-2">AI 분석 버튼을 눌러 구매 결정을 확인하세요.</p>
              )}
            </div>

            {/* 구매 결정 요약 */}
            {aiResult?.reasoning && (
              <div className="bg-surface border border-surface-border rounded-xl p-5">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">구매 결정 요약</h3>
                <p className="text-sm text-zinc-200 leading-relaxed">{aiResult.reasoning}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NaverProductPageWrapper() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    }>
      <NaverProductPage />
    </Suspense>
  );
}
