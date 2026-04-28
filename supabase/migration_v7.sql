-- =====================================================
-- KitPick v7 — Cron 가격 수집 & 커뮤니티 통계 테이블
-- =====================================================

-- 1. 일일 가격 이력 (Cron으로 매일 03시 자동 기록)
CREATE TABLE IF NOT EXISTS public.price_history_daily (
  id           bigserial PRIMARY KEY,
  grade_id     uuid NOT NULL REFERENCES public.gundam_grades(id) ON DELETE CASCADE,
  price        int NOT NULL,
  mall_name    text,
  recorded_at  date NOT NULL DEFAULT CURRENT_DATE,
  created_at   timestamptz DEFAULT now(),
  UNIQUE(grade_id, recorded_at)
);

CREATE INDEX IF NOT EXISTS idx_price_history_grade_date
  ON public.price_history_daily(grade_id, recorded_at DESC);

-- 2. 커뮤니티 여론 통계 (주 2회 크롤링)
CREATE TABLE IF NOT EXISTS public.community_stats (
  id                    bigserial PRIMARY KEY,
  gundam_id             uuid REFERENCES public.gundams(id) ON DELETE CASCADE,
  grade_id              uuid REFERENCES public.gundam_grades(id) ON DELETE CASCADE,
  source                text NOT NULL,  -- 'ruliweb' | 'dcinside'
  mention_count         int DEFAULT 0,
  sentiment_positive    int DEFAULT 0,
  sentiment_neutral     int DEFAULT 0,
  sentiment_negative    int DEFAULT 0,
  top_comments          jsonb DEFAULT '[]',
  collected_at          timestamptz DEFAULT now(),
  UNIQUE(gundam_id, source, DATE(collected_at))
);

CREATE INDEX IF NOT EXISTS idx_community_stats_gundam
  ON public.community_stats(gundam_id, collected_at DESC);

-- 3. gundam_grades 가격 캐시 컬럼 추가 (없으면)
ALTER TABLE public.gundam_grades
  ADD COLUMN IF NOT EXISTS current_price int,
  ADD COLUMN IF NOT EXISTS last_price_updated timestamptz;

-- RLS
ALTER TABLE public.price_history_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "phd_read"  ON public.price_history_daily FOR SELECT USING (true);
CREATE POLICY "phd_write" ON public.price_history_daily FOR INSERT WITH CHECK (true);
CREATE POLICY "phd_update"ON public.price_history_daily FOR UPDATE USING (true);

CREATE POLICY "cs_read"  ON public.community_stats FOR SELECT USING (true);
CREATE POLICY "cs_write" ON public.community_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "cs_update"ON public.community_stats FOR UPDATE USING (true);
