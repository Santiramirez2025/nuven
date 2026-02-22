'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

const BENEFITS = [
  'Envío gratis primer mes',
  'Acceso prioritario a futuros packs',
  'Garantía 30 días sin preguntas',
]

export function UrgenciaSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [barWidth, setBarWidth] = useState('0%')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(() => setBarWidth('72%'), 400)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .urg-section {
          background: #060a08;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }

        .urg-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 50%,
            rgba(76,186,122,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .urg-inner {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .urg-inner.visible { opacity: 1; transform: translateY(0); }

        .urg-h2 {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 12px;
          text-wrap: balance;
        }
        .urg-h2 .muted { color: #5a7066; }

        .urg-body {
          font-size: 15px;
          color: #5a7066;
          line-height: 1.65;
          margin: 0 0 32px;
        }

        /* ── Stock bar ── */
        .urg-bar-wrap { margin-bottom: 8px; }

        .urg-bar-track {
          height: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
        }

        .urg-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #4cba7a, #c9a96e);
          transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .urg-bar-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          margin-bottom: 32px;
        }

        .urg-bar-pct {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 12px;
          color: #4cba7a;
          font-weight: 500;
        }

        .urg-bar-note {
          font-size: 11px;
          color: #3d5247;
        }

        /* ── Benefits ── */
        .urg-benefits {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .urg-benefit {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #8db8a0;
          background: rgba(76,186,122,0.05);
          border: 1px solid rgba(76,186,122,0.1);
          padding: 5px 12px;
          border-radius: 100px;
        }

        .urg-benefit-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4cba7a;
          flex-shrink: 0;
        }

        .urg-disclaimer {
          margin-top: 14px;
          font-size: 11px;
          color: #2d3d35;
        }

        @media (max-width: 560px) {
          .urg-section { padding: 64px 20px; }
        }
      `}</style>

      <section ref={ref} className="urg-section">
        <div className={`urg-inner ${visible ? 'visible' : ''}`}>
          <SectionLabel centered>Lote de lanzamiento</SectionLabel>

          <h2 className="urg-h2">
            Primer lote.{' '}
            <span className="muted">Stock limitado.</span>
          </h2>

          <p className="urg-body">
            Producimos por lotes para garantizar frescura y trazabilidad.
            Esto no es urgencia artificial — es logística real.
          </p>

          {/* Stock bar */}
          <div className="urg-bar-wrap">
            <div className="urg-bar-track">
              <div className="urg-bar-fill" style={{ width: barWidth }} />
            </div>
            <div className="urg-bar-label">
              <span className="urg-bar-pct">72% comprometido</span>
              <span className="urg-bar-note">Lote 01 · unidades restantes</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="urg-benefits">
            {BENEFITS.map((b) => (
              <span key={b} className="urg-benefit">
                <span className="urg-benefit-dot" />
                {b}
              </span>
            ))}
          </div>

          <Button size="lg" href="#packs">
            Asegurar mi lugar en el lote →
          </Button>

          <p className="urg-disclaimer">
            Sin suscripciones · Pago único · Envío a todo el país
          </p>
        </div>
      </section>
    </>
  )
}