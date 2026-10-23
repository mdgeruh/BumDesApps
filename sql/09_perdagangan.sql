-- ============================================================================
-- Sistem BUMDes · Supabase · [9/9] TAHAP 7 · Tabel Perdagangan: gerakan stok, pembelian, dan pesanan pembelian
-- ----------------------------------------------------------------------------
-- Isi         : Tabel stock_moves, purchases, dg_po; fungsi migrate_snapshot_to_tables7, tabel_status7.
--               Tiap tabel: kolom penting + doc = objek asli aplikasi (rincian barang pembelian dan pesanan ada di doc).
-- Prasyarat   : sql/01_inti.sql dan sql/02_akuntansi.sql
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (otomatis bila fungsi di bawah ada)
-- Catatan
--   Opsional: hanya perlu bila modul Perdagangan dipakai. Penjualan dan rinciannya sudah ada di sql/05_penjualan.sql.
--   Total pembelian = jumlah purchases berstatus posted; nilai stok = jumlah value gerakan stok yang tidak void.
--   Cara "samakan dengan snapshot": baris yang sudah tidak ada di data aplikasi ikut dihapus dari tabel.
-- ============================================================================

create table if not exists public.stock_moves (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, product_id text, unit_id text, date date, kind text, qty numeric(18,3), cost numeric(18,2), value numeric(18,2),
  transaction_id text, sale_id text, status text, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists stock_moves_prod_idx on public.stock_moves(bumdes_id, product_id, date);
create table if not exists public.purchases (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, no text, unit_id text, party_id text, date date, payment_type text, due_date date, total numeric(18,2),
  transaction_id text, po_id text, status text, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists purchases_party_idx on public.purchases(bumdes_id, party_id);
create table if not exists public.dg_po (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, no text, unit_id text, party_id text, date date, expect date, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

do $$
declare t text;
begin
  foreach t in array array['stock_moves','purchases','dg_po'] loop
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

create or replace function public.migrate_snapshot_to_tables7(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;

  delete from public.stock_moves where bumdes_id = p_bumdes;
  insert into public.stock_moves select p_bumdes, o->>'_id', o->>'product_id', o->>'unit_id', nullif(o->>'date','')::date, o->>'kind',
      nullif(o->>'qty','')::numeric, nullif(o->>'cost','')::numeric, nullif(o->>'value','')::numeric, o->>'transaction_id', o->>'sale_id', o->>'status', o
    from jsonb_array_elements(coalesce(s->'stock_moves','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('stock_moves', n);

  delete from public.purchases where bumdes_id = p_bumdes;
  insert into public.purchases select p_bumdes, o->>'_id', o->>'no', o->>'unit_id', o->>'party_id', nullif(o->>'date','')::date, o->>'payment_type',
      nullif(o->>'due_date','')::date, nullif(o->>'total','')::numeric, o->>'transaction_id', o->>'po_id', o->>'status', o
    from jsonb_array_elements(coalesce(s->'purchases','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('purchases', n);

  delete from public.dg_po where bumdes_id = p_bumdes;
  insert into public.dg_po select p_bumdes, o->>'_id', o->>'no', o->>'unit_id', o->>'party_id', nullif(o->>'date','')::date,
      nullif(o->>'expect','')::date, o->>'status', o
    from jsonb_array_elements(coalesce(s->'dg_po','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('dg_po', n);
  return r;
end $$;

create or replace function public.tabel_status7(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_member(p_bumdes) then raise exception 'tidak_berhak' using errcode = '42501'; end if;
  return jsonb_build_object(
    'stock_moves',     (select count(*) from public.stock_moves where bumdes_id = p_bumdes),
    'purchases',       (select count(*) from public.purchases where bumdes_id = p_bumdes),
    'dg_po',           (select count(*) from public.dg_po where bumdes_id = p_bumdes),
    'total_pembelian', (select coalesce(sum(total),0) from public.purchases where bumdes_id = p_bumdes and status = 'posted'),
    'nilai_stok',      (select coalesce(sum(value),0) from public.stock_moves where bumdes_id = p_bumdes and coalesce(status,'') <> 'void'));
end $$;

revoke all on function public.migrate_snapshot_to_tables7(uuid) from public, anon;
revoke all on function public.tabel_status7(uuid) from public, anon;
grant execute on function public.migrate_snapshot_to_tables7(uuid) to authenticated;
grant execute on function public.tabel_status7(uuid) to authenticated;
