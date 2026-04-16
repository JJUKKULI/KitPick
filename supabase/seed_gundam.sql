-- =====================================================
-- KitPick 건담 시리즈/테마 시드 데이터
-- migration_v6.sql 실행 후 이 파일 실행
-- =====================================================

-- ─── 시리즈 삽입 ──────────────────────────────────────────────────────────
INSERT INTO public.gundam_series (name, short_name, description, year, display_order) VALUES

('기동전사 건담', '퍼스트 건담', '우주세기의 시작. 지온 공국과 지구연방의 전쟁 속 아무로 레이와 RX-78-2의 이야기.', 1979, 1),
('기동전사 Z건담', 'Z건담', '티탄즈와 에우고의 대립. 카미유 비단과 Z건담의 격렬한 전장.', 1985, 2),
('기동전사 건담 역습의 샤아', '역습의 샤아', '샤아 아즈나블의 최후의 반격. 아무로와 샤아의 최후 결전.', 1988, 3),
('기동전사 건담 UC', '유니콘', '우주세기 0096년. 뱅가드와 유니콘 건담을 둘러싼 숨겨진 역사.', 2010, 4),
('기동전사 건담 SEED', 'SEED', '코디네이터와 내추럴의 전쟁. 키라 야마토와 프리덤 건담의 활약.', 2002, 5),
('기동전사 건담 SEED DESTINY', 'SEED DESTINY', 'SEED의 후속작. 신 아스카와 임펄스 건담, 그리고 데스티니 건담.', 2004, 6),
('신기동전기 건담 W', '건담 W', '5명의 건담 파일럿과 오퍼레이션 메테오. 히이로 유이와 윙 건담.', 1995, 7),
('기동전사 건담 00', '건담 00', '솔레스타 건담 팀의 무력 개입. 세츠나와 더블오 건담.', 2007, 8),
('기동전사 건담: 철혈의 오펀스', '철혈의 오펀스', '화성의 소년병들과 건담 바르바토스의 이야기.', 2015, 9),
('기동전사 건담: 수성의 마녀', '수성의 마녀', '건담 시리즈 첫 여성 주인공 슬레타와 에어리얼의 이야기.', 2022, 10)

ON CONFLICT (name) DO NOTHING;

-- ─── 건담 삽입 ────────────────────────────────────────────────────────────

-- 퍼스트 건담
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='퍼스트 건담')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), 'RX-78-2 건담', 'RX-78-2 건담', '아무로 레이', '지구연방군이 개발한 인류 최초의 건담. 뉴타입 아무로 레이가 탑승해 지온 공국과 맞선 전설의 기체. 40년이 넘는 역사를 가진 건담 시리즈의 원점.', true),
((SELECT id FROM s), '샤아 전용 자쿠', 'MS-06S 자쿠II 지휘관용', '샤아 아즈나블', '붉은 혜성 샤아가 탑승한 트리플 스피드 자쿠. 건담의 숙적.', false),
((SELECT id FROM s), '건담 G3', 'RX-78-3 건담 G3', '아무로 레이', 'RX-78-2의 테스트 컬러 바리에이션. 그레이 컬러가 특징.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- Z건담
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='Z건담')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), 'Z건담', 'MSZ-006 제타 건담', '카미유 비단', '가변 기능을 가진 티탄즈/에우고의 건담. 웨이브 라이더로 변형 가능한 혁신적 설계.', true),
((SELECT id FROM s), '더블 제타', 'MSZ-010 ZZ건담', '쥬도 아시타', 'ZZ건담. 강력한 하이메가 캐논을 탑재한 고화력 기체.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- 역습의 샤아
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='역습의 샤아')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), 'ν건담', 'RX-93 ν건담 (뉴건담)', '아무로 레이', '아무로가 직접 설계에 참여한 최종 기체. 핀판넬을 탑재한 뉴타입 전용 기체의 정점.', true),
((SELECT id FROM s), '사자비', 'MSN-04 사자비', '샤아 아즈나블', '샤아의 최후 기체. 뉴타입 전용 시스템과 강력한 화력을 갖춘 압도적 존재감.', true),
((SELECT id FROM s), '나이팅게일', 'MSN-04II 나이팅게일', '샤아 아즈나블', '사자비의 강화형. 벨토치카 칠드런 원작 소설에 등장하는 幻의 기체.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- 유니콘
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='유니콘')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '유니콘 건담', 'RX-0 유니콘 건담', '반지 링크스', '유니콘 모드와 데스트로이 모드를 전환하는 NT-D 시스템 탑재. 사이코프레임이 발광하는 압도적인 연출.', true),
((SELECT id FROM s), '밴시', 'RX-0[N] 유니콘 건담 02 밴시', '마리다 크루스', '유니콘 02호기. 검은 기체와 금색 사이코프레임이 특징.', false),
((SELECT id FROM s), '풀 아머 유니콘', 'RX-0 풀 아머 유니콘 건담', '반지 링크스', '유니콘에 대량의 추가 무장을 장착한 사양. 압도적인 화력.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- SEED
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='SEED')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '프리덤 건담', 'ZGMF-X10A 프리덤 건담', '키라 야마토', 'ZAFT의 핵동력 건담. 전천위 포격 시스템 METEOR와 날개가 특징. 키라 야마토의 주력기.', true),
((SELECT id FROM s), '스트라이크 건담', 'GAT-X105 스트라이크 건담', '키라 야마토', '지구연방 G프로젝트의 근간. 스트라이커 팩 교환으로 다용도 운용 가능.', true),
((SELECT id FROM s), '저스티스 건담', 'ZGMF-X09A 저스티스 건담', '아스란 자라', '프리덤의 동반자. 기동성 특화 기체.', false),
((SELECT id FROM s), '에일 스트라이크', 'GAT-X105+AQM/E-X01 에일 스트라이크', '키라 야마토', '스트라이크에 에일 팩을 장착한 고기동 사양.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- SEED DESTINY
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='SEED DESTINY')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '데스티니 건담', 'ZGMF-X42S 데스티니 건담', '신 아스카', '신 아스카의 최종 기체. 시드 데스티니 작품의 상징. 고화력·고기동을 양립한 완성형 건담.', true),
((SELECT id FROM s), '임펄스 건담', 'ZGMF-X56S 임펄스 건담', '신 아스카', '실루엣 팩 교환형 건담. 기동성·화력·방어 세 사양 전환.', false),
((SELECT id FROM s), '인피니트 저스티스', 'ZGMF-X19A 인피니트 저스티스', '아스란 자라', '저스티스의 후계기. 근접전 특화.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- 건담 W
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='건담 W')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '윙 건담', 'XXXG-01W 윙 건담', '히이로 유이', '히이로 유이의 주기. 버드 모드로 변형 가능. 버스터 라이플의 강력한 일격이 상징.', true),
((SELECT id FROM s), '윙 건담 EW', 'XXXG-01W 윙 건담 (EW판)', '히이로 유이', '무한의 왈츠에서 재설계된 윙 건담. 천사 날개를 연상시키는 화려한 프로포션.', true),
((SELECT id FROM s), '헤비암즈', 'XXXG-01H 건담 헤비암즈', '트로와 바튼', '중화기 특화 건담. 개틀링과 미사일로 도배한 화력의 화신.', false),
((SELECT id FROM s), '샌드록', 'XXXG-01SR 건담 샌드록', '콸트레 라버바 위너', '사막 전투 특화 건담. 히트 숄텔이 특징.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- 건담 00
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='건담 00')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '더블오 건담', 'GN-0000 더블오 건담', '세츠나 F 세이에이', '두 개의 GN 드라이브를 탑재한 건담 00의 주역기. 트윈 드라이브 시스템의 압도적 출력.', true),
((SELECT id FROM s), '엑시아', 'GN-001 건담 엑시아', '세츠나 F 세이에이', '00의 첫 번째 주역기. 7검 시스템의 근접전 특화.', false),
((SELECT id FROM s), '더블오 라이저', 'GN-0000+GNR-010 더블오 라이저', '세츠나 F 세이에이', '00에 0시스템을 합체. 퀀텀 버스트로 시공간을 초월하는 궁극의 형태.', true)
ON CONFLICT (series_id, name) DO NOTHING;

-- 철혈의 오펀스
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='철혈의 오펀스')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 바르바토스', 'ASW-G-08 건담 바르바토스', '미카즈키 오거스', '고대의 건담 프레임을 재기동. 마체테와 메이스로 근접전 특화. 여러 형태로 개수된다.', true),
((SELECT id FROM s), '건담 킴바리스', 'ASW-G-66 건담 킴바리스', '가엘리오 보드윈', '창을 주무기로 하는 고기동 건담.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- 수성의 마녀
WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='수성의 마녀')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 에어리얼', 'XVX-016 건담 에어리얼', '슬레타 머큐리', '슬레타의 전용기. GUND 포맷 탑재. 리베이크 이후 더욱 강화. 수성의 마녀 시리즈의 아이콘.', true),
((SELECT id FROM s), '건담 루브리스', 'YF-01 건담 루브리스', '미오리네 렘브란', '프롤로그에 등장하는 슬레타 어머니의 기체. 특유의 다관절 구조가 특징.', false),
((SELECT id FROM s), '건담 팔세토', 'MD-0064 건담 팔세토', '다수', 'GUND 포맷 실험 기체. 루브리스 계열.', false),
((SELECT id FROM s), '칼리우스', 'MD-0032G 칼리우스', '다수', '베네릿 그룹의 양산형 모빌슈트.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 등급 데이터 삽입 ──────────────────────────────────────────────────────

-- RX-78-2 건담 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='RX-78-2 건담')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'EG', '1/144', 880, 'EG 엔트리그레이드 RX-78-2 건담', 'buy',
 '880원의 초저가 입문용. 심플하지만 퀄리티 충분.', 85, '2021-10-01',
 88, 8, 4, '[{"date":"1월","price":880},{"date":"2월","price":880},{"date":"3월","price":880}]',
 '[{"date":"2021-10","note":"초판"},{"date":"2022-06","note":"재판"},{"date":"2023-12","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'HG', '1/144', 13200, 'HGUC RX-78-2 건담 리바이브', 'buy',
 '6개월 최저가 근접. 리바이브판 가동성 압도적. 입문에 최적.',  92, '2015-07-25',
 85, 10, 5, '[{"date":"11월","price":15900},{"date":"12월","price":14500},{"date":"1월","price":13900},{"date":"2월","price":13500},{"date":"3월","price":13200},{"date":"4월","price":12900}]',
 '[{"date":"2015-07","note":"초판"},{"date":"2018-03","note":"재판"},{"date":"2021-06","note":"재판"},{"date":"2023-09","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'RG', '1/144', 22000, 'RG 1/144 RX-78-2 건담', 'watch',
 '정가 수준 유지. 내부 프레임 재현도 우수.', 80, '2010-07-01',
 78, 15, 7, '[{"date":"1월","price":22000},{"date":"2월","price":22000},{"date":"3월","price":22000}]',
 '[{"date":"2010-07","note":"초판"},{"date":"2015-03","note":"재판"},{"date":"2020-09","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'MG', '1/100', 44000, 'MG 1/100 RX-78-2 건담 Ver.3.0', 'watch',
 'Ver.3.0 기준. 안정적인 가격대 유지 중.', 82, '2013-09-01',
 80, 14, 6, '[{"date":"1월","price":44000},{"date":"2월","price":44000},{"date":"3월","price":45000}]',
 '[{"date":"2013-09","note":"Ver.3.0 초판"},{"date":"2019-03","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'PG', '1/60', 198000, 'PG 퍼펙트그레이드 RX-78-2 건담', 'watch',
 '퍼펙트 그레이드 대형 키트. 가격 안정권.',  75, '1998-10-01',
 75, 18, 7, '[{"date":"1월","price":198000},{"date":"2월","price":198000},{"date":"3월","price":198000}]',
 '[{"date":"1998-10","note":"초판"},{"date":"2008-09","note":"Ver.2.0"},{"date":"2020-08","note":"PG UNLEASHED"}]', 'in_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 유니콘 건담 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='유니콘 건담')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HG', '1/144', 13200, 'HGUC 유니콘 건담 데스트로이모드 건프라', 'buy',
 '정가 수준. 유니콘 입문에 최적.', 89, '2010-03-01',
 80, 12, 8, '[{"date":"11월","price":13200},{"date":"12월","price":13200},{"date":"1월","price":13200}]',
 '[{"date":"2010-03","note":"초판"},{"date":"2015-06","note":"재판"},{"date":"2021-09","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'RG', '1/144', 33000, 'RG 유니콘 건담 데스트로이모드 건프라', 'wait',
 '출시 직후 품귀로 20% 상승. 2차 입고 예정.', 89, '2024-12-21',
 78, 12, 10, '[{"date":"11월","price":33000},{"date":"12월","price":33000},{"date":"1월","price":38000},{"date":"2월","price":39800}]',
 '[{"date":"2024-12","note":"초판"}]', 'low_stock'),

((SELECT id FROM g), 'MG', '1/100', 55000, 'MG 유니콘 건담 Ver.Ka 건프라 반다이', 'watch',
 '안정적 가격 유지. Ver.Ka 디테일 최고.', 85, '2009-08-01',
 82, 13, 5, '[{"date":"1월","price":55000},{"date":"2월","price":56000},{"date":"3월","price":55000}]',
 '[{"date":"2009-08","note":"초판"},{"date":"2014-11","note":"재판"},{"date":"2020-05","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'PG', '1/60', 330000, 'PG 유니콘 건담 건프라 반다이', 'watch',
 'PG 대형 키트. 가격 안정적.', 78, '2012-10-01',
 79, 14, 7, '[{"date":"1월","price":330000},{"date":"2월","price":330000},{"date":"3월","price":330000}]',
 '[{"date":"2012-10","note":"초판"},{"date":"2019-02","note":"LED 유닛 세트"}]', 'in_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 프리덤 건담 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='프리덤 건담')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HG', '1/144', 13200, 'HG 프리덤 건담 건프라 반다이 SEED', 'buy',
 '정가 판매 중. SEED 팬 필수 입문 키트.', 83, '2004-03-01',
 82, 12, 6, '[{"date":"1월","price":13200},{"date":"2월","price":13200},{"date":"3월","price":13200}]',
 '[{"date":"2004-03","note":"초판"},{"date":"2013-08","note":"재판"},{"date":"2021-06","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'MG', '1/100', 44000, 'MG 프리덤 건담 Ver2.0 건프라 반다이', 'watch',
 '가격 안정권. Ver.3.0 소문으로 관망 추천.', 86, '2008-06-14',
 72, 20, 8, '[{"date":"11월","price":44000},{"date":"12월","price":44000},{"date":"1월","price":44500},{"date":"2월","price":45000}]',
 '[{"date":"2008-06","note":"초판 Ver.2.0"},{"date":"2013-09","note":"재판"},{"date":"2023-06","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'PG', '1/60', 374000, 'PG 프리덤 건담 건프라 반다이', 'watch',
 'PG 대형 키트. 현재 가격 안정적.', 74, '2006-09-01',
 75, 18, 7, '[{"date":"1월","price":374000},{"date":"2월","price":374000},{"date":"3월","price":374000}]',
 '[{"date":"2006-09","note":"초판"},{"date":"2015-04","note":"재판"},{"date":"2023-03","note":"재판"}]', 'in_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 에어리얼 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='건담 에어리얼')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HG', '1/144', 22000, 'HG 건담 에어리얼 수성의마녀 건프라', 'wait',
 '정가 22000원 대비 56% 프리미엄. 6월 3차 재판 공식 확정. 기다려야 함.', 98, '2022-10-08',
 60, 15, 25, '[{"date":"11월","price":22000},{"date":"12월","price":24500},{"date":"1월","price":28000},{"date":"2월","price":32000},{"date":"3월","price":34500},{"date":"4월","price":34500}]',
 '[{"date":"2022-10","note":"1차 발매"},{"date":"2023-07","note":"2차 재판"},{"date":"2025-06","note":"3차 재판 예정"}]', 'in_stock'),

((SELECT id FROM g), 'HG (리빌드)', '1/144', 22000, 'HG 에어리얼 리빌드 수성의마녀 건프라', 'wait',
 '리빌드판도 품귀. 재판 예정.', 95, '2023-10-08',
 62, 14, 24, '[{"date":"1월","price":22000},{"date":"2월","price":28000},{"date":"3월","price":33000}]',
 '[{"date":"2023-10","note":"초판"}]', 'out_of_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 데스티니 건담 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='데스티니 건담')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HG', '1/144', 13200, 'HG 데스티니 건담 SEED DESTINY 건프라', 'buy',
 '정가 수준. 안정적 구매 가능.', 82, '2005-01-01',
 80, 13, 7, '[{"date":"1월","price":13200},{"date":"2월","price":13200},{"date":"3월","price":13200}]',
 '[{"date":"2005-01","note":"초판"},{"date":"2015-06","note":"재판"},{"date":"2022-09","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'MG', '1/100', 68000, 'MG 데스티니 건담 Spec2 Ver.Ka 건프라', 'watch',
 '신발매 예약 단계. 실물 리뷰 없어 관망 추천.', 97, '2025-07-01',
 88, 8, 4, '[{"date":"3월","price":68000},{"date":"4월","price":68000}]',
 '[]', 'preorder')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 나이팅게일 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='나이팅게일')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HGUC', '1/144', 44000, 'HGUC 나이팅게일 건프라 반다이', 'trending',
 '재판 루머로 관심 폭발. 공식 발표 전 관망.', 94, '2019-06-22',
 70, 20, 10, '[{"date":"11월","price":44000},{"date":"12월","price":44000},{"date":"1월","price":46000},{"date":"2월","price":49000},{"date":"3월","price":52000}]',
 '[{"date":"2019-06","note":"초판"},{"date":"2022-03","note":"재판"}]', 'out_of_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- ν건담 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='ν건담')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HGUC', '1/144', 22000, 'HGUC 뉴건담 νガンダム 건프라', 'watch',
 '정가 수준. 안정적.', 78, '2008-03-01',
 76, 17, 7, '[{"date":"1월","price":22000},{"date":"2월","price":22000},{"date":"3월","price":22000}]',
 '[{"date":"2008-03","note":"초판"},{"date":"2015-09","note":"재판"},{"date":"2021-12","note":"재판"}]', 'in_stock'),

((SELECT id FROM g), 'MG Ver.Ka', '1/100', 55000, 'MG 뉴건담 Nu건담 Ver.Ka 반다이', 'watch',
 '정가 대비 소폭 상승. 안정적이나 추가 상승 가능.', 83, '2018-11-10',
 75, 18, 7, '[{"date":"11월","price":55000},{"date":"12월","price":56500},{"date":"1월","price":57000},{"date":"2월","price":57000},{"date":"3월","price":58000}]',
 '[{"date":"2018-11","note":"초판"},{"date":"2021-04","note":"재판"},{"date":"2023-08","note":"재판"}]', 'in_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 윙 건담 EW 등급
WITH g AS (SELECT id FROM public.gundams WHERE name='윙 건담 EW')
INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, release_date,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history, stock_status)
VALUES
((SELECT id FROM g), 'HG', '1/144', 18500, 'HG 윙건담 EW 무한의왈츠 건프라', 'buy',
 '정가 대비 10% 하락. 뛰어난 완성도.', 87, '2024-08-10',
 90, 7, 3, '[{"date":"11월","price":18500},{"date":"12월","price":18500},{"date":"1월","price":17500},{"date":"2월","price":17000},{"date":"3월","price":16500}]',
 '[]', 'in_stock'),

((SELECT id FROM g), 'MG', '1/100', 55000, 'MG 윙건담 EW 무한의왈츠 건프라 반다이', 'watch',
 '가격 안정. 명작 MG 키트.', 84, '1998-07-01',
 82, 13, 5, '[{"date":"1월","price":55000},{"date":"2월","price":55000},{"date":"3월","price":55000}]',
 '[{"date":"1998-07","note":"초판"},{"date":"2010-03","note":"재판"},{"date":"2020-11","note":"재판"}]', 'in_stock')
ON CONFLICT (gundam_id, grade) DO NOTHING;

-- 시리즈별 건담 카운트 업데이트
UPDATE public.gundam_series s
SET gundam_count = (SELECT COUNT(*) FROM public.gundams g WHERE g.series_id = s.id);
