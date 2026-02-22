'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'

const TRUST = [
  { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, label: 'Sin compromisos' },
  { icon: <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0M9 12l2 2 4-4" />, label: 'Garantía 30 días' },
  { icon: <path d="M20 12V22H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />, label: 'Envío gratis' },
  { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />, label: 'Pago seguro' },
]

export function CTAFinal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .cta-section {
          background: #060a08;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%,
            rgba(76,186,122,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .cta-inner {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cta-inner.visible { opacity: 1; transform: translateY(0); }

        .cta-h2 {
          font-size: clamp(36px, 7vw, 72px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.0;
          color: #e8ede9;
          margin: 16px 0 20px;
          text-wrap: balance;
        }
        .cta-h2 .accent { color: #4cba7a; }

        .cta-body {
          font-size: 16px;
          color: #5a7066;
          line-height: 1.65;
          max-width: 440px;
          margin: 0 auto 40px;
        }

        .cta-body strong {
          color: #8db8a0;
          font-weight: 500;
        }

        /* CTAs */
        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          margin-bottom: 40px;
        }

        .cta-buttons-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Trust bar */
        .cta-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .cta-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #3d5247;
        }

        .cta-trust-item svg {
          opacity: 0.5;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .cta-section  { padding: 72px 20px; }
          .cta-trust    { gap: 12px 16px; }
        }
      `}</style>

      <section ref={ref} className="cta-section">
        <div className={`cta-inner ${visible ? 'visible' : ''}`}>

          <SectionLabel centered>El momento es ahora</SectionLabel>

          <h2 className="cta-h2">
            Empezá a optimizar
            <br />
            <span className="accent">desde hoy.</span>
          </h2>

          <p className="cta-body">
            Cada semana sin el soporte correcto es una semana de desgaste acumulado.{' '}
            <strong>El costo de no hacer nada también existe.</strong>
          </p>

          <div className="cta-buttons">
            <div className="cta-buttons-row">
              <Button size="lg" href="#packs">
                Elegir mi pack
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <Button variant="secondary" size="lg" href="#faq">
                Tengo dudas primero
              </Button>
            </div>
          </div>

          <div className="cta-trust">
            {TRUST.map((t) => (
              <span key={t.label} className="cta-trust-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {t.icon}
                </svg>
                {t.label}
              </span>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}