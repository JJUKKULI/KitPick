'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Loader2, ChevronRight } from 'lucide-react';

interface Series {
  id: string;
  name: string;
  short_name: string;
  description: string;
  year: number;
  image_url: string | null;
  gundam_count: number;
  display_order: number;
}

const SERIES_COLORS = [
  'from-blue-600/30 to-blue-900/10 border-blue-500/20',
  'from-violet-600/30 to-violet-900/10 border-violet-500/20',
  'from-red-600/30 to-red-900/10 border-red-500/20',
  'from-sky-600/30 to-sky-900/10 border-sky-500/20',
  'from-orange-600/30 to-orange-900/10 border-orange-500/20',
  'from-rose-600/30 to-rose-900/10 border-rose-500/20',
  'from-indigo-600/30 to-indigo-900/10 border-indigo-500/20',
  'from-teal-600/30 to-teal-900/10 border-teal-500/20',
  'from-amber-600/30 to-amber-900/10 border-amber-500/20',
  'from-brand-500/30 to-brand-900/10 border-brand-500/20',
];

export default function FeedPage() {
  const [series,  setSeries]  = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gundam?type=series')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.series) setSeries(data.series); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 lg:p-10 w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-brand-500" />
          <h1 className="text-3xl font-bold text-white">구매 결정 피드</h1>
        </div>
        <p className="text-zinc-400 text-sm">시리즈별 건담을 탐색하고 AI 구매 분석을 확인하세요.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {series.map((s, i) => (
            <Link
              key={s.id}
              href={`/feed/${s.id}`}
              className={`group relative bg-gradient-to-br ${SERIES_COLORS[i % SERIES_COLORS.length]} border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 overflow-hidden`}
            >
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-zinc-400 mb-1">{s.year}년</p>
                    <h2 className="text-xl font-bold text-white leading-tight">{s.short_name}</h2>
                  </div>
                  <div className="flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-full text-xs text-zinc-300 shrink-0">
                    {s.gundam_count}기체
                  </div>
                </div>

                <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                  {s.description}
                </p>

                <div className="flex items-center text-xs text-zinc-300 group-hover:text-white transition-colors">
                  <span>건담 목록 보기</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
