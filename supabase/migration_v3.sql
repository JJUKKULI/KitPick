-- =====================================================
-- KitPick v3 Migration
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. journal_articles category ENUM 확장
-- 기존 CHECK constraint 삭제 후 재생성
ALTER TABLE public.journal_articles
  DROP CONSTRAINT IF EXISTS journal_articles_category_check;

ALTER TABLE public.journal_articles
  ADD CONSTRAINT journal_articles_category_check
  CHECK (category IN ('reprint','release','community','deal','review','event','journal'));

-- 2. journal_articles 컬럼 추가 (크롤러 데이터 확장)
ALTER TABLE public.journal_articles
  ADD COLUMN IF NOT EXISTS product_name text,
  ADD COLUMN IF NOT EXISTS price        text,
  ADD COLUMN IF NOT EXISTS source_type  text DEFAULT 'community'
    CHECK (source_type IN ('official','shop','community','journal','youtube'));

-- 3. RLS 정책 — INSERT/UPDATE/DELETE 추가 (서버사이드 크롤러용)
DROP POLICY IF EXISTS "journal_insert" ON public.journal_articles;
DROP POLICY IF EXISTS "journal_update" ON public.journal_articles;
DROP POLICY IF EXISTS "journal_delete" ON public.journal_articles;

CREATE POLICY "journal_insert"
  ON public.journal_articles FOR INSERT WITH CHECK (true);

CREATE POLICY "journal_update"
  ON public.journal_articles FOR UPDATE USING (true);

CREATE POLICY "journal_delete"
  ON public.journal_articles FOR DELETE USING (true);

-- 4. products RLS INSERT 허용 (seed 데이터 삽입용)
DROP POLICY IF EXISTS "products_insert" ON public.products;
CREATE POLICY "products_insert"
  ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "products_update" ON public.products;
CREATE POLICY "products_update"
  ON public.products FOR UPDATE USING (true);
