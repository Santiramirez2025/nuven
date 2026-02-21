'use client'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'

const DIFFERENTIALS = [
  {
    num: '01',
    title: 'Dosis activas, no decorativas',
    body: 'La mayoría de las marcas pone lo suficiente para listar el ingrediente en la etiqueta. Nosotros dosificamos para que funcione. Cada miligramo tiene una razón.',
  },
  {
    num: '02',
    title: 'Formas biodisponibles',
    body: 'Magnesio glicinato, no óxido. Zinc bisglicinato, no sulfato. Vitamina B6 en forma P5P. La forma del ingrediente determina qué tan bien lo absorbés.',
  },
  {
    num: '03',
    title: 'Sistema diseñado para combinar',
    body: 'Cada pack fue formulado sabiendo que vas a usar más de uno. Sin solapamientos de dosis, sin interacciones problemáticas entre ingredientes.',
  },
  {
    num: '04',
    title: 'Cumplimiento ANMAT real',
    body: 'RNPA activo, director técnico habilitado, producción en maquilador con RNE. No es un suplemento importado sin aval ni una marca sin trazabilidad.',
  },
  {
    num: '05',
    title: 'Transparencia radical',
    body: 'Etiqueta completa, dosis visibles, proveedor de materias primas identificado. Sabés exactamente qué tomás y en qué cantidad. Sin mezclas propietarias opacas.',
  },
]

const CHECKLIST = [
  'Ingredientes con respaldo en literatura científica',
  'Dosis que aparecen en los estudios',
  'Formas de alta biodisponibilidad',
  'Sin gluten, sin colorantes artificiales',
  'Producido en Argentina bajo BPM',
  'RNPA por producto, RNE del establecimiento',
  'Director técnico habilitado',
  'Garantía de satisfacción 30 días',
]

export function DiferencialSection() {
  return (
    <section id="diferencial" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Por qué funciona</SectionLabel>
          <h2 className="font-syne text-5xl md:text-6xl font-black tracking-tight text-balance max-w-2xl mb-16">
            No es solo{' '}
            <span className="text-[var(--text-2)]">lo que ponemos.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: differentials list */}
          <div className="space-y-8">
            {DIFFERENTIALS.map((d, i) => (
              <motion.div
                key={d.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="flex gap-5"
              >
                <span className="font-syne text-sm font-bold text-accent tracking-wide pt-1 flex-shrink-0 w-7">
                  {d.num}
                </span>
                <div>
                  <h3 className="font-syne text-lg font-bold mb-2 tracking-tight">{d.title}</h3>
                  <p className="text-[15px] text-[var(--text-2)] leading-relaxed">{d.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: checklist card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-3)] mb-8">
              Lo que NUVEN garantiza
            </p>
            <ul className="space-y-3">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-sm bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3.5"
                >
                  <span className="w-6 h-6 rounded-full bg-[rgba(76,186,122,0.12)] flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
