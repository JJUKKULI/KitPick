'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp, Minus, Heart, Bookmark } from 'lucide-react';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { SentimentBar } from '@/components/ui/SentimentBar';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/components/ui/Toast';
import { useLikeStore } from '@/store/likeStore';
import type { Product } from '@/types';

interface DecisionCardProps {
  product: Product;
  index?: number;
}

export function DecisionCard({ product, index = 0 }: DecisionCardProps) {
  const { toggle: toggleWish, isWished } = useWishlistStore();
  const { user } = useAuthStore();
  const { toggle: toggleLike, isLiked } = useLikeStore();

  // localStorage 기반 상태는 클라이언트 마운트 후에만 읽어야 Hydration 에러 없음
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const wished = mounted && isWished(product.id);
  const liked  = mounted && isLiked(product.id);
  const priceDiff = product.price - product.previousPrice;
  const isPriceDown = priceDiff < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="h-full bg-surface border border-surface-border rounded-xl overflow-hidden transition-colors duration-300 group-hover:border-surface-border-light group-hover:bg-surface-raised flex flex-col">

        {/* 이미지 영역 */}
        <div className="h-40 w-full bg-gradient-to-br from-surface-raised to-surface-overlay relative flex items-center justify-center border-b border-surface-border">
          <div className="w-12 h-12 text-zinc-700" />

          {/* 결정 뱃지 */}
          <div className="absolute top-3 right-3">
            <DecisionBadge decision={product.decision} size="sm" />
          </div>

          {/* 좌측 버튼 그룹 */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {/* 하트 — 좋아요 (localStorage 유지) */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(product.id); }}
              className={`p-1.5 rounded-full border transition-all duration-200 ${
                liked
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-surface-overlay/60 border-surface-border text-zinc-500 hover:text-rose-400 hover:border-rose-500/30'
              }`}
              aria-label={liked ? '좋아요 취소' : '좋아요'}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
            </button>

            {/* 북마크 — 관심 목록 (localStorage 유지) */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.id, user?.id); toast(wished ? 'info' : 'success', wished ? '관심 목록에서 제거됐어요' : '관심 목록에 추가됐어요'); }}
              className={`p-1.5 rounded-full border transition-all duration-200 ${
                wished
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-400'
                  : 'bg-surface-overlay/60 border-surface-border text-zinc-500 hover:text-brand-400 hover:border-brand-500/30'
              }`}
              aria-label={wished ? '관심 목록 해제' : '관심 목록 추가'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${wished ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* 등급 */}
          <div className="absolute bottom-3 left-3 bg-surface-overlay/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border border-surface-border">
            {product.grade}
          </div>
        </div>

        {/* 콘텐츠 — Link로 감싸되 버튼은 e.stopPropagation으로 분리 */}
        <Link href={`/product/${product.id}`} className="flex flex-col flex-grow p-5">
          <div className="mb-1 text-xs text-zinc-500 font-medium tracking-wide uppercase">
            {product.series}
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 line-clamp-1 group-hover:text-brand-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            {priceDiff !== 0 && (
              <span className={`flex items-center text-sm font-medium mb-1 ${isPriceDown ? 'text-decision-buy' : 'text-brand-500'}`}>
                {isPriceDown ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                {Math.abs(priceDiff).toFixed(2)}
              </span>
            )}
            {priceDiff === 0 && (
              <span className="flex items-center text-sm font-medium mb-1 text-zinc-500">
                <Minus className="w-3 h-3 mr-1" /> 보합
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-400 line-clamp-2 mb-6 flex-grow">{product.reasoning}</p>

          <div className="mt-auto pt-4 border-t border-surface-border grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1.5">인기도</div>
              <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                <div className="h-full bg-zinc-300 rounded-full" style={{ width: `${product.popularity}%` }} />
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1.5">여론</div>
              <SentimentBar
                positive={product.sentiment.positive}
                neutral={product.sentiment.neutral}
                negative={product.sentiment.negative}
                showLabels={false}
                className="mt-0.5"
              />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
