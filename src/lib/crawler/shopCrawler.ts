import type { CrawledArticle } from '@/lib/crawler/types';
import { parseRSSItems, safeFetch, classifyCategory, extractTags, extractProductName, extractPrice, formatPubDate, isRecent } from '@/lib/crawler/utils';

// 판매사이트는 직접 크롤링 차단이 강함 → Google News RSS + 사이트명 검색으로 우회
const SHOP_RSS = [
  {
    url: 'https://news.google.com/rss/search?q=건프라+예약+재입고+특가&hl=ko&gl=KR&ceid=KR:ko',
    source_name: '쇼핑몰',
    default_cat: 'deal' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=건담붐+OR+1004건담+OR+하비팩토리+신제품&hl=ko&gl=KR&ceid=KR:ko',
    source_name: '국내 쇼핑몰',
    default_cat: 'release' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=건프라+재입고+예약+2025&hl=ko&gl=KR&ceid=KR:ko',
    source_name: '쇼핑몰',
    default_cat: 'reprint' as const,
  },
];

// 직접 파싱 가능한 경우 시도 (JSON API가 있는 사이트)
const DIRECT_SHOPS = [
  {
    name: '건담붐',
    url: 'https://gundamboom.com',
    rss: 'https://gundamboom.com/rss',  // RSS 있으면 사용
  },
];

export async function crawlShops(recentDays = 30): Promise<CrawledArticle[]> {
  const results: CrawledArticle[] = [];

  for (const rss of SHOP_RSS) {
    const xml = await safeFetch(rss.url);
    if (!xml) continue;
    const items = parseRSSItems(xml);
    for (const item of items.slice(0, 8)) {
      if (!isRecent(item.pubDate, recentDays)) continue;
      // 판매 관련 키워드 없으면 스킵
      const shopKeywords = ['예약', '재입고', '특가', '신제품', '발매', '입고', '판매', '세일', '할인'];
      if (!shopKeywords.some(k => item.title.includes(k))) continue;

      const category = classifyCategory(item.title, rss.default_cat);
      const price = extractPrice(item.description) || extractPrice(item.title);
      results.push({
        source:        'shop',
        source_name:   item.sourceName || rss.source_name,
        category,
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price,
        summary:       item.description || `${item.title} — 쇼핑몰 소식`,
        source_url:    item.link,
        tags:          ['쇼핑', ...extractTags(item.title)],
        posted_at:     formatPubDate(item.pubDate),
        is_hot:        category === 'deal' || category === 'reprint',
        comment_count: 0,
      });
    }
  }

  // 직접 접근 시도 (RSS가 있는 사이트)
  for (const shop of DIRECT_SHOPS) {
    const xml = await safeFetch(shop.rss);
    if (!xml) continue;
    const items = parseRSSItems(xml);
    for (const item of items.slice(0, 5)) {
      if (!isRecent(item.pubDate, recentDays)) continue;
      results.push({
        source:        'shop',
        source_name:   shop.name,
        category:      classifyCategory(item.title, 'release'),
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price:         extractPrice(item.description),
        summary:       item.description || item.title,
        source_url:    item.link || shop.url,
        tags:          extractTags(item.title),
        posted_at:     formatPubDate(item.pubDate),
        is_hot:        false,
        comment_count: 0,
      });
    }
  }

  return results;
}
