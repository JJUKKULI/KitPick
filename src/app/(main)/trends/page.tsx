import { TrendingUp, Activity, AlertTriangle, Radar, ArrowUpRight } from 'lucide-react';
import { mockTrends } from '@/data/mockData';
import { HypeScore } from '@/components/ui/HypeScore';

export default function TrendsPage() {
  const { stats, releaseRadar, reprintSignals } = mockTrends;

  const statCards = [
    { label: '추적 중인 키트',   value: stats.totalTracked.toLocaleString(), icon: Activity,  color: 'text-blue-400' },
    { label: '구매 신호 (7일)',  value: stats.buySignals,                   icon: TrendingUp, color: 'text-decision-buy' },
    { label: '평균 관심도',      value: stats.avgHypeScore,                 icon: Activity,   color: 'text-brand-400' },
    { label: '재판 감지',        value: stats.reprintsDetected,             icon: Radar,      color: 'text-purple-400' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">트렌드 대시보드</h1>
        <p className="text-zinc-400">시장 전체 흐름과 출시 예정 신호.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-surface border border-surface-border rounded-xl p-5 animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
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
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-surface-raised rounded-lg border border-surface-border-light"
              >
                <div>
                  <div className="font-medium text-white mb-1">{item.name}</div>
                  <div className="text-xs text-zinc-400">{item.date}</div>
                </div>
                <HypeScore score={item.hype} label="" className="scale-90 origin-right" />
              </div>
            ))}
          </div>
        </div>

        {/* 재판 신호 */}
        <div className="bg-surface border border-surface-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-decision-wait" /> 재판 신호
            </h2>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">예측</span>
          </div>
          <div className="space-y-4">
            {reprintSignals.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-surface-raised rounded-lg border border-surface-border-light"
              >
                <div>
                  <div className="font-medium text-white mb-1">{item.name}</div>
                  <div className="text-xs text-zinc-400">예상: {item.timeframe}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-decision-buy flex items-center justify-end gap-1">
                    {item.confidence}% <ArrowUpRight className="w-3 h-3" />
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">신뢰도</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
