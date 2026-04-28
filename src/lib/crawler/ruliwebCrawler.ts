// ═══════════════════════════════════════════════════════════════════
// 루리웹 프라모델 게시판 크롤러
// https://bbs.ruliweb.com/hobby/board/300148
// ═══════════════════════════════════════════════════════════════════

export interface CommunityPost {
  title: string;
  content?: string;
  author: string;
  date: string;
  views: number;
  recommend: number;
  comments: number;
  url: string;
}

const RULIWEB_BASE = 'https://bbs.ruliweb.com/hobby/board/300148';
const USER_AGENT   = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';

/**
 * 건담 이름으로 루리웹 검색 → 최신 게시물 추출
 */
export async function crawlRuliwebPosts(gundamName: string, limit = 20): Promise<CommunityPost[]> {
  try {
    const searchUrl = `${RULIWEB_BASE}?search_type=subject_content&search_key=${encodeURIComponent(gundamName)}`;
    const res = await fetch(searchUrl, {
      headers: { 'User-Agent': USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const html = await res.text();
    return parseRuliwebList(html, limit);
  } catch {
    return [];
  }
}

/**
 * HTML 파싱 → 게시글 목록 추출 (정규식 기반, cheerio 없이)
 */
function parseRuliwebList(html: string, limit: number): CommunityPost[] {
  const posts: CommunityPost[] = [];

  // 게시글 row 패턴
  const rowRegex = /<tr[^>]*class="[^"]*table_body[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi;
  const titleRegex = /<a[^>]*class="[^"]*subject[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/i;
  const authorRegex = /<td[^>]*class="[^"]*writer[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i;
  const viewsRegex = /<td[^>]*class="[^"]*hit[^"]*"[^>]*>(\d+)<\/td>/i;
  const recRegex   = /<td[^>]*class="[^"]*recomd[^"]*"[^>]*>(\d+)<\/td>/i;
  const dateRegex  = /<td[^>]*class="[^"]*time[^"]*"[^>]*>([^<]+)<\/td>/i;

  let match;
  while ((match = rowRegex.exec(html)) && posts.length < limit) {
    const row = match[1];
    const titleM  = row.match(titleRegex);
    const authorM = row.match(authorRegex);
    const viewsM  = row.match(viewsRegex);
    const recM    = row.match(recRegex);
    const dateM   = row.match(dateRegex);

    if (!titleM) continue;

    posts.push({
      title:     titleM[2].trim(),
      url:       titleM[1].startsWith('http') ? titleM[1] : `https://bbs.ruliweb.com${titleM[1]}`,
      author:    authorM?.[1].trim() ?? '익명',
      date:      dateM?.[1].trim() ?? '',
      views:     parseInt(viewsM?.[1] ?? '0', 10),
      recommend: parseInt(recM?.[1] ?? '0', 10),
      comments:  0,
    });
  }

  return posts;
}

/**
 * 간단 감성 분석 — 키워드 기반 (GPT 전처리용 카운터)
 */
export function analyzeSentimentSimple(posts: CommunityPost[]): {
  positive: number;
  neutral: number;
  negative: number;
  mentionCount: number;
} {
  const POSITIVE_KW = ['구매', '추천', '만족', '좋', '괜찮', '이쁘', '예쁘', '명작', '최고', '득템', '가성비', '소장각', '갓성비'];
  const NEGATIVE_KW = ['실망', '별로', '비싸', '품질', '불량', '깨짐', '부실', '아쉽', '후회', '반품', '프리미엄', '웃돈'];

  let pos = 0, neg = 0, neu = 0;

  for (const post of posts) {
    const text = `${post.title} ${post.content ?? ''}`.toLowerCase();
    const hasPos = POSITIVE_KW.some(kw => text.includes(kw));
    const hasNeg = NEGATIVE_KW.some(kw => text.includes(kw));

    if (hasPos && !hasNeg) pos++;
    else if (hasNeg && !hasPos) neg++;
    else neu++;
  }

  const total = posts.length || 1;
  return {
    positive:     Math.round((pos / total) * 100),
    neutral:      Math.round((neu / total) * 100),
    negative:     Math.round((neg / total) * 100),
    mentionCount: posts.length,
  };
}
