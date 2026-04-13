import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ── Google News RSS 파싱 ──────────────────────────────────────────────────
// Google News RSS는 봇 차단 없이 접근 가능
const RSS_SOURCES = [
  {
    url: 'https://news.google.com/rss/search?q=건프라+반다이&hl=ko&gl=KR&ceid=KR:ko',
    source: 'Google News',
    defaultCategory: 'community' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=반다이+건담+재판&hl=ko&gl=KR&ceid=KR:ko',
    source: 'Google News',
    defaultCategory: 'reprint' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=건담+피규어+발매&hl=ko&gl=KR&ceid=KR:ko',
    source: 'Google News',
    defaultCategory: 'release' as const,
  },
];

type ArticleCategory = 'reprint' | 'release' | 'community' | 'deal';

// 키워드 기반 카테고리 분류
function classifyCategory(title: string, defaultCat: ArticleCategory): ArticleCategory {
  const t = title;
  if (['재판', '재발매', '재입고', '2차', '3차'].some(k => t.includes(k))) return 'reprint';
  if (['발매', '신작', '예약', '공개', '발표', '신제품'].some(k => t.includes(k))) return 'release';
  if (['세일', '할인', '특가', '핫딜', '쿠폰'].some(k => t.includes(k))) return 'deal';
  return defaultCat;
}

// 태그 추출
function extractTags(title: string): string[] {
  const keywords = ['건담', 'HG', 'MG', 'RG', 'PG', 'HGUC', '피규어', '프라모델', '반다이', '굿스마일', 'Ver.Ka', '재판', '발매', '한정'];
  return keywords.filter(k => title.includes(k));
}

// 시간 파싱 (RSS pubDate)
function formatPubDate(pubDate: string): string {
  try {
    const d = new Date(pubDate);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 1000 / 60; // 분
    if (diff < 60) return `${Math.floor(diff)}분 전`;
    if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
    return `${Math.floor(diff / 1440)}일 전`;
  } catch { return '최근'; }
}

// RSS XML 파싱
function parseRSS(xml: string, source: string, defaultCategory: ArticleCategory) {
  const items: {
    category: ArticleCategory;
    source: string;
    source_url: string;
    title: string;
    summary: string;
    tags: string[];
    posted_at: string;
    comment_count: number;
    is_hot: boolean;
  }[] = [];

  // <item> 블록 추출
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    // title 추출 (CDATA 처리)
    const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
    const linkMatch  = block.match(/<link>([\s\S]*?)<\/link>/);
    const descMatch  = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/);
    const dateMatch  = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

    if (!titleMatch) continue;

    let title = titleMatch[1].trim()
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/<[^>]+>/g, ''); // HTML 태그 제거

    // 구글 뉴스 형식: "제목 - 출처" 에서 제목만 추출
    const dashIdx = title.lastIndexOf(' - ');
    const actualSource = dashIdx > 0 ? title.slice(dashIdx + 3) : source;
    if (dashIdx > 0) title = title.slice(0, dashIdx);

    if (title.length < 5) continue;

    const url     = linkMatch?.[1]?.trim() ?? '';
    const rawDesc = descMatch?.[1]?.trim() ?? '';
    const summary = rawDesc.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').trim().slice(0, 200);
    const pubDate = dateMatch?.[1]?.trim() ?? '';
    const postedAt = pubDate ? formatPubDate(pubDate) : '최근';

    const category = classifyCategory(title, defaultCategory);
    const tags = extractTags(title);
    const isHot = tags.length >= 2 || ['재판', '한정', '신작'].some(k => title.includes(k));

    items.push({
      category,
      source: actualSource || source,
      source_url: url,
      title,
      summary: summary || `${title}에 관한 최신 소식입니다.`,
      tags,
      posted_at: postedAt,
      comment_count: 0,
      is_hot: isHot,
    });

    if (items.length >= 8) break;
  }

  return items;
}

// ── POST: 크롤링 실행 ─────────────────────────────────────────────────────
export async function POST() {
  const supabase = await createClient();
  const allArticles: ReturnType<typeof parseRSS> = [];
  const errors: string[] = [];

  for (const rss of RSS_SOURCES) {
    try {
      const res = await fetch(rss.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 0 },
      });

      if (!res.ok) {
        errors.push(`${rss.source} HTTP ${res.status}`);
        continue;
      }

      const xml = await res.text();
      const parsed = parseRSS(xml, rss.source, rss.defaultCategory);
      allArticles.push(...parsed);
    } catch (e) {
      errors.push(`${rss.source}: ${e instanceof Error ? e.message : '알 수 없는 오류'}`);
    }
  }

  // 중복 제거 (title 기준)
  const seen = new Set<string>();
  const unique = allArticles.filter(a => {
    if (seen.has(a.title)) return false;
    seen.add(a.title);
    return true;
  });

  if (unique.length === 0) {
    return NextResponse.json({
      message: '수집된 기사 없음 (RSS 접근 실패)',
      errors,
      count: 0,
    });
  }

  // Supabase upsert
  const { data, error } = await supabase
    .from('journal_articles')
    .upsert(unique, { onConflict: 'title', ignoreDuplicates: true })
    .select('id');

  if (error) {
    return NextResponse.json({ error: error.message, errors }, { status: 500 });
  }

  return NextResponse.json({
    message: '크롤링 완료',
    inserted: data?.length ?? 0,
    total: unique.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}

// ── GET: 저장된 기사 조회 ─────────────────────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit    = Number(searchParams.get('limit') ?? '30');

  const supabase = await createClient();

  let query = supabase
    .from('journal_articles')
    .select('*')
    .order('crawled_at', { ascending: false })
    .limit(limit);

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ articles: data ?? [], count: data?.length ?? 0 });
}
