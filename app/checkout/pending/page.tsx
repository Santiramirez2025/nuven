import { Button } from '@/components/ui/Button'

export default function PendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-lg w-full text-center">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-12">
          <div className="text-6xl mb-6">🕐</div>
          <h1 className="font-syne text-4xl font-black mb-4">Pago en proceso</h1>
          <p className="text-[var(--text-2)] mb-4">
            Tu pago está siendo procesado. Te notificaremos por email cuando se confirme.
          </p>
          <p className="text-sm text-[var(--text-3)] mb-8">
            Esto puede demorar hasta 2 días hábiles dependiendo del método de pago.
          </p>
          <Button asChild>
            <a href="/">Volver al inicio</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
