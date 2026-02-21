'use client'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-36 pb-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(76,186,122,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(76,186,122,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 80% 60%, rgba(201,169,110,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Badge */}
      <motion.div {...fadeUp(0)}>
        <Badge dot className="mb-8">
          Sistema de optimización humana · Producido en Argentina
        </Badge>
      </motion.div>

      {/* Headline */}
      <motion.h1
        id="hero-heading"
        {...fadeUp(0.1)}
        className="font-syne text-[clamp(48px,8vw,100px)] font-black tracking-[-0.03em] leading-[1.0] max-w-5xl text-balance"
      >
        Diseñado para{' '}
        <span className="text-accent">rendir más.</span>
        <br />
        <span className="text-[var(--text-2)]">Por más tiempo.</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        {...fadeUp(0.2)}
        className="mt-6 max-w-xl text-[clamp(17px,2.5vw,22px)] text-[var(--text-2)] font-light leading-relaxed"
      >
        Suplementación de precisión para hombres que no aceptan el desgaste
        como algo inevitable.{' '}
        <strong className="text-[var(--text)] font-medium">6 packs científicos.</strong>{' '}
        Un solo sistema.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.3)}
        className="mt-10 flex flex-wrap gap-3 justify-center"
      >
        <Button size="lg" asChild>
          <a href="#packs">
            Explorar los packs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <a href="#diferencial">¿Por qué NUVEN?</a>
        </Button>
      </motion.div>

      {/* Social proof */}
      <motion.div {...fadeUp(0.4)} className="mt-14">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {[
            { value: '+1.200', label: 'Hombres optimizando' },
            { value: '94%', label: 'Satisfacción reportada' },
            { value: 'ANMAT', label: 'Registro activo' },
            { value: '8 sem', label: 'Para resultados visibles' },
          ].map(({ value, label }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-syne text-[28px] font-black">{value}</span>
              <span className="text-[13px] uppercase tracking-wider text-[var(--text-3)]">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-[13px] text-[var(--text-3)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Garantía de satisfacción 30 días &nbsp;·&nbsp; Envío gratis a todo el país
        </p>
      </motion.div>
    </section>
  )
}
