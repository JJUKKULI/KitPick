-- =====================================================
-- KitPick 실제 제품 데이터 v2 (컬럼 수 검증 완료)
-- migration_v4.sql 실행 후 이 파일 실행하세요
-- =====================================================

-- 기존 데이터 초기화
TRUNCATE public.price_history_daily CASCADE;
TRUNCATE public.product_community_stats CASCADE;
DELETE FROM public.products;

-- 컬럼 19개: name, series, grade, price, prev_price, official_price,
--            decision, reasoning, popularity, ai_insight, release_date,
--            image_url, naver_query,
--            sentiment_positive, sentiment_neutral, sentiment_negative,
--            price_history, stock_status, reprint_history

INSERT INTO public.products (
  name, series, grade,
  price, prev_price, official_price,
  decision, reasoning, popularity, ai_insight,
  release_date, image_url, naver_query,
  sentiment_positive, sentiment_neutral, sentiment_negative,
  price_history, stock_status, reprint_history
) VALUES

(
  '에어리얼 리빌드', '기동전사 건담: 수성의 마녀', 'HG 1/144',
  34500, 22000, 22000,
  'wait', '정가 22000원 대비 56% 프리미엄. 6월 3차 재판 공식 확정으로 재판 후 정가 구매 강력 권장.', 98,
  '반다이가 2025년 6월 3차 재판을 공식 확정했습니다. 현재 오픈마켓 가격(34500원)은 정가(22000원) 대비 56% 프리미엄이 붙은 상태로 재판 후 정가 구매가 가능합니다.',
  '2023-07-08', NULL, 'HG 에어리얼 리빌드 건담',
  60, 15, 25,
  '[{"date":"11월","price":22000},{"date":"12월","price":24500},{"date":"1월","price":28000},{"date":"2월","price":32000},{"date":"3월","price":34500},{"date":"4월","price":34500}]',
  'in_stock',
  '[{"date":"2023-07","note":"1차 발매"},{"date":"2024-01","note":"2차 재판"},{"date":"2025-06","note":"3차 재판 예정"}]'
),

(
  'RX-78-2 건담 (Revive)', '기동전사 건담', 'HGUC 1/144',
  12900, 15900, 13200,
  'buy', '6개월 최저가 근접. 입문용 최고의 선택으로 가성비 압도적.', 92,
  '현재 가격(12,900원)은 6개월 최저가에 근접한 수준입니다. HGUC 리바이브판은 개선된 가동성과 프로포션으로 입문자부터 숙련자까지 만족도가 높습니다.',
  '2015-07-25', NULL, 'HGUC RX-78-2 건담 리바이브',
  85, 10, 5,
  '[{"date":"11월","price":15900},{"date":"12월","price":14500},{"date":"1월","price":13900},{"date":"2월","price":13500},{"date":"3월","price":13200},{"date":"4월","price":12900}]',
  'in_stock',
  '[{"date":"2015-07","note":"초판"},{"date":"2018-03","note":"재판"},{"date":"2021-06","note":"재판"},{"date":"2023-09","note":"재판"}]'
),

(
  '데스티니 건담 Spec II Ver.Ka', '기동전사 건담 SEED DESTINY', 'MG 1/100',
  68000, 68000, 68000,
  'watch', '신발매 예약 단계. 실물 리뷰 없어 조립 난이도/퀄리티 불확실.', 97,
  '2025년 7월 발매 예정 신제품으로 예약이 시작됐습니다. Ver.Ka 특유의 디테일이 기대되나 아직 실물 조립 리뷰가 없습니다. 완성도 확인 후 구매를 원하면 발매 후 리뷰를 기다리세요.',
  '2025-07-01', NULL, 'MG 데스티니 건담 Spec II Ver.Ka',
  88, 8, 4,
  '[{"date":"3월","price":68000},{"date":"4월","price":68000}]',
  'preorder',
  '[]'
),

(
  '나이팅게일', '기동전사 건담 역습의 샤아: 벨토치카 칠드런', 'HGUC 1/144',
  52000, 44000, 44000,
  'trending', '재판 루머로 커뮤니티 관심 폭발. 공식 발표 전 관망 추천.', 94,
  '반다이 생산 스케줄 관련 루머로 나이팅게일 재판설이 확산 중입니다. 루머가 사실이라면 현재 프리미엄 가격은 하락할 것이므로 공식 발표를 기다리는 전략이 유리합니다.',
  '2019-06-22', NULL, 'HGUC 나이팅게일 건담',
  70, 20, 10,
  '[{"date":"11월","price":44000},{"date":"12월","price":44000},{"date":"1월","price":46000},{"date":"2월","price":49000},{"date":"3월","price":52000},{"date":"4월","price":52000}]',
  'out_of_stock',
  '[{"date":"2019-06","note":"초판"},{"date":"2022-03","note":"재판"}]'
),

(
  '윙 건담 (Endless Waltz)', '신기동전기 건담 W 무한의 왈츠', 'HG 1/144',
  16500, 18500, 18500,
  'buy', '정가 대비 10% 하락. 뛰어난 완성도로 커뮤니티 호평 일색.', 87,
  '이번 HG 윙 건담 EW는 TV판 대비 개선된 프로포션과 가동성을 자랑합니다. 발매 후 커뮤니티 반응이 매우 긍정적이며 현재 가격(16,500원)은 정가 대비 소폭 하락한 수준입니다.',
  '2024-08-10', NULL, 'HG 윙 건담 EW 무한의 왈츠',
  90, 7, 3,
  '[{"date":"11월","price":18500},{"date":"12월","price":18500},{"date":"1월","price":17500},{"date":"2월","price":17000},{"date":"3월","price":16500},{"date":"4월","price":16500}]',
  'in_stock',
  '[]'
),

(
  '유니콘 건담 (데스트로이 모드)', '기동전사 건담 UC', 'RG 1/144',
  39800, 33000, 33000,
  'wait', '출시 직후 품귀로 20% 상승. 2차 입고 예정 — 기다리면 정가 구매 가능.', 89,
  'RG 유니콘은 출시 직후 완판으로 현재 정가 대비 20% 프리미엄이 형성됐습니다. 조만간 2차 입고가 예정돼 있어 현재 39800원에 구매하는 것은 불리합니다.',
  '2024-12-21', NULL, 'RG 유니콘 건담 데스트로이 모드',
  78, 12, 10,
  '[{"date":"11월","price":33000},{"date":"12월","price":33000},{"date":"1월","price":38000},{"date":"2월","price":39800},{"date":"3월","price":39800},{"date":"4월","price":38500}]',
  'low_stock',
  '[{"date":"2024-12","note":"초판"}]'
),

(
  'ν건담 Ver.Ka', '기동전사 건담 역습의 샤아', 'MG 1/100',
  58000, 55000, 55000,
  'watch', '정가 대비 소폭 상승. 안정적이나 추가 상승 가능성 있음.', 83,
  'MG ν건담 Ver.Ka는 MG 라인업 중 완성도와 인기 모두 최상위권입니다. 현재 가격(58,000원)은 정가(55,000원) 대비 5% 상승한 수준입니다.',
  '2018-11-10', NULL, 'MG 뉴건담 Ver.Ka ν건담',
  75, 18, 7,
  '[{"date":"11월","price":55000},{"date":"12월","price":56500},{"date":"1월","price":57000},{"date":"2월","price":57000},{"date":"3월","price":58000},{"date":"4월","price":58000}]',
  'in_stock',
  '[{"date":"2018-11","note":"초판"},{"date":"2021-04","note":"재판"},{"date":"2023-08","note":"재판"}]'
),

(
  '스트라이크 건담', '기동전사 건담 SEED', 'PG 1/60',
  198000, 220000, 198000,
  'buy', '6개월 최저가 경신. PG 입문작으로 역대급 완성도.', 79,
  'PG 스트라이크 건담은 현재 가격(198,000원)이 6개월 최저가를 경신했습니다. 내부 메카닉 재현도와 대형 스케일이 압도적이며 PG 입문을 고려한다면 지금이 최적의 타이밍입니다.',
  '2002-12-07', NULL, 'PG 스트라이크 건담 1/60',
  82, 13, 5,
  '[{"date":"11월","price":220000},{"date":"12월","price":215000},{"date":"1월","price":210000},{"date":"2월","price":205000},{"date":"3월","price":200000},{"date":"4월","price":198000}]',
  'in_stock',
  '[{"date":"2002-12","note":"초판"},{"date":"2010-07","note":"재판"},{"date":"2016-03","note":"재판"},{"date":"2022-01","note":"재판"}]'
),

(
  '건담 루브리스', '기동전사 건담: 수성의 마녀', 'HG 1/144',
  13200, 13200, 13200,
  'buy', '정가 판매 중. 수성의 마녀 악역 기체로 조형 완성도 호평.', 81,
  '건담 루브리스는 수성의 마녀 시리즈 중 독특한 디자인으로 높은 인기를 자랑합니다. 현재 정가(13,200원)에 안정적으로 판매 중이며 재고도 충분합니다.',
  '2023-04-29', NULL, 'HG 건담 루브리스 수성의 마녀',
  78, 15, 7,
  '[{"date":"11월","price":13200},{"date":"12월","price":13200},{"date":"1월","price":13200},{"date":"2월","price":13200},{"date":"3월","price":13200},{"date":"4월","price":13200}]',
  'in_stock',
  '[]'
),

(
  '프리덤 건담 Ver.2.0', '기동전사 건담 SEED', 'MG 1/100',
  45000, 44000, 44000,
  'watch', '가격 안정권. 프리덤 팬 필수품이나 Ver.3.0 소문에 관망 추천.', 86,
  'MG 프리덤 Ver.2.0은 뛰어난 완성도로 오랫동안 사랑받는 제품입니다. 최근 Ver.3.0 소문이 돌고 있어 공식 발표 확인 후 구매하는 것을 권장합니다.',
  '2008-06-14', NULL, 'MG 프리덤 건담 Ver2.0',
  72, 20, 8,
  '[{"date":"11월","price":44000},{"date":"12월","price":44000},{"date":"1월","price":44500},{"date":"2월","price":45000},{"date":"3월","price":45000},{"date":"4월","price":45000}]',
  'in_stock',
  '[{"date":"2008-06","note":"초판"},{"date":"2013-09","note":"재판"},{"date":"2018-11","note":"재판"},{"date":"2023-06","note":"재판"}]'
);

-- ─── community_stats 삽입 ────────────────────────────────────────────────
INSERT INTO public.product_community_stats
  (product_id, mention_count, positive_ratio, neutral_ratio, negative_ratio, hype_score, top_comments)
SELECT
  p.id,
  v.mention_count,
  v.pos, v.neu, v.neg,
  v.hype,
  v.comments::jsonb
FROM public.products p
JOIN (VALUES
  ('에어리얼 리빌드', 45, 60, 15, 25, 98,
   '[{"user":"건프라장인","comment":"재판까지 기다려야겠네요 현재 가격은 말도 안됨","sentiment":"neutral"},{"user":"수마녀팬","comment":"3차 재판 공식이라니 다행이다","sentiment":"positive"}]'),
  ('RX-78-2 건담 (Revive)', 28, 85, 10, 5, 92,
   '[{"user":"입문자A","comment":"리바이브 진짜 가성비 최고. 이 가격에 이 퀄리티","sentiment":"positive"},{"user":"베테랑빌더","comment":"방패 색분리 스티커 아쉽지만 전체적으로 훌륭","sentiment":"neutral"}]'),
  ('데스티니 건담 Spec II Ver.Ka', 67, 88, 8, 4, 97,
   '[{"user":"SEED팬","comment":"드디어 발표! 바로 예약함","sentiment":"positive"},{"user":"모델러K","comment":"Ver.Ka 퀄리티 믿으니까 예약 고고","sentiment":"positive"}]'),
  ('나이팅게일', 38, 70, 20, 10, 94,
   '[{"user":"UC팬","comment":"재판 된다면 무조건 구매. 6년 기다렸다","sentiment":"positive"},{"user":"갤러리","comment":"루머일 수도 있으니 공식 발표 기다려야지","sentiment":"neutral"}]'),
  ('윙 건담 (Endless Waltz)', 31, 90, 7, 3, 87,
   '[{"user":"W시리즈팬","comment":"날개 전개 기믹 대박. 역대급 HG","sentiment":"positive"},{"user":"도색러","comment":"흰색 파츠 도색하기 좋은 구조","sentiment":"positive"}]'),
  ('유니콘 건담 (데스트로이 모드)', 42, 78, 12, 10, 89,
   '[{"user":"UC러버","comment":"완판됐다고?? 2차 입고 기다려야지","sentiment":"neutral"},{"user":"RG매니아","comment":"LED 유닛이랑 같이 사야함","sentiment":"positive"}]'),
  ('ν건담 Ver.Ka', 22, 75, 18, 7, 83,
   '[{"user":"아무로팬","comment":"핀판넬 전개하면 진짜 멋있다","sentiment":"positive"},{"user":"MG콜렉터","comment":"재판 주기가 좀 불규칙한 게 아쉬움","sentiment":"neutral"}]'),
  ('스트라이크 건담', 18, 82, 13, 5, 79,
   '[{"user":"PG입문자","comment":"PG 처음인데 스트라이크 괜찮을까요?","sentiment":"neutral"},{"user":"PG경험자","comment":"PG 입문에 최고임. 조립 과정이 너무 재밌음","sentiment":"positive"}]'),
  ('건담 루브리스', 19, 78, 15, 7, 81,
   '[{"user":"수마녀팬2","comment":"루브리스 조형 진짜 특이하고 멋있음","sentiment":"positive"},{"user":"악역팬","comment":"악역 기체 디자인 중 최고","sentiment":"positive"}]'),
  ('프리덤 건담 Ver.2.0', 25, 72, 20, 8, 86,
   '[{"user":"SEED매니아","comment":"Ver.3.0 소문 있던데... 좀 더 기다려볼까","sentiment":"neutral"},{"user":"프리덤팬","comment":"2.0도 충분히 훌륭한데 3.0 나오면 또 사야지","sentiment":"positive"}]')
) AS v(name, mention_count, pos, neu, neg, hype, comments)
  ON p.name = v.name
ON CONFLICT (product_id) DO UPDATE SET
  mention_count  = EXCLUDED.mention_count,
  positive_ratio = EXCLUDED.positive_ratio,
  neutral_ratio  = EXCLUDED.neutral_ratio,
  negative_ratio = EXCLUDED.negative_ratio,
  hype_score     = EXCLUDED.hype_score,
  top_comments   = EXCLUDED.top_comments,
  updated_at     = now();

-- ─── price_history_daily 삽입 ────────────────────────────────────────────
INSERT INTO public.price_history_daily (product_id, source, price, recorded_at)
SELECT p.id, 'manual', v.price::int, (CURRENT_DATE - v.days_ago::int)
FROM public.products p
JOIN (VALUES
  ('에어리얼 리빌드', 30, 28000),
  ('에어리얼 리빌드', 20, 31000),
  ('에어리얼 리빌드', 10, 34000),
  ('에어리얼 리빌드', 0, 34500),
  ('RX-78-2 건담 (Revive)', 30, 15900),
  ('RX-78-2 건담 (Revive)', 20, 14500),
  ('RX-78-2 건담 (Revive)', 10, 13500),
  ('RX-78-2 건담 (Revive)', 0, 12900),
  ('나이팅게일', 30, 44000),
  ('나이팅게일', 20, 47000),
  ('나이팅게일', 10, 50000),
  ('나이팅게일', 0, 52000),
  ('윙 건담 (Endless Waltz)', 30, 18500),
  ('윙 건담 (Endless Waltz)', 20, 17500),
  ('윙 건담 (Endless Waltz)', 10, 16800),
  ('윙 건담 (Endless Waltz)', 0, 16500),
  ('스트라이크 건담', 30, 220000),
  ('스트라이크 건담', 20, 210000),
  ('스트라이크 건담', 10, 202000),
  ('스트라이크 건담', 0, 198000),
  ('유니콘 건담 (데스트로이 모드)', 30, 33000),
  ('유니콘 건담 (데스트로이 모드)', 15, 36000),
  ('유니콘 건담 (데스트로이 모드)', 0, 39800),
  ('ν건담 Ver.Ka', 30, 55000),
  ('ν건담 Ver.Ka', 15, 56500),
  ('ν건담 Ver.Ka', 0, 58000)
) AS v(name, days_ago, price)
  ON p.name = v.name
ON CONFLICT (product_id, source, recorded_at) DO NOTHING;
