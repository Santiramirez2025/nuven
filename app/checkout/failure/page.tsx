import { Button } from '@/components/ui/Button'

export default function FailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-lg w-full text-center">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-12">
          <div className="text-6xl mb-6">↩</div>
          <h1 className="font-syne text-4xl font-black mb-4">El pago no se completó</h1>
          <p className="text-[var(--text-2)] mb-8">
            No se realizó ningún cargo. Podés intentarlo nuevamente con otro medio de pago.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild>
              <a href="/checkout">Intentar nuevamente →</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/">Volver al inicio</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
