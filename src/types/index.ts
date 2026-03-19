// ─── 결정 타입 ──────────────────────────────────────────────────────
export type DecisionType = 'buy' | 'wait' | 'watch' | 'trending';

// ─── 커뮤니티 댓글 ─────────────────────────────────────────────────
export interface Comment {
  id: string;
  user: string;
  comment: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
}

// ─── 제품 (프라모델 키트) ───────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  series: string;
  grade: string;
  price: number;
  previousPrice: number;
  decision: DecisionType;
  reasoning: string;
  popularity: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  priceHistory: {
    date: string;
    price: number;
  }[];
  communityComments: Comment[];
  aiInsight: string;
  releaseDate: string;
}

// ─── 트렌드 데이터 ─────────────────────────────────────────────────
export interface TrendStats {
  totalTracked: number;
  buySignals: number;
  avgHypeScore: number;
  reprintsDetected: number;
}

export interface ReleaseItem {
  id: string;
  name: string;
  date: string;
  hype: number;
}

export interface ReprintSignal {
  id: string;
  name: string;
  confidence: number;
  timeframe: string;
}

// ─── 유저 프로필 ───────────────────────────────────────────────────
export interface UserProfile {
  username: string;
  memberSince: string;
  stats: {
    decisionsSaved: number;
    watchlistCount: number;
    moneySaved: number;
  };
  favoriteSeries: string[];
  watchlist: Product[];
  savedDecisions: {
    product: Product;
    date: string;
  }[];
}
