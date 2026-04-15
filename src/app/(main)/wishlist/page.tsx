'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/data/mockData';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { DecisionCard } from '@/components/product/DecisionCard';
import type { Product } from '@/types';

export default function WishlistPage() {
  const { wishlist } = useWishlistStore();
  const { user } = useAuthStore();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase 실데이터 로드 → 없으면 mockData 폴백
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?limit=100');
        if (res.ok) {
          const { products } = await res.json();
          if (products?.length > 0) {
            setAllProducts(products);
            return;
          }
        }
      } catch { /* 폴백 */ }
      setAllProducts(mockProducts);
    }
    load().finally(() => setLoading(false));
  }, []);

  // wishlist ID 목록으로 제품 필터링
  const wishedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          <Bookmark className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-400 mb-1">로그인이 필요합니다</p>
          <p className="text-xs text-zinc-600 mb-4">관심 목록을 보려면 로그인해주세요</p>
          <Link href="/login"
            className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-sm font-medium transition-colors">
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark className="w-5 h-5 text-brand-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">관심 목록</h1>
        </div>
        <p className="text-sm text-zinc-400">
          {loading
            ? '불러오는 중...'
            : wishedProducts.length > 0
              ? `${wishedProducts.length}개의 키트를 관심 목록에 담았습니다`
              : '아직 관심 목록이 비어있습니다'}
        </p>
      </div>

      {/* 로딩 */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-500 mr-3" />
          <span className="text-sm text-zinc-400">관심 목록 불러오는 중...</span>
        </div>
      ) : wishedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishedProducts.map((product, i) => (
            <DecisionCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          {/* 북마크 아이콘 (관심목록 = 북마크) */}
          <Bookmark className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-400 mb-1">관심 목록이 비어있습니다</p>
          <p className="text-xs text-zinc-600 mb-4">피드에서 마음에 드는 키트를 찜해보세요</p>
          <Link href="/feed"
            className="px-4 py-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors">
            피드 보러가기
          </Link>
        </div>
      )}
    </div>
  );
}
