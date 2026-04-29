'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ExternalLink, Flame, Bell, Tag, Clock,
  ChevronDown, ChevronUp, Newspaper, Megaphone,
  MessageSquare, Package, RefreshCw, Loader2,
} from 'lucide-react';

type ArticleCategory = 'reprint' | 'release' | 'community' | 'deal';

interface NewsArticle {
  id: string;
  category: ArticleCategory;
  source: string;
  source_url: string | null;
  title: string;
  summary: string | null;
  tags: string[];
  posted_at: string | null;
  comment_count: number;
  is_hot: boolean;
  crawled_at: string;
}

// mock 폴백 데이터
const MOCK_ARTICLES: NewsArticle[] = [
  { id: 'm1', category: 'reprint', source: '반다이 공식', source_url: 'https://www.bandai.co.jp', title: '[공식] HG 에어리얼 리빌드 3차 재판 확정 — 6월 출하 예정', summary: '반다이가 수성의 마녀 시리즈 에어리얼 리빌드의 3차 재판을 공식 발표했습니다.', tags: ['에어리얼 리빌드', 'HG', '재판'], posted_at: '2시간 전', comment_count: 0, is_hot: true, crawled_at: new Date().toISOString() },
  { id: 'm2', category: 'release', source: '반다이 공식', source_url: 'https://www.bandai.co.jp', title: '[신상] MG 데스티니 건담 Spec II Ver.Ka 정식 발표', summary: '오랫동안 소문으로만 돌던 MG 데스티니 Spec II가 마침내 정식 발표됐습니다.', tags: ['데스티니 건담', 'MG', 'Ver.Ka'], posted_at: '5시간 전', comment_count: 312, is_hot: true, crawled_at: new Date().toISOString() },
  { id: 'm3', category: 'community', source: '루리웹', source_url: 'https://bbs.ruliweb.com', title: '윙 건담 EW Ver.Ka 커스텀 도색 후기 — 조회수 12만 돌파', summary: '유명 모델러의 윙 건담 EW 도색 완성작이 커뮤니티에서 화제입니다.', tags: ['윙 건담 EW', '도색', 'MG'], posted_at: '8시간 전', comment_count: 847, is_hot: true, crawled_at: new Date().toISOString() },
  { id: 'm4', category: 'deal', source: '옥션 / 11번가', source_url: 'https://www.auction.co.kr', title: '[특가] 반다이 MG 라인업 최대 30% 세일 — 오늘 자정까지', summary: '국내 오픈마켓에서 반다이 MG 라인업 특가 진행 중. 오늘 자정 종료.', tags: ['세일', 'MG'], posted_at: '11시간 전', comment_count: 203, is_hot: false, crawled_at: new Date().toISOString() },
  { id: 'm5', category: 'community', source: '루리웹', source_url: 'https://bbs.ruliweb.com', title: '나이팅게일 HGUC 재판설 — 반다이 생산 스케줄 유출 루머', summary: '익명 소식통이 반다이 3분기 생산 스케줄에 나이팅게일 HGUC가 포함됐다고 주장했습니다.', tags: ['나이팅게일', 'HGUC', '재판루머'], posted_at: '14시간 전', comment_count: 528, is_hot: false, crawled_at: new Date().toISOString() },
];

const categoryMeta: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  reprint:   { label: '재판 알림',   icon: Bell,          color: 'text-decision-watch',    bg: 'bg-decision-watch/10 border-decision-watch/20' },
  release:   { label: '신작 출시',   icon: Package,       color: 'text-decision-buy',      bg: 'bg-decision-buy/10 border-decision-buy/20' },
  community: { label: '커뮤니티',    icon: MessageSquare, color: 'text-zinc-300',           bg: 'bg-zinc-700/30 border-zinc-600/30' },
  deal:      { label: '특가 / 세일', icon: Tag,           color: 'text-decision-trending', bg: 'bg-decision-trending/10 border-decision-trending/20' },
  review:    { label: '리뷰',        icon: MessageSquare, color: 'text-blue-400',          bg: 'bg-blue-500/10 border-blue-500/20' },
  event:     { label: '이벤트',      icon: Megaphone,     color: 'text-purple-400',        bg: 'bg-purple-500/10 border-purple-500/20' },
  journal:   { label: '저널',        icon: Newspaper,     color: 'text-zinc-300',          bg: 'bg-zinc-700/30 border-zinc-600/30' },
};

type FilterType = 'all' | ArticleCategory;
const filterTabs: { id: FilterType; label: string; icon: React.ElementType }[] = [
  { id: 'all',       label: '전체',      icon: Newspaper },
  { id: 'reprint',   label: '재판 알림', icon: Bell },
  { id: 'release',   label: '신작 출시', icon: Package },
  { id: 'community', label: '커뮤니티',  icon: MessageSquare },
  { id: 'deal',      label: '특가',      icon: Tag },
  { id: 'review',    label: '리뷰',      icon: MessageSquare },
];

function ArticleCard({ article }: { article: NewsArticle }) {
  const [expanded, setExpanded] = useState(false);
  const meta = categoryMeta[article.category];
  const Icon = meta.icon;
  return (
    <article className="bg-surface border border-surface-border rounded-2xl overflow-hidden hover:border-surface-border-light transition-colors">
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${meta.bg} ${meta.color}`}>
              <Icon className="w-3 h-3" />{meta.label}
            </span>
            {article.is_hot && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-500/15 border border-brand-500/30 text-brand-400">
                <Flame className="w-3 h-3" />HOT
              </span>
            )}
            <span className="text-xs text-zinc-600">{article.source}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-zinc-600 shrink-0">
            <Clock className="w-3 h-3" />{article.posted_at ?? '방금 전'}
          </span>
        </div>
        <h2 className="text-sm font-bold text-zinc-100 leading-snug mb-2">{article.title}</h2>
        {article.summary && (
          <>
            <p className={`text-sm text-zinc-400 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>{article.summary}</p>
            <button onClick={() => setExpanded(!expanded)} className="mt-1 flex items-center gap-0.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              {expanded ? <><ChevronUp className="w-3.5 h-3.5" />접기</> : <><ChevronDown className="w-3.5 h-3.5" />더 보기</>}
            </button>
          </>
        )}
        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {(article.tags ?? []).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-raised border border-surface-border text-[11px] text-zinc-500">#{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {article.comment_count > 0 && (
              <span className="flex items-center gap-1 text-xs text-zinc-600">
                <MessageSquare className="w-3.5 h-3.5" />{article.comment_count.toLocaleString()}
              </span>
            )}
            {article.source_url && (
              <a href={article.source_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-brand-400 transition-colors">
                원문 <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function JournalPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [articles,     setArticles]     = useState<NewsArticle[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [crawling,     setCrawling]     = useState(false);
  const [useReal,      setUseReal]      = useState(false);
  const [lastCrawled,  setLastCrawled]  = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '30' });
      if (activeFilter !== 'all') params.set('category', activeFilter);
      const res = await fetch(`/api/crawl/journal?${params}`);
      if (res.ok) {
        const { articles: data } = await res.json();
        if (data && data.length > 0) {
          setArticles(data);
          setUseReal(true);
          setLastCrawled(data[0]?.crawled_at ?? null);
          return;
        }
      }
    } catch { /* 폴백 */ }
    setArticles(MOCK_ARTICLES);
    setUseReal(false);
    setLoading(false);
  }, [activeFilter]);

  useEffect(() => { loadArticles().finally(() => setLoading(false)); }, [loadArticles]);

  async function handleCrawl() {
    setCrawling(true);
    try {
      const res = await fetch('/api/crawl/journal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recentDays: 30 }) });
      const data = await res.json();
      if (res.ok) {
        await loadArticles();
      } else {
        console.error('[crawl]', data.error);
      }
    } catch (e) {
      console.error('[crawl]', e);
    } finally {
      setCrawling(false);
    }
  }

  const hotCount   = articles.filter((a) => a.is_hot).length;
  const todayCount = articles.filter((a) => a.posted_at?.includes('시간') || a.posted_at?.includes('방금')).length;

  return (
    <div className="p-6 lg:p-10 w-full pb-24 md:pb-10">
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-6 h-6 text-brand-500" />
            <h1 className="text-3xl font-bold text-white">서브컬처 저널</h1>
            {useReal && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-decision-buy/10 border border-decision-buy/20 text-decision-buy font-medium">실데이터</span>
            )}
          </div>
          <p className="text-zinc-400">커뮤니티·공식 채널 최신 소식을 한곳에서 모아봐요.</p>
        </div>
        {/* 크롤링 버튼 */}
        <button
          onClick={handleCrawl}
          disabled={crawling}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border bg-surface hover:bg-surface-raised text-sm text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
        >
          {crawling ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {crawling ? '크롤링 중...' : '지금 수집'}
        </button>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: '수집된 소식', value: articles.length, color: 'text-zinc-200' },
          { label: '오늘 새 소식', value: todayCount, color: 'text-decision-buy' },
          { label: '핫 이슈',     value: hotCount,   color: 'text-brand-400' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-surface-border rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {filterTabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                activeFilter === tab.id
                  ? 'bg-surface-raised text-white border-surface-border-light shadow-sm'
                  : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-surface-raised/50 border-transparent hover:border-surface-border'
              }`}>
              <TabIcon className="w-3.5 h-3.5" />{tab.label}
            </button>
          );
        })}
      </div>

      {/* 기사 목록 */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-400 mr-3" />
          <span className="text-sm text-zinc-400">소식 불러오는 중...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.length === 0
            ? <div className="text-center py-20 text-zinc-600">"지금 수집" 버튼을 눌러 최신 소식을 가져오세요.</div>
            : articles.map((article) => <ArticleCard key={article.id} article={article} />)
          }
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-700">
        <Megaphone className="w-3.5 h-3.5" />
        <span>
          {lastCrawled
            ? `마지막 수집: ${new Date(lastCrawled).toLocaleString('ko-KR')} · 출처: 루리웹, 반다이 공식`
            : '출처: 반다이 공식, 디시인사이드, 루리웹 외'}
        </span>
      </div>
    </div>
  );
}
