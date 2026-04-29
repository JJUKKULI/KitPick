import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/wishlist/grades?ids=uuid1,uuid2,...
// 관심목록에 담긴 gundam_grades ID 목록으로 상세 정보 일괄 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) return NextResponse.json({ grades: [] });

  const idList = ids.split(',').filter(Boolean).slice(0, 100);
  if (idList.length === 0) return NextResponse.json({ grades: [] });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('gundam_grades')
      .select(`
        id, grade, scale, official_price, current_price,
        decision, reasoning, popularity, stock_status,
        sentiment_positive, sentiment_neutral, sentiment_negative,
        naver_query, release_date,
        gundams (
          id, name, full_name, pilot, image_url,
          gundam_series ( short_name )
        )
      `)
      .in('id', idList);

    if (error) throw error;

    return NextResponse.json({ grades: data ?? [] });
  } catch (e) {
    console.error('[wishlist/grades]', e);
    return NextResponse.json({ grades: [] }, { status: 500 });
  }
}
