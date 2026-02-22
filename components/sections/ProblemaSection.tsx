'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const PROBLEMS = [
  {
    number: '01',
    title: 'La energía que se erosiona',
    body: 'La producción mitocondrial declina con el tiempo. No es pereza ni actitud — es biología. Y tiene solución nutricional precisa.',
  },
  {
    number: '02',
    title: 'El foco que se fragmenta',
    body: 'Pantallas, decisiones constantes, estrés crónico. El cerebro moderno opera bajo una presión sin precedentes. Sin apoyo, se nota.',
  },
  {
    number: '03',
    title: 'El desgaste que no se ve',
    body: 'El estrés crónico agota tus reservas de magnesio, zinc y complejo B semana a semana. Silencioso, acumulativo, y reversible.',
  },
  {
    number: '04',
    title: 'El tiempo que no vuelve',
    body: 'Cada año sin nutrición de precisión es un año donde tu biología trabaja sin sus herramientas. La longevidad se construye hoy, no después.',
  },
  {
    number: '05',
    title: 'Los suplementos que fallan',
    body: 'Dosis simbólicas, ingredientes de relleno, fórmulas diseñadas para la etiqueta. La mayoría del mercado no entrega lo que promete.',
  },
  {
    number: '06',
    title: 'La complejidad que paraliza',
    body: 'Qué tomar, en qué dosis, cómo combinar, cuándo. Nadie debería necesitar un doctorado para optimizar su biología. Por eso existe NUVEN.',
  },
]

function ProblemCard({
  problem,
  index,
  visible,
}: {
  problem: (typeof PROBLEMS)[0]
  index: number
  visible: boolean
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShown(true), index * 80)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <div
      className="problema-card"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
      }}
    >
      <span className="problema-number">{problem.number}</span>
      <h3 className="problema-title">{problem.title}</h3>
      <p className="problema-body">{problem.body}</p>
      <div className="problema-line" />
    </div>
  )
}

export function ProblemaSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          setTimeout(() => setVisible(true), 300)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .problema-section {
          background: linear-gradient(to bottom, #080c0a, #060a08);
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }

        .problema-section::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(76,186,122,0.15) 50%, transparent);
        }

        .problema-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .problema-header {
          margin-bottom: 64px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .problema-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .problema-h2 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 0;
          text-wrap: balance;
          max-width: 600px;
        }

        .problema-h2 .muted { color: #5a7066; }

        /* ── Grid ── */
        .problema-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }

        /* ── Card ── */
        .problema-card {
          padding: 36px 32px;
          background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          transition: background 0.2s;
          cursor: default;
        }

        .problema-card:hover {
          background: rgba(76,186,122,0.04);
        }

        /* Remove right border on last column */
        .problema-card:nth-child(3n) {
          border-right: none;
        }

        /* Remove bottom border on last row */
        .problema-card:nth-child(n+4) {
          border-bottom: none;
        }

        .problema-number {
          display: block;
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 11px;
          color: #4cba7a;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          opacity: 0.7;
        }

        .problema-title {
          font-size: 18px;
          font-weight: 700;
          color: #e8ede9;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          line-height: 1.2;
        }

        .problema-body {
          font-size: 14px;
          color: #5a7066;
          line-height: 1.7;
          margin: 0;
        }

        .problema-line {
          position: absolute;
          bottom: 0; left: 32px;
          width: 0;
          height: 1px;
          background: #4cba7a;
          transition: width 0.4s ease;
        }

        .problema-card:hover .problema-line {
          width: calc(100% - 64px);
        }

        /* ── Remate ── */
        .problema-remate {
          text-align: center;
          margin-top: 72px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
        }

        .problema-remate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .problema-remate-text {
          font-size: clamp(24px, 3.5vw, 38px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #e8ede9;
          margin: 0 0 20px;
        }

        .problema-remate-text .accent { color: #4cba7a; }

        .problema-remate-sub {
          font-size: 15px;
          color: #5a7066;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .problema-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .problema-card:nth-child(3n) {
            border-right: 1px solid rgba(255,255,255,0.06);
          }
          .problema-card:nth-child(2n) {
            border-right: none;
          }
          .problema-card:nth-child(n+4) {
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .problema-card:nth-child(n+5) {
            border-bottom: none;
          }
        }

        @media (max-width: 560px) {
          .problema-section { padding: 64px 20px; }
          .problema-grid {
            grid-template-columns: 1fr;
            border-radius: 16px;
          }
          .problema-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            padding: 28px 24px;
          }
          .problema-card:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>

      <section ref={ref} className="problema-section">
        <div className="problema-inner">

          {/* Header */}
          <div className={`problema-header ${titleVisible ? 'visible' : ''}`}>
            <SectionLabel>El problema que nadie nombra</SectionLabel>
            <h2 className="problema-h2">
              Tu cuerpo trabaja más.{' '}
              <span className="muted">Y nadie te lo dijo.</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="problema-grid">
            {PROBLEMS.map((p, i) => (
              <ProblemCard
                key={p.number}
                problem={p}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* Remate */}
          <div className={`problema-remate ${visible ? 'visible' : ''}`}>
            <p className="problema-remate-text">
              No necesitás más información.<br />
              Necesitás el{' '}
              <span className="accent">sistema correcto.</span>
            </p>
            <p className="problema-remate-sub">
              NUVEN es el único sistema de suplementación en Argentina
              diseñado como protocolo integral, sin solapamiento de dosis.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}