'use client'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TESTIMONIALS } from '@/data/testimonials'

const METRICS = [
  { value: '+1.200', unit: '', label: 'Hombres en el sistema' },
  { value: '94',    unit: '%',  label: 'Satisfacción reportada' },
  { value: '4.9',   unit: '★',  label: 'Puntuación promedio' },
  { value: '8',     unit: 'sem', label: 'Para resultados visibles' },
]

export function TestimoniosSection() {
  return (
    <section id="testimonios" className="py-24 bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionLabel>Resultados reales</SectionLabel>
          <h2 className="font-syne text-5xl md:text-6xl font-black tracking-tight text-balance max-w-2xl">
            Lo que dicen los que{' '}
            <span className="text-[var(--text-2)]">ya optimizaron.</span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 hover:border-[var(--border-accent)] transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5" aria-label={`${t.rating} estrellas`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[var(--gold)] text-base">★</span>
                ))}
              </div>

              {/* Pack tag */}
              {t.packUsed && (
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-accent bg-[rgba(76,186,122,0.08)] border border-[var(--border-accent)] px-3 py-1 rounded-full mb-4">
                  {t.packUsed}
                </span>
              )}

              {/* Quote */}
              <p className="text-[15px] text-[var(--text-2)] leading-relaxed italic mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div className="w-11 h-11 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center font-syne font-bold text-accent flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-syne font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--text-3)]">
                    {t.role}{t.location ? ` · ${t.location}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map(({ value, unit, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-7 bg-[var(--surface)] border border-[var(--border)] rounded-2xl"
            >
              <p className="font-syne text-[42px] font-black leading-none mb-2">
                {value}
                <span className="text-[24px] text-accent">{unit}</span>
              </p>
              <p className="text-sm text-[var(--text-3)]">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
