import { NextResponse } from 'next/server';

const NAVER_CLIENT_ID     = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

// ── 건담 등급 정의 ─────────────────────────────────────────────────────────
export interface GradeInfo {
  id:       string;
  label:    string;       // 표시명
  query:    string;       // 네이버 검색 시 추가할 등급 키워드
  scale:    string;       // 스케일 표시
  badge?:   string;       // 뱃지 색상 클래스
}

export const GUNDAM_GRADES: GradeInfo[] = [
  { id: 'sd',       label: 'SD',           query: 'SD 건담',        scale: '비스케일',  badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { id: 'eg',       label: 'EG',           query: 'Entry Grade EG', scale: '1/144',    badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  { id: 'hg',       label: 'HG',           query: 'HG 1/144',       scale: '1/144',    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'rg',       label: 'RG',           query: 'RG 1/144',       scale: '1/144',    badge: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
  { id: 'mg',       label: 'MG',           query: 'MG 1/100',       scale: '1/100',    badge: 'bg-brand-500/20 text-brand-400 border-brand-500/30' },
  { id: 'mg_verka', label: 'MG Ver.Ka',    query: 'MG Ver.Ka 1/100',scale: '1/100',    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { id: 'pg',       label: 'PG',           query: 'PG 1/60',        scale: '1/60',     badge: 'bg-decision-buy/20 text-decision-buy border-decision-buy/30' },
  { id: 'ng',       label: '무등급 (NG)',  query: '무등급',          scale: '다양',     badge: 'bg-zinc-600/40 text-zinc-400 border-zinc-500/30' },
  { id: 'limited',  label: '한정판',       query: '한정판 건프라',   scale: '다양',     badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
];

// ── 등급별 네이버 검색 ────────────────────────────────────────────────────
async function searchGrade(gundamName: string, grade: GradeInfo): Promise<{
  found:    boolean;
  price:    number | null;
  mallName: string;
  link:     string;
  image:    string;
  title:    string;
} | null> {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return null;

  const query = `${grade.query} ${gundamName} 반다이 건프라`;

  try {
    const params = new URLSearchParams({ query, display: '10', sort: 'asc' });
    const res = await fetch(`https://openapi.naver.com/v1/search/shop.json?${params}`, {
      headers: {
        'X-Naver-Client-Id':     NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { found: false, price: null, mallName: '', link: '', image: '', title: '' };

    const data  = await res.json();
    const items = data.items ?? [];

    // 프라모델 카테고리 + 관련 항목만 필터
    const filtered = items.filter((item: any) => {
      const title   = stripTags(item.title ?? '').toLowerCase();
      const cat     = `${item.category1 ?? ''} ${item.category2 ?? ''} ${item.category3 ?? ''}`.toLowerCase();
      const price   = Number(item.lprice);

      if (price === 0) return false;

      // 제외 키워드
      const excludes = ['데칼', '도료', '부품', '스티커', '소설', '카드', 'dvd', '블루레이'];
      if (excludes.some(k => title.includes(k))) return false;

      // 카테고리가 프라모델이거나 제목에 건담명 포함
      const catOk   = cat.includes('건프라') || cat.includes('프라모델') || cat.includes('완구') || cat.includes('취미');
      const titleOk = title.includes(gundamName.toLowerCase().split(' ')[0]);

      return catOk || titleOk;
    });

    if (filtered.length === 0) {
      return { found: false, price: null, mallName: '', link: '', image: '', title: '' };
    }

    const best = filtered[0];
    return {
      found:    true,
      price:    Number(best.lprice),
      mallName: best.mallName ?? '',
      link:     best.link ?? '',
      image:    best.image ?? '',
      title:    stripTags(best.title ?? ''),
    };
  } catch {
    return { found: false, price: null, mallName: '', link: '', image: '', title: '' };
  }
}

// ── GET: 건담명으로 모든 등급 가격 조회 ──────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name   = searchParams.get('name') ?? '';
  // 특정 등급만 조회할 때 (선택)
  const grades = searchParams.get('grades')?.split(',') ?? GUNDAM_GRADES.map(g => g.id);

  if (!name.trim()) {
    return NextResponse.json({ error: '건담 이름이 필요합니다' }, { status: 400 });
  }
  if (!NAVER_CLIENT_ID) {
    return NextResponse.json({ error: 'NAVER_CLIENT_ID 미설정' }, { status: 500 });
  }

  const targetGrades = GUNDAM_GRADES.filter(g => grades.includes(g.id));

  // 병렬로 모든 등급 검색 (API 부하 분산을 위해 약간 간격)
  const results = await Promise.all(
    targetGrades.map(async (grade, i) => {
      // 과도한 병렬 요청 방지 (150ms 간격)
      await new Promise(r => setTimeout(r, i * 150));
      const result = await searchGrade(name, grade);
      return {
        grade: {
          id:    grade.id,
          label: grade.label,
          scale: grade.scale,
          badge: grade.badge,
        },
        found:    result?.found ?? false,
        price:    result?.price ?? null,
        mallName: result?.mallName ?? '',
        link:     result?.link ?? '',
        image:    result?.image ?? '',
        title:    result?.title ?? '',
      };
    })
  );

  return NextResponse.json({ name, results });
}
