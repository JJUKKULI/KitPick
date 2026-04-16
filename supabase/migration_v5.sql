-- =====================================================
-- KitPick v5 Migration
-- 결정 피드 제품명 단순화 (등급 → grade 컬럼으로 이동)
-- =====================================================

-- 제품명에서 등급 제거 (건담 기본 이름만 남김)
UPDATE public.products SET
  name  = '에어리얼',
  grade = 'HG 1/144'
WHERE name = '에어리얼 리빌드';

UPDATE public.products SET
  name  = 'RX-78-2 건담',
  grade = 'HGUC 1/144'
WHERE name = 'RX-78-2 건담 (Revive)';

UPDATE public.products SET
  name  = '데스티니 건담',
  grade = 'MG 1/100 Ver.Ka'
WHERE name = '데스티니 건담 Spec II Ver.Ka';

UPDATE public.products SET
  name  = '나이팅게일',
  grade = 'HGUC 1/144'
WHERE name = '나이팅게일';

UPDATE public.products SET
  name  = '윙 건담',
  grade = 'HG 1/144'
WHERE name = '윙 건담 (Endless Waltz)';

UPDATE public.products SET
  name  = '유니콘 건담',
  grade = 'RG 1/144'
WHERE name = '유니콘 건담 (데스트로이 모드)';

UPDATE public.products SET
  name  = 'ν건담 (뉴건담)',
  grade = 'MG 1/100 Ver.Ka'
WHERE name = 'ν건담 Ver.Ka';

UPDATE public.products SET
  name  = '스트라이크 건담',
  grade = 'PG 1/60'
WHERE name = '스트라이크 건담';

UPDATE public.products SET
  name  = '건담 루브리스',
  grade = 'HG 1/144'
WHERE name = '건담 루브리스';

UPDATE public.products SET
  name  = '프리덤 건담',
  grade = 'MG 1/100 Ver.2.0'
WHERE name = '프리덤 건담 Ver.2.0';

-- naver_query도 기본 이름 기반으로 업데이트
UPDATE public.products SET naver_query = '에어리얼 건담 건프라 반다이'         WHERE name = '에어리얼';
UPDATE public.products SET naver_query = 'RX-78-2 건담 리바이브 건프라 반다이'  WHERE name = 'RX-78-2 건담';
UPDATE public.products SET naver_query = '데스티니 건담 건프라 반다이'          WHERE name = '데스티니 건담';
UPDATE public.products SET naver_query = '나이팅게일 건프라 반다이'             WHERE name = '나이팅게일';
UPDATE public.products SET naver_query = '윙건담 EW 건프라 반다이'              WHERE name = '윙 건담';
UPDATE public.products SET naver_query = '유니콘 건담 건프라 반다이'            WHERE name = '유니콘 건담';
UPDATE public.products SET naver_query = '뉴건담 Nu건담 건프라 반다이'          WHERE name = 'ν건담 (뉴건담)';
UPDATE public.products SET naver_query = '스트라이크 건담 건프라 반다이'        WHERE name = '스트라이크 건담';
UPDATE public.products SET naver_query = '건담 루브리스 건프라 반다이'          WHERE name = '건담 루브리스';
UPDATE public.products SET naver_query = '프리덤 건담 건프라 반다이'            WHERE name = '프리덤 건담';
