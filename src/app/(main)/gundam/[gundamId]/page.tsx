'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Loader2, User, ChevronRight,
  ShoppingCart, TrendingUp, Package,
} from 'lucide-react';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import type { DecisionType } from '@/types';

interface Grade {
  id: string;
  grade: string;
  scale: string | null;
  official_price: number | null;
  current_price: number | null;
  decision: DecisionType;
  reasoning: string | null;
  stock_status: string;
  release_date: string | null;
  popularity: number;
}

interface Gundam {
  id: string;
  name: string;
  full_name: string | null;
  pilot: string | null;
  description: string | null;
  image_url: string | null;
  gundam_series: { name: string; short_name: string } | null;
}

const GRADE_BADGE: Record<string, string> = {
  SD:       'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  EG:       'bg-sky-500/20 text-sky-400 border-sky-500/30',
  HG:       'bg-blue-500/20 text-blue-400 border-blue-500/30',
  HGUC:     'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'HG (리빌드)': 'bg-blue-400/20 text-blue-300 border-blue-400/30',
  RG:       'bg-violet-500/20 text-violet-400 border-violet-500/30',
  MG:       'bg-brand-500/20 text-brand-400 border-brand-500/30',
  'MG Ver.Ka':'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'MG 1/100 Ver.Ka':'bg-orange-500/20 text-orange-400 border-orange-500/30',
  PG:       'bg-decision-buy/20 text-decision-buy border-decision-buy/30',
  NG:       'bg-zinc-600/40 text-zinc-400 border-zinc-500/30',
  LIMITED:  'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const STOCK_LABEL: Record<string, { label: string; color: string }> = {
  in_stock:     { label: '재고 있음',   color: 'text-decision-buy' },
  low_stock:    { label: '재고 부족',   color: 'text-decision-wait' },
  out_of_stock: { label: '품절',        color: 'text-brand-400' },
  preorder:     { label: '예약 판매',   color: 'text-decision-watch' },
  unknown:      { label: '미확인',      color: 'text-zinc-500' },
};

function priceLabel(p: number | null) {
  if (!p) return '-';
  return p >= 1000 ? `${p.toLocaleString('ko-KR')}원` : `$${p.toFixed(2)}`;
}

export default function GundamDetailPage() {
  const params   = useParams();
  const gundamId = params.gundamId as string;

  const [gundam,  setGundam]  = useState<Gundam | null>(null);
  const [grades,  setGrades]  = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gundam?type=detail&id=${gundamId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) { setGundam(data.gundam); setGrades(data.grades ?? []); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [gundamId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
    </div>
  );

  if (!gundam) return <div className="p-10 text-zinc-500">기체를 찾을 수 없습니다.</div>;

  const seriesName = (gundam.gundam_series as any)?.short_name ?? '건담';

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full">
      {/* 네비 */}
      <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> 시리즈 목록
      </Link>

      <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-10">
        {/* 이미지 */}
        <div>
          <div className="aspect-square w-full bg-surface border border-surface-border rounded-2xl overflow-hidden flex items-center justify-center mb-4">
            {gundam.image_url
              ? <img src={gundam.image_url} alt={gundam.name} className="w-full h-full object-contain p-6" />
              : <User className="w-16 h-16 text-zinc-700" />}
          </div>
          {/* 기체 스펙 */}
          <div className="bg-surface border border-surface-border rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">기체 정보</h3>
            {gundam.full_name && (
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">정식 명칭</span>
                <span className="text-zinc-300 text-right max-w-[60%]">{gundam.full_name}</span>
              </div>
            )}
            {gundam.pilot && (
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">파일럿</span>
                <span className="text-zinc-300">{gundam.pilot}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">시리즈</span>
              <span className="text-zinc-300">{seriesName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">등급 수</span>
              <span className="text-zinc-300">{grades.length}종</span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div>
          <p className="text-sm text-brand-400 uppercase tracking-wider font-medium mb-2">{seriesName}</p>
          <h1 className="text-4xl font-bold text-white mb-4">{gundam.name}</h1>
          {gundam.description && (
            <p className="text-zinc-300 leading-relaxed text-sm">{gundam.description}</p>
          )}
        </div>
      </div>

      {/* 등급별 제품 선택 */}
      <div>
        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Package className="w-5 h-5 text-brand-500" />
          등급별 제품 선택
        </h2>

        {grades.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-surface-border rounded-2xl">
            <p className="text-zinc-500 text-sm">등록된 등급 제품이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {grades.map(grade => {
              const stock = STOCK_LABEL[grade.stock_status] ?? STOCK_LABEL.unknown;
              const badgeClass = GRADE_BADGE[grade.grade] ?? 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30';

              return (
                <Link key={grade.id} href={`/gundam/${gundamId}/${grade.id}`}
                  className="group bg-surface border border-surface-border rounded-xl p-5 hover:border-brand-500/40 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    {/* 왼쪽: 등급 + 스케일 + 스탁 */}
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-full border shrink-0 ${badgeClass}`}>
                        {grade.grade}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {grade.scale && <span className="text-xs text-zinc-500">{grade.scale}</span>}
                          <span className={`text-xs font-medium ${stock.color}`}>{stock.label}</span>
                        </div>
                        {grade.reasoning && (
                          <p className="text-xs text-zinc-500 mt-1 truncate max-w-xs">{grade.reasoning}</p>
                        )}
                      </div>
                    </div>

                    {/* 오른쪽: 가격 + AI 결정 + 화살표 */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-white">
                          {priceLabel(grade.current_price ?? grade.official_price)}
                        </div>
                        {grade.official_price && grade.current_price && grade.current_price !== grade.official_price && (
                          <div className="text-[10px] text-zinc-600">
                            정가 {priceLabel(grade.official_price)}
                          </div>
                        )}
                      </div>
                      <DecisionBadge decision={grade.decision ?? 'watch'} size="sm" />
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
