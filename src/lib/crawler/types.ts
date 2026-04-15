// ── 수집 데이터 통합 구조 ────────────────────────────────────────────────
export type CrawlSource = 'official' | 'shop' | 'community' | 'journal' | 'youtube';
export type ArticleCategory = 'reprint' | 'release' | 'community' | 'deal' | 'review' | 'event';

export interface CrawledArticle {
  source:       CrawlSource;
  source_name:  string;       // 사이트명 (예: '건담붐', '루리웹')
  category:     ArticleCategory;
  title:        string;
  product:      string | null; // 제품명 (추출 가능한 경우)
  release_date: string | null; // 발매일
  price:        string | null; // 가격
  summary:      string;
  source_url:   string;
  tags:         string[];
  posted_at:    string;        // 원문 게시 시간 (ISO or 표시 문자열)
  is_hot:       boolean;
  comment_count: number;
}
