interface HypeScoreProps {
  score: number;
  label?: string;
  className?: string;
}

function getColor(score: number) {
  if (score >= 90) return 'text-brand-500';
  if (score >= 75) return 'text-decision-wait';
  if (score >= 50) return 'text-decision-watch';
  return 'text-zinc-500';
}

export function HypeScore({ score, label = 'Hype Score', className = '' }: HypeScoreProps) {
  const colorClass = getColor(score);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          {/* 배경 원 */}
          <circle
            cx="24" cy="24" r={radius}
            className="stroke-surface-border fill-none"
            strokeWidth="4"
          />
          {/* 진행 원 */}
          <circle
            cx="24" cy="24" r={radius}
            className={`fill-none stroke-current ${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className={`text-sm font-bold ${colorClass}`}>{score}</span>
      </div>

      {label && (
        <div className="flex flex-col">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
            {label}
          </span>
          <span className="text-xs text-zinc-500">커뮤니티 활성도 기반</span>
        </div>
      )}
    </div>
  );
}
