/**
 * Database Operations Layer — Neon Postgres
 * All DB interactions go through here.
 */
import { neon } from '@neondatabase/serverless'
import type { OrderItem, ShippingAddress, OrderStatus } from '@/types/database'

const sql = neon(process.env.DATABASE_URL!)

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Customer = {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string | null
  total_orders: number
  total_spent_ars: number
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  customer_id: string
  mp_external_reference: string
  mp_preference_id?: string | null
  mp_payment_id?: string | null
  items: OrderItem[]
  subtotal_ars: number
  shipping_ars: number
  discount_ars: number
  total_ars: number
  is_subscription: boolean
  status: OrderStatus
  shipping_address?: ShippingAddress | null
  created_at: string
  updated_at: string
}

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────

export async function upsertCustomer(data: {
  email: string
  first_name: string
  last_name: string
  phone?: string
}): Promise<Customer> {
  const rows = await sql`
    INSERT INTO customers (email, first_name, last_name, phone)
    VALUES (
      ${data.email.toLowerCase()},
      ${data.first_name},
      ${data.last_name},
      ${data.phone ?? null}
    )
    ON CONFLICT (email) DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name  = EXCLUDED.last_name,
      phone      = COALESCE(EXCLUDED.phone, customers.phone),
      updated_at = now()
    RETURNING *
  `
  if (!rows[0]) throw new Error('upsertCustomer: no row returned')
  return rows[0] as Customer
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const rows = await sql`
    SELECT * FROM customers
    WHERE email = ${email.toLowerCase()}
    LIMIT 1
  `
  return (rows[0] as Customer) ?? null
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const rows = await sql`
    SELECT * FROM customers
    WHERE id = ${id}
    LIMIT 1
  `
  return (rows[0] as Customer) ?? null
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export async function createOrder(data: {
  customer_id: string
  mp_external_reference: string
  mp_preference_id?: string
  items: OrderItem[]
  subtotal_ars: number
  shipping_ars: number
  discount_ars: number
  total_ars: number
  is_subscription: boolean
  shipping_address?: ShippingAddress
}): Promise<Order> {
  const rows = await sql`
    INSERT INTO orders (
      customer_id,
      mp_external_reference,
      mp_preference_id,
      items,
      subtotal_ars,
      shipping_ars,
      discount_ars,
      total_ars,
      is_subscription,
      shipping_address,
      status
    ) VALUES (
      ${data.customer_id},
      ${data.mp_external_reference},
      ${data.mp_preference_id ?? null},
      ${JSON.stringify(data.items)},
      ${data.subtotal_ars},
      ${data.shipping_ars},
      ${data.discount_ars},
      ${data.total_ars},
      ${data.is_subscription},
      ${data.shipping_address ? JSON.stringify(data.shipping_address) : null},
      'pending'
    )
    RETURNING *
  `
  if (!rows[0]) throw new Error('createOrder: no row returned')
  return rows[0] as Order
}

export async function updateOrderStatus(
  mpExternalReference: string,
  status: OrderStatus,
  mpPaymentId?: string
): Promise<void> {
  await sql`
    UPDATE orders SET
      status        = ${status},
      mp_payment_id = COALESCE(${mpPaymentId ?? null}, mp_payment_id),
      updated_at    = now()
    WHERE mp_external_reference = ${mpExternalReference}
  `
}

export async function updateOrderPreferenceId(
  orderId: string,
  mpPreferenceId: string
): Promise<void> {
  await sql`
    UPDATE orders SET
      mp_preference_id = ${mpPreferenceId},
      updated_at       = now()
    WHERE id = ${orderId}
  `
}

export async function getOrderByReference(ref: string): Promise<Order | null> {
  const rows = await sql`
    SELECT * FROM orders
    WHERE mp_external_reference = ${ref}
    LIMIT 1
  `
  return (rows[0] as Order) ?? null
}

// ─── CUSTOMER STATS ──────────────────────────────────────────────────────────

export async function updateCustomerStats(
  customerId: string,
  totalArs: number
): Promise<void> {
  await sql`
    UPDATE customers SET
      total_orders    = total_orders + 1,
      total_spent_ars = total_spent_ars + ${totalArs},
      updated_at      = now()
    WHERE id = ${customerId}
  `
}