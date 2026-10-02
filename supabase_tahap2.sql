-- ============================================================================
-- Sistem BUMDes — Supabase TAHAP 2 (RANCANGAN, belum dipakai aplikasi v1.1.042)
-- Tabel sungguhan per koleksi, aman untuk banyak pengguna, dengan RLS dan jurnal yang dijaga di server.
-- Prasyarat: supabase_schema.sql (Tahap 1) sudah dijalankan (memakai tabel bumdes dan fungsi is_member).
-- Tiap tabel menyimpan kolom penting (untuk query/laporan) + kolom doc = objek asli aplikasi (tanpa kehilangan data).
-- Idempoten: aman dijalankan ulang.
-- ============================================================================

-- ----- tabel master ----------------------------------------------------------
create table if not exists public.business_units (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, code text, name text not null, type text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.parties (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, type text not null, name text not null, phone text, address text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists parties_name_idx on public.parties(bumdes_id, type, lower(name));
create table if not exists public.accounts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, code text not null, name text not null, type text not null, parent_id text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create table if not exists public.cash_accounts (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, name text not null, account_id text, type text, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

-- ----- akuntansi: transaksi dan baris jurnal ----------------------------------
create table if not exists public.transactions (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, date date not null, type text, business_unit_id text, description text,
  amount numeric(18,2), status text, created_by text, created_at timestamptz,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists transactions_date_idx on public.transactions(bumdes_id, date);
create table if not exists public.journal_lines (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, transaction_id text not null, account_id text not null, business_unit_id text,
  date date not null,
  debit numeric(18,2) not null default 0 check (debit >= 0),
  credit numeric(18,2) not null default 0 check (credit >= 0),
  doc jsonb not null default '{}', primary key (bumdes_id, id),
  check (debit = 0 or credit = 0)
);
create index if not exists journal_lines_txn_idx on public.journal_lines(bumdes_id, transaction_id);
create index if not exists journal_lines_acc_idx on public.journal_lines(bumdes_id, account_id, date);

-- jurnal wajib seimbang per transaksi saat COMMIT (constraint trigger tertunda)
create or replace function public.trg_check_balanced() returns trigger
language plpgsql as $$
declare d numeric; c numeric; t text; b uuid;
begin
  t := coalesce(new.transaction_id, old.transaction_id); b := coalesce(new.bumdes_id, old.bumdes_id);
  select coalesce(sum(debit),0), coalesce(sum(credit),0) into d, c
    from public.journal_lines where bumdes_id = b and transaction_id = t;
  if d <> c then
    raise exception 'jurnal_tidak_seimbang: transaksi % debit % kredit %', t, d, c using errcode = '23514';
  end if;
  return null;
end $$;
drop trigger if exists journal_lines_balanced on public.journal_lines;
create constraint trigger journal_lines_balanced after insert or update or delete on public.journal_lines
  deferrable initially deferred for each row execute function public.trg_check_balanced();

-- ----- Simpan Pinjam ----------------------------------------------------------
create table if not exists public.loans (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_number text, party_id text not null, unit_id text, status text not null,
  principal numeric(18,2) not null, interest_rate numeric(9,4), tenor int, interest_method text,
  application_date date, approval_date date, disbursement_date date, installment_amount numeric(18,2),
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists loans_party_idx on public.loans(bumdes_id, party_id);
create table if not exists public.loan_installments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_id text not null, installment_number int not null, due_date date not null,
  principal_due numeric(18,2) not null default 0, interest_due numeric(18,2) not null default 0,
  principal_paid numeric(18,2) not null default 0, interest_paid numeric(18,2) not null default 0,
  penalty_due numeric(18,2) default 0, penalty_paid numeric(18,2) default 0, status text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);
create index if not exists loan_inst_loan_idx on public.loan_installments(bumdes_id, loan_id, installment_number);
create table if not exists public.loan_payments (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, loan_id text not null, installment_id text, party_id text, payment_date date,
  principal_amount numeric(18,2), interest_amount numeric(18,2), penalty_amount numeric(18,2),
  total_amount numeric(18,2), kind text, status text, transaction_id text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

-- ----- audit log: hanya tambah, tidak bisa diubah/hapus ------------------------
create table if not exists public.audit_logs (
  bumdes_id uuid not null references public.bumdes(id) on delete cascade,
  id text not null, at timestamptz, action text, entity text, entity_id text, detail text, "user" text,
  doc jsonb not null default '{}', primary key (bumdes_id, id)
);

-- ----- RLS --------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['business_units','parties','accounts','cash_accounts','transactions','journal_lines',
                           'loans','loan_installments','loan_payments','audit_logs'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, public', t);
    execute format('grant select on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_sel', t);
    execute format('create policy %I on public.%I for select to authenticated using (public.is_member(bumdes_id))', t||'_sel', t);
  end loop;
  -- master dan Simpan Pinjam: admin/pengurus boleh tambah dan ubah; hanya admin boleh hapus
  foreach t in array array['business_units','parties','accounts','cash_accounts','loans','loan_installments','loan_payments'] loop
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_ins', t);
    execute format('drop policy if exists %I on public.%I', t||'_upd', t);
    execute format('create policy %I on public.%I for update to authenticated using (public.is_member(bumdes_id, array[''admin'',''pengurus''])) with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_upd', t);
    execute format('drop policy if exists %I on public.%I', t||'_del', t);
    execute format('create policy %I on public.%I for delete to authenticated using (public.is_member(bumdes_id, array[''admin'']))', t||'_del', t);
  end loop;
  -- jurnal, transaksi, audit: hanya INSERT (koreksi lewat transaksi pembalik); status transaksi boleh diubah (pembatalan)
  foreach t in array array['transactions','journal_lines','audit_logs'] loop
    execute format('grant insert on public.%I to authenticated', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_member(bumdes_id, array[''admin'',''pengurus'']))', t||'_ins', t);
  end loop;
end $$;
grant update (status) on public.transactions to authenticated;
drop policy if exists transactions_upd on public.transactions;
create policy transactions_upd on public.transactions for update to authenticated
  using (public.is_member(bumdes_id, array['admin','pengurus'])) with check (public.is_member(bumdes_id, array['admin','pengurus']));

-- ----- fungsi: catat transaksi + baris jurnal secara atomik --------------------
-- p_txn   : {"id","date","type","business_unit_id","description","amount","status","created_by"}
-- p_lines : [{"id","account_id","debit","credit","business_unit_id"}, ...]
create or replace function public.post_transaction(p_bumdes uuid, p_txn jsonb, p_lines jsonb)
returns text
language plpgsql security definer set search_path = public
as $$
declare d numeric; c numeric; v_id text := p_txn->>'id';
begin
  if not public.is_member(p_bumdes, array['admin','pengurus']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  if v_id is null or jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) < 2 then
    raise exception 'transaksi_tidak_valid' using errcode = '22023';
  end if;
  select coalesce(sum((l->>'debit')::numeric),0), coalesce(sum((l->>'credit')::numeric),0)
    into d, c from jsonb_array_elements(p_lines) l;
  if d <> c or d <= 0 then
    raise exception 'jurnal_tidak_seimbang: debit % kredit %', d, c using errcode = '23514';
  end if;
  insert into public.transactions(bumdes_id,id,date,type,business_unit_id,description,amount,status,created_by,created_at,doc)
  values (p_bumdes, v_id, (p_txn->>'date')::date, p_txn->>'type', p_txn->>'business_unit_id', p_txn->>'description',
          nullif(p_txn->>'amount','')::numeric, coalesce(p_txn->>'status','posted'), p_txn->>'created_by', now(), p_txn);
  insert into public.journal_lines(bumdes_id,id,transaction_id,account_id,business_unit_id,date,debit,credit,doc)
  select p_bumdes, l->>'id', v_id, l->>'account_id', coalesce(l->>'business_unit_id', p_txn->>'business_unit_id'),
         (p_txn->>'date')::date, coalesce((l->>'debit')::numeric,0), coalesce((l->>'credit')::numeric,0), l
  from jsonb_array_elements(p_lines) l;
  return v_id;
end $$;

-- ----- fungsi: pindahkan data dari snapshot (Tahap 1) ke tabel (admin saja) -----
-- Idempoten: menimpa baris dengan id yang sama. Koleksi lain (gaji, air, dst.) tetap di snapshot sampai dimigrasikan.
create or replace function public.migrate_snapshot_to_tables(p_bumdes uuid)
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare s jsonb; r jsonb := '{}'; n int;
begin
  if not public.is_member(p_bumdes, array['admin']) then
    raise exception 'tidak_berhak' using errcode = '42501';
  end if;
  select data into s from public.bumdes_snapshots where bumdes_id = p_bumdes;
  if s is null then raise exception 'snapshot_belum_ada' using errcode = 'P0002'; end if;
  set constraints all deferred;

  insert into public.business_units select p_bumdes, o->>'_id', o->>'code', o->>'name', o->>'type', o->>'status', o
    from jsonb_array_elements(coalesce(s->'business_units','[]')) o
    on conflict (bumdes_id,id) do update set code=excluded.code,name=excluded.name,type=excluded.type,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('business_units', n);

  insert into public.parties select p_bumdes, o->>'_id', o->>'type', o->>'name', o->>'phone', o->>'address', o->>'status', o
    from jsonb_array_elements(coalesce(s->'parties','[]')) o
    on conflict (bumdes_id,id) do update set type=excluded.type,name=excluded.name,phone=excluded.phone,address=excluded.address,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('parties', n);

  insert into public.accounts select p_bumdes, o->>'_id', o->>'code', o->>'name', o->>'type', o->>'parent_id', o->>'status', o
    from jsonb_array_elements(coalesce(s->'accounts','[]')) o
    on conflict (bumdes_id,id) do update set code=excluded.code,name=excluded.name,type=excluded.type,parent_id=excluded.parent_id,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('accounts', n);

  insert into public.cash_accounts select p_bumdes, o->>'_id', o->>'name', o->>'account_id', o->>'type', o->>'status', o
    from jsonb_array_elements(coalesce(s->'cash_accounts','[]')) o
    on conflict (bumdes_id,id) do update set name=excluded.name,account_id=excluded.account_id,type=excluded.type,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('cash_accounts', n);

  insert into public.transactions select p_bumdes, o->>'_id', (o->>'date')::date, o->>'type', o->>'business_unit_id', o->>'description',
      nullif(o->>'amount','')::numeric, o->>'status', o->>'created_by', nullif(o->>'created_at','')::timestamptz, o
    from jsonb_array_elements(coalesce(s->'transactions','[]')) o
    on conflict (bumdes_id,id) do update set date=excluded.date,type=excluded.type,business_unit_id=excluded.business_unit_id,description=excluded.description,amount=excluded.amount,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('transactions', n);

  insert into public.journal_lines select p_bumdes, o->>'_id', o->>'transaction_id', o->>'account_id', o->>'business_unit_id',
      (o->>'date')::date, coalesce((o->>'debit')::numeric,0), coalesce((o->>'credit')::numeric,0), o
    from jsonb_array_elements(coalesce(s->'journal_lines','[]')) o
    on conflict (bumdes_id,id) do update set transaction_id=excluded.transaction_id,account_id=excluded.account_id,business_unit_id=excluded.business_unit_id,date=excluded.date,debit=excluded.debit,credit=excluded.credit,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('journal_lines', n);

  insert into public.loans select p_bumdes, o->>'_id', o->>'loan_number', o->>'party_id', o->>'unit_id', o->>'status',
      (o->>'principal')::numeric, nullif(o->>'interest_rate','')::numeric, nullif(o->>'tenor','')::int, o->>'interest_method',
      nullif(o->>'application_date','')::date, nullif(o->>'approval_date','')::date, nullif(o->>'disbursement_date','')::date,
      nullif(o->>'installment_amount','')::numeric, o
    from jsonb_array_elements(coalesce(s->'loans','[]')) o
    on conflict (bumdes_id,id) do update set loan_number=excluded.loan_number,party_id=excluded.party_id,unit_id=excluded.unit_id,status=excluded.status,principal=excluded.principal,interest_rate=excluded.interest_rate,tenor=excluded.tenor,interest_method=excluded.interest_method,application_date=excluded.application_date,approval_date=excluded.approval_date,disbursement_date=excluded.disbursement_date,installment_amount=excluded.installment_amount,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('loans', n);

  insert into public.loan_installments select p_bumdes, o->>'_id', o->>'loan_id', (o->>'installment_number')::int, (o->>'due_date')::date,
      coalesce((o->>'principal_due')::numeric,0), coalesce((o->>'interest_due')::numeric,0),
      coalesce((o->>'principal_paid')::numeric,0), coalesce((o->>'interest_paid')::numeric,0),
      coalesce((o->>'penalty_due')::numeric,0), coalesce((o->>'penalty_paid')::numeric,0), o->>'status', o
    from jsonb_array_elements(coalesce(s->'loan_installments','[]')) o
    on conflict (bumdes_id,id) do update set loan_id=excluded.loan_id,installment_number=excluded.installment_number,due_date=excluded.due_date,principal_due=excluded.principal_due,interest_due=excluded.interest_due,principal_paid=excluded.principal_paid,interest_paid=excluded.interest_paid,penalty_due=excluded.penalty_due,penalty_paid=excluded.penalty_paid,status=excluded.status,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('loan_installments', n);

  insert into public.loan_payments select p_bumdes, o->>'_id', o->>'loan_id', o->>'installment_id', o->>'party_id', nullif(o->>'payment_date','')::date,
      nullif(o->>'principal_amount','')::numeric, nullif(o->>'interest_amount','')::numeric, nullif(o->>'penalty_amount','')::numeric,
      nullif(o->>'total_amount','')::numeric, o->>'kind', o->>'status', o->>'transaction_id', o
    from jsonb_array_elements(coalesce(s->'loan_payments','[]')) o
    on conflict (bumdes_id,id) do update set loan_id=excluded.loan_id,installment_id=excluded.installment_id,party_id=excluded.party_id,payment_date=excluded.payment_date,principal_amount=excluded.principal_amount,interest_amount=excluded.interest_amount,penalty_amount=excluded.penalty_amount,total_amount=excluded.total_amount,kind=excluded.kind,status=excluded.status,transaction_id=excluded.transaction_id,doc=excluded.doc;
  get diagnostics n = row_count; r := r || jsonb_build_object('loan_payments', n);

  insert into public.audit_logs select p_bumdes, o->>'_id', nullif(o->>'at','')::timestamptz, o->>'action', o->>'entity', o->>'entity_id',
      coalesce(o->>'detail', o->>'det'), o->>'user', o
    from jsonb_array_elements(coalesce(s->'audit_logs','[]')) o
    on conflict (bumdes_id,id) do nothing;
  get diagnostics n = row_count; r := r || jsonb_build_object('audit_logs', n);
  return r;
end $$;

revoke all on function public.post_transaction(uuid, jsonb, jsonb) from public, anon;
revoke all on function public.migrate_snapshot_to_tables(uuid)     from public, anon;
grant execute on function public.post_transaction(uuid, jsonb, jsonb) to authenticated;
grant execute on function public.migrate_snapshot_to_tables(uuid)     to authenticated;
