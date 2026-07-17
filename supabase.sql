-- Execute no SQL Editor do Supabase.
-- Depois, ative Authentication > Providers > Anonymous Sign-Ins.

create extension if not exists pgcrypto;

create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid unique,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  workout_code text not null check (workout_code in ('A', 'B')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.set_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  exercise_id text not null,
  exercise_name text not null,
  set_number integer not null check (set_number > 0),
  target_reps text not null,
  performed_reps integer not null default 0 check (performed_reps >= 0),
  per_side boolean not null default false,
  band_type text not null default 'nenhum' check (band_type in ('curto', 'longo', 'nenhum')),
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(session_id, exercise_id, set_number)
);

create index if not exists workout_sessions_user_completed_idx
  on public.workout_sessions(user_id, completed_at desc);
create index if not exists set_logs_session_idx
  on public.set_logs(session_id);

alter table public.workout_sessions enable row level security;
alter table public.set_logs enable row level security;

-- Remove políticas anteriores com os mesmos nomes para permitir reexecução.
drop policy if exists "Users read own workout sessions" on public.workout_sessions;
drop policy if exists "Users insert own workout sessions" on public.workout_sessions;
drop policy if exists "Users update own workout sessions" on public.workout_sessions;
drop policy if exists "Users delete own workout sessions" on public.workout_sessions;
drop policy if exists "Users read own set logs" on public.set_logs;
drop policy if exists "Users insert own set logs" on public.set_logs;
drop policy if exists "Users update own set logs" on public.set_logs;
drop policy if exists "Users delete own set logs" on public.set_logs;

create policy "Users read own workout sessions"
  on public.workout_sessions for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users insert own workout sessions"
  on public.workout_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users update own workout sessions"
  on public.workout_sessions for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Users delete own workout sessions"
  on public.workout_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users read own set logs"
  on public.set_logs for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users insert own set logs"
  on public.set_logs for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.workout_sessions
      where workout_sessions.id = set_logs.session_id
        and workout_sessions.user_id = (select auth.uid())
    )
  );
create policy "Users update own set logs"
  on public.set_logs for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.workout_sessions
      where workout_sessions.id = set_logs.session_id
        and workout_sessions.user_id = (select auth.uid())
    )
  );
create policy "Users delete own set logs"
  on public.set_logs for delete to authenticated
  using ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.workout_sessions to authenticated;
grant select, insert, update, delete on public.set_logs to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists workout_sessions_set_updated_at on public.workout_sessions;
create trigger workout_sessions_set_updated_at
before update on public.workout_sessions
for each row execute function public.set_updated_at();

drop trigger if exists set_logs_set_updated_at on public.set_logs;
create trigger set_logs_set_updated_at
before update on public.set_logs
for each row execute function public.set_updated_at();
