'use client'
import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const { clearCart } = useCart()
  const params = useSearchParams()
  const ref = params.get('ref')

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-lg w-full text-center">
        <div className="bg-[var(--surface)] border border-[var(--border-accent)] rounded-3xl p-12">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="font-syne text-4xl font-black mb-4">Protocolo confirmado</h1>
          <p className="text-[var(--text-2)] text-lg mb-2">
            Tu pedido fue procesado exitosamente.
          </p>
          <p className="text-[var(--text-2)] mb-6">
            Te enviamos una confirmación a tu email con todos los detalles y tiempos de entrega.
          </p>

          {ref && (
            <p className="text-sm text-[var(--text-3)] mb-8 font-mono bg-[var(--bg)] px-4 py-2 rounded-xl">
              Ref: {ref}
            </p>
          )}

          <div className="bg-[rgba(76,186,122,0.08)] border border-[var(--border-accent)] rounded-2xl p-5 mb-8 text-left space-y-2">
            <p className="font-syne font-bold text-sm text-accent mb-3">Qué pasa ahora</p>
            {[
              '📧 Revisá tu email — enviamos la confirmación en minutos',
              '📦 Preparamos tu protocolo y lo despachamos en 24–48hs hábiles',
              '🚚 Recibís tu pedido en 3–7 días hábiles según tu provincia',
              '🔁 Si es suscripción, el próximo envío es automático en 30 días',
            ].map((t) => (
              <p key={t} className="text-sm text-[var(--text-2)]">{t}</p>
            ))}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button href="/">Volver al inicio</Button>
            <Button variant="secondary" href="mailto:hola@nuven.com.ar">Contactar soporte</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}