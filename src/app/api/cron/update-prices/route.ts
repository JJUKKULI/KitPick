import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════════
// Vercel Cron: 매일 03:00 KST 실행 — 전체 등급 네이버 최저가 자동 업데이트
// ═══════════════════════════════════════════════════════════════════

export const maxDuration = 300; // 5분 타임아웃

interface NaverItem {
  title: string;
  lprice: string;
  mallName: string;
  link: string;
  category1?: string;
  category2?: string;
  category3?: string;
  category4?: string;
}

// 프라모델 필터 — /api/price와 동일 로직
const EXCLUDE_KW = ['데칼', '도색', '스티커', '카드', '부품', '사운드칩', '받침대', '도료'];
const GRADE_KW   = ['HG', 'HGUC', 'HGCE', 'RG', 'MG', 'PG', 'EG', 'SD', 'BB전사', 'SD BB'];

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, '');
}

function isPlamoKit(item: NaverItem): boolean {
  const title = stripTags(item.title).toLowerCase();
  const cat   = [item.category1, item.category2, item.category3, item.category4]
    .filter(Boolean).join(' ').toLowerCase();

  if (EXCLUDE_KW.some(k => title.includes(k))) return false;
  if (cat.includes('건프라') || cat.includes('프라모델')) return true;
  return GRADE_KW.some(k => title.toUpperCase().includes(k.toUpperCase()));
}

async function queryNaver(query: string): Promise<NaverItem | null> {
  const clientId     = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=15&sort=asc`;
    const res = await fetch(url, {
      headers: {
        'X-Naver-Client-Id':     clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;

    const data: { items?: NaverItem[] } = await res.json();
    const items = (data.items ?? []).filter(isPlamoKit);
    return items[0] ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  // Vercel Cron 인증 (선택) - CRON_SECRET 환경변수로 보호
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. 업데이트 대상 등급 전체 로드
  const { data: grades, error } = await supabase
    .from('gundam_grades')
    .select('id, grade, naver_query, official_price, gundam_id, current_price')
    .not('naver_query', 'is', null);

  if (error || !grades) {
    return NextResponse.json({ error: 'Failed to fetch grades', detail: error?.message }, { status: 500 });
  }

  const results = { updated: 0, notFound: 0, errors: 0, total: grades.length };

  // 2. 각 등급 순차 조회 (150ms 간격 — 네이버 API 부하 방지)
  for (let i = 0; i < grades.length; i++) {
    const grade = grades[i];
    try {
      const top = await queryNaver(grade.naver_query!);

      if (top?.lprice) {
        const newPrice = parseInt(top.lprice, 10);
        const prevPrice = grade.current_price;

        // 3. gundam_grades 현재가 업데이트
        await supabase
          .from('gundam_grades')
          .update({
            current_price: newPrice,
            last_price_updated: new Date().toISOString(),
          })
          .eq('id', grade.id);

        // 4. price_history_daily에 기록 (30일 차트용)
        await supabase
          .from('price_history_daily')
          .upsert({
            grade_id:     grade.id,
            price:        newPrice,
            mall_name:    top.mallName,
            recorded_at:  new Date().toISOString().slice(0, 10), // YYYY-MM-DD
          }, { onConflict: 'grade_id,recorded_at' });

        results.updated++;
      } else {
        results.notFound++;
      }
    } catch (e) {
      results.errors++;
    }

    // Rate limit 방지 (네이버 API 10회/초 제한)
    if (i < grades.length - 1) {
      await new Promise(r => setTimeout(r, 150));
    }
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    ...results,
  });
}
