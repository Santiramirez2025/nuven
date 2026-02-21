-- ═══════════════════════════════════════════════════════════════════════════
-- NUVEN — Supabase Schema
-- Run this in Supabase SQL Editor to create the full schema
-- ═══════════════════════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── ENUMS ──────────────────────────────────────────────────────────────────
create type order_status as enum (
  'pending',
  'payment_processing',
  'payment_approved',
  'payment_rejected',
  'fulfillment_pending',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

create type subscription_status as enum (
  'active',
  'paused',
  'cancelled',
  'past_due'
);

-- ─── CUSTOMERS ──────────────────────────────────────────────────────────────
create table customers (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  email               text not null unique,
  first_name          text not null,
  last_name           text not null,
  phone               text,
  address_street      text,
  address_city        text,
  address_province    text,
  address_postal_code text,
  mp_customer_id      text,
  total_orders        integer not null default 0,
  total_spent_ars     bigint not null default 0   -- stored in centavos
);

create index customers_email_idx on customers(email);

-- ─── ORDERS ─────────────────────────────────────────────────────────────────
create table orders (
  id                    uuid primary key default uuid_generate_v4(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  customer_id           uuid not null references customers(id),
  status                order_status not null default 'pending',
  mp_preference_id      text,
  mp_payment_id         text,
  mp_external_reference text not null unique,
  items                 jsonb not null default '[]',
  subtotal_ars          bigint not null,
  shipping_ars          bigint not null default 0,
  discount_ars          bigint not null default 0,
  total_ars             bigint not null,
  is_subscription       boolean not null default false,
  subscription_id       uuid,
  notes                 text,
  shipping_address      jsonb
);

create index orders_customer_id_idx on orders(customer_id);
create index orders_mp_reference_idx on orders(mp_external_reference);
create index orders_status_idx on orders(status);
create index orders_created_at_idx on orders(created_at desc);

-- ─── SUBSCRIPTIONS ──────────────────────────────────────────────────────────
create table subscriptions (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  customer_id         uuid not null references customers(id),
  status              subscription_status not null default 'active',
  mp_subscription_id  text unique,
  pack_ids            text[] not null,
  amount_ars          bigint not null,
  next_billing_date   date,
  paused_at           timestamptz,
  cancelled_at        timestamptz
);

create index subscriptions_customer_idx on subscriptions(customer_id);
create index subscriptions_status_idx on subscriptions(status);

-- Add FK from orders to subscriptions
alter table orders add constraint orders_subscription_id_fkey
  foreign key (subscription_id) references subscriptions(id);

-- ─── FUNCTION: increment customer stats ─────────────────────────────────────
create or replace function increment_customer_stats(
  p_customer_id uuid,
  p_amount      bigint
) returns void as $$
begin
  update customers
  set
    total_orders    = total_orders + 1,
    total_spent_ars = total_spent_ars + p_amount,
    updated_at      = now()
  where id = p_customer_id;
end;
$$ language plpgsql security definer;

-- ─── FUNCTION: auto-update updated_at ───────────────────────────────────────
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger customers_updated_at before update on customers
  for each row execute function handle_updated_at();

create trigger orders_updated_at before update on orders
  for each row execute function handle_updated_at();

create trigger subscriptions_updated_at before update on subscriptions
  for each row execute function handle_updated_at();

-- ─── RLS ────────────────────────────────────────────────────────────────────
-- Tables are accessed server-side with service_role key (bypasses RLS)
-- Client-side access is disabled for these tables
alter table customers enable row level security;
alter table orders enable row level security;
alter table subscriptions enable row level security;

-- No public policies — all access via service_role from API routes
-- ═══════════════════════════════════════════════════════════════════════════
