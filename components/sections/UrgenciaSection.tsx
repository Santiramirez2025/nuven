'use client'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

const BENEFITS = [
  '15% de descuento en suscripción',
  'Envío gratis primer mes',
  'Acceso prioritario a futuros packs',
  'Garantía de 30 días sin preguntas',
]

export function UrgenciaSection() {
  return (
    <section className="py-20 bg-[var(--bg-3)] border-t border-b border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel centered>Lote de lanzamiento</SectionLabel>

          <h2 className="font-syne text-4xl md:text-5xl font-black tracking-tight mb-4 text-balance">
            Primer lote.{' '}
            <span className="text-[var(--text-2)]">Stock limitado.</span>
          </h2>

          <p className="text-[var(--text-2)] text-lg mb-10 max-w-xl mx-auto">
            Producimos por lotes para garantizar frescura y trazabilidad. El primer lote de
            lanzamiento tiene cupos limitados. Esto no es urgencia artificial — es logística real.
          </p>

          {/* Stock bar */}
          <div className="max-w-xs mx-auto mb-3">
            <div className="h-2 bg-[var(--bg)] border border-[var(--border)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '72%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[var(--accent-3)] to-[var(--accent)] rounded-full"
              />
            </div>
          </div>
          <p className="text-sm text-[var(--text-3)] mb-10">
            <strong className="text-accent">72% del stock comprometido</strong> · Quedan unidades del Lote 01
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-[var(--text-2)]">
                <span className="w-5 h-5 rounded-full bg-[rgba(76,186,122,0.1)] flex items-center justify-center text-accent text-[10px] font-bold flex-shrink-0">
                  ✓
                </span>
                {b}
              </div>
            ))}
          </div>

          <Button size="lg" asChild>
            <a href="#packs">Asegurar mi lugar en el lote →</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
