-- =====================================================
-- KitPick v2 Migration
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. products 테이블 컬럼 추가
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS sentiment_positive int DEFAULT 70,
  ADD COLUMN IF NOT EXISTS sentiment_neutral  int DEFAULT 20,
  ADD COLUMN IF NOT EXISTS sentiment_negative int DEFAULT 10,
  ADD COLUMN IF NOT EXISTS price_history      jsonb DEFAULT '[]';

-- 2. journal_articles 테이블 생성
CREATE TABLE IF NOT EXISTS public.journal_articles (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category      text NOT NULL CHECK (category IN ('reprint','release','community','deal')),
  source        text NOT NULL,
  source_url    text,
  title         text NOT NULL UNIQUE,
  summary       text,
  tags          text[] DEFAULT '{}',
  posted_at     text,
  comment_count int DEFAULT 0,
  is_hot        boolean DEFAULT false,
  crawled_at    timestamptz DEFAULT now()
);

ALTER TABLE public.journal_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "journal_public_read"
  ON public.journal_articles FOR SELECT USING (true);

-- 3. products 읽기 정책 (없으면 추가)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'products_public_read'
  ) THEN
    CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (true);
  END IF;
END $$;
