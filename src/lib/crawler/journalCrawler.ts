import type { CrawledArticle } from '@/lib/crawler/types';
import { parseRSSItems, safeFetch, classifyCategory, extractTags, extractProductName, formatPubDate, isRecent } from '@/lib/crawler/utils';

const JOURNAL_RSS = [
  // 아카라이브 스케일모델 채널 (Google News 경유)
  {
    url: 'https://news.google.com/rss/search?q=프라모델+arca.live+scalemodel&hl=ko&gl=KR&ceid=KR:ko',
    name: '아카라이브',
    defaultCat: 'journal' as const,
  },
  // 건프라 전문 리뷰/저널
  {
    url: 'https://news.google.com/rss/search?q=건프라+리뷰+2025+조립+완성&hl=ko&gl=KR&ceid=KR:ko',
    name: '건프라 저널',
    defaultCat: 'review' as const,
  },
  // 피규어 관련 저널
  {
    url: 'https://news.google.com/rss/search?q=피규어+리뷰+굿스마일+코토부키야+2025&hl=ko&gl=KR&ceid=KR:ko',
    name: '피규어 저널',
    defaultCat: 'review' as const,
  },
  // 스케일모델 / 프라모델 전반
  {
    url: 'https://news.google.com/rss/search?q=프라모델+스케일모델+신제품+한국&hl=ko&gl=KR&ceid=KR:ko',
    name: '프라모델 저널',
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

      results.push({
        source:        'journal',
        source_name:   item.sourceName || rss.name,
        category:      classifyCategory(item.title, rss.defaultCat),
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price:         null,
        summary:       item.description || `${rss.name}: ${item.title}`,
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
