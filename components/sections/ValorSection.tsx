'use client'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { formatARS } from '@/data/packs'

const COMPARISON_ITEMS = [
  { name: 'CoQ10 Ubiquinona 100mg', price: 800000 },
  { name: 'Complejo B completo activo', price: 550000 },
  { name: 'Rhodiola Rosea estandarizado', price: 480000 },
  { name: 'Magnesio glicinato 200mg', price: 320000 },
  { name: 'Vitamina C 500mg premium', price: 210000 },
]

const totalSuelto = COMPARISON_ITEMS.reduce((a, i) => a + i.price, 0)
const packPrice = 2000000 // Pack Energía

export function ValorSection() {
  return (
    <section id="valor" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionLabel>Estructura de valor</SectionLabel>
          <h2 className="font-syne text-5xl md:text-6xl font-black tracking-tight text-balance max-w-2xl">
            Lo que pagás.{' '}
            <span className="text-[var(--text-2)]">Lo que recibís.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-3)] mb-4">
              Comparado con comprar suplementos por separado
            </p>
            <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
              {COMPARISON_ITEMS.map(({ name, price }) => (
                <div key={name} className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)]">
                  <span className="text-sm text-[var(--text-2)]">{name}</span>
                  <span className="text-sm text-[var(--text-3)] line-through">{formatARS(price)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
                <span className="font-syne font-bold">Total suelto</span>
                <span className="text-[var(--text-3)] font-bold">{formatARS(totalSuelto)}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 bg-[var(--surface-2)]">
                <span className="font-syne font-bold">Pack Energía NUVEN</span>
                <span className="text-accent font-bold text-lg">{formatARS(packPrice)}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-3)] mt-4 text-center">
              Y sin el tiempo de investigar, comprar 5 productos por separado y coordinar dosis.
            </p>
          </motion.div>

          {/* Pricing box */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="bg-[var(--surface)] border border-[var(--border-accent)] rounded-3xl p-9 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--text-3)] mb-2">
                Suscripción mensual · Pack individual
              </p>
              <p className="font-syne text-[56px] font-black leading-none tracking-tight mb-1">
                desde {formatARS(1700000)}
              </p>
              <p className="text-sm text-[var(--text-3)] mb-6">por mes · 15% de ahorro vs. compra única</p>

              <div className="inline-block bg-[rgba(76,186,122,0.1)] border border-[var(--border-accent)] rounded-full px-5 py-2 text-sm text-accent font-bold mb-8">
                Ahorrás hasta {formatARS(450000)}/mes suscribiéndote
              </div>

              <Button size="lg" className="w-full mb-3" asChild>
                <a href="/checkout">Comenzar mi protocolo →</a>
              </Button>
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <a href="#packs">Ver todos los packs</a>
              </Button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
              <p className="font-syne font-bold mb-2">Suscripción sin riesgos</p>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                Podés pausar o cancelar en cualquier momento, sin cargos adicionales ni preguntas
                incómodas. Tu compromiso es mensual, no vitalicio.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
