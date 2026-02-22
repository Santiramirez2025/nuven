import { NextRequest, NextResponse } from 'next/server'
import { updateOrderStatus, getOrderByReference, updateCustomerStats, getCustomerById } from '@/lib/db'
import { sendOrderConfirmation } from '@/lib/email'
import type { OrderStatus } from '@/types/database'

/**
 * MercadoPago IPN Webhook
 * Configure URL in: MP Dashboard → Integraciones → Notificaciones
 * URL: https://nuven.com.ar/api/webhooks/mercadopago
 * Events: payment
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    console.log(`[mp-webhook] type=${type} id=${data?.id}`)

    if (type === 'payment') {
      await handlePaymentNotification(data.id)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[mp-webhook] error:', error)
    return NextResponse.json({ received: true, error: true })
  }
}

const STATUS_MAP: Record<string, OrderStatus> = {
  approved:     'payment_approved',
  pending:      'payment_processing',
  in_process:   'payment_processing',
  rejected:     'payment_rejected',
  cancelled:    'cancelled',
  refunded:     'refunded',
  charged_back: 'refunded',
}

async function handlePaymentNotification(paymentId: string) {
  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) {
    console.error('[mp-webhook] MP_ACCESS_TOKEN not set')
    return
  }

  const res = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  if (!res.ok) {
    console.error(`[mp-webhook] failed to fetch payment ${paymentId}: ${res.status}`)
    return
  }

  const payment = await res.json()
  const { status, external_reference } = payment

  if (!external_reference) {
    console.error(`[mp-webhook] no external_reference for payment ${paymentId}`)
    return
  }

  const ourStatus: OrderStatus = STATUS_MAP[status] ?? 'payment_processing'
  await updateOrderStatus(external_reference, ourStatus, paymentId)

  if (status === 'approved') {
    const [order] = await Promise.all([
      getOrderByReference(external_reference),
    ])
    if (!order) {
      console.error(`[mp-webhook] order not found for ref ${external_reference}`)
      return
    }

    // Run stats update and customer fetch in parallel
    const [customer] = await Promise.all([
      getCustomerById(order.customer_id),
      updateCustomerStats(order.customer_id, order.total_ars),
    ])

    if (customer) {
      await sendOrderConfirmation({
        to: customer.email,
        customerName: `${customer.first_name} ${customer.last_name}`,
        orderId: order.id,
        items: order.items,
        totalArs: order.total_ars,
        isSubscription: false,
      })
    }

    await updateOrderStatus(external_reference, 'fulfillment_pending')
  }
}