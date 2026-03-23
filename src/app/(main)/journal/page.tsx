'use client';

import { useState } from 'react';
import {
  BookOpen, ExternalLink, Flame, Bell,
  Tag, Clock, ChevronDown, ChevronUp,
  Newspaper, Megaphone, MessageSquare, Package,
} from 'lucide-react';

type ArticleCategory = 'reprint' | 'release' | 'community' | 'deal';

interface NewsArticle {
  id: string;
  category: ArticleCategory;
  source: string;
  sourceUrl: string;
  title: string;
  summary: string;
  tags: string[];
  postedAt: string;
  commentCount?: number;
  isHot?: boolean;
}

const mockArticles: NewsArticle[] = [
  { id: 'a1', category: 'reprint', source: '반다이 공식', sourceUrl: 'https://www.bandai.co.jp', title: '[공식] HG 에어리얼 리빌드 3차 재판 확정 — 6월 출하 예정', summary: '반다이가 수성의 마녀 시리즈 인기 키트인 에어리얼 리빌드의 3차 재판을 공식 발표했습니다. 6월 중 대규모 물량이 풀릴 예정으로, 현재 프리미엄 가격에 구매하는 것은 손해입니다.', tags: ['에어리얼 리빌드', '수성의 마녀', 'HG', '재판'], postedAt: '2시간 전', isHot: true },
  { id: 'a2', category: 'release', source: '반다이 공식', sourceUrl: 'https://www.bandai.co.jp', title: '[신상] MG 데스티니 건담 Spec II Ver.Ka 정식 발표', summary: '오랫동안 소문으로만 돌던 MG 데스티니 Spec II가 마침내 정식 발표됐습니다. Ver.Ka 버전으로 출시 예정이며, 내달 예약 시작 예정. 초도 한정 특전 포함.', tags: ['데스티니 건담', 'MG', 'Ver.Ka', '신작'], postedAt: '5시간 전', isHot: true, commentCount: 312 },
  { id: 'a3', category: 'community', source: '건프라 갤러리 (디시)', sourceUrl: 'https://gall.dcinside.com', title: '윙 건담 EW Ver.Ka 커스텀 도색 후기 — 조회수 12만 돌파', summary: '유명 모델러의 윙 건담 EW 도색 완성작이 커뮤니티에서 화제입니다. 해당 게시물 이후 윙 EW 검색량이 폭증했고, 각 쇼핑몰 재고가 빠르게 소진 중입니다.', tags: ['윙 건담 EW', '도색', '커스텀', 'MG'], postedAt: '8시간 전', commentCount: 847, isHot: true },
  { id: 'a4', category: 'deal', source: '옥션 / 11번가', sourceUrl: 'https://www.auction.co.kr', title: '[특가] 반다이 MG 라인업 최대 30% 세일 — 오늘 자정까지', summary: '국내 주요 오픈마켓에서 반다이 MG 라인업 특가 진행 중입니다. 사자비 Ver.Ka, 제타 건담 Ver.Ka 포함 다수 키트가 30% 할인 적용 중이며 오늘 자정 종료.', tags: ['세일', 'MG', '사자비', '제타 건담'], postedAt: '11시간 전', commentCount: 203 },
  { id: 'a5', category: 'community', source: '루리웹', sourceUrl: 'https://www.ruliweb.com', title: '나이팅게일 HGUC 재판설 — 반다이 생산 스케줄 유출 루머', summary: '익명 소식통이 반다이 3분기 생산 스케줄에 나이팅게일 HGUC가 포함됐다고 주장했습니다. 공식 확인은 없으나 커뮤니티 신뢰도 높은 제보자로 알려져 있어 주목받고 있습니다.', tags: ['나이팅게일', 'HGUC', '재판루머'], postedAt: '14시간 전', commentCount: 528 },
  { id: 'a6', category: 'release', source: '반다이 공식', sourceUrl: 'https://www.bandai.co.jp', title: '[예약] RG 사자비 1/144 예약 시작 — 9월 출하', summary: 'RG 스케일의 사자비가 드디어 발표됐습니다. 1/144 스케일임에도 내부 프레임 정밀도가 높으며, 9월 출하 예정으로 현재 예약 진행 중입니다.', tags: ['사자비', 'RG', '1/144', '예약'], postedAt: '1일 전', commentCount: 681 },
  { id: 'a7', category: 'community', source: '건담 베이스 SNS', sourceUrl: 'https://twitter.com', title: '건담 베이스 도쿄 한정 HG 칼리번 — 통판 추첨 시작', summary: '건담 베이스 도쿄 한정판 HG 칼리번(클리어 버전)의 온라인 추첨 판매가 시작됐습니다. 해외 구매대행 수요가 급증하고 있어 빠른 신청이 필요합니다.', tags: ['칼리번', '한정판', '건담베이스', '추첨'], postedAt: '1일 전', commentCount: 274 },
  { id: 'a8', category: 'deal', source: '어미새 (아마존 JP)', sourceUrl: 'https://www.amazon.co.jp', title: 'Amazon JP 골든위크 세일 — 건프라/피규어 최대 40% 할인 예고', summary: '아마존 재팬이 골든위크 기간 대규모 세일을 예고했습니다. 건프라 PG/MG 라인과 피규어 프라이즈 제품군 다수가 포함될 예정입니다.', tags: ['아마존JP', '골든위크', '세일', '직구'], postedAt: '2일 전', commentCount: 415 },
  { id: 'a9', category: 'reprint', source: '프라이즈 정보 블로그', sourceUrl: 'https://prizetoys.blog', title: 'Ex-S 건담 MG 4차 재판 확인 — Q4 생산 예정', summary: '오랜 품절 상태였던 Ex-S 건담 MG가 4분기 재판 예정임이 확인됐습니다. 현재 2차 시장 가격은 여전히 높지만 재판 이후 가격 안정화가 예상됩니다.', tags: ['Ex-S 건담', 'MG', '재판'], postedAt: '2일 전', commentCount: 189 },
];

const categoryMeta: Record<ArticleCategory, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  reprint:   { label: '재판 알림',   icon: Bell,          color: 'text-decision-watch',    bg: 'bg-decision-watch/10 border-decision-watch/20' },
  release:   { label: '신작 출시',   icon: Package,       color: 'text-decision-buy',      bg: 'bg-decision-buy/10 border-decision-buy/20' },
  community: { label: '커뮤니티',    icon: MessageSquare, color: 'text-zinc-300',           bg: 'bg-zinc-700/30 border-zinc-600/30' },
  deal:      { label: '특가 / 세일', icon: Tag,           color: 'text-decision-trending', bg: 'bg-decision-trending/10 border-decision-trending/20' },
};

type FilterType = 'all' | ArticleCategory;

const filterTabs: { id: FilterType; label: string; icon: React.ElementType }[] = [
  { id: 'all',       label: '전체',      icon: Newspaper },
  { id: 'reprint',   label: '재판 알림', icon: Bell },
  { id: 'release',   label: '신작 출시', icon: Package },
  { id: 'community', label: '커뮤니티',  icon: MessageSquare },
  { id: 'deal',      label: '특가',      icon: Tag },
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
            {article.isHot && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-500/15 border border-brand-500/30 text-brand-400">
                <Flame className="w-3 h-3" />HOT
              </span>
            )}
            <span className="text-xs text-zinc-600">{article.source}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-zinc-600 shrink-0">
            <Clock className="w-3 h-3" />{article.postedAt}
          </span>
        </div>

        <h2 className="text-sm font-bold text-zinc-100 leading-snug mb-2">{article.title}</h2>

        <p className={`text-sm text-zinc-400 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
          {article.summary}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex items-center gap-0.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          {expanded
            ? <><ChevronUp className="w-3.5 h-3.5" />접기</>
            : <><ChevronDown className="w-3.5 h-3.5" />더 보기</>}
        </button>

        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {article.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-raised border border-surface-border text-[11px] text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {article.commentCount !== undefined && (
              <span className="flex items-center gap-1 text-xs text-zinc-600">
                <MessageSquare className="w-3.5 h-3.5" />{article.commentCount.toLocaleString()}
              </span>
            )}
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-brand-400 transition-colors">
              원문 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function JournalPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered = activeFilter === 'all'
    ? mockArticles
    : mockArticles.filter((a) => a.category === activeFilter);

  const hotCount   = mockArticles.filter((a) => a.isHot).length;
  const todayCount = mockArticles.filter((a) => a.postedAt.includes('시간')).length;

  return (
    <div className="p-6 lg:p-10 w-full pb-24 md:pb-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="w-6 h-6 text-brand-500" />
          <h1 className="text-3xl font-bold text-white">서브컬처 저널</h1>
        </div>
        <p className="text-zinc-400">커뮤니티·공식 채널 최신 소식을 한곳에서 모아봐요.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: '수집된 소식', value: mockArticles.length, color: 'text-zinc-200' },
          { label: '오늘 새 소식', value: todayCount, color: 'text-decision-buy' },
          { label: '핫 이슈',     value: hotCount,   color: 'text-brand-400' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-surface-border rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

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

      <div className="space-y-3">
        {filtered.length === 0
          ? <div className="text-center py-20 text-zinc-600">해당 카테고리의 소식이 없습니다.</div>
          : filtered.map((article) => <ArticleCard key={article.id} article={article} />)
        }
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-700">
        <Megaphone className="w-3.5 h-3.5" />
        <span>매 1시간마다 자동 업데이트 · 출처: 반다이 공식, 디시인사이드, 루리웹, 아마존JP 외</span>
      </div>
    </div>
  );
}
