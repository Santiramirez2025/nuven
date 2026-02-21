import { Resend } from 'resend'
import { render } from '@react-email/components'
import { OrderConfirmation } from '@/emails/OrderConfirmation'
import type { OrderItem } from '@/types/database'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'NUVEN <hola@nuven.com.ar>'

// ─── ORDER CONFIRMATION ──────────────────────────────────────────────────────

export async function sendOrderConfirmation(data: {
  to: string
  customerName: string
  orderId: string
  items: OrderItem[]
  totalArs: number
  isSubscription: boolean
}) {
  // Estimate delivery: 3-7 business days
  const delivery = new Date()
  delivery.setDate(delivery.getDate() + 5)
  const estimatedDelivery = delivery.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const html = await render(
    OrderConfirmation({
      ...data,
      estimatedDelivery,
    }) as React.ReactElement
  )

  const { error } = await resend.emails.send({
    from: FROM,
    to: data.to,
    subject: `✓ Tu protocolo NUVEN está en camino — Pedido #${data.orderId.slice(0, 8).toUpperCase()}`,
    html,
    tags: [
      { name: 'category', value: 'order_confirmation' },
      { name: 'subscription', value: String(data.isSubscription) },
    ],
  })

  if (error) {
    console.error('[email] sendOrderConfirmation error:', error)
    // Don't throw — email failure shouldn't break the order flow
  }
}

// ─── ABANDONED CART (trigger from CRON job) ──────────────────────────────────

export async function sendAbandonedCart(data: {
  to: string
  customerName: string
  packNames: string[]
}) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: data.to,
    subject: `Tu protocolo te está esperando, ${data.customerName}`,
    html: `
      <div style="font-family:system-ui;background:#080c0a;color:#e8ede9;padding:40px;max-width:560px;margin:0 auto">
        <h2 style="color:#4cba7a">Tu stack sigue disponible</h2>
        <p>Dejaste en tu carrito: <strong>${data.packNames.join(', ')}</strong></p>
        <p>Quedan unidades del lote actual. Completá tu protocolo cuando estés listo.</p>
        <a href="https://nuven.com.ar#packs"
          style="display:inline-block;background:#4cba7a;color:#000;padding:14px 28px;border-radius:100px;font-weight:700;text-decoration:none;margin-top:24px">
          Completar mi protocolo →
        </a>
        <p style="font-size:12px;color:#5a7066;margin-top:32px">
          Si no querés recibir más recordatorios, respondé este email con "cancelar".
        </p>
      </div>
    `,
    tags: [{ name: 'category', value: 'abandoned_cart' }],
  })

  if (error) console.error('[email] sendAbandonedCart error:', error)
}

// ─── SUBSCRIPTION RENEWAL ────────────────────────────────────────────────────

export async function sendSubscriptionRenewal(data: {
  to: string
  customerName: string
  nextDate: string
  totalArs: number
}) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: data.to,
    subject: 'Tu próximo envío NUVEN está programado',
    html: `
      <div style="font-family:system-ui;background:#080c0a;color:#e8ede9;padding:40px;max-width:560px;margin:0 auto">
        <h2>Tu protocolo continúa</h2>
        <p>Hola ${data.customerName}, tu próxima entrega está programada para el <strong>${data.nextDate}</strong>.</p>
        <p>Total: <strong style="color:#4cba7a">${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',minimumFractionDigits:0}).format(data.totalArs/100)}</strong></p>
        <a href="https://nuven.com.ar/cuenta"
          style="display:inline-block;background:#141f1a;color:#e8ede9;padding:12px 24px;border-radius:100px;text-decoration:none;border:1px solid rgba(255,255,255,0.1);margin-top:16px">
          Administrar suscripción
        </a>
      </div>
    `,
    tags: [{ name: 'category', value: 'subscription_renewal' }],
  })
  if (error) console.error('[email] sendSubscriptionRenewal error:', error)
}
