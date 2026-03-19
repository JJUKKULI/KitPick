interface SentimentBarProps {
  positive: number;
  neutral: number;
  negative: number;
  className?: string;
  showLabels?: boolean;
}

export function SentimentBar({
  positive,
  neutral,
  negative,
  className = '',
  showLabels = true,
}: SentimentBarProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {showLabels && (
        <div className="flex justify-between text-xs font-medium">
          <span className="text-decision-buy">{positive}% 긍정</span>
          <span className="text-zinc-400">{neutral}% 중립</span>
          <span className="text-brand-500">{negative}% 부정</span>
        </div>
      )}
      <div className="h-2 w-full flex rounded-full overflow-hidden bg-surface-raised">
        <div
          className="h-full bg-decision-buy transition-all duration-500"
          style={{ width: `${positive}%` }}
          title={`긍정: ${positive}%`}
        />
        <div
          className="h-full bg-zinc-600 transition-all duration-500"
          style={{ width: `${neutral}%` }}
          title={`중립: ${neutral}%`}
        />
        <div
          className="h-full bg-brand-500 transition-all duration-500"
          style={{ width: `${negative}%` }}
          title={`부정: ${negative}%`}
        />
      </div>
    </div>
  );
}
