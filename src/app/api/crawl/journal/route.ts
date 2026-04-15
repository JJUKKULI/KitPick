import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { runCrawlers } from '@/lib/crawler/processor';

// ── POST: 크롤링 실행 ─────────────────────────────────────────────────────
// body: { sources?: string[], recentDays?: number }
export async function POST(request: Request) {
  const supabase = await createClient();

  let body: { sources?: string[]; recentDays?: number } = {};
  try { body = await request.json(); } catch { /* 기본값 사용 */ }

  const options = {
    recentDays:    body.recentDays  ?? 30,
    sources:       body.sources     ?? ['official', 'shop', 'community', 'journal', 'youtube'],
  };

  const result = await runCrawlers(supabase, options);

  return NextResponse.json({
    message:  result.inserted > 0 ? '크롤링 완료' : '수집된 새 기사 없음',
    inserted: result.inserted,
    total:    result.total,
    skipped:  result.skipped,
    bySource: result.bySource,
    errors:   result.errors.length > 0 ? result.errors : undefined,
  });
}

// ── GET: 저장된 기사 조회 ─────────────────────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category    = searchParams.get('category');
  const sourceType  = searchParams.get('source_type');  // youtube | official | shop | community | journal
  const limit       = Number(searchParams.get('limit') ?? '30');

  const supabase = await createClient();

  let query = supabase
    .from('journal_articles')
    .select('*')
    .order('crawled_at', { ascending: false })
    .limit(limit);

  if (category && category !== 'all') query = query.eq('category', category);
  if (sourceType) query = query.eq('source_type', sourceType);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    articles: data ?? [],
    count:    data?.length ?? 0,
  });
}
