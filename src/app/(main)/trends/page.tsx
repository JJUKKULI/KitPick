'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Activity, AlertTriangle, Radar, Loader2 } from 'lucide-react';
import { mockTrends } from '@/data/mockData';
import { HypeScore } from '@/components/ui/HypeScore';
import type { Product } from '@/types';

interface TrendStats {
  totalTracked: number;
  buySignals: number;
  avgHypeScore: number;
  reprintsDetected: number;
}

export default function TrendsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<TrendStats>(mockTrends.stats);
  const [loading, setLoading] = useState(true);
  const [useReal, setUseReal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products?limit=50');
        if (res.ok) {
          const { products: data } = await res.json();
          if (data && data.length > 0) {
            setProducts(data);
            setUseReal(true);
            // 실데이터 기반 통계 계산
            setStats({
              totalTracked:    data.length,
              buySignals:      data.filter((p: Product) => p.decision === 'buy').length,
              avgHypeScore:    Math.round(data.reduce((s: number, p: Product) => s + p.popularity, 0) / data.length),
              reprintsDetected: data.filter((p: Product) => p.decision === 'wait' || p.decision === 'trending').length,
            });
            return;
          }
        }
      } catch { /* 폴백 */ }
      setStats(mockTrends.stats);
      setLoading(false);
    }
    load().finally(() => setLoading(false));
  }, []);

  // 출시 레이더: 최근 발매 or watch 제품
  const releaseRadar = products.length > 0
    ? products
        .filter(p => p.decision === 'watch' || p.decision === 'buy')
        .slice(0, 4)
        .map(p => ({ id: p.id, name: p.name, date: p.releaseDate ? `${new Date(p.releaseDate).getFullYear()}년 출시` : '출시 예정', hype: p.popularity }))
    : mockTrends.releaseRadar;

  // 재판 신호: trending or wait 제품
  const reprintSignals = products.length > 0
    ? products
        .filter(p => p.decision === 'trending' || p.decision === 'wait')
        .slice(0, 4)
        .map(p => ({
          id: p.id,
          name: p.name,
          confidence: p.popularity,
          timeframe: p.decision === 'wait' ? '재판 임박' : '관심 급상승',
        }))
    : mockTrends.reprintSignals;

  const statCards = [
    { label: '추적 중인 키트',  value: stats.totalTracked.toLocaleString(), icon: Activity,     color: 'text-blue-400' },
    { label: '구매 신호 (7일)', value: stats.buySignals,                    icon: TrendingUp,   color: 'text-decision-buy' },
    { label: '평균 관심도',     value: stats.avgHypeScore,                  icon: Activity,     color: 'text-brand-400' },
    { label: '재판 감지',       value: stats.reprintsDetected,              icon: Radar,        color: 'text-purple-400' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-8 flex items-center gap-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">트렌드 대시보드</h1>
            {useReal && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-decision-buy/10 border border-decision-buy/20 text-decision-buy font-medium">
                실데이터
              </span>
            )}
          </div>
          <p className="text-zinc-400">시장 전체 흐름과 출시·재판 예정 신호.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-400 mr-3" />
          <span className="text-sm text-zinc-400">데이터 로드 중...</span>
        </div>
      ) : (
        <>
          {/* 통계 카드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-surface border border-surface-border rounded-xl p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-zinc-400">{stat.label}</div>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 출시 레이더 */}
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Radar className="w-5 h-5 text-brand-500" /> 출시 레이더
                </h2>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">예정</span>
              </div>
              <div className="space-y-4">
                {releaseRadar.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-surface-raised rounded-lg border border-surface-border-light">
                    <div>
                      <div className="font-medium text-white mb-1 text-sm">{item.name}</div>
                      <div className="text-xs text-zinc-400">{item.date}</div>
                    </div>
                    <HypeScore score={item.hype} label="" />
                  </div>
                ))}
                {releaseRadar.length === 0 && <p className="text-sm text-zinc-600 text-center py-4">데이터 없음</p>}
              </div>
            </div>

            {/* 재판 신호 */}
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-brand-500" /> 재판 신호
                </h2>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">감지됨</span>
              </div>
              <div className="space-y-4">
                {reprintSignals.map((sig) => (
                  <div key={sig.id} className="flex items-center justify-between p-4 bg-surface-raised rounded-lg border border-surface-border-light">
                    <div>
                      <div className="font-medium text-white mb-1 text-sm">{sig.name}</div>
                      <div className="text-xs text-zinc-400">{sig.timeframe}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-brand-400">{sig.confidence}%</div>
                      <div className="text-[10px] text-zinc-600">신뢰도</div>
                    </div>
                  </div>
                ))}
                {reprintSignals.length === 0 && <p className="text-sm text-zinc-600 text-center py-4">데이터 없음</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
