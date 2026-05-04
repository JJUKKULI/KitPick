'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Loader2, User, ChevronRight,
  Package, ExternalLink, TrendingDown, Search,
} from 'lucide-react';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import type { DecisionType } from '@/types';

// ── 9개 등급 슬롯 고정 정의 ──────────────────────────────────────────────
const ALL_GRADES = [
  { id: 'sd',      label: 'SD',         scale: '비스케일', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', keywords: ['SD ', ' SD ', 'SD건담', 'BB건담', 'SD BB', 'BB 피규어'] },
  { id: 'eg',      label: 'EG',         scale: '1/144',   badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30', keywords: ['Entry Grade', 'EG '] },
  { id: 'hg',      label: 'HG / HGUC',  scale: '1/144',   badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30', keywords: ['HG ', 'HGUC', 'HGCE', 'HGIBO', 'HG1/', '1/144'] },
  { id: 'rg',      label: 'RG',         scale: '1/144',   badge: 'bg-violet-500/20 text-violet-400 border-violet-500/30', keywords: ['RG '] },
  { id: 'mg',      label: 'MG',         scale: '1/100',   badge: 'bg-brand-500/20 text-brand-400 border-brand-500/30', keywords: ['MG '] },
  { id: 'mg_verka',label: 'MG Ver.Ka',  scale: '1/100',   badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', keywords: ['Ver.Ka', 'ver.ka'] },
  { id: 'pg',      label: 'PG',         scale: '1/60',    badge: 'bg-decision-buy/20 text-decision-buy border-decision-buy/30', keywords: ['PG ', '1/60'] },
  { id: 'ng',      label: '무등급 (NG)', scale: '다양',    badge: 'bg-zinc-600/40 text-zinc-400 border-zinc-500/30', keywords: ['무등급', '1/100 NG'] },
  { id: 'limited', label: '한정판',      scale: '다양',    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30', keywords: ['한정판', 'limited', '특별판', 'PREMIUM'] },
] as const;

type GradeId = typeof ALL_GRADES[number]['id'];

interface DbGrade {
  id: string;
  grade: string;
  scale: string | null;
  official_price: number | null;
  current_price: number | null;
  decision: DecisionType;
  reasoning: string | null;
  stock_status: string;
  release_date: string | null;
  popularity: number;
  naver_query: string | null;
}

interface Gundam {
  id: string;
  name: string;
  full_name: string | null;
  pilot: string | null;
  description: string | null;
  image_url: string | null;
  gundam_series: { name: string; short_name: string } | null;
}

interface NaverResult {
  price: number | null;
  mallName: string;
  link: string;
  status: 'loading' | 'found' | 'not_found' | 'error';
}

function priceLabel(p: number | null) {
  if (!p) return null;
  return `${p.toLocaleString('ko-KR')}원`;
}

// DB 등급 → ALL_GRADES 슬롯 매핑
function matchGradeSlot(dbGrade: string): GradeId | null {
  const g = dbGrade.toLowerCase();
  if (g.includes('ver.ka') || g.includes('ver ka')) return 'mg_verka';
  if (g.startsWith('pg') || g.includes('1/60')) return 'pg';
  if (g.startsWith('rg')) return 'rg';
  if (['mg', 'mg '].some(k => g.startsWith(k)) && !g.includes('ver.ka')) return 'mg';
  if (['hg', 'hguc', 'hgce', 'hgibo'].some(k => g.startsWith(k))) return 'hg';
  if (g.startsWith('eg') || g.includes('entry')) return 'eg';
  if (g.startsWith('sd') || g.includes('bb')) return 'sd';
  if (g.includes('한정') || g.includes('limited')) return 'limited';
  if (g.includes('무등급') || g.includes('ng')) return 'ng';
  return null;
}

export default function GundamDetailPage() {
  const params   = useParams();
  const gundamId = params.gundamId as string;

  const [gundam,    setGundam]    = useState<Gundam | null>(null);
  const [dbGrades,  setDbGrades]  = useState<DbGrade[]>([]);
  const [loading,   setLoading]   = useState(true);
  // 등급 슬롯별 네이버 결과 map: gradeId → NaverResult
  const [naverMap,  setNaverMap]  = useState<Record<string, NaverResult>>({});

  useEffect(() => {
    fetch(`/api/gundam?type=detail&id=${gundamId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) { setGundam(data.gundam); setDbGrades(data.grades ?? []); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [gundamId]);

  // DB 로드 후 → 9개 슬롯 전부 네이버 조회
  useEffect(() => {
    if (!gundam) return;
    const gundamName = gundam.name
      .replace(/^(SD|HG|RG|MG|PG|HGUC|HGCE|EG)\s+/i, '')
      .trim();

    // 초기 loading 상태
    const init: Record<string, NaverResult> = {};
    ALL_GRADES.forEach(g => { init[g.id] = { price: null, mallName: '', link: '', status: 'loading' }; });
    setNaverMap(init);

    // 각 등급 슬롯 순차 네이버 조회 (250ms 간격)
    ALL_GRADES.forEach((slot, i) => {
      // DB에 해당 슬롯 일치 등급이 있으면 그 naver_query 우선 사용
      const matched = dbGrades.find(d => matchGradeSlot(d.grade) === slot.id);
      const query = matched?.naver_query
        ?? buildQuery(slot.id, gundamName);

      setTimeout(async () => {
        try {
          const res = await fetch(`/api/price?query=${encodeURIComponent(query)}&mode=search`);
          if (!res.ok) throw new Error();
          const data = await res.json();
          const top  = (data.results ?? [])[0];

          setNaverMap(prev => ({
            ...prev,
            [slot.id]: top?.price
              ? { price: top.price, mallName: top.mallName, link: top.link, status: 'found' }
              : { price: null, mallName: '', link: '', status: 'not_found' },
          }));
        } catch {
          setNaverMap(prev => ({ ...prev, [slot.id]: { price: null, mallName: '', link: '', status: 'error' } }));
        }
      }, i * 250);
    });
  }, [gundam?.id, dbGrades.length]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
    </div>
  );
  if (!gundam) return <div className="p-10 text-zinc-500">기체를 찾을 수 없습니다.</div>;

  const seriesName = (gundam.gundam_series as any)?.short_name ?? '건담';

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full">
      <Link href="/feed" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> 시리즈 목록
      </Link>

      {/* 기체 소개 */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-12">
        <div className="aspect-square w-full bg-surface border border-surface-border rounded-2xl overflow-hidden flex items-center justify-center">
          {gundam.image_url
            ? <img
                src={gundam.image_url}
                alt={gundam.name}
                className="w-full h-full object-contain p-6"
                onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
              />
            : null}
          <div className={`flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-brand-500/20 to-zinc-900 ${gundam.image_url ? 'hidden' : ''}`}>
            <span className="text-brand-400 font-black text-6xl">
              {gundam.name.replace(/^(RX-|MS-|ZGMF-|GN-|ASW-|XVX-|OZ-|XXXG-)[\d\w-]+ /, '').charAt(0)}
            </span>
            <span className="text-zinc-600 text-xs mt-2">이미지 준비 중</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-brand-400 uppercase tracking-wider font-medium mb-2">{seriesName}</p>
          <h1 className="text-4xl font-bold text-white mb-1">{gundam.name}</h1>
          {gundam.full_name && <p className="text-sm text-zinc-500 mb-4">{gundam.full_name}</p>}
          {gundam.pilot && <p className="text-sm text-zinc-400 mb-4">파일럿: <span className="text-zinc-200">{gundam.pilot}</span></p>}
          {gundam.description && <p className="text-zinc-300 leading-relaxed text-sm">{gundam.description}</p>}
        </div>
      </div>

      {/* 등급별 제품 & 최저가 — 9개 슬롯 항상 표시 */}
      <div>
        <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Package className="w-5 h-5 text-brand-500" />
          등급별 제품 & 최저가
        </h2>
        <p className="text-xs text-zinc-600 mb-5">
          네이버 쇼핑 실시간 조회 · 등급 클릭 시 AI 분석 페이지로 이동
        </p>

        <div className="grid gap-3">
          {ALL_GRADES.map(slot => {
            const naver   = naverMap[slot.id];
            const dbGrade = dbGrades.find(d => matchGradeSlot(d.grade) === slot.id);
            const hasAI   = !!dbGrade?.id && !dbGrade.reasoning?.includes('가격 데이터 수집 중');
            const officialPrice = dbGrade?.official_price;

            return (
              <div key={slot.id}
                className="bg-surface border border-surface-border rounded-xl overflow-hidden hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3 p-4">

                  {/* 등급 뱃지 */}
                  <div className="shrink-0 w-32 text-center">
                    <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${slot.badge}`}>
                      {slot.label}
                    </span>
                    <p className="text-[10px] text-zinc-700 mt-1">{slot.scale}</p>
                  </div>

                  {/* 가격 영역 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-5 flex-wrap">
                      {/* 정가 */}
                      {officialPrice && (
                        <div>
                          <p className="text-[10px] text-zinc-600">반다이 정가</p>
                          <p className="text-sm text-zinc-400 font-medium">{priceLabel(officialPrice)}</p>
                        </div>
                      )}

                      {/* 네이버 최저가 */}
                      <div>
                        <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <TrendingDown className="w-2.5 h-2.5 text-decision-buy" />
                          네이버 최저가
                        </p>
                        {!naver || naver.status === 'loading' ? (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Loader2 className="w-3 h-3 animate-spin text-zinc-600" />
                            <span className="text-xs text-zinc-600">조회 중...</span>
                          </div>
                        ) : naver.status === 'found' && naver.price ? (
                          <a href={naver.link} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                            <span className="text-sm font-bold text-decision-buy">{priceLabel(naver.price)}</span>
                            <span className="text-[10px] text-zinc-500">{naver.mallName}</span>
                            <ExternalLink className="w-3 h-3 text-zinc-600" />
                          </a>
                        ) : (
                          <span className="text-xs text-zinc-600">조회 안됨</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* AI 분석 버튼 */}
                  {dbGrade?.id ? (
                    <Link href={`/gundam/${gundamId}/${dbGrade.id}`}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-surface-raised border border-surface-border rounded-lg text-xs font-medium text-zinc-300 hover:text-brand-400 hover:border-brand-500/40 transition-all">
                      AI 분석 <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <div className="shrink-0 px-3 py-2 text-xs text-zinc-700 border border-zinc-800 rounded-lg">
                      DB 미등록
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 슬롯별 네이버 검색 쿼리 자동 생성
function buildQuery(slotId: GradeId, gundamName: string): string {
  const queries: Record<GradeId, string> = {
    sd:       `SD 건담 ${gundamName} 프라모델 반다이`,
    eg:       `Entry Grade EG 1/144 ${gundamName} 건프라`,
    hg:       `HG 1/144 ${gundamName} 건프라 반다이`,
    rg:       `RG 1/144 ${gundamName} 건프라 반다이`,
    mg:       `MG 1/100 ${gundamName} 건프라 반다이`,
    mg_verka: `MG Ver.Ka 1/100 ${gundamName} 건프라`,
    pg:       `PG 1/60 ${gundamName} 건프라 반다이`,
    ng:       `무등급 ${gundamName} 건프라 1/100`,
    limited:  `${gundamName} 한정판 건프라 반다이`,
  };
  return queries[slotId];
}
