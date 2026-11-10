-- =====================================================================
-- v8: 기체 식별번호(형식번호) 정비 + 검색어 재생성
--   1) gundams.model_number 컬럼 추가
--   2) 이름에 형식번호가 없는 기체에 형식번호 지정 (수동 매핑 → full_name 자동 추출)
--   3) 이름 앞에 형식번호 붙이기  (예: '유니콘 건담' → 'RX-0 유니콘 건담')
--   4) 모든 등급 naver_query = '등급 형식번호 기체명' 으로 재생성
--   5) AI 웹검색 가격 캐시 초기화 (새 검색어로 다시 조회)
-- Supabase SQL Editor 에서 한 번에 실행
-- =====================================================================

ALTER TABLE public.gundams ADD COLUMN IF NOT EXISTS model_number text;

-- 2-a) 이름이 이미 형식번호로 시작하면 그대로 추출
UPDATE public.gundams
SET model_number = substring(name from '^([A-Z][A-Za-z0-9\[\]/.+]*-[A-Za-z0-9\[\]/.+\-]+)')
WHERE model_number IS NULL
  AND name ~ '^[A-Z][A-Za-z0-9\[\]/.+]*-[A-Za-z0-9\[\]/.+\-]+ ';

-- 2-b) 수동 매핑 (공식 형식번호)
UPDATE public.gundams g SET model_number = m.mn
FROM (VALUES
  ('샤아 전용 자쿠','MS-06S'), ('건담 G3','RX-78-3'), ('육전형 건담','RX-79[G]'),
  ('Z건담','MSZ-006'), ('건담 Mk-II','RX-178'), ('백식','MSN-00100'), ('더블 제타','MSZ-010'),
  ('ν건담','RX-93'), ('사자비','MSN-04'), ('나이팅게일','MSN-04II'), ('리가지','RGZ-91'),
  ('유니콘 건담','RX-0'), ('밴시','RX-0[N]'), ('풀 아머 유니콘','RX-0'), ('페넥스','RX-0'),
  ('F91','F91'), ('크로스본 건담 X1','XM-X1'), ('크로스본 건담 X2','XM-X2'), ('크로스본 건담 X3','XM-X3'),
  ('윙 건담','XXXG-01W'), ('윙 건담 EW','XXXG-01W'), ('윙 건담 제로','XXXG-00W0'),
  ('헤비암즈','XXXG-01H'), ('건담 헤비암즈','XXXG-01H'), ('샌드록','XXXG-01SR'), ('건담 샌드록','XXXG-01SR'),
  ('건담 데스사이즈','XXXG-01D'), ('나타쿠(샌롱 건담)','XXXG-01S'), ('툴기스','OZ-00MS'),
  ('건담 X','GX-9900'), ('건담 더블X','GX-9901-DX'), ('건담 레오파르드','GT-9600'), ('건담 에어마스터','GW-9800'),
  ('스트라이크 건담','GAT-X105'), ('에일 스트라이크','GAT-X105'), ('어썰트 슈라우드 스트라이크','GAT-X105'),
  ('프리덤 건담','ZGMF-X10A'), ('저스티스 건담','ZGMF-X09A'), ('데스티니 건담','ZGMF-X42S'),
  ('임펄스 건담','ZGMF-X56S'), ('인피니트 저스티스','ZGMF-X19A'), ('스트라이크 프리덤','ZGMF-X20A'),
  ('더블오 건담','GN-0000'), ('엑시아','GN-001'), ('더블오 라이저','GN-0000+GNR-010'),
  ('건담 큐리오스','GN-003'), ('건담 바체','GN-005'), ('00 퀀타','GNT-0000'),
  ('건담 바르바토스','ASW-G-08'), ('건담 바르바토스 루프스','ASW-G-08'), ('건담 바르바토스 루프스 렉스','ASW-G-08'),
  ('건담 킴바리스','ASW-G-66'), ('건담 구시온','ASW-G-11'), ('건담 플라우로스','ASW-G-64'),
  ('건담 에어리얼','XVX-016'), ('건담 에어리얼 개수형','XVX-016RN'), ('건담 루브리스','XGF-01'),
  ('건담 캘리번','X-EX01'), ('건담 팔세토','MD-0064'), ('칼리우스','MD-0032G'),
  ('빌드 스트라이크 건담','GAT-X105B'), ('스타 빌드 스트라이크','GAT-X105B/ST'),
  ('건담 엑시아 다크 매터','PPGN-001'), ('트라이 버닝 건담','TBG-011B'), ('짐 스나이퍼II','RGM-79SP')
) AS m(nm, mn)
WHERE g.name = m.nm AND g.model_number IS NULL;

-- 2-c) 남은 기체: full_name 앞의 형식번호 자동 추출
UPDATE public.gundams
SET model_number = substring(full_name from '^([A-Z][A-Za-z0-9\[\]/.+]*-[A-Za-z0-9\[\]/.+\-]+)')
WHERE model_number IS NULL
  AND full_name ~ '^[A-Z][A-Za-z0-9\[\]/.+]*-[A-Za-z0-9\[\]/.+\-]+ ';

-- 3) 이름 앞에 형식번호 붙이기 (이미 붙어 있으면 건너뜀)
UPDATE public.gundams
SET name = model_number || ' ' || name
WHERE model_number IS NOT NULL
  AND position(model_number in name) <> 1;

-- 4) 검색어 재생성: '등급 형식번호 기체명'
UPDATE public.gundam_grades gg
SET naver_query = gg.grade || ' ' || g.name
FROM public.gundams g
WHERE gg.gundam_id = g.id;

-- 5) AI 웹검색 가격 캐시 초기화
DELETE FROM public.community_stats WHERE source LIKE 'webprice:%';

-- 확인용: 아직 형식번호가 없는 기체 (결과가 있으면 알려주세요)
SELECT name, full_name FROM public.gundams WHERE model_number IS NULL ORDER BY name;
