'use client';

import Link from 'next/link';
import { Hexagon, Activity, BrainCircuit, Target, ArrowRight } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionCard } from '@/components/product/DecisionCard';
import { LandingSearch } from '@/components/ui/LandingSearch';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProfileButton } from '@/components/layout/ProfileButton';
import { useAuthStore } from '@/store/authStore';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const features = [
  {
    icon: Activity,
    title: '시장 데이터 추적',
    desc: '주요 유통사의 가격 변동, 재고 수준, 과거 트렌드를 모니터링합니다.',
  },
  {
    icon: BrainCircuit,
    title: '커뮤니티 여론 분석',
    desc: 'AI가 커뮤니티 토론, 리뷰, 관심도를 분석해 실제 제품 가치를 측정합니다.',
  },
  {
    icon: Target,
    title: '명확한 결정 제시',
    desc: '감정이 아닌 데이터로 뒷받침된 구매·대기·관망 추천을 드립니다.',
  },
];

export default function HomePage() {
  const { user } = useAuthStore();
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <header className="h-16 border-b border-surface-border flex items-center justify-between px-6 lg:px-12 sticky top-0 bg-surface-base/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 text-white font-bold tracking-wider">
          <Hexagon className="w-6 h-6 text-brand-500 fill-brand-500/20" />
          <span>KITPICK</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/feed"    className="hover:text-white transition-colors">결정 피드</Link>
          <Link href="/trends"  className="hover:text-white transition-colors">트렌드</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">요금제</Link>
        </nav>
        {user ? (
          <ProfileButton />
        ) : (
          <Link href="/feed" className="bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            시작하기
          </Link>
        )}
      </header>

      <main className="flex-grow">
        {/* 히어로 */}
        <section className="relative pt-28 pb-24 px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              뭘 살지 알려드립니다.
              <br />
              <span className="text-gradient">언제 살지도요.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              프라모델 구매 결정을 위한 AI 분석 서비스.
              가격과 재고 예측에서 추측은 그만하고, 더 스마트하게 컬렉션을 완성하세요.
            </p>

            {/* 큰 검색바 */}
            <LandingSearch />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link href="/feed" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20">
                결정 피드 보기 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/trends" className="w-full sm:w-auto bg-surface-raised hover:bg-surface-overlay border border-surface-border text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                트렌드 확인
              </Link>
            </div>
          </div>
        </section>

        {/* 서비스 설명 */}
        <section className="py-24 px-6 lg:px-12 bg-surface border-y border-surface-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">상품 나열이 아닌 결정을 드립니다.</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">수천 개의 데이터를 분석해 명확하고 실행 가능한 구매 조언을 드립니다.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="bg-surface-base border border-surface-border p-8 rounded-2xl">
                  <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center mb-6 border border-brand-500/20">
                    <feature.icon className="w-6 h-6 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최신 결정 */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">최신 결정</h2>
                <p className="text-zinc-400">인기 키트의 실시간 시장 분석.</p>
              </div>
              <Link href="/feed" className="text-brand-500 hover:text-brand-400 font-medium flex items-center gap-1 text-sm">
                전체 보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, i) => (
                <DecisionCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-border pb-24 md:pb-12 pt-12 px-6 lg:px-12 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider opacity-50">
            <Hexagon className="w-5 h-5" />
            <span>KITPICK</span>
          </div>
          <p className="text-sm text-zinc-600">© 2024 KitPick. All rights reserved.</p>
        </div>
      </footer>
      <ScrollToTop />
      <BottomNav />
    </div>
  );
}
