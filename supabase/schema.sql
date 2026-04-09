create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'manager');
create type public.challenge_status as enum ('ongoing', 'upcoming', 'ended');
create type public.audition_status as enum ('open', 'closed');
create type public.application_status as enum ('new', 'reviewing', 'done');
create type public.audition_category as enum ('singer', 'actor', 'model', 'dancer', 'creator');
create type public.magazine_category as enum ('news', 'event', 'artist', 'project');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.user_role not null default 'manager',
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  hero_title text not null,
  hero_subtitle text not null,
  about_summary text not null,
  mission text not null,
  vision text not null,
  address text not null,
  email text not null,
  phone text not null,
  business_number text not null,
  instagram_url text,
  youtube_url text,
  privacy_policy text not null,
  terms_of_service text not null,
  footer_text text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  image_url text not null,
  link_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id)
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  thumbnail_url text not null,
  cover_image_url text not null,
  short_description text not null,
  description text not null,
  target_audience text not null,
  benefits text not null,
  precautions text not null,
  start_date date not null,
  end_date date not null,
  status public.challenge_status not null default 'upcoming',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id)
);

create table if not exists public.auditions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category public.audition_category not null,
  thumbnail_url text not null,
  cover_image_url text not null,
  short_description text not null,
  description text not null,
  requirements text not null,
  submission_guide text not null,
  start_date date not null,
  end_date date not null,
  status public.audition_status not null default 'open',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id)
);

create table if not exists public.audition_applications (
  id uuid primary key default gen_random_uuid(),
  audition_id uuid not null references public.auditions(id) on delete cascade,
  name text not null,
  birth_date date not null,
  gender text not null,
  email text not null,
  phone text not null,
  region text not null,
  sns_url text,
  portfolio_url text,
  self_intro text not null,
  category text not null,
  attachment_url text,
  consent_privacy boolean not null default false,
  status public.application_status not null default 'new',
  created_at timestamptz not null default now(),
  unique(audition_id, email, phone)
);

create table if not exists public.magazines (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  thumbnail_url text not null,
  cover_image_url text not null,
  summary text not null,
  content text not null,
  category public.magazine_category not null,
  published_at timestamptz not null,
  is_featured boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id)
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.banners enable row level security;
alter table public.challenges enable row level security;
alter table public.auditions enable row level security;
alter table public.audition_applications enable row level security;
alter table public.magazines enable row level security;

create policy "profiles self read" on public.profiles
for select using (id = auth.uid() or public.is_admin());

create policy "profiles admin write" on public.profiles
for all using (public.is_admin()) with check (public.is_admin());

create policy "site settings public read" on public.site_settings
for select using (true);
create policy "site settings admin write" on public.site_settings
for all using (public.is_admin()) with check (public.is_admin());

create policy "banners public read active" on public.banners
for select using (is_active = true or public.is_admin());
create policy "banners admin write" on public.banners
for all using (public.is_admin()) with check (public.is_admin());

create policy "challenges public read" on public.challenges
for select using (true);
create policy "challenges admin write" on public.challenges
for all using (public.is_admin()) with check (public.is_admin());

create policy "auditions public read" on public.auditions
for select using (true);
create policy "auditions admin write" on public.auditions
for all using (public.is_admin()) with check (public.is_admin());

create policy "magazines public read public only" on public.magazines
for select using (is_public = true or public.is_admin());
create policy "magazines admin write" on public.magazines
for all using (public.is_admin()) with check (public.is_admin());

create policy "applications public submit" on public.audition_applications
for insert with check (consent_privacy = true);
create policy "applications admin read" on public.audition_applications
for select using (public.is_admin());
create policy "applications admin update" on public.audition_applications
for update using (public.is_admin()) with check (public.is_admin());
create policy "applications admin delete" on public.audition_applications
for delete using (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('banners', 'banners', true),
  ('challenges', 'challenges', true),
  ('auditions', 'auditions', true),
  ('magazines', 'magazines', true),
  ('applications', 'applications', false)
on conflict (id) do nothing;

create policy "public read banner images" on storage.objects
for select using (bucket_id = 'banners');
create policy "public read challenge images" on storage.objects
for select using (bucket_id = 'challenges');
create policy "public read audition images" on storage.objects
for select using (bucket_id = 'auditions');
create policy "public read magazine images" on storage.objects
for select using (bucket_id = 'magazines');

create policy "admin upload banner images" on storage.objects
for insert with check (bucket_id = 'banners' and public.is_admin());
create policy "admin upload challenge images" on storage.objects
for insert with check (bucket_id = 'challenges' and public.is_admin());
create policy "admin upload audition images" on storage.objects
for insert with check (bucket_id = 'auditions' and public.is_admin());
create policy "admin upload magazine images" on storage.objects
for insert with check (bucket_id = 'magazines' and public.is_admin());

create policy "admin manage content files" on storage.objects
for update using (public.is_admin()) with check (public.is_admin());
create policy "admin delete content files" on storage.objects
for delete using (public.is_admin());

create policy "public upload application files" on storage.objects
for insert with check (bucket_id = 'applications');
create policy "admin read application files" on storage.objects
for select using (bucket_id = 'applications' and public.is_admin());
