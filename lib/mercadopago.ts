/**
 * MercadoPago Integration
 * Docs: https://www.mercadopago.com.ar/developers/es/docs
 *
 * PRODUCTION SETUP:
 * 1. Crear cuenta MP Business en mercadopago.com.ar
 * 2. Obtener Access Token en Panel > Credenciales
 * 3. Configurar webhook para IPN notifications
 * 4. Variables de entorno necesarias:
 *    MP_ACCESS_TOKEN=APP_USR-...
 *    MP_PUBLIC_KEY=APP_USR-...
 *    NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-...
 */

export interface MPPreferenceItem {
  id: string
  title: string
  description: string
  quantity: number
  unit_price: number        // ARS, NOT cents
  currency_id: 'ARS'
}

export interface MPPreferencePayload {
  items: MPPreferenceItem[]
  payer?: {
    name: string
    email: string
    phone?: { area_code: string; number: string }
    address?: { zip_code: string; street_name: string; street_number: number }
  }
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: 'approved' | 'all'
  payment_methods?: {
    excluded_payment_types?: Array<{ id: string }>
    installments?: number
  }
  statement_descriptor: string
  external_reference: string
  metadata?: Record<string, string>
}

/**
 * Creates a MP Preference (server-side only)
 * Returns the preference ID to use with SDK on frontend
 */
export async function createPreference(
  payload: MPPreferencePayload
): Promise<{ id: string; init_point: string }> {
  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) throw new Error('MP_ACCESS_TOKEN not configured')

  const response = await fetch(
    'https://api.mercadopago.com/checkout/preferences',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`MP Error: ${JSON.stringify(error)}`)
  }

  return response.json()
}

/**
 * Verify MP webhook signature
 * Use in /api/webhooks/mercadopago route
 */
export function verifyWebhookSignature(
  xSignature: string,
  xRequestId: string,
  dataId: string
): boolean {
  // Implementation: https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
  // Requires crypto.createHmac with MP_WEBHOOK_SECRET
  const secret = process.env.MP_WEBHOOK_SECRET
  if (!secret) return false
  // TODO: implement HMAC-SHA256 verification
  return true
}
