-- =====================================================
-- KitPick 실제 제품 시드 데이터
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 기존 데이터 초기화 (선택)
-- TRUNCATE public.products CASCADE;

-- ─── products 삽입 ────────────────────────────────
INSERT INTO public.products
  (name, series, grade, price, prev_price, decision, reasoning, popularity, ai_insight,
   release_date, image_url, sentiment_positive, sentiment_neutral, sentiment_negative, price_history)
VALUES
-- 1. HG 에어리얼 리빌드
('에어리얼 리빌드', '기동전사 건담: 수성의 마녀', 'HG 1/144',
 34500, 22000, 'wait',
 '인위적 품귀로 56% 가격 폭등 중. 6월 3차 재판 공식 발표됨.',
 98, '반다이가 6월 3차 재판을 공식 확정했습니다. 현재 오픈마켓 가격(34,500원)은 정가(22,000원) 대비 56% 프리미엄이 붙은 상태로, 재판 후 정가 구매가 가능합니다. 재판 물량이 충분할 것으로 예상되므로 지금 프리미엄을 주고 구매하는 것은 비추천입니다.',
 '2023-07-08', NULL, 60, 15, 25,
 '[{"date":"11월","price":22000},{"date":"12월","price":24500},{"date":"1월","price":28000},{"date":"2월","price":32000},{"date":"3월","price":34500},{"date":"4월","price":34500}]'),

-- 2. RX-78-2 건담 REVIVE
('RX-78-2 건담 (Revive)', '기동전사 건담', 'HGUC 1/144',
 12900, 15900, 'buy',
 '6개월 최저가 근접. 커뮤니티 호감도 높고 재고 충분.',
 92, '현재 가격(12,900원)은 지난 6개월 최저가(12,000원)에 근접한 수준입니다. HGUC 리바이브판은 가동성과 프로포션 모두 우수하여 입문자부터 베테랑까지 만족도가 높습니다. 재고가 안정적이고 추가 하락 여지가 제한적이므로 지금이 적절한 구매 타이밍입니다.',
 '2015-07-25', NULL, 85, 10, 5,
 '[{"date":"11월","price":15900},{"date":"12월","price":15900},{"date":"1월","price":14500},{"date":"2월","price":14500},{"date":"3월","price":13900},{"date":"4월","price":12900}]'),

-- 3. MG 데스티니 건담 Spec II
('데스티니 건담 Spec II Ver.Ka', '기동전사 건담 SEED DESTINY', 'MG 1/100',
 68000, 68000, 'watch',
 '신작 발표 직후 예약 단계. 실물 리뷰 확인 후 판단 권장.',
 97, '방금 공식 발표된 신작으로 예약이 시작됐습니다. Ver.Ka 특유의 디테일과 설정화 재현도가 기대되지만, 아직 실물 조립 리뷰가 없는 상태입니다. 데스티니 건담의 팬이라면 예약 고려 가능하나, 조립 난이도와 완성도를 확인하고 싶다면 리뷰 후 구매를 권장합니다.',
 '2026-07-01', NULL, 88, 8, 4,
 '[{"date":"11월","price":0},{"date":"12월","price":0},{"date":"1월","price":0},{"date":"2월","price":0},{"date":"3월","price":68000},{"date":"4월","price":68000}]'),

-- 4. RG 유니콘 건담
('유니콘 건담 (데스트로이 모드)', '기동전사 건담 UC', 'RG 1/144',
 39800, 33000, 'wait',
 '출시 직후 품귀로 20% 상승. 2차 입고 예정.',
 89, 'RG 유니콘은 출시 직후 완판으로 현재 오픈마켓 프리미엄이 형성돼 있습니다. LED 유닛 포함 버전의 화려한 연출이 화제이나, 조만간 2차 입고가 예정돼 있어 현재 프리미엄 가격에 구매하는 것은 불리합니다. 정가(33,000원) 수준에서 구매 가능할 때를 기다리세요.',
 '2024-12-21', NULL, 78, 12, 10,
 '[{"date":"11월","price":33000},{"date":"12월","price":33000},{"date":"1월","price":38000},{"date":"2월","price":39800},{"date":"3월","price":39800},{"date":"4월","price":38500}]'),

-- 5. HG 윙 건담 (EW)
('윙 건담 (Endless Waltz)', '신기동전기 건담 W 무한의 왈츠', 'HG 1/144',
 16500, 18500, 'buy',
 '구판 대비 10% 하락. 높은 완성도로 커뮤니티 인기 급상승.',
 87, '이번 HG 윙 건담 EW는 TV판 대비 대폭 개선된 프로포션과 가동성을 자랑합니다. 발매 후 커뮤니티 반응이 매우 좋으며 현재 가격(16,500원)은 정가(18,500원) 대비 소폭 하락한 수준입니다. 재고 소진 속도를 고려하면 조기 구매를 권장합니다.',
 '2024-08-10', NULL, 90, 7, 3,
 '[{"date":"11월","price":18500},{"date":"12월","price":18500},{"date":"1월","price":17500},{"date":"2월","price":17000},{"date":"3월","price":16500},{"date":"4월","price":16500}]'),

-- 6. HGUC 나이팅게일
('나이팅게일', '기동전사 건담 역습의 샤아: 벨토치카 칠드런', 'HGUC 1/144',
 52000, 44000, 'trending',
 '재판 루머로 관심도 급등. 보유자 매물 감소 중.',
 94, '최근 반다이 생산 스케줄 관련 루머로 나이팅게일 재판설이 커뮤니티에서 확산되고 있습니다. 실제 재판이 결정된다면 현재 오픈마켓 프리미엄 가격은 하락할 것입니다. 재판 공식 발표를 기다리거나, 루머를 믿고 현재 가격에 구매할지 판단이 필요합니다.',
 '2019-06-22', NULL, 70, 20, 10,
 '[{"date":"11월","price":44000},{"date":"12월","price":44000},{"date":"1월","price":46000},{"date":"2월","price":49000},{"date":"3월","price":52000},{"date":"4월","price":52000}]'),

-- 7. MG νガンダム Ver.Ka
('뉴 건담 Ver.Ka', '기동전사 건담 역습의 샤아', 'MG 1/100',
 58000, 55000, 'watch',
 '가격 소폭 상승. 안정권이나 추가 상승 가능성 있음.',
 83, '뉴 건담 Ver.Ka는 MG 라인업 중 완성도와 인기 모두 최상위권입니다. 현재 가격(58,000원)은 정가(55,000원) 대비 소폭 상승한 수준으로, 크게 부담스럽지 않습니다. 재판 주기가 불규칙하므로 장기적으로는 지금 구매도 나쁘지 않으나, 조금 더 기다리면 정가 수준으로 떨어질 가능성도 있습니다.',
 '2018-11-10', NULL, 75, 18, 7,
 '[{"date":"11월","price":55000},{"date":"12월","price":55000},{"date":"1월","price":56500},{"date":"2월","price":57000},{"date":"3월","price":58000},{"date":"4월","price":58000}]'),

-- 8. PG 스트라이크 건담
('스트라이크 건담', '기동전사 건담 SEED', 'PG 1/60',
 198000, 220000, 'buy',
 '6개월 최저가 경신. PG 입문작으로 완성도 최고 수준.',
 79, 'PG 스트라이크 건담은 퍼펙트 그레이드 라인의 대표작으로, 현재 가격(198,000원)이 6개월 최저가를 경신했습니다. PG 특유의 내부 메카닉 재현도와 대형 스케일 완성감을 원한다면 지금이 최적의 구매 타이밍입니다.',
 '2002-12-07', NULL, 82, 13, 5,
 '[{"date":"11월","price":220000},{"date":"12월","price":215000},{"date":"1월","price":210000},{"date":"2월","price":205000},{"date":"3월","price":200000},{"date":"4월","price":198000}]')

ON CONFLICT DO NOTHING;

-- ─── journal_articles 시드 데이터 ────────────────────────────────
INSERT INTO public.journal_articles
  (category, source, source_url, title, summary, tags, posted_at, comment_count, is_hot)
VALUES
('reprint', '반다이 공식', 'https://p-bandai.jp',
 '[공식] HG 에어리얼 리빌드 3차 재판 — 6월 출하 예정',
 '반다이가 수성의 마녀 시리즈 에어리얼 리빌드의 3차 재판을 공식 발표했습니다. 6월 출하 예정으로 정가 22,000원에 구매 가능할 전망입니다.',
 ARRAY['에어리얼 리빌드', 'HG', '재판', '수성의 마녀'], '2시간 전', 0, true),

('release', '반다이 공식', 'https://p-bandai.jp',
 '[신상] MG 데스티니 건담 Spec II Ver.Ka 정식 발표',
 '오랫동안 소문으로만 돌던 MG 데스티니 Spec II가 마침내 정식 발표됐습니다. 가격 68,000원, 7월 발매 예정입니다.',
 ARRAY['데스티니 건담', 'MG', 'Ver.Ka', 'SEED'], '5시간 전', 312, true),

('community', '루리웹', 'https://bbs.ruliweb.com/hobby/board/300543',
 '윙 건담 EW 커스텀 도색 후기 — 조회수 12만 돌파',
 '유명 모델러의 윙 건담 EW 도색 완성작이 커뮤니티에서 화제입니다. 에나멜 세부 도색과 하이라이트 기법이 인상적입니다.',
 ARRAY['윙 건담 EW', '도색', 'HG', '커스텀'], '8시간 전', 847, true),

('deal', '옥션', 'https://www.auction.co.kr',
 '[특가] 반다이 MG 라인업 최대 30% 세일 — 오늘 자정까지',
 '국내 오픈마켓에서 반다이 MG 라인업 특가 진행 중. 뉴 건담 Ver.Ka, 스트라이크 등 인기 제품 포함.',
 ARRAY['세일', 'MG', '특가', '반다이'], '11시간 전', 203, false),

('community', '루리웹', 'https://bbs.ruliweb.com/hobby/board/300543',
 'HGUC 나이팅게일 재판설 — 반다이 3분기 생산 스케줄 루머',
 '익명 소식통이 반다이 3분기 생산 스케줄에 나이팅게일 HGUC가 포함됐다고 주장했습니다. 공식 확인은 되지 않은 상태입니다.',
 ARRAY['나이팅게일', 'HGUC', '재판루머'], '14시간 전', 528, false),

('release', '반다이 공식', 'https://p-bandai.jp',
 '[예약] RG 유니콘 건담 퍼펙트 팩 + 루드라 세트 예약 개시',
 'RG 유니콘 + LED 유닛 + 루드라 포함 퍼펙트 팩 예약이 시작됐습니다. 정가 55,000원, 8월 발매 예정.',
 ARRAY['유니콘 건담', 'RG', 'LED', '예약'], '1일 전', 445, true),

('deal', '11번가', 'https://www.11st.co.kr',
 '[쿠폰] HGUC 라인업 추가 10% 할인 쿠폰 배포',
 '11번가에서 반다이 HGUC 라인업 대상 추가 10% 할인 쿠폰을 배포했습니다. 중복 적용 시 최대 25% 할인 가능.',
 ARRAY['쿠폰', 'HGUC', '할인', '11번가'], '1일 전', 156, false),

('reprint', '건담인포', 'https://gundam.info/ko',
 '[확정] PG 유니콘 건담 Ver.TWC 재판 발표',
 '건담인포에서 PG 유니콘 트랜지언트 with 크리스탈 바디 재판을 공식 발표했습니다. 5월 예약, 9월 출하 예정.',
 ARRAY['유니콘 건담', 'PG', '재판', 'TWC'], '2일 전', 892, true)

ON CONFLICT (title) DO NOTHING;

-- ─── community_comments 시드 데이터 ─────────────────────────────
INSERT INTO public.community_comments (product_id, user_name, comment, sentiment, source)
SELECT p.id, '건프라장인99', '에어리얼 리빌드 진짜 사고 싶은데 재판까지 기다려야겠네요 ㅠ', 'neutral', '루리웹'
FROM public.products p WHERE p.name = '에어리얼 리빌드'
ON CONFLICT DO NOTHING;

INSERT INTO public.community_comments (product_id, user_name, comment, sentiment, source)
SELECT p.id, 'NewtypeBuilder', '리바이브 RX-78 진짜 가성비 최고임. 이 가격에 이 퀄리티 말이 됨?', 'positive', '루리웹'
FROM public.products p WHERE p.name = 'RX-78-2 건담 (Revive)'
ON CONFLICT DO NOTHING;

INSERT INTO public.community_comments (product_id, user_name, comment, sentiment, source)
SELECT p.id, 'MechaFan', '방패 색분리는 스티커 필요하지만 전체적으로 만족스럽습니다', 'neutral', '루리웹'
FROM public.products p WHERE p.name = 'RX-78-2 건담 (Revive)'
ON CONFLICT DO NOTHING;

INSERT INTO public.community_comments (product_id, user_name, comment, sentiment, source)
SELECT p.id, 'GundamSEED팬', 'Ver.Ka 발표 보고 바로 예약함. 데스티니 최고의 가동성 기대!', 'positive', '루리웹'
FROM public.products p WHERE p.name = '데스티니 건담 Spec II Ver.Ka'
ON CONFLICT DO NOTHING;

INSERT INTO public.community_comments (product_id, user_name, comment, sentiment, source)
SELECT p.id, '건담갤러', '나이팅게일 재판 된다면 무조건 구매. 6년 동안 기다렸다', 'positive', '디시인사이드'
FROM public.products p WHERE p.name = '나이팅게일'
ON CONFLICT DO NOTHING;
