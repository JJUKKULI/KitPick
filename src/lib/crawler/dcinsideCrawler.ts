// ═══════════════════════════════════════════════════════════════════
// DCInside 건프라/건담 갤러리 크롤러
// 갤러리: 건프라(gunpla), 건담(gundam), 프라모델(plasticmodel)
// 봇 차단 약함 → 일반 fetch로 수집 가능
// ═══════════════════════════════════════════════════════════════════

export interface DCPost {
  title:     string;
  content?:  string;
  author:    string;
  date:      string;
  views:     number;
  recommend: number;
  comments:  number;
  url:       string;
  galleryId: string;
}

const GALLERIES = [
  { id: 'gunpla',        name: '건프라 갤러리' },
  { id: 'gundam',        name: '건담 갤러리' },
  { id: 'plasticmodel',  name: '프라모델 갤러리' },
];

const BASE = 'https://gall.dcinside.com/mgallery/board/lists';
const UA   = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// ── DCInside 갤러리 HTML 파싱 ────────────────────────────────────────────
function parseDCList(html: string, galleryId: string, limit = 20): DCPost[] {
  const posts: DCPost[] = [];

  // 게시글 행 추출
  const rowRegex = /<tr[^>]*class="[^"]*ub-content[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi;
  let m: RegExpExecArray | null;

  while ((m = rowRegex.exec(html)) && posts.length < limit) {
    const row = m[1];

    // 제목 + URL
    const titleM = row.match(/class="[^"]*gall_tit[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([^<\[]+)/i);
    if (!titleM) continue;
    const href  = titleM[1];
    const title = titleM[2].trim();
    if (title.length < 3) continue;

    // 조회수
    const viewsM = row.match(/class="[^"]*gall_count[^"]*"[^>]*>(\d[\d,]*)</i);
    const views  = viewsM ? Number(viewsM[1].replace(/,/g, '')) : 0;

    // 추천수
    const recM  = row.match(/class="[^"]*gall_recommend[^"]*"[^>]*>(\d+)</i);
    const recommend = recM ? Number(recM[1]) : 0;

    // 댓글수
    const cmtM    = row.match(/class="[^"]*reply_num[^"]*"[^>]*>\[(\d+)\]/i);
    const comments = cmtM ? Number(cmtM[1]) : 0;

    // 날짜
    const dateM = row.match(/class="[^"]*gall_date[^"]*"[^>]*title="([^"]+)"/i)
                || row.match(/class="[^"]*gall_date[^"]*"[^>]*>([^<]+)</i);
    const date  = dateM ? dateM[1].trim() : '';

    // 작성자
    const authorM = row.match(/class="[^"]*gall_writer[^"]*"[\s\S]*?(?:data-nick|nickname)="([^"]+)"/i)
                  || row.match(/class="[^"]*gall_writer[^"]*"[^>]*>([^<]+)</i);
    const author  = authorM ? authorM[1].trim() : '익명';

    const url = href.startsWith('http')
      ? href
      : `https://gall.dcinside.com${href}`;

    posts.push({ title, author, date, views, recommend, comments, url, galleryId });
  }

  return posts;
}

// ── 기체명으로 갤러리 검색 ────────────────────────────────────────────────
export async function crawlDCPosts(gundamName: string, limit = 20): Promise<DCPost[]> {
  const allPosts: DCPost[] = [];

  for (const gallery of GALLERIES) {
    try {
      const url = `${BASE}?id=${gallery.id}&s_type=search_subject&s_keyword=${encodeURIComponent(gundamName)}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent':      UA,
          'Accept':          'text/html,application/xhtml+xml',
          'Accept-Language': 'ko-KR,ko;q=0.9',
          'Referer':         'https://gall.dcinside.com/',
        },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) continue;

      const html = await res.text();
      const posts = parseDCList(html, gallery.id, Math.ceil(limit / GALLERIES.length));
      allPosts.push(...posts);

      await new Promise(r => setTimeout(r, 500)); // 갤러리 간 딜레이
    } catch { /* 갤러리 실패 시 스킵 */ }
  }

  // 조회수+추천 기준 정렬
  return allPosts
    .sort((a, b) => (b.views + b.recommend * 10) - (a.views + a.recommend * 10))
    .slice(0, limit);
}

// ── GPT-4o-mini 감성 분석 ─────────────────────────────────────────────────
export async function analyzeSentimentDC(
  posts: DCPost[],
  gundamName: string,
): Promise<{
  positive: number;
  neutral:  number;
  negative: number;
  topComments: { comment: string; sentiment: 'positive' | 'neutral' | 'negative' }[];
  mentionCount: number;
}> {
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey || posts.length === 0) {
    return { positive: 33, neutral: 34, negative: 33, topComments: [], mentionCount: 0 };
  }

  // 게시글 제목 목록 (최대 30개)
  const titleList = posts
    .slice(0, 30)
    .map((p, i) => `${i + 1}. [조회${p.views}|추천${p.recommend}|댓글${p.comments}] ${p.title}`)
    .join('\n');

  const prompt = `다음은 DCInside 건프라 갤러리에서 "${gundamName}"를 검색한 게시글 목록이다.
각 글의 제목과 반응(조회수·추천·댓글)을 보고 커뮤니티 전체 여론을 분석하라.

${titleList}

아래 JSON 형식으로만 응답하라:
{
  "positive": 긍정 비율 (0-100 정수),
  "neutral":  중립 비율 (0-100 정수),
  "negative": 부정 비율 (0-100 정수),
  "topComments": [
    { "comment": "대표 의견 1 (15자 이내)", "sentiment": "positive|neutral|negative" },
    { "comment": "대표 의견 2", "sentiment": "..." },
    { "comment": "대표 의견 3", "sentiment": "..." }
  ],
  "summary": "여론 한 줄 요약"
}
주의: positive + neutral + negative = 100 이어야 한다.`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:           'gpt-4o-mini',
        temperature:     0.1,
        max_tokens:      300,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: '건프라 커뮤니티 여론 분석기. JSON만 출력.' },
          { role: 'user',   content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) throw new Error('GPT API 오류');
    const data = await res.json() as { choices: { message: { content: string } }[] };
    const result = JSON.parse(data.choices[0].message.content) as {
      positive: number; neutral: number; negative: number;
      topComments: { comment: string; sentiment: string }[];
    };

    // 합계 100 보정
    const total = (result.positive ?? 0) + (result.neutral ?? 0) + (result.negative ?? 0);
    const scale = total > 0 ? 100 / total : 1;

    return {
      positive:     Math.round((result.positive ?? 33) * scale),
      neutral:      Math.round((result.neutral  ?? 34) * scale),
      negative:     100 - Math.round((result.positive ?? 33) * scale) - Math.round((result.neutral ?? 34) * scale),
      topComments:  (result.topComments ?? []).slice(0, 5) as { comment: string; sentiment: 'positive' | 'neutral' | 'negative' }[],
      mentionCount: posts.length,
    };
  } catch {
    // GPT 실패 시 단순 키워드 분석으로 폴백
    return analyzeSentimentSimple(posts, gundamName);
  }
}

// ── 키워드 기반 단순 감성 분석 (GPT 실패 시 폴백) ──────────────────────
function analyzeSentimentSimple(posts: DCPost[], _gundamName: string) {
  const POS_KW = ['구매', '샀', '완성', '좋', '추천', '대박', '사야', '예약', '재판', '기대', '최고', '갓'];
  const NEG_KW = ['비싸', '품절', '단종', '실망', '구리', '최악', '후회', '불량', '별로', '망'];

  let pos = 0, neg = 0;
  for (const p of posts) {
    const text = p.title;
    const posHit = POS_KW.some(k => text.includes(k));
    const negHit = NEG_KW.some(k => text.includes(k));
    if (posHit && !negHit) pos++;
    else if (negHit && !posHit) neg++;
  }

  const total = posts.length || 1;
  const posP  = Math.round((pos / total) * 100);
  const negP  = Math.round((neg / total) * 100);

  return {
    positive:     posP,
    neutral:      100 - posP - negP,
    negative:     negP,
    topComments:  posts.slice(0, 3).map(p => ({
      comment:   p.title.slice(0, 20),
      sentiment: 'neutral' as const,
    })),
    mentionCount: posts.length,
  };
}
