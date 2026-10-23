-- ============================================================================
-- Sistem BUMDes · Supabase · [8/9] TAHAP 6 · Tabel proyek, pengadaan, kontrak, dan serah terima
-- ----------------------------------------------------------------------------
-- Isi         : Tabel projects, project_budget_lines, procurement_methods, project_boq_items, project_rfqs, project_quotes,
--               purchase_orders, project_contracts, project_receipts; fungsi migrate_snapshot_to_tables6, tabel_status6.
--               Tiap tabel: kolom penting + doc = objek asli aplikasi.
-- Prasyarat   : sql/01_inti.sql dan sql/02_akuntansi.sql
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (otomatis bila fungsi di bawah ada)
-- Catatan
--   Opsional: hanya perlu bila modul Proyek dan Pengadaan dipakai.
--   Total PO = jumlah purchase_orders berstatus terbit; total kontrak = nilai awal kontrak berstatus aktif atau selesai.
--   Jurnal proyek ada di tabel transactions dan journal_lines (kolom doc memuat project_id).
--   Cara "samakan dengan snapshot": baris yang sudah tidak ada di data aplikasi ikut dihapus dari tabel.
-- ============================================================================

create table if not exists public.projects (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, code text, name text, unit_id text, status text, rev int, start_date date, end_date date, method_id text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.project_budget_lines (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, project_id text, rev int, pos text, kind text, amount numeric(18,2), account_id text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists project_budget_lines_proj_idx on public.project_budget_lines(bumdes_id, project_id);
create table if not exists public.procurement_methods (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, name text, min_quotes int, max_value numeric(18,2), approval boolean, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.project_boq_items (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, project_id text, no int, descr text, unit text, qty numeric(18,3), price numeric(18,2), pos text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists project_boq_items_proj_idx on public.project_boq_items(bumdes_id, project_id);
create table if not exists public.project_rfqs (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, no text, project_id text, title text, method_id text, due date, status text, winner_quote_id text,
  created_at timestamptz, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.project_quotes (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, rfq_id text, vendor_id text, amount numeric(18,2), date date, q_score numeric(6,2), t_score numeric(6,2),
  created_at timestamptz, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists project_quotes_rfq_idx on public.project_quotes(bumdes_id, rfq_id);
create table if not exists public.purchase_orders (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, no text, project_id text, rfq_id text, vendor_id text, date date, delivery date, amount numeric(18,2), status text,
  created_at timestamptz, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.project_contracts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, no text, project_id text, po_id text, vendor_id text, title text, value numeric(18,2), start_date date, end_date date,
  ret numeric(6,2), status text, created_at timestamptz, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.project_receipts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, no text, project_id text, po_id text, vendor_id text, date date, receiver text, status text,
  created_at timestamptz, doc jsonb not null default '{}', primary key (bumdes_id, id)
);

do $$
declare t text;
begin
  foreach t in array array['projects','project_budget_lines','procurement_methods','project_boq_items','project_rfqs','project_quotes','purchase_orders','project_contracts','project_receipts'] loop
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

create or replace function public.migrate_snapshot_to_tables6(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;

  delete from public.projects where bumdes_id = p_bumdes;
  insert into public.projects select p_bumdes, o->>'_id', o->>'code', o->>'name', o->>'unit_id', o->>'status', nullif(o->>'rev','')::int,
      nullif(o->>'start','')::date, nullif(o->>'end','')::date, o->>'method_id', o
    from jsonb_array_elements(coalesce(s->'projects','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('projects', n);

  delete from public.project_budget_lines where bumdes_id = p_bumdes;
  insert into public.project_budget_lines select p_bumdes, o->>'_id', o->>'project_id', nullif(o->>'rev','')::int, o->>'pos', o->>'kind',
      nullif(o->>'amount','')::numeric, nullif(o->>'account_id',''), o
    from jsonb_array_elements(coalesce(s->'project_budget_lines','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('project_budget_lines', n);

  delete from public.procurement_methods where bumdes_id = p_bumdes;
  insert into public.procurement_methods select p_bumdes, o->>'_id', o->>'name', nullif(o->>'min_quotes','')::int, nullif(o->>'max_value','')::numeric,
      (o->>'approval')::boolean, o->>'status', o
    from jsonb_array_elements(coalesce(s->'procurement_methods','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('procurement_methods', n);

  delete from public.project_boq_items where bumdes_id = p_bumdes;
  insert into public.project_boq_items select p_bumdes, o->>'_id', o->>'project_id', nullif(o->>'no','')::int, o->>'desc', o->>'unit',
      nullif(o->>'qty','')::numeric, nullif(o->>'price','')::numeric, o->>'pos', o
    from jsonb_array_elements(coalesce(s->'project_boq_items','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('project_boq_items', n);

  delete from public.project_rfqs where bumdes_id = p_bumdes;
  insert into public.project_rfqs select p_bumdes, o->>'_id', o->>'no', o->>'project_id', o->>'title', o->>'method_id', nullif(o->>'due','')::date,
      o->>'status', o->>'winner_quote_id', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'project_rfqs','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('project_rfqs', n);

  delete from public.project_quotes where bumdes_id = p_bumdes;
  insert into public.project_quotes select p_bumdes, o->>'_id', o->>'rfq_id', o->>'vendor_id', nullif(o->>'amount','')::numeric, nullif(o->>'date','')::date,
      nullif(o->>'q_score','')::numeric, nullif(o->>'t_score','')::numeric, nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'project_quotes','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('project_quotes', n);

  delete from public.purchase_orders where bumdes_id = p_bumdes;
  insert into public.purchase_orders select p_bumdes, o->>'_id', o->>'no', o->>'project_id', o->>'rfq_id', o->>'vendor_id', nullif(o->>'date','')::date,
      nullif(o->>'delivery','')::date, nullif(o->>'amount','')::numeric, o->>'status', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'purchase_orders','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('purchase_orders', n);

  delete from public.project_contracts where bumdes_id = p_bumdes;
  insert into public.project_contracts select p_bumdes, o->>'_id', o->>'no', o->>'project_id', o->>'po_id', o->>'vendor_id', o->>'title',
      nullif(o->>'value','')::numeric, nullif(o->>'start','')::date, nullif(o->>'end','')::date, nullif(o->>'ret','')::numeric, o->>'status',
      nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'project_contracts','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('project_contracts', n);

  delete from public.project_receipts where bumdes_id = p_bumdes;
  insert into public.project_receipts select p_bumdes, o->>'_id', o->>'no', o->>'project_id', o->>'po_id', o->>'vendor_id', nullif(o->>'date','')::date,
      o->>'receiver', o->>'status', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'project_receipts','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('project_receipts', n);
  return r;
end $$;

create or replace function public.tabel_status6(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_member(p_bumdes) then raise exception 'tidak_berhak' using errcode = '42501'; end if;
  return jsonb_build_object(
    'projects',             (select count(*) from public.projects where bumdes_id = p_bumdes),
    'project_budget_lines', (select count(*) from public.project_budget_lines where bumdes_id = p_bumdes),
    'procurement_methods',  (select count(*) from public.procurement_methods where bumdes_id = p_bumdes),
    'project_boq_items',    (select count(*) from public.project_boq_items where bumdes_id = p_bumdes),
    'project_rfqs',         (select count(*) from public.project_rfqs where bumdes_id = p_bumdes),
    'project_quotes',       (select count(*) from public.project_quotes where bumdes_id = p_bumdes),
    'purchase_orders',      (select count(*) from public.purchase_orders where bumdes_id = p_bumdes),
    'project_contracts',    (select count(*) from public.project_contracts where bumdes_id = p_bumdes),
    'project_receipts',     (select count(*) from public.project_receipts where bumdes_id = p_bumdes),
    'total_po',             (select coalesce(sum(amount),0) from public.purchase_orders where bumdes_id = p_bumdes and status = 'terbit'),
    'total_kontrak',        (select coalesce(sum(value),0) from public.project_contracts where bumdes_id = p_bumdes and status in ('aktif','selesai')));
end $$;

revoke all on function public.migrate_snapshot_to_tables6(uuid) from public, anon;
revoke all on function public.tabel_status6(uuid) from public, anon;
grant execute on function public.migrate_snapshot_to_tables6(uuid) to authenticated;
grant execute on function public.tabel_status6(uuid) to authenticated;
