-- =====================================================
-- KitPick v6 Migration — 건담 시리즈/테마 시스템
-- =====================================================

-- 1. 건담 시리즈 (테마)
CREATE TABLE IF NOT EXISTS public.gundam_series (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL UNIQUE,    -- "기동전사 건담: 수성의 마녀"
  short_name    text NOT NULL,            -- "수성의 마녀"
  description   text,
  year          int,
  image_url     text,
  display_order int DEFAULT 0,
  gundam_count  int DEFAULT 0,           -- 캐시용
  created_at    timestamptz DEFAULT now()
);

-- 2. 건담 목록
CREATE TABLE IF NOT EXISTS public.gundams (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id    uuid NOT NULL REFERENCES public.gundam_series(id) ON DELETE CASCADE,
  name         text NOT NULL,            -- "프리덤 건담"
  full_name    text,                     -- "ZGMF-X10A 프리덤 건담"
  pilot        text,                     -- "키라 야마토"
  description  text,                     -- 설정 설명
  image_url    text,
  is_featured  boolean DEFAULT false,    -- 피드 상단 노출
  created_at   timestamptz DEFAULT now(),
  UNIQUE(series_id, name)
);

-- 3. 등급별 제품 정보
CREATE TABLE IF NOT EXISTS public.gundam_grades (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gundam_id           uuid NOT NULL REFERENCES public.gundams(id) ON DELETE CASCADE,
  grade               text NOT NULL,     -- HG / MG / RG / PG / SD / EG / NG / LIMITED
  scale               text,              -- 1/144 / 1/100 / 1/60
  official_price      int,               -- 정가 (원)
  naver_query         text,              -- 네이버 검색어
  release_date        date,
  decision            text DEFAULT 'watch'
    CHECK (decision IN ('buy','wait','watch','trending')),
  reasoning           text,
  ai_insight          text,
  popularity          int DEFAULT 50,
  sentiment_positive  int DEFAULT 70,
  sentiment_neutral   int DEFAULT 20,
  sentiment_negative  int DEFAULT 10,
  price_history       jsonb DEFAULT '[]',
  reprint_history     jsonb DEFAULT '[]',
  stock_status        text DEFAULT 'unknown'
    CHECK (stock_status IN ('in_stock','low_stock','out_of_stock','preorder','unknown')),
  image_url           text,
  current_price       int,               -- 네이버 최저가 캐시
  last_price_updated  timestamptz,
  created_at          timestamptz DEFAULT now(),
  UNIQUE(gundam_id, grade)
);

-- RLS
ALTER TABLE public.gundam_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gundams       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gundam_grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "series_read"  ON public.gundam_series FOR SELECT USING (true);
CREATE POLICY "series_write" ON public.gundam_series FOR INSERT WITH CHECK (true);
CREATE POLICY "series_update" ON public.gundam_series FOR UPDATE USING (true);

CREATE POLICY "gundams_read"  ON public.gundams FOR SELECT USING (true);
CREATE POLICY "gundams_write" ON public.gundams FOR INSERT WITH CHECK (true);
CREATE POLICY "gundams_update" ON public.gundams FOR UPDATE USING (true);

CREATE POLICY "grades_read"  ON public.gundam_grades FOR SELECT USING (true);
CREATE POLICY "grades_write" ON public.gundam_grades FOR INSERT WITH CHECK (true);
CREATE POLICY "grades_update" ON public.gundam_grades FOR UPDATE USING (true);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_gundams_series   ON public.gundams(series_id);
CREATE INDEX IF NOT EXISTS idx_grades_gundam    ON public.gundam_grades(gundam_id);
CREATE INDEX IF NOT EXISTS idx_grades_decision  ON public.gundam_grades(decision);
