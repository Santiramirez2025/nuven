export interface MPPreferenceItem {
  id: string
  title: string
  description: string
  quantity: number
  unit_price: number    // ARS full value, NOT cents
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
  metadata?: Record<string, string>  // MP accepts strings only
}

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
    const error = await response.json().catch(() => ({}))
    console.error('[mercadopago] preference error:', JSON.stringify(error))
    throw new Error(
      `MP Error ${response.status}: ${error?.message ?? JSON.stringify(error)}`
    )
  }

  const data = await response.json()

  if (!data.id || !data.init_point) {
    console.error('[mercadopago] unexpected response:', JSON.stringify(data))
    throw new Error('MP returned invalid preference response')
  }

  return { id: data.id, init_point: data.init_point }
}

export function verifyWebhookSignature(
  xSignature: string,
  xRequestId: string,
  dataId: string
): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET
  if (!secret) return false
  // TODO: implement HMAC-SHA256 verification
  // https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
  return true
}