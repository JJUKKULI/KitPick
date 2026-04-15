import type { CrawledArticle } from '@/lib/crawler/types';
import { parseRSSItems, safeFetch, classifyCategory, extractTags, extractProductName, extractPrice, formatPubDate, isRecent } from '@/lib/crawler/utils';

// 공식 채널 Google News RSS (봇 차단 없음)
const OFFICIAL_RSS = [
  {
    url: 'https://news.google.com/rss/search?q=반다이남코+건담+신제품&hl=ko&gl=KR&ceid=KR:ko',
    source_name: '반다이남코 공식',
  },
  {
    url: 'https://news.google.com/rss/search?q=건담+공식+발매+발표+2025&hl=ko&gl=KR&ceid=KR:ko',
    source_name: '건담 공식',
  },
  {
    url: 'https://news.google.com/rss/search?q=site:kr.gundam-official.com+OR+site:bnkrmall.co.kr&hl=ko&gl=KR&ceid=KR:ko',
    source_name: '건담 공식',
  },
];

// 반다이 일본 공식 뉴스 RSS (직접 접근)
const BANDAI_JP_RSS = 'https://www.bandai.co.jp/news/rss/';

export async function crawlOfficial(recentDays = 30): Promise<CrawledArticle[]> {
  const results: CrawledArticle[] = [];

  for (const rss of OFFICIAL_RSS) {
    const xml = await safeFetch(rss.url);
    if (!xml) continue;
    const items = parseRSSItems(xml);
    for (const item of items.slice(0, 8)) {
      if (!isRecent(item.pubDate, recentDays)) continue;
      const category = classifyCategory(item.title, 'release');
      results.push({
        source:        'official',
        source_name:   item.sourceName || rss.source_name,
        category,
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price:         extractPrice(item.description),
        summary:       item.description || `${rss.source_name} 공식 소식: ${item.title}`,
        source_url:    item.link,
        tags:          ['공식', ...extractTags(item.title)],
        posted_at:     formatPubDate(item.pubDate),
        is_hot:        category === 'release' || category === 'reprint',
        comment_count: 0,
      });
    }
  }

  // 반다이 일본 RSS 직접 시도
  const bandaiXml = await safeFetch(BANDAI_JP_RSS);
  if (bandaiXml) {
    const items = parseRSSItems(bandaiXml);
    for (const item of items.slice(0, 5)) {
      if (!isRecent(item.pubDate, recentDays)) continue;
      results.push({
        source:        'official',
        source_name:   '반다이 일본',
        category:      classifyCategory(item.title, 'release'),
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price:         null,
        summary:       item.description || item.title,
        source_url:    item.link || 'https://www.bandai.co.jp',
        tags:          ['반다이', '공식', ...extractTags(item.title)],
        posted_at:     formatPubDate(item.pubDate),
        is_hot:        true,
        comment_count: 0,
      });
    }
  }

  return results;
}
