'use client';

import { useEffect } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/data/mockData';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { DecisionCard } from '@/components/product/DecisionCard';

export default function WishlistPage() {
  const { user } = useAuthStore();
  const { wishlist, loading, hydrated, fetch } = useWishlistStore();

  // 로그인 상태면 Supabase에서 로드
  useEffect(() => {
    if (user) fetch(user.id);
  }, [user, fetch]);

  const wishedProducts = mockProducts.filter((p) => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="p-6 lg:p-10 w-full">
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          <Bookmark className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-400 mb-1">로그인이 필요합니다</p>
          <p className="text-xs text-zinc-600 mb-4">관심 목록을 보려면 로그인해주세요</p>
          <Link href="/login" className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-sm font-medium transition-colors">
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  if (loading && !hydrated) {
    return (
      <div className="p-6 lg:p-10 w-full">
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bookmark className="w-6 h-6 text-brand-500" />
          <h1 className="text-3xl font-bold text-white">관심 목록</h1>
        </div>
        <p className="text-sm text-zinc-400">
          {wishedProducts.length > 0
            ? `${wishedProducts.length}개의 키트를 관심 목록에 담았습니다`
            : '아직 관심 목록이 비어있습니다'}
        </p>
      </div>

      {wishedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishedProducts.map((product, i) => (
            <DecisionCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          <Heart className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-400 mb-1">관심 목록이 비어있습니다</p>
          <p className="text-xs text-zinc-600 mb-4">피드에서 마음에 드는 키트를 찜해보세요</p>
          <Link href="/feed" className="px-4 py-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors">
            피드 보러가기
          </Link>
        </div>
      )}
    </div>
  );
}
