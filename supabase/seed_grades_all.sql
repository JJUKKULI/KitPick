-- =====================================================
-- KitPick 전체 건담 등급 자동 생성
-- seed_gundam_full.sql 실행 후 이 파일 실행
-- =====================================================


-- ─── 퍼스트 건담 등급 자동 생성 (13기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MS-14A 겔구그 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-14A 겔구그'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MS-14A 겔구그 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-14A 겔구그'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 샤아 전용 자쿠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 샤아 전용 자쿠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 육전형 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '육전형 건담'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 육전형 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '육전형 건담'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MS-07B 구프 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-07B 구프'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MS-07B 구프 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-07B 구프'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MSN-02 지옹 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-02 지옹'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MSN-02 지옹 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-02 지옹'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RX-77-2 건캐논 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-77-2 건캐논'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RX-77-2 건캐논 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-77-2 건캐논'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MS-09R 릭돔 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-09R 릭돔'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MS-09R 릭돔 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-09R 릭돔'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MS-06F 자쿠II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-06F 자쿠II'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MS-06F 자쿠II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-06F 자쿠II'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MSM-07 제고크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSM-07 제고크'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MSM-07 제고크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSM-07 제고크'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RB-79 볼 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RB-79 볼'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RB-79 볼 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RB-79 볼'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RGM-79 짐 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-79 짐'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RGM-79 짐 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-79 짐'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RX-75-4 건탱크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-75-4 건탱크'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RX-75-4 건탱크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-75-4 건탱크'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MA-08 빅잠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MA-08 빅잠'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MA-08 빅잠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MA-08 빅잠'
  AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── Z건담 등급 자동 생성 (10기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MSA-003 네모 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSA-003 네모'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MSA-003 네모 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSA-003 네모'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RMS-108 마라사이 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-108 마라사이'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RMS-108 마라사이 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-108 마라사이'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 NRX-055 바운드독 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-055 바운드독'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 NRX-055 바운드독 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-055 바운드독'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 ORX-005 가프랑 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ORX-005 가프랑'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 ORX-005 가프랑 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ORX-005 가프랑'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MRX-009 사이코 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MRX-009 사이코 건담'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MRX-009 사이코 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MRX-009 사이코 건담'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RMS-099 릭디아스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-099 릭디아스'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RMS-099 릭디아스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-099 릭디아스'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RMS-106 하이잭 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-106 하이잭'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 RMS-106 하이잭 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-106 하이잭'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MSA-005 메타스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSA-005 메타스'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 MSA-005 메타스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSA-005 메타스'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 건담 Mk-II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 Mk-II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 백식 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '백식'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 백식 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '백식'
  AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 역습의 샤아 등급 자동 생성 (6기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 AMX-014 도벤울프 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMX-014 도벤울프'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 AMX-014 도벤울프 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMX-014 도벤울프'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 RGM-89 제간 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-89 제간'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 RGM-89 제간 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-89 제간'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 NZ-333 알파 아지엘 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NZ-333 알파 아지엘'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 NZ-333 알파 아지엘 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NZ-333 알파 아지엘'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 AMS-119 기라 도가 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMS-119 기라 도가'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 AMS-119 기라 도가 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMS-119 기라 도가'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 리가지 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '리가지'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 리가지 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '리가지'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 사자비 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 사자비 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비'
  AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 크로스본 건담 등급 자동 생성 (7기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 크로스본 건담 X1 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X1'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 크로스본 건담 X1 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X1'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 EMS-10 주다 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'EMS-10 주다'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 EMS-10 주다 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'EMS-10 주다'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 크로스본 건담 X3 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X3'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 크로스본 건담 X3 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X3'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 XMCA 아나나시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'XMCA 아나나시'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 XMCA 아나나시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'XMCA 아나나시'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 F91 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'F91'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 F91 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'F91'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 크로스본 건담 X2 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X2'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 크로스본 건담 X2 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X2'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 22000,
  'HGUC 1/144 XM-07 베시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'XM-07 베시'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 XM-07 베시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'XM-07 베시'
  AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 유니콘 등급 자동 생성 (7기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 페넥스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 페넥스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 NZ-666 클시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NZ-666 클시'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 NZ-666 클시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NZ-666 클시'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 밴시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 밴시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 RGZ-95 리제일 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGZ-95 리제일'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 RGZ-95 리제일 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGZ-95 리제일'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 AMS-129 기라 즐루후 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMS-129 기라 즐루후'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 AMS-129 기라 즐루후 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMS-129 기라 즐루후'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 MSN-065 시넨주 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-065 시넨주'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 MSN-065 시넨주 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-065 시넨주'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HGUC', '1/144', 13200,
  'HGUC 1/144 YAMS-132 로아잔 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'YAMS-132 로아잔'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 55000,
  'MG 1/100 YAMS-132 로아잔 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'YAMS-132 로아잔'
  AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── SEED 등급 자동 생성 (17기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 ZGMF-1017 모빌 진 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1017 모빌 진'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 ZGMF-1017 모빌 진 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1017 모빌 진'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 저스티스 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '저스티스 건담'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 저스티스 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '저스티스 건담'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 ZGMF-X13A 프로비던스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X13A 프로비던스'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 ZGMF-X13A 프로비던스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X13A 프로비던스'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GAT-X102 듀얼 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X102 듀얼'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GAT-X102 듀얼 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X102 듀얼'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 에일 스트라이크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '에일 스트라이크'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 에일 스트라이크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '에일 스트라이크'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 스트라이크 프리덤 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 스트라이크 프리덤 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GAT-X303 이지스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X303 이지스'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GAT-X303 이지스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X303 이지스'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 ZGMF-X42S 데스티니(복) 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X42S 데스티니(복)'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 ZGMF-X42S 데스티니(복) 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X42S 데스티니(복)'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 인피니트 저스티스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '인피니트 저스티스'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 인피니트 저스티스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '인피니트 저스티스'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GAT-X103 버스터 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X103 버스터'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GAT-X103 버스터 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X103 버스터'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 ZGMF-1000 자쿠 워리어 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1000 자쿠 워리어'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 ZGMF-1000 자쿠 워리어 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1000 자쿠 워리어'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 임펄스 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '임펄스 건담'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 임펄스 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '임펄스 건담'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 어썰트 슈라우드 스트라이크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '어썰트 슈라우드 스트라이크'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 어썰트 슈라우드 스트라이크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '어썰트 슈라우드 스트라이크'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 ZGMF-X88S 가이아 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X88S 가이아'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 ZGMF-X88S 가이아 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X88S 가이아'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GAT-X207 블리츠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X207 블리츠'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GAT-X207 블리츠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X207 블리츠'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GAT-04 윈담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-04 윈담'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GAT-04 윈담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-04 윈담'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GAT-01 스트라이크 대거 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-01 스트라이크 대거'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GAT-01 스트라이크 대거 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-01 스트라이크 대거'
  AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 건담 W 등급 자동 생성 (9기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 나타쿠(샌롱 건담) 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '나타쿠(샌롱 건담)'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 나타쿠(샌롱 건담) 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '나타쿠(샌롱 건담)'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 OZ-07AMS 에어리즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-07AMS 에어리즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 OZ-07AMS 에어리즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-07AMS 에어리즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 윙 건담 제로 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 윙 건담 제로 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 데스사이즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 데스사이즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 데스사이즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 데스사이즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 툴기스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '툴기스'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 툴기스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '툴기스'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 헤비암즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 헤비암즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 헤비암즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 헤비암즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 OZ-06MS 리오 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-06MS 리오'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 OZ-06MS 리오 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-06MS 리오'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 OZ-09MMS 파이시즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-09MMS 파이시즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 OZ-09MMS 파이시즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-09MMS 파이시즈'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 샌드록 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 샌드록'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 샌드록 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 샌드록'
  AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 건담 X 등급 자동 생성 (7기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 X 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 X'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 X 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 X'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 NRX-0015 헤비포크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-0015 헤비포크'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 NRX-0015 헤비포크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-0015 헤비포크'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 에어마스터 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어마스터'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 에어마스터 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어마스터'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 NRX-0013 캔서 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-0013 캔서'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 NRX-0013 캔서 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-0013 캔서'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 더블X 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 더블X'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 더블X 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 더블X'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 레오파르드 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 레오파르드'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 레오파르드 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 레오파르드'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 NRX-016 비트 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-016 비트'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 NRX-016 비트 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-016 비트'
  AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 건담 00 등급 자동 생성 (8기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 큐리오스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 큐리오스'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 큐리오스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 큐리오스'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 더블오 라이저 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 라이저'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 더블오 라이저 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 라이저'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 SVMS-01 유니온 플래그 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'SVMS-01 유니온 플래그'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 SVMS-01 유니온 플래그 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'SVMS-01 유니온 플래그'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 바체 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바체'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 건담 바체 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바체'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GNX-603T 지린 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GNX-603T 지린'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GNX-603T 지린 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GNX-603T 지린'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 GNX-704T 알케미네 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GNX-704T 알케미네'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 GNX-704T 알케미네 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GNX-704T 알케미네'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 00 퀀타 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '00 퀀타'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 00 퀀타 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '00 퀀타'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 AEU-09 에어리온 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AEU-09 에어리온'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'MG', '1/100', 44000,
  'MG 1/100 AEU-09 에어리온 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AEU-09 에어리온'
  AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


-- ─── 빌드 파이터즈 등급 자동 생성 (6기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 엑시아 다크 매터 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 엑시아 다크 매터'
  AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 트라이 버닝 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '트라이 버닝 건담'
  AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 스타 빌드 스트라이크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스타 빌드 스트라이크'
  AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 짐 스나이퍼II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '짐 스나이퍼II'
  AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 레이징 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '레이징 건담'
  AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 빌드 스트라이크 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '빌드 스트라이크 건담'
  AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


-- ─── 철혈의 오펀스 등급 자동 생성 (8기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 건담 플라우로스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 플라우로스'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 건담 바르바토스 루프스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 EB-06 그레이즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'EB-06 그레이즈'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 EB-06r 그레이즈 리터 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'EB-06r 그레이즈 리터'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 V08-1228 슈발베 그레이즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'V08-1228 슈발베 그레이즈'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 건담 킴바리스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 킴바리스'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 건담 구시온 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 구시온'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/100', 22000,
  'HG 1/100 건담 바르바토스 루프스 렉스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스 렉스'
  AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


-- ─── 수성의 마녀 등급 자동 생성 (6기체) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 팔세토 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 팔세토'
  AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 MD-0064 조위트 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MD-0064 조위트'
  AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 MD-0031 달란자 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MD-0031 달란자'
  AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 캘리번 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 캘리번'
  AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 MDX-0003 조위트 헤비 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MDX-0003 조위트 헤비'
  AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id,
  'HG', '1/144', 13200,
  'HG 1/144 건담 에어리얼 개수형 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어리얼 개수형'
  AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


-- ─── 특수 등급 추가 (추가 등급 보완) ─────────────────────────────

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 77000, 'MG 1/100 사자비 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG 1/100 샤아 전용 자쿠 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HGUC', '1/144', 13200, 'HGUC 1/144 건담 Mk-II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG 1/100 백식 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '백식' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HGUC', '1/144', 22000, 'HGUC 1/144 Z건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 Z건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG 1/100 크로스본 건담 X1 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X1' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG 1/100 크로스본 건담 X2 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X2' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HGUC', '1/144', 13200, 'HGUC 1/144 밴시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 밴시 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HGUC', '1/144', 22000, 'HGUC 1/144 페넥스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG 1/100 건담 Mk-II 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG 1/144 윙 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG 1/100 윙 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 건담 데스사이즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 데스사이즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 건담 헤비암즈 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 헤비암즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 건담 샌드록 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 샌드록' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 나타쿠(샌롱 건담) 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '나타쿠(샌롱 건담)' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG 1/100 윙 건담 제로 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG 1/100 스트라이크 프리덤 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 374000, 'PG 1/60 스트라이크 프리덤 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 임펄스 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '임펄스 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 건담 엑시아 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 엑시아' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 더블오 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 건담' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 00 퀀타 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '00 퀀타' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HG', '1/100', 22000, 'HG 1/100 건담 바르바토스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HG', '1/100', 22000, 'HG 1/100 건담 바르바토스 루프스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HG', '1/100', 22000, 'HG 1/100 건담 바르바토스 루프스 렉스 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스 렉스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 빌드 스트라이크 건담 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '빌드 스트라이크 건담' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 1/100 스타 빌드 스트라이크 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스타 빌드 스트라이크' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG 1/144 건담 캘리번 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 캘리번' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );

INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative, price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG 1/144 건담 에어리얼 개수형 건프라 반다이',
  'watch', '가격 데이터 수집 중. 네이버 최저가 조회를 눌러 현재 시장가를 확인하세요.', 60, 'unknown',
  70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어리얼 개수형' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );
