'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, ChevronRight, User, Star } from 'lucide-react';

interface Gundam {
  id: string;
  name: string;
  full_name: string | null;
  pilot: string | null;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
}

interface Series {
  id: string;
  name: string;
  short_name: string;
  description: string;
  year: number;
}

export default function SeriesPage() {
  const params = useParams();
  const seriesId = params.seriesId as string;

  const [series,  setSeries]  = useState<Series | null>(null);
  const [gundams, setGundams] = useState<Gundam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gundam?type=list&series=${seriesId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) { setSeries(data.series); setGundams(data.gundams ?? []); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [seriesId]);

  const featured  = gundams.filter(g => g.is_featured);
  const rest      = gundams.filter(g => !g.is_featured);

  return (
    <div className="p-6 lg:p-10 w-full max-w-6xl mx-auto">
      {/* 네비 */}
      <div className="mb-8">
        <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> 전체 시리즈
        </Link>
        {series && (
          <div>
            <p className="text-xs text-zinc-500 mb-1">{series.year}년</p>
            <h1 className="text-3xl font-bold text-white mb-2">{series.short_name}</h1>
            <p className="text-sm text-zinc-400 max-w-2xl">{series.description}</p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <>
          {/* 주요 기체 */}
          {featured.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-brand-500" /> 주요 기체
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featured.map(g => (
                  <GundamCard key={g.id} gundam={g} featured />
                ))}
              </div>
            </div>
          )}

          {/* 전체 기체 */}
          {rest.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                전체 기체 목록
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map(g => (
                  <GundamCard key={g.id} gundam={g} />
                ))}
              </div>
            </div>
          )}

          {gundams.length === 0 && (
            <div className="text-center py-24 border border-dashed border-surface-border rounded-2xl">
              <p className="text-zinc-500 text-sm">등록된 기체가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function GundamCard({ gundam, featured }: { gundam: Gundam; featured?: boolean }) {
  return (
    <Link href={`/gundam/${gundam.id}`}
      className={`group bg-surface border border-surface-border rounded-xl overflow-hidden hover:border-brand-500/40 transition-all ${featured ? 'flex gap-4 p-4' : 'block p-4'}`}>
      {/* 이미지 */}
      <div className={`bg-surface-raised rounded-lg border border-surface-border flex items-center justify-center shrink-0 ${featured ? 'w-20 h-20' : 'w-full h-32 mb-3'}`}>
        {gundam.image_url
          ? <img src={gundam.image_url} alt={gundam.name} className="w-full h-full object-contain p-2" />
          : <User className="w-8 h-8 text-zinc-700" />}
      </div>

      {/* 정보 */}
      <div className="min-w-0 flex-1">
        {featured && gundam.is_featured && (
          <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">주역기</span>
        )}
        <h3 className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors truncate mt-0.5">
          {gundam.name}
        </h3>
        {gundam.pilot && (
          <p className="text-xs text-zinc-500 mt-0.5">파일럿: {gundam.pilot}</p>
        )}
        {gundam.description && (
          <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2 leading-relaxed">{gundam.description}</p>
        )}
        <div className="flex items-center text-xs text-zinc-600 group-hover:text-brand-400 mt-2 transition-colors">
          <span>등급별 분석 보기</span>
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </div>
      </div>
    </Link>
  );
}
