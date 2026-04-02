-- ============================================================
-- KitPick Database Schema (v2 — user_settings + wishlist 수정)
-- Supabase SQL Editor에 붙여넣고 실행하세요
-- ============================================================

-- ─── 1. products ─────────────────────────────────────────────
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  series       text not null,
  grade        text not null,
  price        numeric(10,2) not null,
  prev_price   numeric(10,2) not null,
  decision     text not null check (decision in ('buy','wait','watch','trending')),
  reasoning    text,
  popularity   int default 0,
  ai_insight   text,
  release_date date,
  image_url    text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ─── 2. price_history ────────────────────────────────────────
create table if not exists public.price_history (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid references public.products(id) on delete cascade,
  price       numeric(10,2) not null,
  recorded_at timestamptz default now()
);

-- ─── 3. community_comments ───────────────────────────────────
create table if not exists public.community_comments (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid references public.products(id) on delete cascade,
  user_name   text not null,
  comment     text not null,
  sentiment   text check (sentiment in ('positive','neutral','negative')),
  source      text,
  posted_at   timestamptz default now()
);

-- ─── 4. profiles (auth.users 확장) ───────────────────────────
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text unique,
  avatar_url   text,
  created_at   timestamptz default now()
);

-- ─── 5. wishlists (product_id를 text로 — mockData 호환) ──────
create table if not exists public.wishlists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  product_id  text not null,
  created_at  timestamptz default now(),
  unique(user_id, product_id)
);

-- ─── 6. user_settings (알림 설정) ────────────────────────────
create table if not exists public.user_settings (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  price_drop_alert boolean default true,
  reprint_alert    boolean default true,
  trending_alert   boolean default false,
  popularity_alert boolean default false,
  updated_at       timestamptz default now()
);

-- ============================================================
-- RLS
-- ============================================================

alter table public.products           enable row level security;
alter table public.price_history      enable row level security;
alter table public.community_comments enable row level security;
alter table public.profiles           enable row level security;
alter table public.wishlists          enable row level security;
alter table public.user_settings      enable row level security;

-- products / price_history / comments: 누구나 읽기
create policy "products_public_read"   on public.products          for select using (true);
create policy "price_history_pub_read" on public.price_history     for select using (true);
create policy "comments_public_read"   on public.community_comments for select using (true);

-- profiles
create policy "profiles_public_read"  on public.profiles for select using (true);
create policy "profiles_owner_update" on public.profiles for update using (auth.uid() = id);

-- wishlists
create policy "wishlists_owner_select" on public.wishlists for select using (auth.uid() = user_id);
create policy "wishlists_owner_insert" on public.wishlists for insert with check (auth.uid() = user_id);
create policy "wishlists_owner_delete" on public.wishlists for delete using (auth.uid() = user_id);

-- user_settings
create policy "settings_owner_select" on public.user_settings for select using (auth.uid() = user_id);
create policy "settings_owner_insert" on public.user_settings for insert with check (auth.uid() = user_id);
create policy "settings_owner_update" on public.user_settings for update using (auth.uid() = user_id);

-- ============================================================
-- 트리거: 회원가입 시 profiles + user_settings 자동 생성
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));

  insert into public.user_settings (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
