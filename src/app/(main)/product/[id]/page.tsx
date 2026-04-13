'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, Sparkles, MessageSquare,
  TrendingUp, Calendar, Bookmark, Loader2, RefreshCw,
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { PriceTrendChart } from '@/components/ui/PriceTrendChart';
import { SentimentBar } from '@/components/ui/SentimentBar';
import { HypeScore } from '@/components/ui/HypeScore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/components/ui/Toast';
import type { DecisionType, Product } from '@/types';

interface AnalyzeResult {
  decision: DecisionType;
  reasoning: string;
  aiInsight: string;
  confidence: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const { toggle, isWished } = useWishlistStore();
  const { user } = useAuthStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState<AnalyzeResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Supabase 우선, 없으면 mockData 폴백
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
      setProduct(mock);
    }
    load().finally(() => setLoading(false));
  }, [params.id]);

  const wished = product ? isWished(product.id) : false;

  const currentDecision  = aiResult?.decision  ?? product?.decision  ?? 'watch';
  const currentReasoning = aiResult?.reasoning ?? product?.reasoning ?? '';
  const currentInsight   = aiResult?.aiInsight  ?? product?.aiInsight ?? '';

  async function handleAnalyze() {
    if (!product || analyzing) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId:         product.id,
          name:              product.name,
          grade:             product.grade,
          series:            product.series,
          price:             product.price,
          previousPrice:     product.previousPrice,
          priceHistory:      product.priceHistory,
          sentiment:         product.sentiment,
          popularity:        product.popularity,
          communityComments: product.communityComments,
          releaseDate:       product.releaseDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast('error', 'AI 분석 실패', data.error); return; }
      setAiResult(data);
      toast('success', 'AI 분석 완료!', `${data.decision.toUpperCase()} · 신뢰도 ${data.confidence}%`);
    } catch { toast('error', '네트워크 오류', '잠시 후 다시 시도해주세요.'); }
    finally { setAnalyzing(false); }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }
  if (!product) return <div className="p-10 text-zinc-500">제품을 찾을 수 없습니다.</div>;

  const priceDiff = product.price - product.previousPrice;
  const priceDiffPercent = ((priceDiff / product.previousPrice) * 100).toFixed(1);

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 피드로 돌아가기
        </Link>
        <button
          onClick={() => toggle(product.id, user?.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            wished
              ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
              : 'bg-surface-raised border-surface-border text-zinc-400 hover:text-brand-400 hover:border-brand-500/30'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
          {wished ? '관심 목록 해제' : '관심 목록 추가'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
        <div className="space-y-6">
          <div className="aspect-[3/4] w-full bg-gradient-to-br from-surface-raised to-surface-overlay rounded-2xl border border-surface-border flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="text-zinc-600 font-medium tracking-widest uppercase text-sm">제품 이미지</div>
            <div className="absolute top-4 left-4 bg-surface-overlay/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-surface-border">
              {product.grade}
            </div>
          </div>

          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-zinc-400" /> 커뮤니티 주요 의견
            </h3>
            <div className="space-y-4">
              {product.communityComments?.length > 0 ? (
                product.communityComments.map((comment) => (
                  <div key={comment.id} className="pb-4 border-b border-surface-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-zinc-300">{comment.user}</span>
                      <span className="text-[10px] text-zinc-500">{comment.date}</span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 italic">최근 댓글이 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
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
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">{product.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <DecisionBadge decision={currentDecision} size="lg" />
              {aiResult && (
                <span className="text-xs text-zinc-500 bg-surface-raised px-2.5 py-1 rounded-full border border-surface-border">
                  AI 분석 · 신뢰도 {aiResult.confidence}%
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">현재 가격</div>
              <div className="text-2xl font-bold text-white mb-1">
                {product.price >= 1000 ? `${product.price.toLocaleString()}원` : `$${product.price.toFixed(2)}`}
              </div>
              <div className={`text-xs font-medium ${priceDiff <= 0 ? 'text-decision-buy' : 'text-brand-500'}`}>
                {priceDiff <= 0 ? '' : '+'}{priceDiffPercent}% vs 평균
              </div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">커뮤니티 관심도</div>
              <div className="mt-2"><HypeScore score={product.popularity} label="" /></div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4 col-span-2 md:col-span-1">
              <div className="text-xs text-zinc-500 mb-3 font-medium">여론 분포</div>
              <SentimentBar
                positive={product.sentiment.positive}
                neutral={product.sentiment.neutral}
                negative={product.sentiment.negative}
              />
            </div>
          </div>

          {currentReasoning && (
            <div className="bg-surface border border-surface-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">구매 결정 요약</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{currentReasoning}</p>
            </div>
          )}

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
                <p className="text-sm text-zinc-300">GPT-4o-mini 분석 중...</p>
              </div>
            ) : (
              <p className="text-zinc-300 leading-relaxed text-sm">{currentInsight}</p>
            )}
            {aiResult && !analyzing && (
              <p className="text-[11px] text-zinc-600 mt-3 pt-3 border-t border-brand-500/10">
                OpenAI GPT-4o-mini · 신뢰도 {aiResult.confidence}%
              </p>
            )}
          </div>

          {product.priceHistory?.length > 0 && (
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-zinc-400" /> 6개월 가격 추이
                </h3>
                <span className="text-xs text-zinc-500 bg-surface-raised px-2 py-1 rounded">
                  {product.price >= 1000 ? 'KRW' : 'USD'}
                </span>
              </div>
              <PriceTrendChart data={product.priceHistory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
