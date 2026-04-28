'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Sparkles, MessageSquare, TrendingUp, TrendingDown,
  Calendar, Bookmark, Loader2, RefreshCw, ShoppingCart,
  RotateCcw, AlertCircle, ExternalLink, Package,
} from 'lucide-react';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { PriceTrendChart } from '@/components/ui/PriceTrendChart';
import { SentimentBar } from '@/components/ui/SentimentBar';
import { HypeScore } from '@/components/ui/HypeScore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/components/ui/Toast';
import type { DecisionType } from '@/types';

interface GradeData {
  id: string;
  grade: string;
  scale: string | null;
  official_price: number | null;
  current_price: number | null;
  naver_query: string | null;
  release_date: string | null;
  decision: DecisionType;
  reasoning: string | null;
  ai_insight: string | null;
  popularity: number;
  sentiment_positive: number;
  sentiment_neutral: number;
  sentiment_negative: number;
  price_history: { date: string; price: number }[];
  reprint_history: { date: string; note: string }[];
  stock_status: string;
  image_url: string | null;
  price_history_real?: { date: string; price: number }[];
  community_stats?: {
    mention_count: number;
    sentiment_positive: number;
    sentiment_neutral: number;
    sentiment_negative: number;
    top_comments: Array<{ title: string; recommend: number; views: number; url: string }>;
    collected_at: string;
  } | null;
  gundams: {
    id: string;
    name: string;
    full_name: string | null;
    pilot: string | null;
    description: string | null;
    image_url: string | null;
    gundam_series: { name: string; short_name: string } | null;
  };
}

interface NaverItem { title: string; price: number; mallName: string; link: string; image: string; }
interface AnalyzeResult { decision: DecisionType; reasoning: string; aiInsight: string; confidence: number; buyTarget: string; keyRisks: string[]; }
interface GradeResult { grade: { id: string; label: string; scale: string; badge?: string }; found: boolean; price: number | null; mallName: string; link: string; }

const STOCK_LABEL: Record<string, { label: string; color: string }> = {
  in_stock:     { label: '재고 있음',   color: 'text-decision-buy' },
  low_stock:    { label: '재고 부족',   color: 'text-decision-wait' },
  out_of_stock: { label: '품절',        color: 'text-brand-400' },
  preorder:     { label: '예약 판매',   color: 'text-decision-watch' },
  unknown:      { label: '재고 미확인', color: 'text-zinc-500' },
};

function priceLabel(p: number | null | undefined) {
  if (!p) return '-';
  return p >= 1000 ? `${p.toLocaleString('ko-KR')}원` : `$${p.toFixed(2)}`;
}



export default function GradeDetailPage() {
  const params   = useParams();
  const gundamId = params.gundamId as string;
  const gradeId  = params.gradeId  as string;

  const { toggle, isWished } = useWishlistStore();
  const { user } = useAuthStore();

  const [gradeData,  setGradeData]  = useState<GradeData | null>(null);
  const [naverItems, setNaverItems] = useState<NaverItem[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [aiResult,   setAiResult]   = useState<AnalyzeResult | null>(null);
  const [analyzing,  setAnalyzing]  = useState(false);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch(`/api/gundam?type=grade&id=${gradeId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.grade) setGradeData(data.grade); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [gradeId]);

  // 네이버 최저가 로드
  useEffect(() => {
    if (!gradeData) return;
    const q = gradeData.naver_query ?? `${gradeData.grade} ${gradeData.gundams?.name} 건프라`;
    fetch(`/api/price?query=${encodeURIComponent(q)}&mode=search`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.results) setNaverItems(data.results.slice(0, 5)); })
      .catch(() => {});
  }, [gradeData?.id]);

  const wished = mounted && gradeData ? isWished(gradeData.id) : false;
  const currentDecision  = aiResult?.decision  ?? gradeData?.decision  ?? 'watch';
  const currentReasoning = aiResult?.reasoning ?? gradeData?.reasoning ?? '';
  const currentInsight   = aiResult?.aiInsight ?? gradeData?.ai_insight ?? '';

  async function handleAnalyze() {
    if (!gradeData || analyzing) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId:     gradeData.id,
          name:          `${gradeData.grade} ${gradeData.gundams?.name}`,
          grade:         gradeData.grade,
          series:        (gradeData.gundams?.gundam_series as any)?.short_name ?? '건담',
          price:         gradeData.current_price ?? gradeData.official_price ?? 0,
          previousPrice: gradeData.official_price ?? 0,
          officialPrice: gradeData.official_price,
          priceHistory:  gradeData.price_history ?? [],
          sentiment:     { positive: gradeData.sentiment_positive, neutral: gradeData.sentiment_neutral, negative: gradeData.sentiment_negative },
          popularity:    gradeData.popularity,
          communityComments: [],
          releaseDate:   gradeData.release_date,
          stockStatus:   gradeData.stock_status,
          reprintHistory: gradeData.reprint_history ?? [],
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast('error', 'AI 분석 실패', data.error); return; }
      setAiResult(data);
      toast('success', 'AI 분석 완료!', `${data.decision.toUpperCase()} · 신뢰도 ${data.confidence}%`);
    } catch { toast('error', '오류 발생'); }
    finally { setAnalyzing(false); }
  }

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>;
  if (!gradeData) return <div className="p-10 text-zinc-500">등급 정보를 찾을 수 없습니다.</div>;

  const gundam       = gradeData.gundams;
  const seriesName   = (gundam?.gundam_series as any)?.short_name ?? '건담';
  const officialPrice = gradeData.official_price ?? 0;
  const currentPrice  = gradeData.current_price ?? officialPrice;
  const premiumRate   = officialPrice > 0 ? (((currentPrice - officialPrice) / officialPrice) * 100).toFixed(1) : null;
  const isPremium     = premiumRate !== null && Number(premiumRate) > 5;
  const isDiscount    = premiumRate !== null && Number(premiumRate) < -3;
  const stock         = STOCK_LABEL[gradeData.stock_status] ?? STOCK_LABEL.unknown;
  const displayImage  = gradeData.image_url ?? gundam?.image_url;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      {/* 네비 */}
      <div className="flex items-center justify-between mb-8">
        <Link href={`/gundam/${gundamId}`} className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> {gundam?.name} 등급 목록
        </Link>
        <button
          onClick={() => { toggle(gradeData.id, user?.id); toast(wished ? 'info' : 'success', wished ? '관심 목록 해제' : '관심 목록 추가', `${gradeData.grade} ${gundam?.name}`); }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${wished ? 'bg-brand-500/15 border-brand-500/40 text-brand-400' : 'bg-surface-raised border-surface-border text-zinc-400 hover:text-brand-400'}`}>
          <Bookmark className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
          {wished ? '관심 목록 해제' : '관심 목록 추가'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
        {/* 왼쪽 */}
        <div className="space-y-6">
          {/* 이미지 */}
          <div className="aspect-[3/4] w-full bg-gradient-to-br from-surface-raised to-surface-overlay rounded-2xl border border-surface-border relative overflow-hidden flex items-center justify-center">
            {displayImage
              ? <img src={displayImage} alt={gundam?.name} className="w-full h-full object-contain p-4" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
              : <Package className="w-16 h-16 text-zinc-700" />}
            <div className="absolute top-3 left-3 bg-surface-overlay/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-surface-border">{gradeData.grade}</div>
            <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-surface-overlay/90 border border-surface-border ${stock.color}`}>{stock.label}</div>
          </div>

          {/* 네이버 최저가 — 항상 표시 */}
          <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-zinc-400" />{gradeData.grade} {gundam?.name} 최저가
              </h3>
              {naverItems.length > 0 && <span className="text-xs text-zinc-600">{naverItems.length}개 쇼핑몰</span>}
            </div>
            {naverItems.length > 0 ? (
              <div className="divide-y divide-surface-border">
                {naverItems.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 hover:bg-surface-raised transition-colors group">
                    <div className="flex items-center gap-2 min-w-0">
                      {i === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-decision-buy/10 text-decision-buy border border-decision-buy/20 font-bold shrink-0">최저</span>}
                      <span className="text-sm text-zinc-300 truncate">{item.mallName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-sm font-bold ${i===0 ? 'text-decision-buy' : 'text-white'}`}>{priceLabel(item.price)}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="px-4 py-5 text-center">
                <p className="text-sm text-zinc-600">네이버 쇼핑 연동 중...</p>
                <p className="text-xs text-zinc-700 mt-1">잠시 후 자동으로 최저가가 표시됩니다</p>
              </div>
            )}
          </div>

          {/* 재판 이력 */}
          {gradeData.reprint_history?.length > 0 && (
            <div className="bg-surface border border-surface-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><RotateCcw className="w-4 h-4 text-zinc-400" />재판 이력</h3>
              <div className="space-y-2">
                {gradeData.reprint_history.map((r, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-zinc-500">{r.date}</span>
                    <span className="text-zinc-300">{r.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 커뮤니티 주요 의견 — 루리웹 실데이터 */}
          <div className="bg-surface border border-surface-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-zinc-400" />루리웹 주요 의견
              </h3>
              {gradeData.community_stats?.mention_count && (
                <span className="text-[10px] text-zinc-600">언급 {gradeData.community_stats.mention_count}건</span>
              )}
            </div>
            {gradeData.community_stats?.top_comments?.length ? (
              <div className="space-y-2">
                {gradeData.community_stats.top_comments.map((c, i) => (
                  <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-surface-raised border border-surface-border hover:border-brand-500/30 transition-colors group">
                    <p className="text-xs text-zinc-200 line-clamp-2 group-hover:text-white">{c.title}</p>
                    <div className="flex gap-3 mt-1.5 text-[10px] text-zinc-600">
                      <span>추천 {c.recommend}</span>
                      <span>조회 {c.views.toLocaleString()}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-600 italic text-center py-4">
                수집된 커뮤니티 데이터가 없습니다
                <br />
                <span className="text-[10px]">Cron 작업 실행 후 자동 수집됩니다</span>
              </p>
            )}
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="space-y-6">
          {/* 헤더 */}
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-sm font-medium text-brand-400 uppercase tracking-wider">{seriesName}</span>
              {gradeData.release_date && (
                <><span className="w-1 h-1 rounded-full bg-zinc-700" /><span className="text-sm text-zinc-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(gradeData.release_date).getFullYear()}년 발매</span></>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">{gundam?.name}</h1>
            <p className="text-zinc-500 text-sm mb-4">{gradeData.grade} {gradeData.scale ? `· ${gradeData.scale}` : ''}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <DecisionBadge decision={currentDecision} size="lg" />
              {aiResult && <span className="text-xs text-zinc-500 bg-surface-raised px-2.5 py-1 rounded-full border border-surface-border">AI 분석 · 신뢰도 {aiResult.confidence}%</span>}
            </div>
          </div>

          {/* 가격 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium flex items-center gap-1"><ShoppingCart className="w-3 h-3" />현재 최저가</div>
              <div className="text-2xl font-bold text-white mb-1">{priceLabel(currentPrice)}</div>
              {premiumRate !== null && (
                <div className={`text-xs font-medium flex items-center gap-1 ${isPremium ? 'text-brand-400' : isDiscount ? 'text-decision-buy' : 'text-zinc-500'}`}>
                  {isPremium ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  정가 대비 {isPremium ? '+' : ''}{premiumRate}%
                </div>
              )}
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1 font-medium">공식 정가</div>
              <div className="text-2xl font-bold text-zinc-300 mb-1">{priceLabel(officialPrice)}</div>
              <div className="text-xs text-zinc-600">반다이 희망소비자가</div>
            </div>
            <div className="bg-surface border border-surface-border rounded-xl p-4 col-span-2 md:col-span-1">
              <div className="text-xs text-zinc-500 mb-2 font-medium">커뮤니티 관심도</div>
              <HypeScore score={gradeData.popularity} label="" />
            </div>
          </div>

          {/* 여론 */}
          <div className="bg-surface border border-surface-border rounded-xl p-5">
            <div className="text-xs text-zinc-500 mb-3 font-medium">커뮤니티 여론 분포</div>
            <SentimentBar positive={gradeData.sentiment_positive} neutral={gradeData.sentiment_neutral} negative={gradeData.sentiment_negative} />
            <div className="flex justify-between mt-2 text-xs text-zinc-600">
              <span>긍정 {gradeData.sentiment_positive}%</span>
              <span>중립 {gradeData.sentiment_neutral}%</span>
              <span>부정 {gradeData.sentiment_negative}%</span>
            </div>
          </div>

          {/* 구매 결정 요약 */}
          {currentReasoning && !currentReasoning.includes('가격 데이터 수집 중') && (
            <div className="bg-surface border border-surface-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">구매 결정 요약</h3>
              <p className="text-sm text-zinc-200 leading-relaxed">{currentReasoning}</p>
            </div>
          )}
          {currentReasoning?.includes('가격 데이터 수집 중') && !aiResult && (
            <div className="bg-surface border border-surface-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">💡 이 기체의 분석을 시작하려면</h3>
              <ol className="text-sm text-zinc-400 leading-relaxed space-y-1 list-decimal list-inside">
                <li>좌측 <span className="text-brand-400">등급별 최저가 → 가격 조회</span> 버튼으로 네이버 최저가 확인</li>
                <li>우측 <span className="text-brand-400">AI 분석</span> 버튼으로 구매 결정 받기</li>
              </ol>
            </div>
          )}

          {/* AI 인사이트 */}
          <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-brand-400 flex items-center gap-2"><Sparkles className="w-4 h-4" />AI 시장 인사이트</h3>
              <button onClick={handleAnalyze} disabled={analyzing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-60 bg-brand-500/10 border-brand-500/30 text-brand-400 hover:bg-brand-500/20">
                {analyzing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />분석 중...</> : <><RefreshCw className="w-3.5 h-3.5" />{aiResult ? '재분석' : 'AI 분석'}</>}
              </button>
            </div>
            {analyzing
              ? <div className="flex items-center gap-3 py-4"><Loader2 className="w-5 h-5 text-brand-400 animate-spin shrink-0" /><p className="text-sm text-zinc-300">GPT-4o-mini 분석 중...</p></div>
              : <p className="text-zinc-300 leading-relaxed text-sm">{currentInsight || '분석 버튼을 눌러 AI 인사이트를 확인하세요.'}</p>}
            {aiResult && !analyzing && (
              <div className="mt-4 pt-4 border-t border-brand-500/10 space-y-2">
                {aiResult.buyTarget && <div className="flex items-center gap-2 text-xs"><ShoppingCart className="w-3.5 h-3.5 text-decision-buy" /><span className="text-zinc-400">목표 구매가:</span><span className="text-decision-buy font-medium">{aiResult.buyTarget}</span></div>}
                {aiResult.keyRisks?.length > 0 && <div className="flex items-start gap-2 text-xs"><AlertCircle className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" /><span className="text-zinc-500">{aiResult.keyRisks.join(' · ')}</span></div>}
                <p className="text-[11px] text-zinc-600">GPT-4o-mini · 신뢰도 {aiResult.confidence}%</p>
              </div>
            )}
          </div>

          {/* 가격 추이 — 실데이터(price_history_daily) 우선 */}
          {(() => {
            const real = gradeData.price_history_real ?? [];
            const fallback = gradeData.price_history ?? [];
            const chartData = real.length >= 2 ? real : fallback;
            if (chartData.length === 0) return null;
            return (
              <div className="bg-surface border border-surface-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-zinc-400" />
                    가격 추이
                    {real.length >= 2 && <span className="text-[10px] text-decision-buy">· 실데이터 {real.length}일</span>}
                  </h3>
                  <div className="flex gap-3 text-xs text-zinc-600">
                    <span>최저 {priceLabel(Math.min(...chartData.map(h => h.price)))}</span>
                    <span>최고 {priceLabel(Math.max(...chartData.map(h => h.price)))}</span>
                  </div>
                </div>
                <PriceTrendChart data={chartData} />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
