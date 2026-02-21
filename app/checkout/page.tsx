'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { formatARS } from '@/data/packs'
import toast from 'react-hot-toast'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
  acceptTerms: boolean
}

const PROVINCES = [
  'Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes',
  'Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones',
  'Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe',
  'Santiago del Estero','Tierra del Fuego','Tucumán',
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', province: '', postalCode: '',
    acceptTerms: false,
  })

  const subtotal = totalPrice()
  const total = subtotal

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.acceptTerms) {
      toast.error('Aceptá los términos para continuar')
      return
    }
    if (items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
          },
          shippingAddress: {
            street: form.street,
            city: form.city,
            province: form.province,
            postal_code: form.postalCode,
            country: 'AR',
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Error al procesar el pedido')
      }

      // Redirect to MercadoPago hosted checkout
      window.location.href = data.initPoint
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error inesperado')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-6xl mb-6">🧬</p>
          <h1 className="font-syne text-3xl font-black mb-4">Tu protocolo está vacío</h1>
          <p className="text-[var(--text-2)] mb-8">Elegí tus packs primero.</p>
          <Button asChild><a href="/#packs">Ver packs</a></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-syne text-4xl font-black tracking-tight mb-2">Confirmar protocolo</h1>
        <p className="text-[var(--text-2)] mb-12">Completá tus datos para finalizar el pedido.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Personal data */}
            <fieldset className="space-y-4">
              <legend className="font-syne text-lg font-bold mb-4">Datos personales</legend>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre" value={form.firstName} onChange={set('firstName')} required />
                <Input label="Apellido" value={form.lastName} onChange={set('lastName')} required />
              </div>
              <Input label="Email" type="email" value={form.email} onChange={set('email')} required />
              <Input label="Teléfono" type="tel" value={form.phone} onChange={set('phone')} placeholder="+54 9 11 1234-5678" />
            </fieldset>

            {/* Shipping */}
            <fieldset className="space-y-4">
              <legend className="font-syne text-lg font-bold mb-4">Dirección de envío</legend>
              <Input label="Calle y número" value={form.street} onChange={set('street')} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Ciudad" value={form.city} onChange={set('city')} required />
                <Input label="Código postal" value={form.postalCode} onChange={set('postalCode')} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-2)] mb-1.5">Provincia</label>
                <select
                  value={form.province}
                  onChange={set('province')}
                  required
                  className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] text-sm focus:outline-none focus:border-[var(--border-accent)] transition-colors"
                >
                  <option value="">Seleccioná una provincia</option>
                  {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </fieldset>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={set('acceptTerms')}
                required
                className="mt-1 w-4 h-4 accent-[var(--accent)]"
              />
              <p className="text-sm text-[var(--text-2)]">
                Acepto los{' '}
                <a href="/legal/terminos" className="text-accent underline">términos y condiciones</a>{' '}
                y la{' '}
                <a href="/legal/privacidad" className="text-accent underline">política de privacidad</a>.
                Entiendo que NUVEN vende suplementos dietarios registrados ante ANMAT, no medicamentos.
              </p>
            </label>
          </div>

          {/* ── Right: Summary ── */}
          <aside className="lg:col-span-2">
            <div className="sticky top-28 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-5">
              <h2 className="font-syne text-xl font-bold">Resumen</h2>

              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.pack.id} className="flex items-center gap-3">
                    <span className="text-2xl">{item.pack.icon}</span>
                    <div className="flex-1">
                      <p className="font-syne text-sm font-bold">{item.pack.name}</p>
                      <p className="text-xs text-[var(--text-3)]">× {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-accent">{formatARS(item.pack.price)}</p>
                  </div>
                ))}
              </div>

              <hr className="border-[var(--border)]" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[var(--text-2)]">
                  <span>Subtotal</span>
                  <span>{formatARS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-2)]">
                  <span>Envío</span>
                  <span className="text-accent">Gratis</span>
                </div>
              </div>

              <hr className="border-[var(--border)]" />

              <div className="flex justify-between items-center">
                <span className="font-syne font-bold">Total</span>
                <span className="font-syne text-2xl font-black">
                  {formatARS(total)}
                  <span className="text-[13px] font-normal text-[var(--text-3)] ml-1">pago único</span>
                </span>
              </div>

              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {loading ? 'Redirigiendo a MercadoPago...' : 'Pagar con MercadoPago →'}
              </Button>

              {/* Trust signals */}
              <div className="space-y-2 pt-2">
                {[
                  '🔒 Pago 100% seguro con MercadoPago',
                  '↩️ Garantía de devolución 30 días',
                  '📦 Envío gratis a todo el país',
                ].map((t) => (
                  <p key={t} className="text-xs text-[var(--text-3)] flex items-center gap-2">{t}</p>
                ))}
              </div>

              {/* Legal notice */}
              <p className="text-[11px] text-[var(--text-3)] leading-relaxed">
                Al comprar confirmás que sos mayor de 18 años y entendés que estos productos son
                suplementos dietarios registrados ante ANMAT, no medicamentos.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}

// ─── Input helper ─────────────────────────────────────────────────────────────
function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-2)] mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] text-sm
          placeholder:text-[var(--text-3)]
          focus:outline-none focus:border-[var(--border-accent)] transition-colors"
      />
    </div>
  )
}