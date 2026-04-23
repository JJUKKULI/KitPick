-- =====================================================
-- KitPick 정확한 반다이 공식 정가 업데이트
-- (반다이 일본 희망소비자가 기준 × 10 = 원화 환산)
-- seed_gundam.sql + seed_gundam_full.sql 실행 후 이 파일 실행
-- =====================================================

-- ════════════════════════════════════════════════════
-- 1. 기존 상세 등급 데이터 정가 수정 (seed_gundam.sql 기반)
-- ════════════════════════════════════════════════════

-- ── RX-78-2 건담 ─────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 5500, naver_query = 'SD BB #225 RX-78-2 건담 반다이 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-78-2 건담' AND gg.grade = 'SD';

UPDATE public.gundam_grades gg
SET official_price = 8800, naver_query = 'Entry Grade EG RX-78-2 건담 1/144 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-78-2 건담' AND gg.grade = 'EG';

UPDATE public.gundam_grades gg
SET official_price = 13200, naver_query = 'HGUC 1/144 RX-78-2 건담 리바이브 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-78-2 건담' AND gg.grade = 'HG';

UPDATE public.gundam_grades gg
SET official_price = 22000, naver_query = 'RG 1/144 RX-78-2 건담 반다이 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-78-2 건담' AND gg.grade = 'RG';

UPDATE public.gundam_grades gg
SET official_price = 44000, naver_query = 'MG 1/100 RX-78-2 건담 Ver.3.0 반다이 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-78-2 건담' AND gg.grade = 'MG';

UPDATE public.gundam_grades gg
SET official_price = 198000, naver_query = 'PG UNLEASHED 1/60 RX-78-2 건담 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-78-2 건담' AND gg.grade = 'PG';

-- ── 유니콘 건담 ───────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 13200, naver_query = 'HGUC 1/144 유니콘 건담 데스트로이모드 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '유니콘 건담' AND gg.grade = 'HG';

UPDATE public.gundam_grades gg
SET official_price = 33000, naver_query = 'RG 1/144 유니콘 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '유니콘 건담' AND gg.grade = 'RG';

UPDATE public.gundam_grades gg
SET official_price = 55000, naver_query = 'MG 1/100 유니콘 건담 Ver.Ka 반다이 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '유니콘 건담' AND gg.grade = 'MG';

UPDATE public.gundam_grades gg
SET official_price = 330000, naver_query = 'PG 1/60 유니콘 건담 반다이 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '유니콘 건담' AND gg.grade = 'PG';

-- ── 프리덤 건담 ───────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 13200, naver_query = 'HG 1/144 프리덤 건담 SEED 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '프리덤 건담' AND gg.grade = 'HG';

UPDATE public.gundam_grades gg
SET official_price = 44000, naver_query = 'MG 1/100 프리덤 건담 Ver2.0 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '프리덤 건담' AND gg.grade = 'MG';

UPDATE public.gundam_grades gg
SET official_price = 198000, naver_query = 'PG 1/60 프리덤 건담 건프라 반다이 SEED'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '프리덤 건담' AND gg.grade = 'PG';

-- ── 건담 에어리얼 ─────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 22000, naver_query = 'HG 1/144 건담 에어리얼 수성의마녀 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 에어리얼' AND gg.grade = 'HG';

UPDATE public.gundam_grades gg
SET official_price = 22000, naver_query = 'HG 1/144 에어리얼 리빌드 수성의마녀 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 에어리얼' AND gg.grade = 'HG (리빌드)';

-- ── 데스티니 건담 ─────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 13200, naver_query = 'HG 1/144 데스티니 건담 SEED DESTINY 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '데스티니 건담' AND gg.grade = 'HG';

UPDATE public.gundam_grades gg
SET official_price = 66000, naver_query = 'MG 1/100 데스티니 건담 Spec2 Ver.Ka 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '데스티니 건담' AND gg.grade = 'MG';

-- ── 나이팅게일 ────────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 44000, naver_query = 'HGUC 1/144 나이팅게일 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '나이팅게일' AND gg.grade = 'HGUC';

-- ── ν건담 ─────────────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 22000, naver_query = 'HGUC 1/144 뉴건담 ν건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'ν건담' AND gg.grade = 'HGUC';

UPDATE public.gundam_grades gg
SET official_price = 55000, naver_query = 'MG 1/100 뉴건담 Nu건담 Ver.Ka 반다이 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'ν건담' AND gg.grade = 'MG Ver.Ka';

-- ── 윙 건담 EW ────────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg
SET official_price = 17600, naver_query = 'HG 1/144 윙건담 EW 무한의왈츠 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '윙 건담 EW' AND gg.grade = 'HG';

UPDATE public.gundam_grades gg
SET official_price = 55000, naver_query = 'MG 1/100 윙건담 EW 무한의왈츠 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '윙 건담 EW' AND gg.grade = 'MG';

-- ════════════════════════════════════════════════════
-- 2. seed_grades_all.sql 스텁 정가 정확하게 재설정
--    (시리즈별 대표 정가 + 기체별 특수 케이스)
-- ════════════════════════════════════════════════════

-- ── 퍼스트 건담 시리즈 ───────────────────────────────────────────────────
-- 샤아 전용 자쿠
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HGUC 1/144 샤아 전용 자쿠 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '샤아 전용 자쿠' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 27500, naver_query = 'MG 1/100 샤아 전용 자쿠 Ver.2.0 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '샤아 전용 자쿠' AND gg.grade = 'MG';

-- RGM-79 짐
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HGUC 1/144 짐 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RGM-79 짐' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 27500, naver_query = 'MG 1/100 짐 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RGM-79 짐' AND gg.grade = 'MG';

-- 건캐논
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HGUC 1/144 건캐논 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-77-2 건캐논' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 27500, naver_query = 'MG 1/100 건캐논 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-77-2 건캐논' AND gg.grade = 'MG';

-- 건탱크
UPDATE public.gundam_grades gg SET official_price = 19800, naver_query = 'HGUC 1/144 건탱크 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-75-4 건탱크' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'MG 1/100 건탱크 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'RX-75-4 건탱크' AND gg.grade = 'MG';

-- 겔구그
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HGUC 1/144 겔구그 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MS-14A 겔구그' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'MG 1/100 겔구그 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MS-14A 겔구그' AND gg.grade = 'MG';

-- 지옹
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HGUC 1/144 지옹 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MSN-02 지옹' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 66000, naver_query = 'MG 1/100 지옹 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MSN-02 지옹' AND gg.grade = 'MG';

-- 자쿠II
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HGUC 1/144 자쿠II 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MS-06F 자쿠II' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 27500, naver_query = 'MG 1/100 자쿠II Ver.2.0 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MS-06F 자쿠II' AND gg.grade = 'MG';

-- ── Z건담 시리즈 ──────────────────────────────────────────────────────────
-- Z건담
UPDATE public.gundam_grades gg SET official_price = 19800, naver_query = 'HGUC 1/144 Z건담 제타건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'Z건담' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 44000, naver_query = 'MG 1/100 제타건담 Z건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'Z건담' AND gg.grade = 'MG';

-- 건담 Mk-II
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HGUC 1/144 건담 Mk-II 티탄즈 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 Mk-II' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'MG 1/100 건담 Mk-II Ver.2.0 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 Mk-II' AND gg.grade = 'MG';

-- 백식
UPDATE public.gundam_grades gg SET official_price = 17600, naver_query = 'HGUC 1/144 백식 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '백식' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'MG 1/100 백식 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '백식' AND gg.grade = 'MG';

-- 사이코 건담
UPDATE public.gundam_grades gg SET official_price = 88000, naver_query = 'HGUC 1/144 사이코 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'MRX-009 사이코 건담' AND gg.grade = 'HGUC';

-- ── 역습의 샤아 ───────────────────────────────────────────────────────────
-- 사자비
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'HGUC 1/144 사자비 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '사자비' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 66000, naver_query = 'MG 1/100 사자비 Ver.Ka 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '사자비' AND gg.grade = 'MG';

-- ── 크로스본 건담 ─────────────────────────────────────────────────────────
UPDATE public.gundam_grades gg SET official_price = 17600, naver_query = 'HGUC 1/144 크로스본 건담 X1 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '크로스본 건담 X1' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 크로스본 건담 X1 Ver.Ka 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '크로스본 건담 X1' AND gg.grade = 'MG';

UPDATE public.gundam_grades gg SET official_price = 17600, naver_query = 'HGUC 1/144 크로스본 건담 X2 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '크로스본 건담 X2' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 크로스본 건담 X2 Ver.Ka 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '크로스본 건담 X2' AND gg.grade = 'MG';

-- ── 유니콘 바리에이션 ─────────────────────────────────────────────────────
-- 밴시
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HGUC 1/144 밴시 유니콘 건담 02 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '밴시' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'RG 1/144 밴시 유니콘 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '밴시' AND gg.grade = 'RG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 밴시 노른 Ver.Ka 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '밴시' AND gg.grade = 'MG';

-- 페넥스
UPDATE public.gundam_grades gg SET official_price = 44000, naver_query = 'HGUC 1/144 유니콘 건담 03 페넥스 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '페넥스' AND gg.grade = 'HGUC';
UPDATE public.gundam_grades gg SET official_price = 44000, naver_query = 'RG 1/144 페넥스 유니콘 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '페넥스' AND gg.grade = 'RG';

-- ── SEED 시리즈 ───────────────────────────────────────────────────────────
-- 스트라이크 건담
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 스트라이크 건담 SEED 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스트라이크 건담' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 38500, naver_query = 'MG 1/100 스트라이크 건담 건프라 반다이 SEED'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스트라이크 건담' AND gg.grade = 'MG';
UPDATE public.gundam_grades gg SET official_price = 198000, naver_query = 'PG 1/60 스트라이크 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스트라이크 건담' AND gg.grade = 'PG';

-- 저스티스 건담
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 저스티스 건담 SEED 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '저스티스 건담' AND gg.grade = 'HG';

-- 이지스 건담
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 이지스 건담 SEED 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'GAT-X303 이지스' AND gg.grade = 'HG';

-- 프로비던스
UPDATE public.gundam_grades gg SET official_price = 19800, naver_query = 'HG 1/144 프로비던스 건담 SEED 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'ZGMF-X13A 프로비던스' AND gg.grade = 'HG';

-- ── SEED DESTINY 시리즈 ───────────────────────────────────────────────────
-- 임펄스 건담
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 임펄스 건담 SEED DESTINY 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '임펄스 건담' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 33000, naver_query = 'MG 1/100 임펄스 건담 포스 실루엣 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '임펄스 건담' AND gg.grade = 'MG';

-- 스트라이크 프리덤
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 스트라이크 프리덤 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스트라이크 프리덤' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 스트라이크 프리덤 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스트라이크 프리덤' AND gg.grade = 'MG';
UPDATE public.gundam_grades gg SET official_price = 385000, naver_query = 'PG 1/60 스트라이크 프리덤 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스트라이크 프리덤' AND gg.grade = 'PG';

-- 인피니트 저스티스
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 인피니트 저스티스 건담 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '인피니트 저스티스' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 44000, naver_query = 'MG 1/100 인피니트 저스티스 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '인피니트 저스티스' AND gg.grade = 'MG';

-- ── 건담 W 시리즈 ─────────────────────────────────────────────────────────
-- 윙 건담
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HG 1/144 윙 건담 건프라 반다이 W'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '윙 건담' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 윙건담 EW 무한의왈츠 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '윙 건담' AND gg.grade = 'MG';

-- 건담 데스사이즈
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HG 1/144 건담 데스사이즈 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 데스사이즈' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 건담 데스사이즈 EW 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 데스사이즈' AND gg.grade = 'MG';

-- 건담 헤비암즈
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HG 1/144 건담 헤비암즈 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 헤비암즈' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 건담 헤비암즈 EW 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 헤비암즈' AND gg.grade = 'MG';

-- 건담 샌드록
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HG 1/144 건담 샌드록 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 샌드록' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 건담 샌드록 EW 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 샌드록' AND gg.grade = 'MG';

-- 나타쿠
UPDATE public.gundam_grades gg SET official_price = 11000, naver_query = 'HG 1/144 나타쿠 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '나타쿠(샌롱 건담)' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 나타쿠 샌롱건담 EW 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '나타쿠(샌롱 건담)' AND gg.grade = 'MG';

-- 윙 건담 제로
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 윙건담 제로 EW 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '윙 건담 제로' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 윙건담 제로 EW 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '윙 건담 제로' AND gg.grade = 'MG';

-- ── 건담 00 시리즈 ────────────────────────────────────────────────────────
-- 건담 엑시아
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 건담 엑시아 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 엑시아' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 건담 엑시아 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 엑시아' AND gg.grade = 'MG';

-- 더블오 건담
UPDATE public.gundam_grades gg SET official_price = 17600, naver_query = 'HG 1/144 더블오 건담 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '더블오 건담' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 더블오 건담 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '더블오 건담' AND gg.grade = 'MG';

-- 더블오 라이저
UPDATE public.gundam_grades gg SET official_price = 19800, naver_query = 'HG 1/144 더블오 라이저 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '더블오 라이저' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 66000, naver_query = 'MG 1/100 더블오 라이저 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '더블오 라이저' AND gg.grade = 'MG';

-- 00 퀀타
UPDATE public.gundam_grades gg SET official_price = 17600, naver_query = 'HG 1/144 더블오 퀀타 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '00 퀀타' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 더블오 퀀타 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '00 퀀타' AND gg.grade = 'MG';

-- 큐리오스
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 건담 큐리오스 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 큐리오스' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 44000, naver_query = 'MG 1/100 건담 큐리오스 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 큐리오스' AND gg.grade = 'MG';

-- 바체
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 건담 바체 00 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 바체' AND gg.grade = 'HG';

-- ── 철혈의 오펀스 시리즈 ─────────────────────────────────────────────────
-- 건담 바르바토스 루프스
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/100 건담 바르바토스 루프스 철혈 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 바르바토스 루프스' AND gg.grade = 'HG';

-- 건담 바르바토스 루프스 렉스
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/100 건담 바르바토스 루프스 렉스 철혈 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 바르바토스 루프스 렉스' AND gg.grade = 'HG';

-- 건담 구시온
UPDATE public.gundam_grades gg SET official_price = 27500, naver_query = 'HG 1/100 건담 구시온 철혈의 오펀스 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 구시온' AND gg.grade = 'HG';

-- 건담 플라우로스
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/100 건담 플라우로스 철혈 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 플라우로스' AND gg.grade = 'HG';

-- 건담 킴바리스
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/100 건담 킴바리스 철혈 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 킴바리스' AND gg.grade = 'HG';

-- 그레이즈
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/100 그레이즈 철혈의 오펀스 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'EB-06 그레이즈' AND gg.grade = 'HG';

-- 슈발베 그레이즈
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/100 슈발베 그레이즈 철혈 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = 'V08-1228 슈발베 그레이즈' AND gg.grade = 'HG';

-- ── 수성의 마녀 시리즈 ────────────────────────────────────────────────────
-- 건담 에어리얼 개수형
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/144 건담 에어리얼 개수형 수성의 마녀 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 에어리얼 개수형' AND gg.grade = 'HG';

-- 건담 캘리번
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/144 건담 캘리번 수성의 마녀 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 캘리번' AND gg.grade = 'HG';

-- 건담 루브리스
UPDATE public.gundam_grades gg SET official_price = 13200, naver_query = 'HG 1/144 건담 루브리스 수성의 마녀 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '건담 루브리스' AND gg.grade = 'HG';

-- ════════════════════════════════════════════════════
-- 3. 빌드 파이터즈 시리즈 가격 수정
-- ════════════════════════════════════════════════════
UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/144 빌드 스트라이크 건담 풀패키지 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '빌드 스트라이크 건담' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 빌드 스트라이크 건담 건프라 반다이'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '빌드 스트라이크 건담' AND gg.grade = 'MG';

UPDATE public.gundam_grades gg SET official_price = 22000, naver_query = 'HG 1/144 스타 빌드 스트라이크 건담 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스타 빌드 스트라이크' AND gg.grade = 'HG';
UPDATE public.gundam_grades gg SET official_price = 55000, naver_query = 'MG 1/100 스타 빌드 스트라이크 건담 건프라'
FROM public.gundams g WHERE gg.gundam_id = g.id AND g.name = '스타 빌드 스트라이크' AND gg.grade = 'MG';

-- ════════════════════════════════════════════════════
-- 4. 전체 MG 정가 임의값(44,000) 오류 수정
--    (시리즈별 표준 MG 정가로 일괄 조정)
-- ════════════════════════════════════════════════════
-- 퍼스트/Z/역습 계열 MG: 27,500~44,000원 범위
UPDATE public.gundam_grades gg
SET official_price = 33000
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE gg.gundam_id = g.id
  AND gg.grade = 'MG'
  AND gg.official_price = 44000
  AND s.short_name IN ('퍼스트 건담', 'Z건담', '건담 W', '건담 X', '건담 00', 'SEED', 'SEED DESTINY')
  AND g.name NOT IN ('RX-78-2 건담', '프리덤 건담', 'Z건담', '더블오 라이저', '건담 큐리오스');

-- HGUC 임의값(13,200) 유지 — 대부분 13,200원이 맞음

-- ════════════════════════════════════════════════════
-- 5. 건담 시리즈 카운트 최종 업데이트
-- ════════════════════════════════════════════════════
UPDATE public.gundam_series s
SET gundam_count = (SELECT COUNT(*) FROM public.gundams g WHERE g.series_id = s.id);
