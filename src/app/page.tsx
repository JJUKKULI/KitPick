'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Hexagon, Activity, BrainCircuit, Target, ArrowRight,
  Zap, TrendingUp, Shield, ChevronRight, Loader2,
} from 'lucide-react';
import { LandingSearch } from '@/components/ui/LandingSearch';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProfileButton } from '@/components/layout/ProfileButton';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { useAuthStore } from '@/store/authStore';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import type { DecisionType } from '@/types';

// ── 서비스 특징 ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Activity,
    title: '가격 추이 추적',
    desc: '네이버 쇼핑 기반 등급별 실시간 최저가 조회 및 30일 가격 변동 차트 제공.',
  },
  {
    icon: BrainCircuit,
    title: 'GPT-4o-mini 구매 분석',
    desc: '가격·재판 이력·커뮤니티 여론을 종합해 Buy/Wait/Watch/Trending 결정을 제시.',
  },
  {
    icon: Target,
    title: '재판 신호 감지',
    desc: '루리웹·커뮤니티 언급량, 가격 상승률로 재판 가능성을 자동 분석합니다.',
  },
];

// ── 4가지 결정 타입 설명 ─────────────────────────────────────────────────────
const DECISION_TYPES = [
  { type: 'buy'      as DecisionType, label: '구매 추천',  desc: '지금이 최적 구매 타이밍', color: 'border-decision-buy/30 bg-decision-buy/5' },
  { type: 'wait'     as DecisionType, label: '기다리세요', desc: '재판·가격 하락 예측됨',     color: 'border-decision-wait/30 bg-decision-wait/5' },
  { type: 'watch'    as DecisionType, label: '지켜보세요', desc: '재고 모니터링 필요',        color: 'border-decision-watch/30 bg-decision-watch/5' },
  { type: 'trending' as DecisionType, label: '트렌딩',     desc: '커뮤니티 급상승 중',        color: 'border-decision-trending/30 bg-decision-trending/5' },
];

// ── DB에서 featured 기체 로드 ────────────────────────────────────────────────
interface FeaturedGundam {
  id: string;
  name: string;
  image_url: string | null;
  gundam_series: { short_name: string } | null;
  gundam_grades: Array<{
    id: string;
    grade: string;
    decision: DecisionType;
    official_price: number | null;
    current_price: number | null;
  }>;
}

export default function HomePage() {
  const { user } = useAuthStore();
  const [featured, setFeatured]   = useState<FeaturedGundam[]>([]);
  const [loading,  setLoading]    = useState(true);

  useEffect(() => {
    fetch('/api/gundam?type=featured&limit=6')
      .then(r => r.ok ? r.json() : { gundams: [] })
      .then(data => setFeatured(data.gundams ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      {/* 헤더 */}
      <header className="h-16 border-b border-surface-border flex items-center justify-between px-6 lg:px-12 sticky top-0 bg-surface-base/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 text-white font-bold tracking-wider">
          <Hexagon className="w-6 h-6 text-brand-500 fill-brand-500/20" />
          <span>KITPICK</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/feed"    className="hover:text-white transition-colors">결정 피드</Link>
          <Link href="/trends"  className="hover:text-white transition-colors">트렌드</Link>
          <Link href="/journal" className="hover:text-white transition-colors">저널</Link>
        </nav>
        {user ? (
          <ProfileButton />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-2">
              로그인
            </Link>
            <Link href="/signup" className="bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              시작하기
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* ── 히어로 ──────────────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-20 px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* 뱃지 */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-xs text-brand-400 font-medium mb-6">
              <Zap className="w-3 h-3" />
              AI 기반 건프라 구매 결정 서비스
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-5 leading-tight">
              지금 사도 될까?
              <br />
              <span className="text-brand-500">AI가 대신 결정해드립니다.</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              가격 추이, 재판 이력, 커뮤니티 여론을 종합분석하여
              <br className="hidden md:block" />
              <strong className="text-zinc-200">Buy · Wait · Watch · Trending</strong> 4가지 결정을 제시합니다.
            </p>

            <LandingSearch />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link href="/feed" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20">
                결정 피드 보기 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/trends" className="w-full sm:w-auto bg-surface-raised hover:bg-surface-overlay border border-surface-border text-zinc-300 hover:text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                트렌드 확인 <TrendingUp className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4가지 결정 타입 ─────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-12 bg-surface border-y border-surface-border">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-sm text-zinc-500 uppercase tracking-widest font-medium mb-8">
              4가지 AI 결정 타입
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DECISION_TYPES.map(({ type, label, desc, color }) => (
                <div key={type} className={`rounded-xl border p-4 text-center ${color}`}>
                  <DecisionBadge decision={type} className="mb-3 mx-auto" />
                  <p className="text-sm font-bold text-white mb-1">{label}</p>
                  <p className="text-xs text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 실시간 피드 (DB 기체) ───────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">인기 건프라 AI 분석</h2>
                <p className="text-zinc-500 text-sm">실시간 데이터 기반 구매 결정</p>
              </div>
              <Link href="/feed" className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 text-sm">
                전체 피드 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-600" />
              </div>
            ) : featured.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((g) => {
                  const topGrade = g.gundam_grades?.[0];
                  return (
                    <Link key={g.id}
                      href={topGrade ? `/gundam/${g.id}/${topGrade.id}` : `/gundam/${g.id}`}
                      className="group bg-surface border border-surface-border rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:-translate-y-0.5">
                      {/* 이미지 */}
                      <div className="h-36 bg-surface-raised border-b border-surface-border flex items-center justify-center overflow-hidden">
                        {g.image_url
                          ? <img src={g.image_url} alt={g.name} className="w-full h-full object-contain p-4" />
                          : <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-brand-500/20 to-zinc-900">
                              <span className="text-brand-400 font-black text-4xl">{g.name.charAt(0)}</span>
                            </div>}
                      </div>
                      {/* 정보 */}
                      <div className="p-4">
                        <p className="text-[11px] text-brand-400 mb-0.5">
                          {(g.gundam_series as any)?.short_name ?? ''}
                        </p>
                        <p className="font-bold text-white text-sm mb-3 truncate">{g.name}</p>
                        {topGrade && (
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-zinc-600">{topGrade.grade}</span>
                              {topGrade.current_price && (
                                <p className="text-xs font-bold text-decision-buy">
                                  {topGrade.current_price.toLocaleString('ko-KR')}원
                                </p>
                              )}
                            </div>
                            <DecisionBadge decision={topGrade.decision} size="sm" />
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              // DB 데이터 없을 때 피드 바로가기 유도
              <div className="text-center py-16 border border-dashed border-surface-border rounded-2xl">
                <p className="text-zinc-400 mb-4">결정 피드에서 건프라 AI 분석을 확인해보세요</p>
                <Link href="/feed" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  피드 보기 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── 서비스 특징 ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-12 bg-surface border-t border-surface-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-2">데이터 기반 구매 결정</h2>
              <p className="text-zinc-500">감이 아닌 근거로 결정하세요</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <div key={i} className="bg-surface-base border border-surface-border p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mb-4 border border-brand-500/20">
                    <f.icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        {!user && (
          <section className="py-20 px-6 lg:px-12">
            <div className="max-w-2xl mx-auto text-center bg-surface border border-surface-border rounded-2xl p-12">
              <Shield className="w-10 h-10 text-brand-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">무료로 시작하기</h2>
              <p className="text-zinc-400 mb-8 text-sm">
                관심 목록 저장, AI 분석 결과, 재판 알림까지
                <br />지금 바로 무료로 이용하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/signup" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                  무료 회원가입
                </Link>
                <Link href="/feed" className="bg-surface-raised border border-surface-border text-zinc-300 hover:text-white px-8 py-3 rounded-xl font-medium transition-colors">
                  먼저 둘러보기
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-surface-border pb-24 md:pb-8 pt-8 px-6 lg:px-12 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider opacity-40">
            <Hexagon className="w-5 h-5" />
            <span>KITPICK</span>
          </div>
          <p className="text-xs text-zinc-700">© 2026 KitPick · 수원대학교 졸업프로젝트</p>
        </div>
      </footer>

      <ScrollToTop />
      <BottomNav />
    </div>
  );
}
