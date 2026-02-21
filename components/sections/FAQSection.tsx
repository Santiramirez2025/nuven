'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FAQ_ITEMS } from '@/data/faq'

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2 className="font-syne text-5xl font-black tracking-tight mb-16 text-balance">
            Todo lo que
            <br />
            <span className="text-[var(--text-2)]">necesitás saber.</span>
          </h2>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-2" role="list">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <div
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--border-accent)]"
                role="listitem"
              >
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between gap-4 p-7 text-left"
                >
                  <span className="font-syne text-lg font-bold tracking-tight">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openId === item.id ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-accent font-bold text-xl flex-shrink-0 leading-none"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openId === item.id && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                      role="region"
                    >
                      <p className="px-7 pb-7 text-[15px] text-[var(--text-2)] leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
