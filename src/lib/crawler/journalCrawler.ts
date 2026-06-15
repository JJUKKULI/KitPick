import type { CrawledArticle } from '@/lib/crawler/types';
import { parseRSSItems, safeFetch, classifyCategory, extractTags, extractProductName, formatPubDate, isRecent } from '@/lib/crawler/utils';

const JOURNAL_RSS = [
  // 건담 신제품/재판 발표
  {
    url: 'https://news.google.com/rss/search?q=건담+건프라+신제품+발매+발표&hl=ko&gl=KR&ceid=KR:ko',
    name: '건프라 신제품',
    defaultCat: 'release' as const,
  },
  // 건프라 재판
  {
    url: 'https://news.google.com/rss/search?q=건프라+재판+예약+발매+반다이&hl=ko&gl=KR&ceid=KR:ko',
    name: '건프라 재판',
    defaultCat: 'reprint' as const,
  },
  // 건프라 리뷰
  {
    url: 'https://news.google.com/rss/search?q=건프라+리뷰+조립+완성&hl=ko&gl=KR&ceid=KR:ko',
    name: '건프라 리뷰',
    defaultCat: 'review' as const,
  },
  // 반다이 공식 발표
  {
    url: 'https://news.google.com/rss/search?q=반다이+건담+공식+발표+HG+MG+PG&hl=ko&gl=KR&ceid=KR:ko',
    name: '반다이 공식',
    defaultCat: 'release' as const,
  },
  // 해외 영문 건담 뉴스
  {
    url: 'https://news.google.com/rss/search?q=gundam+gunpla+bandai+new+release&hl=en&gl=US&ceid=US:en',
    name: 'Gunpla Global',
    defaultCat: 'release' as const,
  },
];

export async function crawlJournal(recentDays = 30): Promise<CrawledArticle[]> {
  const results: CrawledArticle[] = [];

  for (const rss of JOURNAL_RSS) {
    const xml = await safeFetch(rss.url);
    if (!xml) continue;
    const items = parseRSSItems(xml);
    for (const item of items.slice(0, 8)) {
      if (!isRecent(item.pubDate, recentDays)) continue;
      // 건프라/프라모델/피규어 관련 키워드 필터
      const relevant = ['건프라', '건담', '프라모델', '피규어', 'HG', 'MG', 'RG', '조립', '리뷰', '굿스마일', '코토부키야'].some(
        k => item.title.includes(k) || item.description.includes(k)
      );
      if (!relevant) continue;

      // HTML 태그 제거 + 공백 정제
      const cleanSummary = (item.description || `${rss.name}: ${item.title}`)
        .replace(/<[^>]+>/g, '')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 300);

      results.push({
        source:        'journal',
        source_name:   item.sourceName || rss.name,
        category:      classifyCategory(item.title, rss.defaultCat),
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price:         null,
        summary:       cleanSummary,
        source_url:    item.link,
        tags:          extractTags(item.title),
        posted_at:     formatPubDate(item.pubDate),
        is_hot:        false,
        comment_count: 0,
      });
    }
  }

  return results;
}
