'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Activity, Radar, Loader2, Zap, RefreshCw } from 'lucide-react';
import { HypeScore } from '@/components/ui/HypeScore';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import type { DecisionType } from '@/types';

interface GradeItem {
  id: string;
  grade: string;
  decision: DecisionType;
  official_price: number | null;
  current_price: number | null;
  popularity: number;
  release_date: string | null;
  reprint_history?: { date: string; note: string }[] | null;
  gundams: {
    id: string;
    name: string;
    image_url: string | null;
    gundam_series: { short_name: string } | null;
  } | null;
}

interface TrendStats {
  totalTracked: number;
  buySignals: number;
  avgHypeScore: number;
  reprintsDetected: number;
}

export default function TrendsPage() {
  const [grades,  setGrades]   = useState<GradeItem[]>([]);
  const [stats,   setStats]    = useState<TrendStats>({ totalTracked: 0, buySignals: 0, avgHypeScore: 0, reprintsDetected: 0 });
  const [loading, setLoading]  = useState(true);
  const [useReal, setUseReal]  = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/gundam?type=grades&limit=500');
        if (res.ok) {
          const { grades: data } = await res.json() as { grades: GradeItem[] };
          if (data && data.length > 0) {
            setGrades(data);
            setUseReal(true);
            setStats({
              totalTracked:     data.length,
              buySignals:       data.filter(g => g.decision === 'buy').length,
              avgHypeScore:     Math.round(data.reduce((s, g) => s + (g.popularity ?? 0), 0) / data.length),
              reprintsDetected: data.filter(g => (g.reprint_history?.length ?? 0) > 1).length,
            });
            return;
          }
        }
      } catch { /* 폴백 */ }
      // mockData 폴백
      setStats({ totalTracked: 220, buySignals: 12, avgHypeScore: 65, reprintsDetected: 8 });
      setLoading(false);
    }
    load().finally(() => setLoading(false));
  }, []);

  // 상대 관심도: 전체 등급 중 순위 백분위(0~100) — 로그 스케일 원점수가 70~80대로 몰리는 문제 보정
  const sortedPop = grades.map(g => g.popularity ?? 0).sort((a, b) => a - b);
  const relScore = (p: number) => {
    if (sortedPop.length < 2) return p;
    let lo = 0; while (lo < sortedPop.length && sortedPop[lo] < p) lo++;
    return Math.round((lo / (sortedPop.length - 1)) * 100);
  };

  // 출시 레이더: buy + watch 등급
  const releaseRadar = grades
    .filter(g => g.decision === 'buy' || g.decision === 'watch')
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, 6);

  // 재판 신호: trending + wait 등급
  const reprintSignals = grades
    .filter(g => g.decision === 'trending' || g.decision === 'wait')
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, 6);

  // 트렌딩: popularity 상위
  const trending = grades
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, 8);

  const statCards = [
    { label: '추적 중인 등급',   value: stats.totalTracked,     icon: Activity,   color: 'text-blue-400'         },
    { label: '구매 신호',        value: stats.buySignals,       icon: TrendingUp, color: 'text-decision-buy'    },
    { label: '평균 관심도',      value: stats.avgHypeScore,     icon: Zap,        color: 'text-brand-400'        },
    { label: '재판 이력 보유',        value: stats.reprintsDetected, icon: Radar,      color: 'text-purple-400'       },
  ];

  return (
    <div className="p-6 lg:p-10 w-full pb-24 md:pb-10">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-brand-500" />
          <h1 className="text-3xl font-bold text-white">트렌드 대시보드</h1>
          {useReal && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-decision-buy/10 border border-decision-buy/20 text-decision-buy font-medium">실데이터</span>
          )}
        </div>
        <p className="text-zinc-400">시장 전체 흐름과 출시·재판 예정 신호.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-surface border border-surface-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-zinc-500">{stat.label}</span>
            </div>
            {loading
              ? <div className="h-7 w-12 bg-surface-raised rounded animate-pulse" />
              : <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            }
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-400 mr-3" />
          <span className="text-sm text-zinc-400">데이터 로딩 중...</span>
        </div>
      ) : (
        <div className="space-y-10">
          {/* 🔥 트렌딩 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-brand-500" />
              <h2 className="text-lg font-bold text-white">관심도 TOP 8</h2>
              <span className="text-xs text-zinc-600">— 점수는 전체 등급 중 상대 순위(0~100)</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {trending.map((g, i) => (
                <a key={g.id} href={`/gundam/${g.gundams?.id}/${g.id}`}
                  className="bg-surface border border-surface-border rounded-xl p-4 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-[10px] text-zinc-600">{(g.gundams?.gundam_series as any)?.short_name ?? ''}</p>
                      <p className="text-sm font-bold text-white truncate">{g.gundams?.name ?? ''}</p>
                      <p className="text-xs text-zinc-500">{g.grade}</p>
                    </div>
                    <span className="text-xs font-bold text-zinc-600 shrink-0">#{i + 1}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <HypeScore score={relScore(g.popularity ?? 0)} size="sm" />
                    <DecisionBadge decision={g.decision} size="sm" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* 출시 레이더 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Radar className="w-4 h-4 text-decision-buy" />
              <h2 className="text-lg font-bold text-white">출시 레이더</h2>
              <span className="text-xs text-zinc-600">— 구매/지켜보기 신호 등급</span>
            </div>
            {releaseRadar.length === 0 ? (
              <p className="text-zinc-600 text-sm">데이터 수집 중...</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {releaseRadar.map((g) => (
                  <a key={g.id} href={`/gundam/${g.gundams?.id}/${g.id}`}
                    className="bg-surface border border-surface-border rounded-xl p-4 hover:border-decision-buy/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-white truncate">{g.gundams?.name} {g.grade}</p>
                      <DecisionBadge decision={g.decision} size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{g.release_date ? new Date(g.release_date).toLocaleDateString('ko-KR') : '출시 예정'}</span>
                      {g.current_price && <span className="text-decision-buy font-medium">{g.current_price.toLocaleString()}원</span>}
                    </div>
                    <div className="mt-2">
                      <HypeScore score={relScore(g.popularity ?? 0)} size="sm" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* 재판 신호 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="w-4 h-4 text-decision-wait" />
              <h2 className="text-lg font-bold text-white">주의 신호</h2>
              <span className="text-xs text-zinc-600">— 기다리세요·트렌딩 등급</span>
            </div>
            {reprintSignals.length === 0 ? (
              <p className="text-zinc-600 text-sm">데이터 수집 중...</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {reprintSignals.map((g) => (
                  <a key={g.id} href={`/gundam/${g.gundams?.id}/${g.id}`}
                    className="bg-surface border border-surface-border rounded-xl p-4 hover:border-decision-wait/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-white truncate">{g.gundams?.name} {g.grade}</p>
                      <DecisionBadge decision={g.decision} size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">{(g.gundams?.gundam_series as any)?.short_name ?? ''}</span>
                      <span className={`font-medium ${g.decision === 'trending' ? 'text-decision-trending' : 'text-decision-wait'}`}>
                        {g.decision === 'trending' ? '관심 급상승' : '프리미엄 높음'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <HypeScore score={relScore(g.popularity ?? 0)} size="sm" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
