'use client'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

const PROBLEMS = [
  {
    icon: '⚡',
    title: 'La energía que perdés',
    body: 'A los 35, tu producción mitocondrial no es la misma que a los 25. No es pereza. Es biología. Y tiene solución nutricionalmente.',
  },
  {
    icon: '🧠',
    title: 'El foco que se escapa',
    body: 'Horas frente a una pantalla, mil decisiones por día, estrés crónico. El cerebro moderno está bajo una presión sin precedentes históricos.',
  },
  {
    icon: '🔋',
    title: 'El desgaste invisible',
    body: 'El estrés crónico agota tus reservas de magnesio, zinc y vitaminas del complejo B semana a semana. Eso se acumula. Y se nota.',
  },
  {
    icon: '⏳',
    title: 'El tiempo que pasa',
    body: 'Cada año sin apoyo nutricional de precisión es un año donde tu biología trabaja sin sus herramientas. La longevidad se construye hoy.',
  },
  {
    icon: '💊',
    title: 'Los suplementos que no funcionan',
    body: 'Dosis simbólicas, ingredientes de relleno, fórmulas diseñadas para que se vean bien en la etiqueta. La mayoría del mercado no te da lo que creés.',
  },
  {
    icon: '🎯',
    title: 'La complejidad que paraliza',
    body: 'Investigar qué tomar, en qué dosis, cómo combinar, cuándo tomar cada cosa. Nadie tiene tiempo para eso. Por eso diseñamos el sistema.',
  },
]

export function ProblemaSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[var(--bg)] to-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>El problema que nadie nombra</SectionLabel>
          <h2 className="font-syne text-5xl md:text-6xl font-black tracking-tight max-w-2xl mb-16 text-balance">
            Tu cuerpo trabaja más.{' '}
            <span className="text-[var(--text-2)]">Y nadie te lo dijo.</span>
          </h2>
        </motion.div>

        {/* Grid with top border only, no separators */}
        <div className="border border-[var(--border)] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="p-9 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors border-[var(--border)]
                [&:not(:last-child)]:border-b md:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0
                lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r"
            >
              <span className="text-4xl block mb-5">{p.icon}</span>
              <h3 className="font-syne text-xl font-bold mb-3 tracking-tight">{p.title}</h3>
              <p className="text-[15px] text-[var(--text-2)] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 max-w-2xl mx-auto"
        >
          <p className="font-syne text-3xl md:text-4xl font-black leading-tight tracking-tight">
            No necesitás más información.
            <br />
            Necesitás el{' '}
            <span className="text-accent">sistema correcto.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
