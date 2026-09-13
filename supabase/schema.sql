-- Digivalmennusalusta — kevyt tekninen perusta (Supabase/Postgres)
--
-- Ajojärjestys: aja tämä koko tiedosto kerran Supabase-projektin
-- SQL-editorissa (Database → SQL Editor). Turvallista ajaa uudelleen
-- (create ... if not exists / drop policy if exists ennen create).

-- ============================================================
-- 1. Profiilit — asiakas/valmentaja-rooli, viittaa auth.users:iin
-- ============================================================

create table if not exists profiilit (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  nimi text,
  rooli text not null default 'asiakas' check (rooli in ('asiakas', 'valmentaja')),
  luotu timestamp with time zone default now()
);

-- Uusi käyttäjä saa profiilirivin automaattisesti auth.users-lisäyksestä.
-- Rooli ja nimi luetaan signUp()-kutsun options.data-kentästä
-- (ks. src/lib/supabaseClient.js / LoginForm.jsx).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiilit (id, email, rooli, nimi)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'rooli', 'asiakas'),
    new.raw_user_meta_data ->> 'nimi'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Apufunktio RLS-käytäntöihin: onko kirjautunut käyttäjä valmentaja.
-- security definer, jotta funktio voi lukea profiilit-taulua ohi
-- RLS:n ilman rekursiota käytäntöjen sisällä.
create or replace function public.is_valmentaja()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiilit
    where id = auth.uid() and rooli = 'valmentaja'
  );
$$;

alter table profiilit enable row level security;

drop policy if exists "profiilit_select" on profiilit;
create policy "profiilit_select" on profiilit
  for select
  using (id = auth.uid() or public.is_valmentaja());

-- ============================================================
-- 2. Etenemistieto — mitä asiakas on avannut / merkinnyt valmiiksi
-- ============================================================

create table if not exists etenemistieto (
  id uuid primary key default gen_random_uuid(),
  asiakas_id uuid references auth.users not null,
  moduuli_id text not null,
  taso_valittu text, -- 'matala' tai 'syventava'
  merkitty_valmiiksi boolean default false,
  paivitetty timestamp default now(),
  unique (asiakas_id, moduuli_id)
);

alter table etenemistieto enable row level security;

drop policy if exists "etenemistieto_select" on etenemistieto;
create policy "etenemistieto_select" on etenemistieto
  for select
  using (asiakas_id = auth.uid() or public.is_valmentaja());

drop policy if exists "etenemistieto_insert" on etenemistieto;
create policy "etenemistieto_insert" on etenemistieto
  for insert
  with check (asiakas_id = auth.uid());

drop policy if exists "etenemistieto_update" on etenemistieto;
create policy "etenemistieto_update" on etenemistieto
  for update
  using (asiakas_id = auth.uid())
  with check (asiakas_id = auth.uid());

-- Huom: valmentajalle EI myönnetä insert/update-käytäntöä tähän tauluun.
-- RLS oletusarvo on aina "ei pääsyä" ilman erillistä käytäntöä, joten
-- valmentaja voi vain lukea, ei koskaan muokata asiakkaan etenemistietoa.

-- ============================================================
-- 3. Itsearviointitulos — TMT, itsereflektio yms.
--
-- KRIITTINEN SÄÄNTÖ: jaettu_valmentajalle on AINA false oletuksena.
-- Tätä oletusarvoa ei saa muuttaa milloinkaan ilman asiakkaan omaa,
-- eksplisiittistä toimintaa. Tämä ei ole vain sovellustason sääntö —
-- se on pakotettu RLS:llä: valmentajalle ei myönnetä minkäänlaista
-- insert/update-käytäntöä tähän tauluun, joten valmentaja ei voi
-- teknisesti koskaan asettaa jaettu_valmentajalle=true itse.
-- ============================================================

create table if not exists itsearviointitulos (
  id uuid primary key default gen_random_uuid(),
  asiakas_id uuid references auth.users not null,
  moduuli_id text not null,
  sisalto text,
  jaettu_valmentajalle boolean default false,
  luotu timestamp default now(),
  unique (asiakas_id, moduuli_id)
);

alter table itsearviointitulos enable row level security;

drop policy if exists "itsearviointitulos_select" on itsearviointitulos;
create policy "itsearviointitulos_select" on itsearviointitulos
  for select
  using (
    asiakas_id = auth.uid()
    or (public.is_valmentaja() and jaettu_valmentajalle = true)
  );

drop policy if exists "itsearviointitulos_insert" on itsearviointitulos;
create policy "itsearviointitulos_insert" on itsearviointitulos
  for insert
  with check (asiakas_id = auth.uid());

drop policy if exists "itsearviointitulos_update" on itsearviointitulos;
create policy "itsearviointitulos_update" on itsearviointitulos
  for update
  using (asiakas_id = auth.uid())
  with check (asiakas_id = auth.uid());

-- Valmentajalle ei myönnetä insert/update-käytäntöä — ks. yllä oleva huomio.
