// ─────────────────────────────────────────────────────────
// 건담 등급 정의 — 9개 슬롯 고정
// (route.ts에서 export 불가, 별도 파일로 분리)
// ─────────────────────────────────────────────────────────

export interface GradeInfo {
  id:       string;
  label:    string;       // 표시명
  query:    string;       // 네이버 검색 시 추가할 등급 키워드
  scale:    string;       // 스케일 표시
  badge?:   string;       // 뱃지 색상 클래스
}

export const GUNDAM_GRADES: GradeInfo[] = [
  { id: 'sd',       label: 'SD',           query: 'SD 건담',         scale: '비스케일',  badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { id: 'eg',       label: 'EG',           query: 'Entry Grade EG',  scale: '1/144',    badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  { id: 'hg',       label: 'HG',           query: 'HG 1/144',        scale: '1/144',    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'rg',       label: 'RG',           query: 'RG 1/144',        scale: '1/144',    badge: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
  { id: 'mg',       label: 'MG',           query: 'MG 1/100',        scale: '1/100',    badge: 'bg-brand-500/20 text-brand-400 border-brand-500/30' },
  { id: 'mg_verka', label: 'MG Ver.Ka',    query: 'MG Ver.Ka 1/100', scale: '1/100',    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { id: 'pg',       label: 'PG',           query: 'PG 1/60',         scale: '1/60',     badge: 'bg-decision-buy/20 text-decision-buy border-decision-buy/30' },
  { id: 'ng',       label: '무등급 (NG)',  query: '무등급',           scale: '다양',     badge: 'bg-zinc-600/40 text-zinc-400 border-zinc-500/30' },
  { id: 'limited',  label: '한정판',       query: '한정판 건프라',     scale: '다양',     badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
];
