import type { CrawledArticle } from '@/lib/crawler/types';
import { deduplicateArticles } from '@/lib/crawler/utils';
import { crawlOfficial }   from '@/lib/crawler/officialCrawler';
import { crawlShops }      from '@/lib/crawler/shopCrawler';
import { crawlCommunity }  from '@/lib/crawler/communityCrawler';
import { crawlJournal }    from '@/lib/crawler/journalCrawler';
import { crawlYoutube }    from '@/lib/crawler/youtubeCrawler';

export interface CrawlOptions {
  recentDays?: number;       // 수집 기간 (기본 30일)
  sources?: string[];        // 크롤링 소스 선택 (기본 전체)
  maxPerSource?: number;     // 소스별 최대 수집 수
}

export interface CrawlResult {
  total:    number;
  inserted: number;
  skipped:  number;
  errors:   string[];
  bySource: Record<string, number>;
}

// ── CrawledArticle → journal_articles 테이블 형태 변환 ─────────────────
function toDBRow(a: CrawledArticle) {
  // category 값 검증 (DB CHECK constraint 대응)
  const validCategories = ['reprint', 'release', 'community', 'deal', 'review', 'event'];
  const category = validCategories.includes(a.category) ? a.category : 'community';

  return {
    category,
    source:        a.source_name,
    source_url:    a.source_url || null,
    title:         a.title.slice(0, 500),
    summary:       a.summary?.slice(0, 1000) || null,
    tags:          a.tags ?? [],
    posted_at:     a.posted_at || null,
    comment_count: a.comment_count ?? 0,
    is_hot:        a.is_hot ?? false,
    // 추가 메타 (journal_articles 확장 컬럼)
    product_name:  a.product || null,
    price:         a.price || null,
    source_type:   a.source,  // official | shop | community | journal | youtube
  };
}

export async function runCrawlers(
  supabase: any,
  options: CrawlOptions = {},
): Promise<CrawlResult> {
  const { recentDays = 30, sources = ['official', 'shop', 'community', 'journal', 'youtube'] } = options;
  const errors: string[] = [];
  const allArticles: CrawledArticle[] = [];
  const bySource: Record<string, number> = {};

  // 소스별 크롤러 실행
  const crawlers: { key: string; fn: () => Promise<CrawledArticle[]> }[] = [
    { key: 'official',   fn: () => crawlOfficial(recentDays) },
    { key: 'shop',       fn: () => crawlShops(recentDays) },
    { key: 'community',  fn: () => crawlCommunity(recentDays) },
    { key: 'journal',    fn: () => crawlJournal(recentDays) },
    { key: 'youtube',    fn: () => crawlYoutube(recentDays) },
  ];

  for (const { key, fn } of crawlers) {
    if (!sources.includes(key)) continue;
    try {
      const result = await fn();
      allArticles.push(...result);
      bySource[key] = result.length;
    } catch (e) {
      const msg = `[${key}] ${e instanceof Error ? e.message : '오류'}`;
      errors.push(msg);
      console.error(msg);
      bySource[key] = 0;
    }
  }

  // 중복 제거
  const unique = deduplicateArticles(allArticles);

  if (unique.length === 0) {
    return { total: 0, inserted: 0, skipped: 0, errors, bySource };
  }

  // Supabase upsert
  const dbRows = unique.map(toDBRow);
  const { data, error } = await supabase
    .from('journal_articles')
    .upsert(dbRows, { onConflict: 'title', ignoreDuplicates: true })
    .select('id');

  if (error) {
    errors.push(`DB 저장 오류: ${error.message}`);
    return { total: unique.length, inserted: 0, skipped: unique.length, errors, bySource };
  }

  return {
    total:    unique.length,
    inserted: data?.length ?? 0,
    skipped:  unique.length - (data?.length ?? 0),
    errors,
    bySource,
  };
}
