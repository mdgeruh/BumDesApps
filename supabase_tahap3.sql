-- ============================================================================
-- Sistem BUMDes · Supabase · [4/8] TAHAP 3 · Tabel pegawai dan gaji
-- ----------------------------------------------------------------------------
-- Isi         : Tabel employees, payroll_components, payrolls, payroll_items, salary_payments; fungsi migrate_snapshot_to_tables3,
--               tabel_status3. Tiap tabel: kolom penting + doc = objek asli aplikasi.
-- Prasyarat   : supabase_schema.sql dan supabase_tahap2.sql
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (otomatis bila fungsi di bawah ada)
-- Catatan
--   PIN pengguna TIDAK disalin ke tabel ini.
--   Cara "samakan dengan snapshot": baris yang sudah tidak ada di data aplikasi ikut dihapus dari tabel.
-- ============================================================================

create table if not exists public.employees (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, emp_number text, name text not null, position text, unit_id text, status text,
  base_salary numeric(18,2), doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.payroll_components (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, name text not null, type text, calc text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.payrolls (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, period text not null, employee_id text not null, unit_id text, status text,
  gross_salary numeric(18,2) not null default 0, total_deduction numeric(18,2) not null default 0, net_salary numeric(18,2) not null default 0,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists payrolls_period_idx on public.payrolls(bumdes_id, period);
create table if not exists public.payroll_items (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, payroll_id text not null, component_id text, name text, type text,
  amount numeric(18,2) not null default 0, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists payroll_items_pay_idx on public.payroll_items(bumdes_id, payroll_id);
create table if not exists public.salary_payments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, payroll_id text not null, payment_date date, cash_account_id text, transaction_id text, status text,
  amount numeric(18,2), doc jsonb not null default '{}', primary key (bumdes_id, id)
);

do $$
declare t text;
begin
  foreach t in array array['employees','payroll_components','payrolls','payroll_items','salary_payments'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, public', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_sel', t);
    execute format('create policy %I on public.%I for select to authenticated using (public.is_member(bumdes_id))', t||'_sel', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_ins', t);
    execute format('drop policy if exists %I on public.%I', t||'_upd', t);
    execute format('create policy %I on public.%I for update to authenticated using (public.is_member(bumdes_id, array[''admin'',''pengurus''])) with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_upd', t);
    execute format('drop policy if exists %I on public.%I', t||'_del', t);
    execute format('create policy %I on public.%I for delete to authenticated using (public.is_member(bumdes_id, array[''admin'']))', t||'_del', t);
  end loop;
end $$;

create or replace function public.migrate_snapshot_to_tables3(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;

  delete from public.employees where bumdes_id = p_bumdes;
  insert into public.employees select p_bumdes, o->>'_id', o->>'emp_number', o->>'name', o->>'position', o->>'unit_id', o->>'status',
      nullif(o->>'base_salary','')::numeric, o from jsonb_array_elements(coalesce(s->'employees','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('employees', n);

  delete from public.payroll_components where bumdes_id = p_bumdes;
  insert into public.payroll_components select p_bumdes, o->>'_id', o->>'name', o->>'type', coalesce(o->>'calc','tetap'), o->>'status', o
    from jsonb_array_elements(coalesce(s->'payroll_components','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payroll_components', n);

  delete from public.payrolls where bumdes_id = p_bumdes;
  insert into public.payrolls select p_bumdes, o->>'_id', o->>'period', o->>'employee_id', o->>'unit_id', o->>'status',
      coalesce((o->>'gross_salary')::numeric,0), coalesce((o->>'total_deduction')::numeric,0), coalesce((o->>'net_salary')::numeric,0), o
    from jsonb_array_elements(coalesce(s->'payrolls','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payrolls', n);

  delete from public.payroll_items where bumdes_id = p_bumdes;
  insert into public.payroll_items select p_bumdes, o->>'_id', o->>'payroll_id', o->>'component_id', o->>'name', o->>'type',
      coalesce((o->>'amount')::numeric,0), o from jsonb_array_elements(coalesce(s->'payroll_items','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payroll_items', n);

  delete from public.salary_payments where bumdes_id = p_bumdes;
  insert into public.salary_payments select p_bumdes, o->>'_id', o->>'payroll_id', nullif(o->>'payment_date','')::date, o->>'cash_account_id',
      o->>'transaction_id', o->>'status', nullif(o->>'amount','')::numeric, o from jsonb_array_elements(coalesce(s->'salary_payments','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('salary_payments', n);
  return r;
end $$;

create or replace function public.tabel_status3(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_member(p_bumdes) then raise exception 'tidak_berhak' using errcode = '42501'; end if;
  return jsonb_build_object(
    'employees',          (select count(*) from public.employees where bumdes_id = p_bumdes),
    'payroll_components', (select count(*) from public.payroll_components where bumdes_id = p_bumdes),
    'payrolls',           (select count(*) from public.payrolls where bumdes_id = p_bumdes),
    'payroll_items',      (select count(*) from public.payroll_items where bumdes_id = p_bumdes),
    'salary_payments',    (select count(*) from public.salary_payments where bumdes_id = p_bumdes),
    'net_salary',         (select coalesce(sum(net_salary),0) from public.payrolls where bumdes_id = p_bumdes));
end $$;

revoke all on function public.migrate_snapshot_to_tables3(uuid) from public, anon;
revoke all on function public.tabel_status3(uuid) from public, anon;
grant execute on function public.migrate_snapshot_to_tables3(uuid) to authenticated;
grant execute on function public.tabel_status3(uuid) to authenticated;
