'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, Sparkles, MessageSquare, TrendingUp,
  Calendar, Bookmark, Loader2, RefreshCw, ShoppingCart,
  Package, RotateCcw, TrendingDown, AlertCircle,
  ExternalLink, Search,
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { PriceTrendChart } from '@/components/ui/PriceTrendChart';
import { SentimentBar } from '@/components/ui/SentimentBar';
import { HypeScore } from '@/components/ui/HypeScore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/components/ui/Toast';
import type { DecisionType } from '@/types';

interface Product {
  id: string;
  name: string;
  series: string;
  grade: string;
  price: number;
  previousPrice: number;
  officialPrice: number | null;
  decision: DecisionType;
  reasoning: string;
  popularity: number;
  aiInsight: string;
  releaseDate: string;
  imageUrl: string | null;
  naverQuery?: string;
  stockStatus: string;
  reprintHistory: { date: string; note: string }[];
  mentionCount: number;
  sentiment: { positive: number; neutral: number; negative: number };
  priceHistory: { date: string; price: number }[];
  communityComments: { id: string; user: string; comment: string; sentiment: string; date: string }[];
}

interface AnalyzeResult {
  decision: DecisionType;
  reasoning: string;
  aiInsight: string;
  confidence: number;
  buyTarget: string;
  keyRisks: string[];
}

interface GradeResult {
  grade: { id: string; label: string; scale: string; badge?: string };
  found: boolean;
  price: number | null;
  mallName: string;
  link: string;
  image: string;
  title: string;
}

const STOCK_LABEL: Record<string, { label: string; color: string }> = {
  in_stock:     { label: '재고 있음',   color: 'text-decision-buy' },
  low_stock:    { label: '재고 부족',   color: 'text-decision-wait' },
  out_of_stock: { label: '품절',        color: 'text-brand-400' },
  preorder:     { label: '예약 판매',   color: 'text-decision-watch' },
  unknown:      { label: '재고 미확인', color: 'text-zinc-500' },
};

function priceLabel(p: number) {
  return p >= 1000 ? `${p.toLocaleString('ko-KR')}원` : `$${p.toFixed(2)}`;
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
    } catch { /* 조용히 */ }
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
          <button
            onClick={loadGrades}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500/10 border border-brand-500/30 text-brand-400 hover:bg-brand-500/20 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            가격 조회
          </button>
        ) : loading ? (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            조회 중... (최대 15초)
          </div>
        ) : (
          <button onClick={loadGrades} className="text-xs text-zinc-600 hover:text-zinc-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> 새로고침
          </button>
        )}
      </div>

      {!searched && (
        <div className="px-5 py-8 text-center">
          <ShoppingCart className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
          <p className="text-sm text-zinc-500">가격 조회 버튼을 눌러</p>
          <p className="text-sm text-zinc-500">등급별 최저가를 확인하세요</p>
        </div>
      )}

      {loading && (
        <div className="divide-y divide-surface-border animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-5 bg-surface-raised rounded-full" />
                <div className="w-16 h-3 bg-surface-raised rounded" />
              </div>
              <div className="w-20 h-4 bg-surface-raised rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && searched && grades.length > 0 && (
        <div className="divide-y divide-surface-border">
          {grades.map((item) => (
            <div key={item.grade.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-raised/30 transition-colors">
              {/* 등급 뱃지 + 스케일 */}
              <div className="flex items-center gap-3 min-w-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${item.grade.badge ?? 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30'}`}>
                  {item.grade.label}
                </span>
                <span className="text-xs text-zinc-600 hidden sm:block">{item.grade.scale}</span>
              </div>

              {/* 가격 또는 미조회 */}
              {item.found && item.price ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group shrink-0"
                >
                  <div className="text-right">
                    <div className="text-sm font-bold text-decision-buy group-hover:text-decision-buy/80 transition-colors">
                      {priceLabel(item.price)}
                    </div>
                    <div className="text-[10px] text-zinc-600">{item.mallName}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand-400 transition-colors shrink-0" />
                </a>
              ) : (
                <span className="text-xs text-zinc-600 shrink-0">조회되지 않습니다</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const { toggle, isWished } = useWishlistStore();
  const { user } = useAuthStore();

  const [product,   setProduct]   = useState<Product | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [aiResult,  setAiResult]  = useState<AnalyzeResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?id=${params.id}`);
        if (res.ok) {
          const { product: data } = await res.json();
          if (data) { setProduct(data); return; }
        }
      } catch {}
      const mock = mockProducts.find(p => p.id === params.id) ?? mockProducts[0];
      setProduct({ ...mock, imageUrl: (mock as any).imageUrl ?? null, officialPrice: null, stockStatus: 'unknown', reprintHistory: [], mentionCount: 0 });
    }
    load().finally(() => setLoading(false));
  }, [params.id]);

  const wished = mounted && product ? isWished(product.id) : false;
  const currentDecision  = aiResult?.decision  ?? product?.decision  ?? 'watch';
  const currentReasoning = aiResult?.reasoning ?? product?.reasoning ?? '';
  const currentInsight   = aiResult?.aiInsight  ?? product?.aiInsight  ?? '';

  async function handleAnalyze() {
    if (!product || analyzing) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id, name: product.name, grade: product.grade,
          series: product.series, price: product.price,
          previousPrice: product.previousPrice, officialPrice: (product as any).officialPrice,
          priceHistory: product.priceHistory, sentiment: product.sentiment,
          popularity: product.popularity, communityComments: product.communityComments,
          releaseDate: product.releaseDate, stockStatus: product.stockStatus,
          reprintHistory: product.reprintHistory, mentionCount: product.mentionCount,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast('error', 'AI 분석 실패', data.error); return; }
      setAiResult(data);
      toast('success', 'AI 분석 완료!', `${data.decision.toUpperCase()} · 신뢰도 ${data.confidence}%`);
    } catch { toast('error', '네트워크 오류'); }
    finally { setAnalyzing(false); }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
    </div>
  );
  if (!product) return <div className="p-10 text-zinc-500">제품을 찾을 수 없습니다.</div>;

  const officialPrice = (product as any).officialPrice ?? product.previousPrice;
  const premiumRate   = officialPrice > 0
    ? (((product.price - officialPrice) / officialPrice) * 100).toFixed(1)
    : null;
  const isPremium  = premiumRate !== null && Number(premiumRate) > 5;
  const isDiscount = premiumRate !== null && Number(premiumRate) < -3;
  const stock      = STOCK_LABEL[product.stockStatus] ?? STOCK_LABEL.unknown;

  // 건담 순수 이름 (등급 제거) — 등급별 검색에 사용
  const gundamBaseName = product.name
    .replace(/^(SD|HG|RG|MG|PG|HGUC|HGCE|EG|NG)\s+/i, '')
    .replace(/\s*Ver\.Ka\s*/i, '')
    .trim();

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">

      {/* 상단 네비 */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 피드로 돌아가기
        </Link>
        <button
          onClick={() => {
            toggle(product.id, user?.id);
            toast(wished ? 'info' : 'success', wished ? '관심 목록 해제' : '관심 목록 추가', product.name);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            wished
              ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
              : 'bg-surface-raised border-surface-border text-zinc-400 hover:text-brand-400'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
          {wished ? '관심 목록 해제' : '관심 목록 추가'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-10">

        {/* ── 왼쪽 ── */}
        <div className="space-y-6">
          {/* 제품 이미지 */}
          <div className="aspect-[3/4] w-full bg-gradient-to-br from-surface-raised to-surface-overlay rounded-2xl border border-surface-border relative overflow-hidden flex items-center justify-center">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-4"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            ) : (
              <Package className="w-16 h-16 text-zinc-700" />
            )}
            <div className="absolute top-3 left-3 bg-surface-overlay/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-surface-border">
              {product.grade}
            </div>
            <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-surface-overlay/90 border border-surface-border ${stock.color}`}>
              {stock.label}
            </div>
          </div>

          {/* 등급별 최저가 비교 */}
          <GradePriceTable gundamName={gundamBaseName} />

          {/* 재판 이력 */}
          {product.reprintHistory?.length > 0 && (
            <div className="bg-surface border border-surface-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-zinc-400" /> 재판 이력
              </h3>
              <div className="space-y-2">
                {product.reprintHistory.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{r.date}</span>
                    <span className="text-zinc-300">{r.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 커뮤니티 주요 의견 */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-zinc-400" /> 커뮤니티 주요 의견
              {product.mentionCount > 0 && (
                <span className="ml-auto text-xs text-zinc-600">최근 7일 {product.mentionCount}건</span>
              )}
            </h3>
            <div className="space-y-4">
              {product.communityComments?.length > 0 ? (
                product.communityComments.map(c => (
                  <div key={c.id} className="pb-4 border-b border-surface-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-zinc-300">{c.user}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          c.sentiment === 'positive' ? 'bg-decision-buy/10 text-decision-buy' :
                          c.sentiment === 'negative' ? 'bg-brand-500/10 text-brand-400' :
                          'bg-zinc-700/50 text-zinc-500'}`}>
                          {c.sentiment === 'positive' ? '긍정' : c.sentiment === 'negative' ? '부정' : '중립'}
                        </span>
                        <span className="text-[10px] text-zinc-600">{c.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{c.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-600 italic text-center py-4">커뮤니티 데이터 없음</p>
              )}
            </div>
          </div>
        </div>

        {/* ── 오른쪽 ── */}
        <div className="space-y-6">
          {/* 헤더 — 건담 순수 이름 강조 */}
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-sm font-medium text-brand-400 uppercase tracking-wider">{product.series}</span>
              {product.releaseDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-sm text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{new Date(product.releaseDate).getFullYear()}년 출시
                  </span>
                </>
              )}
            </div>
            {/* 건담 기본 이름 (등급 제거) */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">{gundamBaseName}</h1>
            {/* 현재 보고 있는 등급 */}
            <p className="text-sm text-zinc-500 mb-4">{product.grade} 기준 분석</p>
            <div className="flex items-center gap-3 flex-wrap">
              <DecisionBadge decision={currentDecision} size="lg" />
              {aiResult && (
                <span className="text-xs text-zinc-500 bg-surface-raised px-2.5 py-1 rounded-full border border-surface-border">
                  AI 분석 · 신뢰도 {aiResult.confidence}%
                </span>
              )}
            </div>
          </div>

          {/* 가격 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">현재 최저가 ({product.grade})</div>
              <div className="text-2xl font-bold text-white mb-1">{priceLabel(product.price)}</div>
              {premiumRate !== null && (
                <div className={`text-xs font-medium flex items-center gap-1 ${isPremium ? 'text-brand-400' : isDiscount ? 'text-decision-buy' : 'text-zinc-500'}`}>
                  {isPremium ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  정가 대비 {isPremium ? '+' : ''}{premiumRate}%
                </div>
              )}
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">공식 정가</div>
              <div className="text-2xl font-bold text-zinc-300 mb-1">{priceLabel(officialPrice)}</div>
              <div className="text-xs text-zinc-600">반다이 희망소비자가</div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4 col-span-2 md:col-span-1">
              <div className="text-xs text-zinc-500 mb-2 font-medium">커뮤니티 관심도</div>
              <HypeScore score={product.popularity} label="" />
              {product.mentionCount > 0 && (
                <div className="text-xs text-zinc-600 mt-1">최근 7일 {product.mentionCount}건</div>
              )}
            </div>
          </div>

          {/* 여론 */}
          <div className="bg-surface border border-surface-border rounded-xl p-5">
            <div className="text-xs text-zinc-500 mb-3 font-medium">커뮤니티 여론 분포</div>
            <SentimentBar positive={product.sentiment.positive} neutral={product.sentiment.neutral} negative={product.sentiment.negative} />
            <div className="flex justify-between mt-2 text-xs text-zinc-600">
              <span>긍정 {product.sentiment.positive}%</span>
              <span>중립 {product.sentiment.neutral}%</span>
              <span>부정 {product.sentiment.negative}%</span>
            </div>
          </div>

          {/* 구매 결정 요약 */}
          {currentReasoning && (
            <div className="bg-surface border border-surface-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">구매 결정 요약</h3>
              <p className="text-sm text-zinc-200 leading-relaxed">{currentReasoning}</p>
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
                <p className="text-sm text-zinc-300">GPT-4o-mini 분석 중...</p>
              </div>
            ) : (
              <p className="text-zinc-300 leading-relaxed text-sm">{currentInsight}</p>
            )}
            {aiResult && !analyzing && (
              <div className="mt-4 pt-4 border-t border-brand-500/10 space-y-2">
                {aiResult.buyTarget && (
                  <div className="flex items-center gap-2 text-xs">
                    <ShoppingCart className="w-3.5 h-3.5 text-decision-buy" />
                    <span className="text-zinc-400">목표 구매가:</span>
                    <span className="text-decision-buy font-medium">{aiResult.buyTarget}</span>
                  </div>
                )}
                {aiResult.keyRisks?.length > 0 && (
                  <div className="flex items-start gap-2 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-500">{aiResult.keyRisks.join(' · ')}</span>
                  </div>
                )}
                <p className="text-[11px] text-zinc-600">GPT-4o-mini · 신뢰도 {aiResult.confidence}%</p>
              </div>
            )}
          </div>

          {/* 가격 추이 */}
          {product.priceHistory?.length > 0 && (
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-zinc-400" />
                  가격 추이 ({product.grade})
                  <span className="text-xs text-zinc-600 font-normal">({product.priceHistory.length}일)</span>
                </h3>
                <div className="flex gap-3 text-xs text-zinc-600">
                  <span>최저 {priceLabel(Math.min(...product.priceHistory.map(h => h.price)))}</span>
                  <span>최고 {priceLabel(Math.max(...product.priceHistory.map(h => h.price)))}</span>
                </div>
              </div>
              <PriceTrendChart data={product.priceHistory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
