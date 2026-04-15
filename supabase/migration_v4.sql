-- =====================================================
-- KitPick v4 Migration
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. products 테이블 컬럼 보강
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS jancode        text,          -- JANcode (바코드)
  ADD COLUMN IF NOT EXISTS naver_query    text,          -- 네이버 쇼핑 검색어
  ADD COLUMN IF NOT EXISTS official_price int,           -- 정가 (원)
  ADD COLUMN IF NOT EXISTS stock_status   text DEFAULT 'unknown'
    CHECK (stock_status IN ('in_stock','low_stock','out_of_stock','preorder','unknown')),
  ADD COLUMN IF NOT EXISTS reprint_history jsonb DEFAULT '[]',  -- 재판 이력
  ADD COLUMN IF NOT EXISTS last_price_updated timestamptz;

-- 2. price_history 테이블 재설계 (날짜별 최저가 적재)
CREATE TABLE IF NOT EXISTS public.price_history_daily (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  source      text NOT NULL DEFAULT 'naver',   -- naver | manual
  price       int  NOT NULL,                    -- 원화 가격
  recorded_at date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE (product_id, source, recorded_at)
);

ALTER TABLE public.price_history_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "price_history_read"  ON public.price_history_daily FOR SELECT USING (true);
CREATE POLICY "price_history_write" ON public.price_history_daily FOR INSERT WITH CHECK (true);
CREATE POLICY "price_history_update" ON public.price_history_daily FOR UPDATE USING (true);

-- 3. product_community_stats 테이블 (커뮤니티 관심도 스냅샷)
CREATE TABLE IF NOT EXISTS public.product_community_stats (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  mention_count   int DEFAULT 0,     -- 최근 7일 언급 수
  positive_ratio  int DEFAULT 70,    -- 긍정 %
  neutral_ratio   int DEFAULT 20,
  negative_ratio  int DEFAULT 10,
  hype_score      int DEFAULT 50,    -- 0~100
  top_comments    jsonb DEFAULT '[]', -- [{user, comment, sentiment}]
  updated_at      timestamptz DEFAULT now(),
  UNIQUE(product_id)
);

ALTER TABLE public.product_community_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "community_stats_read"  ON public.product_community_stats FOR SELECT USING (true);
CREATE POLICY "community_stats_write" ON public.product_community_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "community_stats_upsert" ON public.product_community_stats FOR UPDATE USING (true);

-- 4. products RLS (아직 없으면)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='products_public_read') THEN
    CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='products_insert') THEN
    CREATE POLICY "products_insert" ON public.products FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='products_update') THEN
    CREATE POLICY "products_update" ON public.products FOR UPDATE USING (true);
  END IF;
END $$;
