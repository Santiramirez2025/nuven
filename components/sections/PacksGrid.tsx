'use client'
import { PackCard } from './PackCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PACKS } from '@/data/packs'
import { motion } from 'framer-motion'

export function PacksGrid() {
  return (
    <section id="packs" className="py-24 bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <SectionLabel centered>Sistema modular NUVEN</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syne text-5xl md:text-6xl font-black tracking-tight mb-5 text-balance"
          >
            6 packs.{' '}
            <span className="text-[var(--text-2)]">Un sistema.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--text-2)]"
          >
            Cada pack resuelve un eje específico de tu biología. Compralo por
            separado o combiná hasta{' '}
            <strong className="text-[var(--text)]">3 — las fórmulas fueron diseñadas para no solaparse</strong>.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PACKS.sort((a, b) => a.order - b.order).map((pack, i) => (
            <PackCard key={pack.id} pack={pack} index={i} />
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-[var(--text-3)]">
            Podés combinar hasta 3 packs. Pago único, sin suscripciones, sin compromisos.
          </p>
        </motion.div>
      </div>
    </section>
  )
}