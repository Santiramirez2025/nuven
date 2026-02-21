import { NextRequest, NextResponse } from 'next/server'
import { updateOrderStatus, getOrderByReference, updateCustomerStats } from '@/lib/db'
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

    switch (type) {
      case 'payment':
        await handlePaymentNotification(data.id)
        break
      default:
        console.log(`[mp-webhook] unhandled type: ${type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[mp-webhook] error:', error)
    // Return 200 anyway — MP retries on non-200 responses
    return NextResponse.json({ received: true, error: true })
  }
}

async function handlePaymentNotification(paymentId: string) {
  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) return

  // Fetch payment details from MP
  const res = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  if (!res.ok) {
    console.error(`[mp-webhook] failed to fetch payment ${paymentId}`)
    return
  }

  const payment = await res.json()
  const { status, external_reference } = payment

  // Map MP status to our status
  const statusMap: Record<string, OrderStatus> = {
    approved: 'payment_approved',
    pending: 'payment_processing',
    in_process: 'payment_processing',
    rejected: 'payment_rejected',
    cancelled: 'cancelled',
    refunded: 'refunded',
    charged_back: 'refunded',
  }

  const ourStatus: OrderStatus = statusMap[status] ?? 'payment_processing'
  await updateOrderStatus(external_reference, ourStatus, paymentId)

  // On approval: send confirmation email + update customer stats
  if (status === 'approved') {
    const order = await getOrderByReference(external_reference)
    if (!order) return

    // Update customer lifetime stats
    await updateCustomerStats(order.customer_id, order.total_ars)

    // Send confirmation email
    const { supabaseAdmin } = await import('@/lib/supabase')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabaseAdmin as any
    const { data: customer } = await db
      .from('customers')
      .select('email, first_name, last_name')
      .eq('id', order.customer_id)
      .single()

    if (customer) {
      await sendOrderConfirmation({
        to: customer.email,
        customerName: `${customer.first_name} ${customer.last_name}`,
        orderId: order.id,
        items: order.items,
        totalArs: order.total_ars,
        isSubscription: false,
      })

      // Mark as pending fulfillment
      await updateOrderStatus(external_reference, 'fulfillment_pending')
    }
  }
}