import { NextRequest, NextResponse } from 'next/server'
import { createPreference } from '@/lib/mercadopago'
import { upsertCustomer, createOrder, updateOrderPreferenceId } from '@/lib/db'
import type { CartItem } from '@/types'
import type { OrderItem, ShippingAddress } from '@/types/database'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, shippingAddress } = body as {
      items: CartItem[]
      customer: {
        email: string
        firstName: string
        lastName: string
        phone?: string
      }
      shippingAddress?: ShippingAddress
    }

    // ── Validate ────────────────────────────────────────────────────────────
    if (!items?.length) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }
    if (items.length > 3) {
      return NextResponse.json({ error: 'Maximum 3 packs allowed' }, { status: 400 })
    }
    if (!customer?.email || !customer?.firstName || !customer?.lastName) {
      return NextResponse.json({ error: 'Customer data required' }, { status: 400 })
    }

    // ── Business logic ───────────────────────────────────────────────────────
    const subtotalArs = items.reduce((acc, i) => acc + i.pack.price * i.quantity, 0)
    const shippingArs = 0
    const discountArs = 0
    const totalArs = subtotalArs + shippingArs - discountArs

    const externalRef = `nuven_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const origin = req.headers.get('origin') ?? 'https://nuven.com.ar'

    // ── Upsert customer ──────────────────────────────────────────────────────
    const dbCustomer = await upsertCustomer({
      email: customer.email.toLowerCase(),
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
    })

    // ── Create order ─────────────────────────────────────────────────────────
    const orderItems: OrderItem[] = items.map((i) => ({
      pack_id: i.pack.id,
      pack_name: i.pack.name,
      quantity: i.quantity,
      unit_price_ars: i.pack.price,
      is_subscription: false,
    }))

    const order = await createOrder({
      customer_id: dbCustomer.id,
      mp_external_reference: externalRef,
      items: orderItems,
      subtotal_ars: subtotalArs,
      shipping_ars: shippingArs,
      discount_ars: discountArs,
      total_ars: totalArs,
      is_subscription: false,
      shipping_address: shippingAddress,
    })

    // ── Create MercadoPago preference ────────────────────────────────────────
    const preference = await createPreference({
      items: items.map((item) => ({
        id: item.pack.id,
        title: `NUVEN ${item.pack.name}`,
        description: item.pack.tagline,
        quantity: item.quantity,
        unit_price: item.pack.price / 100,
        currency_id: 'ARS',
      })),
      payer: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        ...(customer.phone && {
          phone: { area_code: '54', number: customer.phone },
        }),
      },
      back_urls: {
        success: `${origin}/checkout/success?ref=${externalRef}`,
        failure: `${origin}/checkout/failure?ref=${externalRef}`,
        pending: `${origin}/checkout/pending?ref=${externalRef}`,
      },
      auto_return: 'approved',
      statement_descriptor: 'NUVEN',
      external_reference: externalRef,
      payment_methods: { installments: 6 },
      metadata: {
        order_id: order.id,
        customer_id: dbCustomer.id,
        packs: items.map((i) => i.pack.id).join(','),
      },
    })

    // ── Save preference ID ───────────────────────────────────────────────────
    await updateOrderPreferenceId(order.id, preference.id!)

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      orderId: order.id,
    })
  } catch (error) {
    console.error('[checkout] error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}