import type { CrawledArticle } from '@/lib/crawler/types';
import {
  parseRSSItems, safeFetch, classifyCategory,
  extractTags, extractProductName, formatPubDate, isRecent,
} from '@/lib/crawler/utils';

// ── 루리웹 — RSS 제공 ────────────────────────────────────────────────────
// 루리웹은 게시판별 RSS를 제공함 (직접 접근 가능)
const RULIWEB_RSS_LIST = [
  {
    url: 'https://bbs.ruliweb.com/family/232/board/300016',  // 프라모델 게시판
    rss: 'https://bbs.ruliweb.com/family/232/board/300016?view=rss',
    name: '루리웹 프라모델',
  },
  {
    url: 'https://bbs.ruliweb.com/hobby/board/300543',  // 건프라 게시판
    rss: 'https://bbs.ruliweb.com/hobby/board/300543?view=rss',
    name: '루리웹 건프라',
  },
];

// ── 디시 / 아카라이브 — Google News RSS로 수집 ──────────────────────────
const COMMUNITY_RSS = [
  {
    url: 'https://news.google.com/rss/search?q=건프라+리뷰+후기+site:dcinside.com&hl=ko&gl=KR&ceid=KR:ko',
    name: '디시인사이드',
    defaultCat: 'community' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=프라모델+리뷰+arca.live&hl=ko&gl=KR&ceid=KR:ko',
    name: '아카라이브',
    defaultCat: 'community' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=건프라+커뮤니티+인기+2025&hl=ko&gl=KR&ceid=KR:ko',
    name: '건프라 커뮤니티',
    defaultCat: 'community' as const,
  },
];

// ── 루리웹 HTML 직접 파싱 (RSS 실패 시 폴백) ────────────────────────────
function parseRuliwebHTML(html: string, boardName: string): CrawledArticle[] {
  const results: CrawledArticle[] = [];

  // 루리웹 게시글 제목/링크 패턴
  const rowRegex = /<tr[^>]*class="[^"]*table_body[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
  let rowMatch;

  while ((rowRegex.exec(html)) !== null) {
    // 제목 추출
    const titleMatch = html.match(/class="subject_link[^"]*"[^>]*href="([^"]+)"[^>]*title="([^"]+)"/);
    if (!titleMatch) continue;
    const [, href, title] = titleMatch;
    if (title.length < 5) continue;

    // 댓글수
    const replyMatch = html.match(/class="replycount[^"]*"[^>]*>\s*(\d+)\s*</);
    const commentCount = replyMatch ? Number(replyMatch[1]) : 0;

    // 시간
    const timeMatch = html.match(/class="time[^"]*"[^>]*>([^<]+)</);
    const postedAt = timeMatch ? timeMatch[1].trim() : '최근';

    results.push({
      source:        'community',
      source_name:   boardName,
      category:      classifyCategory(title, 'community'),
      title,
      product:       extractProductName(title),
      release_date:  null,
      price:         null,
      summary:       `${boardName} 게시글: ${title}`,
      source_url:    href.startsWith('http') ? href : `https://bbs.ruliweb.com${href}`,
      tags:          extractTags(title),
      posted_at:     postedAt,
      is_hot:        commentCount > 30,
      comment_count: commentCount,
    });

    if (results.length >= 10) break;
  }
  return results;
}

export async function crawlCommunity(recentDays = 30): Promise<CrawledArticle[]> {
  const results: CrawledArticle[] = [];

  // 1. 루리웹 RSS 시도
  for (const board of RULIWEB_RSS_LIST) {
    const xml = await safeFetch(board.rss);
    if (xml && xml.includes('<item>')) {
      const items = parseRSSItems(xml);
      for (const item of items.slice(0, 10)) {
        if (!isRecent(item.pubDate, recentDays)) continue;
        const category = classifyCategory(item.title, 'community');
        results.push({
          source:        'community',
          source_name:   board.name,
          category,
          title:         item.title,
          product:       extractProductName(item.title),
          release_date:  null,
          price:         null,
          summary:       item.description || `${board.name}: ${item.title}`,
          source_url:    item.link || board.url,
          tags:          extractTags(item.title),
          posted_at:     formatPubDate(item.pubDate),
          is_hot:        category === 'reprint' || category === 'release',
          comment_count: 0,
        });
      }
    } else {
      // RSS 실패 시 HTML 직접 파싱 시도
      const html = await safeFetch(board.url);
      if (html) {
        const parsed = parseRuliwebHTML(html, board.name);
        results.push(...parsed);
      }
    }
  }

  // 2. Google News RSS로 디시/아카라이브 수집
  for (const source of COMMUNITY_RSS) {
    const xml = await safeFetch(source.url);
    if (!xml) continue;
    const items = parseRSSItems(xml);
    for (const item of items.slice(0, 6)) {
      if (!isRecent(item.pubDate, recentDays)) continue;
      // 건프라/프라모델 관련 키워드 없으면 스킵
      const relevant = ['건프라', '건담', '프라모델', '피규어', 'HG', 'MG', 'RG', 'PG'].some(k => item.title.includes(k));
      if (!relevant) continue;
      results.push({
        source:        'community',
        source_name:   item.sourceName || source.name,
        category:      classifyCategory(item.title, source.defaultCat),
        title:         item.title,
        product:       extractProductName(item.title),
        release_date:  null,
        price:         null,
        summary:       item.description || item.title,
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
