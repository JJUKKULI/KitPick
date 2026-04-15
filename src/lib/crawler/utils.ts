import type { CrawledArticle, ArticleCategory } from './types';

// ── 최신 N일 이내 필터 ────────────────────────────────────────────────────
export function isRecent(dateStr: string, days = 30): boolean {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return true; // 날짜 파싱 실패 시 통과
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return d >= cutoff;
  } catch { return true; }
}

// ── RSS pubDate → 표시 문자열 ──────────────────────────────────────────────
export function formatPubDate(pubDate: string): string {
  try {
    const d = new Date(pubDate);
    const now = new Date();
    const diffMin = (now.getTime() - d.getTime()) / 1000 / 60;
    if (diffMin < 60)   return `${Math.floor(diffMin)}분 전`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}시간 전`;
    if (diffMin < 10080) return `${Math.floor(diffMin / 1440)}일 전`;
    return d.toLocaleDateString('ko-KR');
  } catch { return '최근'; }
}

// ── 키워드 기반 카테고리 분류 ─────────────────────────────────────────────
export function classifyCategory(title: string, defaultCat: ArticleCategory): ArticleCategory {
  if (['재판', '재발매', '재입고', '2차', '3차', '재생산'].some(k => title.includes(k))) return 'reprint';
  if (['발매', '신작', '예약', '공개', '발표', '신제품', '출시', '발売'].some(k => title.includes(k))) return 'release';
  if (['세일', '할인', '특가', '핫딜', '쿠폰', '이벤트 가격'].some(k => title.includes(k))) return 'deal';
  if (['리뷰', '후기', '조립', '완성', '도색', '개봉기'].some(k => title.includes(k))) return 'review';
  if (['이벤트', '전시', '행사', '캠페인'].some(k => title.includes(k))) return 'event';
  return defaultCat;
}

// ── 태그 추출 ─────────────────────────────────────────────────────────────
const TAG_KEYWORDS = [
  'HG', 'MG', 'RG', 'PG', 'HGUC', 'HGCE', 'HGIBO', 'SD', 'NG', 'Ver.Ka',
  '건담', '피규어', '프라모델', '반다이', '굿스마일', '코토부키야',
  '재판', '발매', '예약', '한정', '특가', '리뷰',
  '수성의 마녀', 'SEED', 'UC', '역습의 샤아', '철혈의 오펀스', 'DESTINY',
];
export function extractTags(title: string): string[] {
  return TAG_KEYWORDS.filter(k => title.includes(k));
}

// ── 제품명 추출 (간단한 패턴 매칭) ───────────────────────────────────────
const GRADE_PATTERN = /(?:HG|MG|RG|PG|HGUC|HGCE|HGIBO|SD)\s+[가-힣\w\s\-\.]+/i;
export function extractProductName(title: string): string | null {
  const m = title.match(GRADE_PATTERN);
  return m ? m[0].trim().slice(0, 50) : null;
}

// ── 가격 추출 ─────────────────────────────────────────────────────────────
export function extractPrice(text: string): string | null {
  const m = text.match(/[\d,]+원|¥[\d,]+|\$[\d,.]+/);
  return m ? m[0] : null;
}

// ── 중복 제거 (제목/URL 기준) ─────────────────────────────────────────────
export function deduplicateArticles(articles: CrawledArticle[]): CrawledArticle[] {
  const seenTitles = new Set<string>();
  const seenUrls   = new Set<string>();
  return articles.filter(a => {
    const titleKey = a.title.replace(/\s+/g, '').slice(0, 30);
    if (seenTitles.has(titleKey) || seenUrls.has(a.source_url)) return false;
    seenTitles.add(titleKey);
    seenUrls.add(a.source_url);
    return true;
  });
}

// ── RSS XML 공통 파서 ─────────────────────────────────────────────────────
export function parseRSSItems(xml: string): {
  title: string; link: string; description: string;
  pubDate: string; sourceName: string;
}[] {
  const items: ReturnType<typeof parseRSSItems> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const get = (tag: string) => {
      const r = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
      return r ? r[1].trim().replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[^>]+>/g,'') : '';
    };
    const title = get('title');
    if (title.length < 4) continue;
    // Google News 형식: "제목 - 출처" 분리
    const dashIdx = title.lastIndexOf(' - ');
    items.push({
      title:      dashIdx > 0 ? title.slice(0, dashIdx) : title,
      link:       get('link'),
      description: get('description').slice(0, 300),
      pubDate:    get('pubDate'),
      sourceName: dashIdx > 0 ? title.slice(dashIdx + 3) : '',
    });
  }
  return items;
}

// ── fetch 공통 래퍼 (User-Agent 포함, timeout) ────────────────────────────
export async function safeFetch(url: string, timeoutMs = 10000): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}
