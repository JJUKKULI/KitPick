-- =====================================================
-- KitPick 실제 반다이 발매 등급 정확 매핑 SQL
-- (반다이 공식 카탈로그 2024 기반)
-- 기존 등급 데이터 삭제 후 실제 발매된 등급만 재삽입
-- =====================================================

-- 기존 자동 생성 스텁 등급 전체 삭제 (실데이터로 교체)
DELETE FROM public.gundam_grades 
WHERE reasoning LIKE '%가격 데이터 수집 중%';


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'SD', '비스케일', 5500, 'SD BB #225 RX-78-2 건담 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-78-2 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'SD'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'EG', '1/144', 8800, 'Entry Grade EG RX-78-2 건담 1/144', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-78-2 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'EG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC 191 RX-78-2 건담 리바이브 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-78-2 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 22000, 'RG 01 RX-78-2 건담 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-78-2 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG RX-78-2 건담 Ver.3.0 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-78-2 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 198000, 'PG UNLEASHED RX-78-2 건담 건프라', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-78-2 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'SD', '비스케일', 5500, 'SD BB 샤아 전용 자쿠 건프라 반다이', '2004-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'SD'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC 샤아 전용 자쿠II 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 22000, 'RG 샤아 전용 자쿠II 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 27500, 'MG 샤아 전용 자쿠II Ver.2.0 건프라', '2007-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 231000, 'PG 샤아 전용 자쿠II 건프라 반다이', '2006-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '샤아 전용 자쿠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RX-78-3 건담 G3 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 G3' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG RX-78-3 건담 G3 Ver.2.0 건프라', '2008-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 G3' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HGUC RGM-79 짐 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-79 짐' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 27500, 'MG RGM-79 짐 Ver.2.0 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-79 짐' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HGUC RX-77-2 건캐논 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-77-2 건캐논' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 27500, 'MG RX-77-2 건캐논 건프라 반다이', '2005-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-77-2 건캐논' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HGUC RX-75-4 건탱크 건프라 반다이', '2006-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-75-4 건탱크' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG RX-75-4 건탱크 건프라 반다이', '2003-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RX-75-4 건탱크' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 6600, 'HGUC RB-79 볼 건프라 반다이 2연팩', '2000-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RB-79 볼' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RX-79 육전형 건담 건프라 반다이', '1999-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '육전형 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG RX-79 육전형 건담 건프라 반다이', '2002-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '육전형 건담' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'SD', '비스케일', 5500, 'SD BB 자쿠II 건프라 반다이', '1999-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-06F 자쿠II' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'SD'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HGUC MS-06 자쿠II 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-06F 자쿠II' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 22000, 'RG 자쿠II 양산형 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-06F 자쿠II' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 27500, 'MG MS-06F 자쿠II Ver.2.0 건프라 반다이', '2007-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-06F 자쿠II' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC MS-07B 구프 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-07B 구프' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG MS-07B 구프 Ver.2.0 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-07B 구프' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC MS-09R 릭돔 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-09R 릭돔' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG MS-09R 릭돔 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-09R 릭돔' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC MS-14A 양산형 겔구그 건프라', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-14A 겔구그' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG MS-14A 겔구그 Ver.2.0 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MS-14A 겔구그' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HGUC MSM-07 제고크 건프라 반다이', '2008-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSM-07 제고크' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG MSM-07 제고크 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSM-07 제고크' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HGUC MSN-02 지옹 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-02 지옹' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG MSN-02 지옹 Ver.2.0 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-02 지옹' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 275000, 'PG MSN-02 퍼펙트 지옹 건프라 반다이', '2008-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-02 지옹' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 44000, 'HGUC MA-08 빅잠 건프라 반다이', '2004-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MA-08 빅잠' AND s.short_name = '퍼스트 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HGUC MSZ-006 Z건담 건프라 반다이', '2004-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG MSZ-006 Z건담 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG MSZ-006 Z건담 Ver.Ka 건프라 반다이', '2005-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 66000, 'MG MSZ-006 Z건담 Ver.Ka 건프라 반다이', '2005-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 330000, 'PG MSZ-006 Z건담 건프라 반다이', '2000-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'Z건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 27500, 'HGUC MSZ-010 ZZ건담 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블 제타' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG MSZ-010 ZZ건담 Ver.Ka 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블 제타' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RX-178 건담 Mk-II 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 22000, 'RG RX-178 건담 Mk-II 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG RX-178 건담 Mk-II Ver.2.0 건프라', '2006-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 Mk-II' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HGUC MSN-00100 백식 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '백식' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG 백식 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '백식' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG MSN-00100 백식 Ver.2.0 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '백식' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HGUC RMS-099 릭디아스 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-099 릭디아스' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG RMS-099 릭디아스 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-099 릭디아스' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC MSA-003 네모 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSA-003 네모' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HGUC MSA-005 메타스 건프라 반다이', '2004-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSA-005 메타스' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RMS-106 하이잭 건프라 반다이', '2006-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-106 하이잭' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HGUC RMS-108 마라사이 건프라 반다이', '2008-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RMS-108 마라사이' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 33000, 'HGUC ORX-005 가프랑 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ORX-005 가프랑' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 44000, 'HGUC NRX-055 바운드독 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NRX-055 바운드독' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 88000, 'HGUC MRX-009 사이코 건담 건프라 반다이', '2007-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MRX-009 사이코 건담' AND s.short_name = 'Z건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HGUC RX-93 ν건담 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ν건담' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 33000, 'RG RX-93 ν건담 건프라 반다이', '2019-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ν건담' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG RX-93 ν건담 Ver.Ka 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ν건담' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 55000, 'MG RX-93 ν건담 Ver.Ka 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ν건담' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 33000, 'HGUC MSN-04 사자비 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 44000, 'RG MSN-04 사자비 건프라 반다이', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG MSN-04 사자비 Ver.Ka 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 66000, 'MG MSN-04 사자비 Ver.Ka 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '사자비' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 44000, 'HGUC MSN-04II 나이팅게일 건프라 반다이', '2019-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '나이팅게일' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RGZ-91 리가지 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '리가지' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 38500, 'MG RGZ-91 리가지 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '리가지' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RGM-89 제간 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGM-89 제간' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC AMS-119 기라 도가 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMS-119 기라 도가' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HGUC AMX-014 도벤울프 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMX-014 도벤울프' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 66000, 'HGUC NZ-333 알파 아지엘 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NZ-333 알파 아지엘' AND s.short_name = '역습의 샤아'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HGUC XM-X1 크로스본 건담 X1 건프라', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X1' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XM-X1 크로스본 건담 X1 Ver.Ka 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X1' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 55000, 'MG XM-X1 크로스본 건담 X1 Ver.Ka 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X1' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HGUC XM-X2 크로스본 건담 X2改 건프라', '2021-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X2' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XM-X2 크로스본 건담 X2 Ver.Ka 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X2' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 55000, 'MG XM-X2 크로스본 건담 X2 Ver.Ka 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X2' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 60500, 'MG XM-X3 크로스본 건담 X3 Ver.Ka 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X3' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 60500, 'MG XM-X3 크로스본 건담 X3 Ver.Ka 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '크로스본 건담 X3' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/100', 11000, 'HG F91 건담 F91 건프라 반다이', '1991-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'F91' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG F91 건담 F91 Ver.2.0 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'F91' AND s.short_name = '크로스본 건담'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RX-0 유니콘 건담 데스트로이모드 건프라', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '유니콘 건담' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 33000, 'RG RX-0 유니콘 건담 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '유니콘 건담' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG RX-0 유니콘 건담 Ver.Ka 건프라 반다이', '2009-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '유니콘 건담' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 55000, 'MG RX-0 유니콘 건담 Ver.Ka 건프라 반다이', '2009-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '유니콘 건담' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 330000, 'PG RX-0 유니콘 건담 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '유니콘 건담' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC RX-0 밴시 노른 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 33000, 'RG RX-0 밴시 노른 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG RX-0 밴시 Ver.Ka 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 55000, 'MG RX-0 밴시 노른 Ver.Ka 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '밴시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 55000, 'HGUC 유니콘 건담 03 페넥스 데스트로이모드 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 44000, 'RG 유니콘 건담 03 페넥스 건프라 반다이', '2019-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 77000, 'MG 유니콘 건담 페넥스 Ver.Ka 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 77000, 'MG 유니콘 건담 페넥스 Ver.Ka 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '페넥스' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 33000, 'HGUC RX-0 풀 아머 유니콘 건담 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '풀 아머 유니콘' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 99000, 'MG RX-0 풀 아머 유니콘 건담 Ver.Ka 건프라', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '풀 아머 유니콘' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HGUC AMS-129 기라 즐루후 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AMS-129 기라 즐루후' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 33000, 'HGUC MSN-06S 시넨주 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-065 시넨주' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG MSN-06S 시넨주 Ver.Ka 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MSN-065 시넨주' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 44000, 'HGUC NZ-666 클시 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'NZ-666 클시' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HGUC YAMS-132 로아잔 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'YAMS-132 로아잔' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HGUC RGZ-95 리제일 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'RGZ-95 리제일' AND s.short_name = '유니콘'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X10A 프리덤 건담 SEED 건프라', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '프리덤 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 25300, 'RG ZGMF-X10A 프리덤 건담 Ver.GCP 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '프리덤 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG ZGMF-X10A 프리덤 건담 Ver.2.0 건프라', '2008-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '프리덤 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 198000, 'PG ZGMF-X10A 프리덤 건담 건프라 반다이', '2006-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '프리덤 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-X105 스트라이크 건담 SEED 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG GAT-X105 스트라이크 건담 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 38500, 'MG GAT-X105 스트라이크 건담 Ver.RM 건프라', '2009-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 198000, 'PG GAT-X105 스트라이크 건담 건프라 반다이', '2003-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X09A 저스티스 건담 SEED 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '저스티스 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG ZGMF-X09A 저스티스 건담 건프라 반다이', '2003-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '저스티스 건담' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-X105 에일 스트라이크 건담 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '에일 스트라이크' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 스트라이크 건담 소드 스트라이커 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '어썰트 슈라우드 스트라이크' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-X102 듀얼 건담 SEED 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X102 듀얼' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-X103 버스터 건담 SEED 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X103 버스터' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-X207 블리츠 건담 SEED 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X207 블리츠' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-X303 이지스 건담 SEED 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-X303 이지스' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG ZGMF-X13A 프로비던스 건담 SEED 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X13A 프로비던스' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG ZGMF-X13A 프로비던스 건담 건프라 반다이', '2005-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X13A 프로비던스' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG ZGMF-1017 진 SEED 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1017 모빌 진' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-01 스트라이크 대거 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-01 스트라이크 대거' AND s.short_name = 'SEED'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X42S 데스티니 건담 SEED DESTINY 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '데스티니 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG ZGMF-X42S 데스티니 건담 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '데스티니 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG ZGMF-X42S 데스티니 건담 Spec2 Ver.Ka 건프라', '2025-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '데스티니 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 66000, 'MG ZGMF-X42S 데스티니 건담 Spec2 Ver.Ka 건프라', '2025-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '데스티니 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X56S 임펄스 건담 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '임펄스 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG ZGMF-X56S 포스 임펄스 건담 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '임펄스 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 33000, 'MG ZGMF-X56S 포스 임펄스 건담 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '임펄스 건담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X20A 스트라이크 프리덤 건담 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG ZGMF-X20A 스트라이크 프리덤 건담 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG ZGMF-X20A 스트라이크 프리덤 건담 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 385000, 'PG ZGMF-X20A 스트라이크 프리덤 건담 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스트라이크 프리덤' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X19A 인피니트 저스티스 건담 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '인피니트 저스티스' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 27500, 'RG ZGMF-X19A 인피니트 저스티스 건담 건프라', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '인피니트 저스티스' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG ZGMF-X19A 인피니트 저스티스 건담 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '인피니트 저스티스' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-X88S 가이아 건담 SEED DESTINY 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X88S 가이아' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ZGMF-1000 자쿠 워리어 SEED DESTINY 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1000 자쿠 워리어' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 38500, 'MG ZGMF-1000 자쿠 워리어 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-1000 자쿠 워리어' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GAT-04 윈담 SEED DESTINY 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GAT-04 윈담' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 데스티니 건담 헤비너 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'ZGMF-X42S 데스티니(복)' AND s.short_name = 'SEED DESTINY'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG XXXG-01W 윙 건담 TV판 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-01W 윙 건담 Ver.Ka 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 55000, 'MG XXXG-01W 윙 건담 Ver.Ka 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HG XXXG-01W 윙 건담 EW 무한의왈츠 건프라', '2024-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 EW' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-01W 윙 건담 EW 건프라 반다이', '2009-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 EW' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG XXXG-01D 건담 데스사이즈 TV판 건프라', '2019-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 데스사이즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-01D 건담 데스사이즈 EW 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 데스사이즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG XXXG-01H 건담 헤비암즈 TV판 건프라', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 헤비암즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-01H 건담 헤비암즈 EW 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 헤비암즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG XXXG-01SR 건담 샌드록 TV판 건프라', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 샌드록' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-01SR 건담 샌드록 EW 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 샌드록' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG XXXG-01S 샌롱 건담 나타쿠 TV판 건프라', '2020-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '나타쿠(샌롱 건담)' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-01S 나타쿠 EW 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '나타쿠(샌롱 건담)' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG XXXG-00W0 윙 건담 제로 EW 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG XXXG-00W0 윙 건담 제로 EW Ver.Ka 건프라', '2009-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG Ver.Ka', '1/100', 66000, 'MG XXXG-00W0 윙 건담 제로 EW Ver.Ka 건프라', '2009-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG Ver.Ka'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'PG', '1/60', 275000, 'PG XXXG-00W0 윙 건담 제로 EW 건프라 반다이', '2005-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '윙 건담 제로' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'PG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG OZ-00MS 툴기스 III 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '툴기스' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG OZ-00MS 툴기스 EW 건프라 반다이', '2022-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '툴기스' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG OZ-06MS 리오 건프라 반다이', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-06MS 리오' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG OZ-07AMS 에어리즈 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-07AMS 에어리즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG OZ-09MMS 파이시즈 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'OZ-09MMS 파이시즈' AND s.short_name = '건담 W'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG GX-9900 건담 X 건프라 반다이', '2019-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 X' AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG GX-9900 건담 X 건프라 반다이', '2004-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 X' AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 27500, 'HG GX-9901-DX 건담 더블X 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 더블X' AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG GX-9901-DX 건담 더블X 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 더블X' AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HG GT-9600 건담 레오파르드 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 레오파르드' AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG GW-9800 건담 에어마스터 건프라 반다이', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어마스터' AND s.short_name = '건담 X'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HG GN-0000 더블오 건담 00 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 건담' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 33000, 'RG GN-0000+GNR-010 더블오 라이저 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 건담' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG GN-0000 더블오 건담 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 건담' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GN-001 건담 엑시아 00 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 엑시아' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'RG', '1/144', 22000, 'RG GN-001 건담 엑시아 건프라 반다이', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 엑시아' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'RG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG GN-001 건담 엑시아 Ignition Mode 건프라', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 엑시아' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG GN-0000+GNR-010 더블오 라이저 TRANS-AM 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 라이저' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 66000, 'MG GN-0000+GNR-010 더블오 라이저 건프라', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '더블오 라이저' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GN-003 건담 큐리오스 00 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 큐리오스' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 44000, 'MG GN-003 건담 큐리오스 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 큐리오스' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GN-005 건담 바체 00 건프라 반다이', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바체' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HG GNT-0000 더블오 퀀타 00 건프라 반다이', '2010-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '00 퀀타' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG GNT-0000 더블오 퀀타 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '00 퀀타' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG GNX-603T 지린 00 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GNX-603T 지린' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG GNX-704T 알케미네 00 건프라 반다이', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'GNX-704T 알케미네' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG SVMS-01 유니온 플래그 00 건프라', '2012-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'SVMS-01 유니온 플래그' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 11000, 'HG AEU-09 에어리온 00 건프라 반다이', '2011-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'AEU-09 에어리온' AND s.short_name = '건담 00'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG 빌드 스트라이크 건담 풀패키지 건프라', '2013-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '빌드 스트라이크 건담' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'MG', '1/100', 55000, 'MG 빌드 스트라이크 건담 풀패키지 건프라', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '빌드 스트라이크 건담' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'MG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG 스타 빌드 스트라이크 건담 플라슈 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '스타 빌드 스트라이크' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 레이징 건담 빌드 파이터즈 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '레이징 건담' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 건담 엑시아 다크 매터 빌드 파이터즈 건프라', '2014-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 엑시아 다크 매터' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 트라이 버닝 건담 빌드 파이터즈 트라이 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '트라이 버닝 건담' AND s.short_name = '빌드 파이터즈'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ASW-G-08 건담 바르바토스 철혈 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HGUC', '1/100', 27500, 'HG 1/100 ASW-G-08 건담 바르바토스 건프라', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG ASW-G-08 건담 바르바토스 루프스 건프라', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HGUC', '1/100', 27500, 'HG 1/100 바르바토스 루프스 건프라', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 바르바토스 루프스 렉스 철혈 건프라', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스 렉스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HGUC', '1/100', 38500, 'HG 1/100 바르바토스 루프스 렉스 건프라', '2018-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 바르바토스 루프스 렉스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG ASW-G-66 건담 킴바리스 철혈 건프라', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 킴바리스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG ASW-G-11 건담 구시온 철혈 건프라', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 구시온' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HGUC', '1/100', 27500, 'HG 1/100 건담 구시온 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 구시온' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HGUC'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG ASW-G-64 건담 플라우로스 철혈 건프라', '2017-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 플라우로스' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG EB-06 그레이즈 철혈의 오펀스 건프라', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'EB-06 그레이즈' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HG EB-06r 그레이즈 리터 건프라 반다이', '2016-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'EB-06r 그레이즈 리터' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG V08-1228 슈발베 그레이즈 건프라 반다이', '2015-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'V08-1228 슈발베 그레이즈' AND s.short_name = '철혈의 오펀스'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG XVX-016 건담 에어리얼 수성의마녀 건프라', '2022-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어리얼' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG XVX-016RN 건담 에어리얼 개수형 수성의마녀 건프라', '2023-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 에어리얼 개수형' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 22000, 'HG 건담 캘리번 수성의마녀 건프라 반다이', '2023-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 캘리번' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG YF-01 건담 루브리스 수성의마녀 건프라', '2022-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 루브리스' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 19800, 'HG 건담 팔세토 수성의마녀 건프라 반다이', '2023-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = '건담 팔세토' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG MD-0031 달란자 수성의마녀 건프라', '2022-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MD-0031 달란자' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 13200, 'HG MD-0064 조위트 수성의마녀 건프라', '2022-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MD-0064 조위트' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );


INSERT INTO public.gundam_grades
  (gundam_id, grade, scale, official_price, naver_query, release_date,
   decision, reasoning, popularity, stock_status,
   sentiment_positive, sentiment_neutral, sentiment_negative,
   price_history, reprint_history)
SELECT g.id, 'HG', '1/144', 17600, 'HG MDX-0003 조위트 헤비 수성의마녀 건프라', '2023-01-01',
  'watch', '네이버 최저가 기반 분석 준비 중. AI 분석 버튼을 눌러 GPT-4o-mini 실시간 분석을 받아보세요.',
  50, 'unknown', 70, 20, 10, '[]', '[]'
FROM public.gundams g
JOIN public.gundam_series s ON g.series_id = s.id
WHERE g.name = 'MDX-0003 조위트 헤비' AND s.short_name = '수성의 마녀'
  AND NOT EXISTS (
    SELECT 1 FROM public.gundam_grades gg 
    WHERE gg.gundam_id = g.id AND gg.grade = 'HG'
  );



-- 시리즈 건담 카운트 최종 업데이트
UPDATE public.gundam_series s
SET gundam_count = (SELECT COUNT(*) FROM public.gundams g WHERE g.series_id = s.id);

-- 완료 집계
SELECT 
  s.short_name,
  COUNT(DISTINCT g.id) as gundam_count,
  COUNT(DISTINCT gg.id) as grade_count
FROM public.gundam_series s
LEFT JOIN public.gundams g ON g.series_id = s.id
LEFT JOIN public.gundam_grades gg ON gg.gundam_id = g.id
GROUP BY s.short_name
ORDER BY s.display_order;
