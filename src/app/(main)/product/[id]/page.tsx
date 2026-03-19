'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Sparkles, MessageSquare,
  TrendingUp, Calendar, Bookmark
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { PriceTrendChart } from '@/components/ui/PriceTrendChart';
import { SentimentBar } from '@/components/ui/SentimentBar';
import { HypeScore } from '@/components/ui/HypeScore';
import { useWishlistStore } from '@/store/wishlistStore';

export default function ProductDetailPage() {
  const params = useParams();
  const { toggle, isWished } = useWishlistStore();

  const product = mockProducts.find((p) => p.id === params.id) ?? mockProducts[0];
  const wished = isWished(product.id);
  const priceDiff = product.price - product.previousPrice;
  const priceDiffPercent = ((priceDiff / product.previousPrice) * 100).toFixed(1);

  function handleWish() {
    toggle(product.id);
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">

      {/* 상단 네비 */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 피드로 돌아가기
        </Link>

        {/* 북마크 버튼 — 좌측 상단 (헤더 우측) */}
        <button
          onClick={handleWish}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            wished
              ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
              : 'bg-surface-raised border-surface-border text-zinc-400 hover:text-brand-400 hover:border-brand-500/30'
          }`}
          aria-label={wished ? '관심 목록 해제' : '관심 목록 추가'}
        >
          <Bookmark className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
          {wished ? '관심 목록 해제' : '관심 목록 추가'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
        {/* 왼쪽: 이미지 & 커뮤니티 */}
        <div className="space-y-6">
          {/* 이미지 플레이스홀더 */}
          <div className="aspect-[3/4] w-full bg-gradient-to-br from-surface-raised to-surface-overlay rounded-2xl border border-surface-border flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="w-24 h-24 text-zinc-700 mb-4" />
            <div className="text-zinc-600 font-medium tracking-widest uppercase text-sm">제품 이미지</div>
            <div className="absolute top-4 left-4 bg-surface-overlay/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-surface-border">
              {product.grade}
            </div>
          </div>

          {/* 커뮤니티 의견 */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-zinc-400" /> 커뮤니티 주요 의견
            </h3>
            <div className="space-y-4">
              {product.communityComments.length > 0 ? (
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

        {/* 오른쪽: 데이터 & 인사이트 */}
        <div className="space-y-8">
          {/* 헤더 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-brand-400 uppercase tracking-wider">{product.series}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-sm text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {new Date(product.releaseDate).getFullYear()}년 출시
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">{product.name}</h1>
            <DecisionBadge decision={product.decision} size="lg" />
          </div>

          {/* 핵심 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">현재 가격</div>
              <div className="text-2xl font-bold text-white mb-1">${product.price.toFixed(2)}</div>
              <div className={`text-xs font-medium ${priceDiff <= 0 ? 'text-decision-buy' : 'text-brand-500'}`}>
                {priceDiff <= 0 ? '' : '+'}{priceDiffPercent}% vs 평균
              </div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">커뮤니티 관심도</div>
              <div className="mt-2">
                <HypeScore score={product.popularity} label="" />
              </div>
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

          {/* AI 인사이트 */}
          <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />
            <h3 className="text-sm font-semibold text-brand-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI 시장 인사이트
            </h3>
            <p className="text-zinc-300 leading-relaxed">{product.aiInsight}</p>
          </div>

          {/* 가격 추이 */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-zinc-400" /> 6개월 가격 추이
              </h3>
              <span className="text-xs text-zinc-500 bg-surface-raised px-2 py-1 rounded">USD</span>
            </div>
            <PriceTrendChart data={product.priceHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
