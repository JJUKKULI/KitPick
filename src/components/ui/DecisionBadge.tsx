import { CheckCircle2, Clock, Eye, Flame } from 'lucide-react';
import type { DecisionType } from '@/types';

interface DecisionBadgeProps {
  decision: DecisionType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const config: Record<
  DecisionType,
  { label: string; icon: React.ElementType; colors: string }
> = {
  buy: {
    label: '구매 추천',
    icon: CheckCircle2,
    colors: 'bg-decision-buy/10 text-decision-buy border-decision-buy/20',
  },
  wait: {
    label: '기다리세요',
    icon: Clock,
    colors: 'bg-decision-wait/10 text-decision-wait border-decision-wait/20',
  },
  watch: {
    label: '지켜보세요',
    icon: Eye,
    colors: 'bg-decision-watch/10 text-decision-watch border-decision-watch/20',
  },
  trending: {
    label: '트렌딩',
    icon: Flame,
    colors: 'bg-decision-trending/10 text-decision-trending border-decision-trending/20',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2 font-medium',
};

export function DecisionBadge({ decision, size = 'md', className = '' }: DecisionBadgeProps) {
  const { label, icon: Icon, colors } = config[decision];

  return (
    <div
      className={`inline-flex items-center rounded-full border ${colors} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>{label}</span>
    </div>
  );
}
