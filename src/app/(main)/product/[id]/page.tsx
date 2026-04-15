'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, Sparkles, MessageSquare, TrendingUp,
  Calendar, Bookmark, Loader2, RefreshCw, ShoppingCart,
  Package, RotateCcw, TrendingDown, AlertCircle,
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
  stockStatus: string;
  reprintHistory: { date: string; note: string }[];
  mentionCount: number;
  sentiment: { positive: number; neutral: number; negative: number };
  priceHistory: { date: string; price: number }[];
  communityComments: { id: string; user: string; comment: string; sentiment: string; date: string }[];
}

interface AnalyzeResult {
  decision:   DecisionType;
  reasoning:  string;
  aiInsight:  string;
  confidence: number;
  buyTarget:  string;
  keyRisks:   string[];
}

const stockLabel: Record<string, { label: string; color: string }> = {
  in_stock:     { label: '재고 있음',   color: 'text-decision-buy' },
  low_stock:    { label: '재고 부족',   color: 'text-decision-wait' },
  out_of_stock: { label: '품절',        color: 'text-brand-400' },
  preorder:     { label: '예약 판매',   color: 'text-decision-watch' },
  unknown:      { label: '재고 미확인', color: 'text-zinc-500' },
};

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
      } catch { /* 폴백 */ }
      const mock = mockProducts.find(p => p.id === params.id) ?? mockProducts[0];
      setProduct({ ...mock, officialPrice: null, stockStatus: 'unknown', reprintHistory: [], mentionCount: 0 });
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
          productId:       product.id,
          name:            product.name,
          grade:           product.grade,
          series:          product.series,
          price:           product.price,
          previousPrice:   product.previousPrice,
          officialPrice:   product.officialPrice,
          priceHistory:    product.priceHistory,
          sentiment:       product.sentiment,
          popularity:      product.popularity,
          communityComments: product.communityComments,
          releaseDate:     product.releaseDate,
          stockStatus:     product.stockStatus,
          reprintHistory:  product.reprintHistory,
          mentionCount:    product.mentionCount,
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

  const officialPrice = product.officialPrice ?? product.previousPrice;
  const premiumRate   = officialPrice > 0
    ? (((product.price - officialPrice) / officialPrice) * 100).toFixed(1)
    : null;
  const isPremium    = premiumRate !== null && Number(premiumRate) > 5;
  const isDiscount   = premiumRate !== null && Number(premiumRate) < -3;

  const priceLabel = (p: number) => p >= 1000 ? `${p.toLocaleString('ko-KR')}원` : `$${p.toFixed(2)}`;
  const stock = stockLabel[product.stockStatus] ?? stockLabel.unknown;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      {/* 상단 네비 */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 피드로 돌아가기
        </Link>
        <button
          onClick={() => { toggle(product.id, user?.id); toast(wished ? 'info' : 'success', wished ? '관심 목록 해제' : '관심 목록 추가', product.name); }}
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
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="text-zinc-600 text-sm">이미지 준비 중</div>
            )}
            <div className="absolute top-3 left-3 bg-surface-overlay/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-surface-border">
              {product.grade}
            </div>
            <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-surface-overlay/90 border border-surface-border ${stock.color}`}>
              {stock.label}
            </div>
          </div>

          {/* 재판 이력 */}
          {product.reprintHistory.length > 0 && (
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
                <span className="ml-auto text-xs text-zinc-600">최근 7일 {product.mentionCount}건 언급</span>
              )}
            </h3>
            <div className="space-y-4">
              {product.communityComments.length > 0 ? (
                product.communityComments.map((c) => (
                  <div key={c.id} className="pb-4 border-b border-surface-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-zinc-300">{c.user}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          c.sentiment === 'positive' ? 'bg-decision-buy/10 text-decision-buy' :
                          c.sentiment === 'negative' ? 'bg-brand-500/10 text-brand-400' :
                          'bg-zinc-700/50 text-zinc-500'
                        }`}>
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
          {/* 헤더 */}
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-sm font-medium text-brand-400 uppercase tracking-wider">{product.series}</span>
              {product.releaseDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-sm text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(product.releaseDate).getFullYear()}년 출시
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <DecisionBadge decision={currentDecision} size="lg" />
              {aiResult && (
                <span className="text-xs text-zinc-500 bg-surface-raised px-2.5 py-1 rounded-full border border-surface-border">
                  AI 분석 · 신뢰도 {aiResult.confidence}%
                </span>
              )}
            </div>
          </div>

          {/* 핵심 가격 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* 현재가 */}
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium flex items-center gap-1">
                <ShoppingCart className="w-3 h-3" /> 현재 최저가
              </div>
              <div className="text-2xl font-bold text-white mb-1">{priceLabel(product.price)}</div>
              {premiumRate !== null && (
                <div className={`text-xs font-medium flex items-center gap-1 ${isPremium ? 'text-brand-400' : isDiscount ? 'text-decision-buy' : 'text-zinc-500'}`}>
                  {isPremium ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  정가 대비 {isPremium ? '+' : ''}{premiumRate}%
                </div>
              )}
            </div>

            {/* 정가 */}
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium flex items-center gap-1">
                <Package className="w-3 h-3" /> 공식 정가
              </div>
              <div className="text-2xl font-bold text-zinc-300 mb-1">{priceLabel(officialPrice)}</div>
              <div className="text-xs text-zinc-600">반다이 공식 희망소비자가</div>
            </div>

            {/* 관심도 */}
            <div className="bg-surface border border-surface-border rounded-xl p-4 col-span-2 md:col-span-1">
              <div className="text-xs text-zinc-500 mb-2 font-medium">커뮤니티 관심도</div>
              <HypeScore score={product.popularity} label="" />
              {product.mentionCount > 0 && (
                <div className="text-xs text-zinc-600 mt-1">최근 7일 {product.mentionCount}건 언급</div>
              )}
            </div>
          </div>

          {/* 여론 분포 */}
          <div className="bg-surface border border-surface-border rounded-xl p-5">
            <div className="text-xs text-zinc-500 mb-3 font-medium">커뮤니티 여론 분포</div>
            <SentimentBar
              positive={product.sentiment.positive}
              neutral={product.sentiment.neutral}
              negative={product.sentiment.negative}
            />
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
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-60 bg-brand-500/10 border-brand-500/30 text-brand-400 hover:bg-brand-500/20"
              >
                {analyzing
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />분석 중...</>
                  : <><RefreshCw className="w-3.5 h-3.5" />{aiResult ? '재분석' : 'AI 분석'}</>}
              </button>
            </div>
            {analyzing ? (
              <div className="flex items-center gap-3 py-4">
                <Loader2 className="w-5 h-5 text-brand-400 animate-spin shrink-0" />
                <div>
                  <p className="text-sm text-zinc-300">실 가격 데이터 기반 GPT-4o-mini 분석 중...</p>
                  <p className="text-xs text-zinc-600 mt-0.5">네이버 쇼핑 가격 + 커뮤니티 여론 종합</p>
                </div>
              </div>
            ) : (
              <p className="text-zinc-300 leading-relaxed text-sm">{currentInsight}</p>
            )}
            {/* AI 분석 추가 정보 */}
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
                    <div>
                      <span className="text-zinc-400">주요 리스크: </span>
                      <span className="text-zinc-400">{aiResult.keyRisks.join(' · ')}</span>
                    </div>
                  </div>
                )}
                <p className="text-[11px] text-zinc-600">GPT-4o-mini · 신뢰도 {aiResult.confidence}%</p>
              </div>
            )}
          </div>

          {/* 가격 추이 차트 */}
          {product.priceHistory.length > 0 && (
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-zinc-400" />
                  가격 추이
                  <span className="text-xs text-zinc-600 font-normal">({product.priceHistory.length}일)</span>
                </h3>
                <div className="flex items-center gap-3 text-xs text-zinc-600">
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
