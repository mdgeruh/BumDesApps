-- ============================================================================
-- Sistem BUMDes · Supabase · [6/8] TAHAP 5 · Tabel penjualan, Unit Air, jaminan, tarif dan pajak
-- ----------------------------------------------------------------------------
-- Isi         : Tabel products, sales, sale_items, payments, water_connections, water_readings, collaterals,
--               rate_master, tax_master, collection_notes, prospects; fungsi migrate_snapshot_to_tables5, tabel_status5.
--               Tiap tabel: kolom penting + doc = objek asli aplikasi.
-- Prasyarat   : supabase_schema.sql dan supabase_tahap2.sql
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (otomatis bila fungsi di bawah ada)
-- Catatan
--   Total penjualan = jumlah sales berstatus posted; pembayaran = jumlah payments berstatus posted (sama dengan aplikasi).
--   Cara "samakan dengan snapshot": baris yang sudah tidak ada di data aplikasi ikut dihapus dari tabel.
--   Pengguna dan peran, produk tabungan, pengaturan bunga ada di pengaturan aplikasi (snapshot), belum jadi tabel.
-- ============================================================================

create table if not exists public.products (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, unit_id text, name text, unit text, price numeric(18,2), revenue_account text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.sales (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, sale_number text, unit_id text, party_id text, date date, payment_type text,
  total numeric(18,2) not null default 0, cash_id text, transaction_id text, status text, opening boolean not null default false,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists sales_party_idx on public.sales(bumdes_id, party_id);
create table if not exists public.sale_items (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, sale_id text not null, product_id text, label text, unit text,
  qty numeric(18,4), price numeric(18,4), subtotal numeric(18,2) not null default 0,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists sale_items_sale_idx on public.sale_items(bumdes_id, sale_id);
create table if not exists public.payments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, sale_id text not null, date date, amount numeric(18,2) not null default 0,
  cash_id text, transaction_id text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists payments_sale_idx on public.payments(bumdes_id, sale_id);
create table if not exists public.water_connections (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, unit_id text, party_id text, meter_no text, initial numeric(18,3), installed date, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.water_readings (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, conn_id text not null, kind text, period text, date date,
  prev numeric(18,3), curr numeric(18,3), usage numeric(18,3), sale_id text, meter_no text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists water_readings_conn_idx on public.water_readings(bumdes_id, conn_id);
create table if not exists public.collaterals (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_id text not null, type text, description text, estimated_value numeric(18,2),
  document_number text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists collaterals_loan_idx on public.collaterals(bumdes_id, loan_id);
create table if not exists public.rate_master (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, fee_code text not null, fee_name text, fee_type text, calc_method text, base text,
  rate numeric(18,6), fixed_amount numeric(18,2), minimum numeric(18,2), maximum numeric(18,2), taxable boolean,
  version int, effective_from date, effective_until date, active boolean,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists rate_master_code_idx on public.rate_master(bumdes_id, fee_code, version);
create table if not exists public.tax_master (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, tax_code text not null, tax_name text, tax_type text, tax_rate numeric(18,6),
  version int, effective_from date, effective_until date, active boolean,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists tax_master_code_idx on public.tax_master(bumdes_id, tax_code, version);
create table if not exists public.collection_notes (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_id text not null, date date, type text, result text, promise_date date, note text,
  by_name text, created_at timestamptz,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists collection_notes_loan_idx on public.collection_notes(bumdes_id, loan_id);
create table if not exists public.prospects (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, name text, phone text, purpose text, amount numeric(18,2), status text, created_at timestamptz,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

do $$
declare t text;
begin
  foreach t in array array['products','sales','sale_items','payments','water_connections','water_readings','collaterals','rate_master','tax_master','collection_notes','prospects'] loop
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

create or replace function public.migrate_snapshot_to_tables5(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;

  delete from public.products where bumdes_id = p_bumdes;
  insert into public.products select p_bumdes, o->>'_id', o->>'unit_id', o->>'name', o->>'unit',
      nullif(o->>'price','')::numeric, o->>'revenue_account', o->>'status', o
    from jsonb_array_elements(coalesce(s->'products','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('products', n);

  delete from public.sales where bumdes_id = p_bumdes;
  insert into public.sales select p_bumdes, o->>'_id', o->>'sale_number', o->>'unit_id', o->>'party_id', nullif(o->>'date','')::date, o->>'payment_type',
      coalesce(nullif(o->>'total','')::numeric,0), o->>'cash_id', o->>'transaction_id', o->>'status', coalesce((o->>'opening')::boolean,false), o
    from jsonb_array_elements(coalesce(s->'sales','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('sales', n);

  delete from public.sale_items where bumdes_id = p_bumdes;
  insert into public.sale_items select p_bumdes, o->>'_id', o->>'sale_id', o->>'product_id', o->>'label', o->>'unit',
      nullif(o->>'qty','')::numeric, nullif(o->>'price','')::numeric, coalesce(nullif(o->>'subtotal','')::numeric,0), o
    from jsonb_array_elements(coalesce(s->'sale_items','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('sale_items', n);

  delete from public.payments where bumdes_id = p_bumdes;
  insert into public.payments select p_bumdes, o->>'_id', o->>'sale_id', nullif(o->>'date','')::date, coalesce(nullif(o->>'amount','')::numeric,0),
      o->>'cash_id', o->>'transaction_id', o->>'status', o
    from jsonb_array_elements(coalesce(s->'payments','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('payments', n);

  delete from public.water_connections where bumdes_id = p_bumdes;
  insert into public.water_connections select p_bumdes, o->>'_id', o->>'unit_id', o->>'party_id', o->>'meter_no',
      nullif(o->>'initial','')::numeric, nullif(o->>'installed','')::date, o->>'status', o
    from jsonb_array_elements(coalesce(s->'water_connections','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('water_connections', n);

  delete from public.water_readings where bumdes_id = p_bumdes;
  insert into public.water_readings select p_bumdes, o->>'_id', o->>'conn_id', o->>'kind', o->>'period', nullif(o->>'date','')::date,
      nullif(o->>'prev','')::numeric, nullif(o->>'curr','')::numeric, nullif(o->>'usage','')::numeric, o->>'sale_id', o->>'meter_no', o->>'status', o
    from jsonb_array_elements(coalesce(s->'water_readings','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('water_readings', n);

  delete from public.collaterals where bumdes_id = p_bumdes;
  insert into public.collaterals select p_bumdes, o->>'_id', o->>'loan_id', o->>'type', o->>'description',
      nullif(o->>'estimated_value','')::numeric, o->>'document_number', o->>'status', o
    from jsonb_array_elements(coalesce(s->'collaterals','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('collaterals', n);

  delete from public.rate_master where bumdes_id = p_bumdes;
  insert into public.rate_master select p_bumdes, o->>'_id', o->>'fee_code', o->>'fee_name', o->>'fee_type', o->>'calc_method', o->>'base',
      nullif(o->>'rate','')::numeric, nullif(o->>'fixed_amount','')::numeric, nullif(o->>'minimum','')::numeric, nullif(o->>'maximum','')::numeric,
      (o->>'taxable')::boolean, nullif(o->>'version','')::int, nullif(o->>'effective_from','')::date, nullif(o->>'effective_until','')::date,
      (o->>'active')::boolean, o
    from jsonb_array_elements(coalesce(s->'rate_master','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('rate_master', n);

  delete from public.tax_master where bumdes_id = p_bumdes;
  insert into public.tax_master select p_bumdes, o->>'_id', o->>'tax_code', o->>'tax_name', o->>'tax_type', nullif(o->>'tax_rate','')::numeric,
      nullif(o->>'version','')::int, nullif(o->>'effective_from','')::date, nullif(o->>'effective_until','')::date, (o->>'active')::boolean, o
    from jsonb_array_elements(coalesce(s->'tax_master','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('tax_master', n);

  delete from public.collection_notes where bumdes_id = p_bumdes;
  insert into public.collection_notes select p_bumdes, o->>'_id', o->>'loan_id', nullif(o->>'date','')::date, o->>'type', o->>'result',
      nullif(o->>'promise_date','')::date, o->>'note', o->>'by', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'collection_notes','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('collection_notes', n);

  delete from public.prospects where bumdes_id = p_bumdes;
  insert into public.prospects select p_bumdes, o->>'_id', o->>'name', o->>'phone', o->>'purpose', nullif(o->>'amount','')::numeric,
      o->>'status', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'prospects','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('prospects', n);
  return r;
end $$;

create or replace function public.tabel_status5(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_member(p_bumdes) then raise exception 'tidak_berhak' using errcode = '42501'; end if;
  return jsonb_build_object(
    'products',          (select count(*) from public.products where bumdes_id = p_bumdes),
    'sales',             (select count(*) from public.sales where bumdes_id = p_bumdes),
    'sale_items',        (select count(*) from public.sale_items where bumdes_id = p_bumdes),
    'payments',          (select count(*) from public.payments where bumdes_id = p_bumdes),
    'water_connections', (select count(*) from public.water_connections where bumdes_id = p_bumdes),
    'water_readings',    (select count(*) from public.water_readings where bumdes_id = p_bumdes),
    'collaterals',       (select count(*) from public.collaterals where bumdes_id = p_bumdes),
    'rate_master',       (select count(*) from public.rate_master where bumdes_id = p_bumdes),
    'tax_master',        (select count(*) from public.tax_master where bumdes_id = p_bumdes),
    'collection_notes',  (select count(*) from public.collection_notes where bumdes_id = p_bumdes),
    'prospects',         (select count(*) from public.prospects where bumdes_id = p_bumdes),
    'total_penjualan',   (select coalesce(sum(total),0) from public.sales where bumdes_id = p_bumdes and status = 'posted'),
    'total_pembayaran',  (select coalesce(sum(amount),0) from public.payments where bumdes_id = p_bumdes and status = 'posted'),
    'nilai_jaminan',     (select coalesce(sum(estimated_value),0) from public.collaterals where bumdes_id = p_bumdes));
end $$;

revoke all on function public.migrate_snapshot_to_tables5(uuid) from public, anon;
revoke all on function public.tabel_status5(uuid) from public, anon;
grant execute on function public.migrate_snapshot_to_tables5(uuid) to authenticated;
grant execute on function public.tabel_status5(uuid) to authenticated;
