-- ============================================================================
-- Sistem BUMDes · Supabase · [5/8] TAHAP 4 · Tabel tabungan
-- ----------------------------------------------------------------------------
-- Isi         : Tabel savings_accounts dan savings_tx; fungsi migrate_snapshot_to_tables4, tabel_status4.
--               Tiap tabel: kolom penting + doc = objek asli aplikasi.
-- Prasyarat   : supabase_schema.sql dan supabase_tahap2.sql
-- Dijalankan  : Supabase > SQL Editor > New query > tempel seluruh berkas > Run. Idempoten (aman diulang). Tanpa rahasia.
-- Dipakai oleh: Setelan > Awan > Tabel relasional (otomatis bila fungsi di bawah ada)
-- Catatan
--   Saldo tabungan = setoran + bunga - penarikan - biaya, hanya mutasi berstatus posted (sama dengan aplikasi).
--   Cara "samakan dengan snapshot": baris yang sudah tidak ada di data aplikasi ikut dihapus dari tabel.
--   Produk tabungan dan pengaturan bunga ada di pengaturan aplikasi (snapshot), belum jadi tabel.
-- ============================================================================

create table if not exists public.savings_accounts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, number text, party_id text, unit_id text, product text, status text,
  min_balance numeric(18,2), opened_at date, doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists savings_accounts_party_idx on public.savings_accounts(bumdes_id, party_id);
create table if not exists public.savings_tx (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, account_id text not null, type text not null, date date, amount numeric(18,2) not null default 0,
  txn_id text, cash_id text, via text, loan_id text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists savings_tx_acc_idx on public.savings_tx(bumdes_id, account_id);

do $$
declare t text;
begin
  foreach t in array array['savings_accounts','savings_tx'] loop
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

create or replace function public.migrate_snapshot_to_tables4(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;

  delete from public.savings_accounts where bumdes_id = p_bumdes;
  insert into public.savings_accounts select p_bumdes, o->>'_id', o->>'number', o->>'party_id', o->>'unit_id', o->>'product', o->>'status',
      nullif(o->>'min_balance','')::numeric, nullif(o->>'opened_at','')::date, o
    from jsonb_array_elements(coalesce(s->'savings_accounts','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('savings_accounts', n);

  delete from public.savings_tx where bumdes_id = p_bumdes;
  insert into public.savings_tx select p_bumdes, o->>'_id', o->>'account_id', o->>'type', nullif(o->>'date','')::date,
      coalesce((o->>'amount')::numeric,0), o->>'txn_id', o->>'cash_id', o->>'via', o->>'loan_id', o->>'status', o
    from jsonb_array_elements(coalesce(s->'savings_tx','[]')) o;
  get diagnostics n = row_count; r := r || jsonb_build_object('savings_tx', n);
  return r;
end $$;

create or replace function public.tabel_status4(p_bumdes uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_member(p_bumdes) then raise exception 'tidak_berhak' using errcode = '42501'; end if;
  return jsonb_build_object(
    'savings_accounts', (select count(*) from public.savings_accounts where bumdes_id = p_bumdes),
    'savings_tx',       (select count(*) from public.savings_tx where bumdes_id = p_bumdes),
    'saldo_tabungan',   (select coalesce(sum(case when type in ('setor','bunga') then amount when type in ('tarik','biaya') then -amount else 0 end),0)
                           from public.savings_tx where bumdes_id = p_bumdes and status = 'posted'));
end $$;

revoke all on function public.migrate_snapshot_to_tables4(uuid) from public, anon;
revoke all on function public.tabel_status4(uuid) from public, anon;
grant execute on function public.migrate_snapshot_to_tables4(uuid) to authenticated;
grant execute on function public.tabel_status4(uuid) to authenticated;
