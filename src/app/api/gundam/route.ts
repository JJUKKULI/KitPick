import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/gundam?type=series           → 시리즈 목록
// GET /api/gundam?type=list&series=id   → 시리즈 속 건담 목록
// GET /api/gundam?type=detail&id=id     → 건담 상세 + 등급 목록
// GET /api/gundam?type=grade&id=id      → 등급 상세
// GET /api/gundam?type=search&q=...     → 건담 검색

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type     = searchParams.get('type') ?? 'series';
  const supabase = await createClient();

  // 시리즈 목록
  if (type === 'series') {
    const { data, error } = await supabase
      .from('gundam_series')
      .select('id, name, short_name, description, year, image_url, gundam_count, display_order')
      .order('display_order');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ series: data ?? [] });
  }

  // 시리즈 속 건담 목록
  if (type === 'list') {
    const seriesId = searchParams.get('series');
    if (!seriesId) return NextResponse.json({ error: 'series 필요' }, { status: 400 });

    const [seriesRes, gundamsRes] = await Promise.all([
      supabase.from('gundam_series').select('*').eq('id', seriesId).single(),
      supabase.from('gundams')
        .select('id, name, full_name, pilot, description, image_url, is_featured')
        .eq('series_id', seriesId)
        .order('is_featured', { ascending: false }),
    ]);

    return NextResponse.json({
      series:  seriesRes.data ?? null,
      gundams: gundamsRes.data ?? [],
    });
  }

  // 건담 상세 + 등급 목록
  if (type === 'detail') {
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id 필요' }, { status: 400 });

    const [gundamRes, gradesRes] = await Promise.all([
      supabase.from('gundams')
        .select('*, gundam_series(name, short_name)')
        .eq('id', id)
        .single(),
      supabase.from('gundam_grades')
        .select('*')
        .eq('gundam_id', id)
        .order('release_date', { ascending: true, nullsFirst: false }),
    ]);

    if (!gundamRes.data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      gundam: gundamRes.data,
      grades: gradesRes.data ?? [],
    });
  }

  // 등급 상세 + 30일 가격 이력 + 커뮤니티 통계
  if (type === 'grade') {
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id 필요' }, { status: 400 });

    const [gradeRes, historyRes] = await Promise.all([
      supabase
        .from('gundam_grades')
        .select('*, gundams(id, name, full_name, pilot, description, image_url, gundam_series(name, short_name))')
        .eq('id', id)
        .single(),
      supabase
        .from('price_history_daily')
        .select('price, mall_name, recorded_at')
        .eq('grade_id', id)
        .order('recorded_at', { ascending: false })
        .limit(30),
    ]);

    if (gradeRes.error || !gradeRes.data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // 커뮤니티 통계 (해당 건담의 최신 데이터)
    const gundamId = (gradeRes.data.gundams as any)?.id;
    let communityStats = null;
    if (gundamId) {
      const { data: cs } = await supabase
        .from('community_stats')
        .select('*')
        .eq('gundam_id', gundamId)
        .eq('source', 'ruliweb')
        .order('collected_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      communityStats = cs;
    }

    // 30일 이력 → price_history 포맷 변환 (차트용)
    const history = (historyRes.data ?? [])
      .reverse()
      .map(h => ({ date: h.recorded_at.slice(5), price: h.price }));

    return NextResponse.json({
      grade: {
        ...gradeRes.data,
        price_history_real: history,
        community_stats:    communityStats,
      }
    });
  }

  // 건담 검색
  if (type === 'search') {
    const q = searchParams.get('q') ?? '';
    if (!q.trim()) return NextResponse.json({ gundams: [] });

    const { data, error } = await supabase
      .from('gundams')
      .select('id, name, full_name, pilot, image_url, gundam_series(short_name)')
      .or(`name.ilike.%${q}%,full_name.ilike.%${q}%,pilot.ilike.%${q}%`)
      .limit(10);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ gundams: data ?? [] });
  }

  return NextResponse.json({ error: 'type 파라미터 필요' }, { status: 400 });
}
