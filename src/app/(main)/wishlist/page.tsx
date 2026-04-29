'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Loader2, TrendingDown, ExternalLink, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import type { DecisionType } from '@/types';

interface WishGrade {
  id: string;
  grade: string;
  scale: string | null;
  official_price: number | null;
  current_price: number | null;
  decision: DecisionType;
  reasoning: string | null;
  popularity: number;
  stock_status: string;
  sentiment_positive: number;
  sentiment_neutral: number;
  sentiment_negative: number;
  gundams: {
    id: string;
    name: string;
    full_name: string | null;
    image_url: string | null;
    gundam_series: { short_name: string } | null;
  } | null;
}

function priceLabel(p: number | null) {
  return p ? `${p.toLocaleString('ko-KR')}원` : null;
}

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlistStore();
  const { user } = useAuthStore();
  const [grades, setGrades]   = useState<WishGrade[]>([]);
  const [loading, setLoading] = useState(true);

  // wishlist ID 목록으로 등급 상세 조회
  useEffect(() => {
    if (wishlist.length === 0) { setGrades([]); setLoading(false); return; }
    setLoading(true);
    fetch(`/api/wishlist/grades?ids=${wishlist.join(',')}`)
      .then(r => r.ok ? r.json() : { grades: [] })
      .then(({ grades: data }) => setGrades(data ?? []))
      .catch(() => setGrades([]))
      .finally(() => setLoading(false));
  }, [wishlist.join(',')]);

  if (!user) {
    return (
      <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full">
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
    <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full pb-24 md:pb-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark className="w-5 h-5 text-brand-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">관심 목록</h1>
        </div>
        <p className="text-sm text-zinc-400">
          {loading ? '불러오는 중...' : grades.length > 0
            ? `${grades.length}개의 등급 제품을 관심 목록에 담았습니다`
            : '아직 관심 목록이 비어있습니다'}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-500 mr-3" />
          <span className="text-sm text-zinc-400">관심 목록 불러오는 중...</span>
        </div>
      ) : grades.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          <Bookmark className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm text-zinc-400">관심 목록이 비어있습니다</p>
          <p className="text-xs text-zinc-600 mt-1">기체 상세 페이지에서 ♡ 버튼으로 추가하세요</p>
          <Link href="/feed" className="mt-4 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-sm font-medium transition-colors">
            피드 둘러보기
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {grades.map((grade) => {
            const gundam = grade.gundams;
            const series = (gundam?.gundam_series as any)?.short_name ?? '';
            return (
              <div key={grade.id} className="bg-surface border border-surface-border rounded-2xl overflow-hidden hover:border-zinc-700 transition-all group">
                <div className="p-5">
                  {/* 상단: 시리즈·기체명·등급 */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-xs text-brand-400 mb-0.5">{series}</p>
                      <p className="text-sm font-bold text-white truncate">{gundam?.name ?? '기체명 없음'}</p>
                      <p className="text-xs text-zinc-500">{grade.grade} {grade.scale ? `· ${grade.scale}` : ''}</p>
                    </div>
                    <DecisionBadge decision={grade.decision} className="shrink-0" />
                  </div>

                  {/* 가격 */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    {grade.official_price && (
                      <div>
                        <p className="text-[10px] text-zinc-600">반다이 정가</p>
                        <p className="text-zinc-400">{priceLabel(grade.official_price)}</p>
                      </div>
                    )}
                    {grade.current_price && (
                      <div>
                        <p className="text-[10px] text-zinc-600 flex items-center gap-0.5">
                          <TrendingDown className="w-2.5 h-2.5 text-decision-buy" />현재 최저가
                        </p>
                        <p className="font-bold text-decision-buy">{priceLabel(grade.current_price)}</p>
                      </div>
                    )}
                  </div>

                  {/* 버튼 */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/gundam/${gundam?.id}/${grade.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brand-500/10 border border-brand-500/30 text-xs font-medium text-brand-400 hover:bg-brand-500/20 transition-colors"
                    >
                      AI 분석 보기 <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => toggle(grade.id, user?.id)}
                      className="px-3 py-2 rounded-lg bg-surface-raised border border-surface-border text-xs text-zinc-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
                    >
                      해제
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
