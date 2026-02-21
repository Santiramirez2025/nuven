'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function CTAFinal() {
  return (
    <section className="py-24 bg-[var(--bg-2)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel centered>El momento es ahora</SectionLabel>

          {/* Radial glow */}
          <div className="relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(76,186,122,0.08) 0%, transparent 70%)',
              }}
            />
            <h2 className="relative font-syne text-[clamp(40px,7vw,80px)] font-black tracking-tight leading-tight mb-5 text-balance">
              Empezá a optimizar
              <br />
              <span className="text-accent">desde hoy.</span>
            </h2>
          </div>

          <p className="text-lg text-[var(--text-2)] max-w-lg mx-auto mb-12">
            Cada semana sin el soporte correcto es una semana de desgaste acumulado.
            El costo de no hacer nada también existe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="text-lg px-10 py-5" asChild>
              <a href="#packs">
                Elegir mi pack
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#faq">Tengo dudas primero</a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-3)]">
            {[
              '🛡️ Sin compromisos',
              '↩️ Garantía 30 días',
              '📦 Envío gratis',
              '🔒 Pago 100% seguro',
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
