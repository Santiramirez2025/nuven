'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { formatARS } from '@/data/packs'

const COMPARISON_ITEMS = [
  { name: 'CoQ10 Ubiquinona 100mg',      price: 800000 },
  { name: 'Complejo B completo activo',   price: 550000 },
  { name: 'Rhodiola Rosea estandarizado', price: 480000 },
  { name: 'Magnesio glicinato 200mg',     price: 320000 },
  { name: 'Vitamina C 500mg premium',     price: 210000 },
]

const TOTAL_SUELTO = COMPARISON_ITEMS.reduce((a, i) => a + i.price, 0)
const PACK_PRICE   = 2000000
const SAVING       = TOTAL_SUELTO - PACK_PRICE
const SAVING_PCT   = Math.round((SAVING / TOTAL_SUELTO) * 100)

export function ValorSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .val-section {
          background: #080c0a;
          padding: 96px 24px;
          position: relative;
        }

        .val-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .val-header {
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .val-header.visible { opacity: 1; transform: translateY(0); }

        .val-h2 {
          font-size: clamp(30px, 5vw, 52px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 0;
          text-wrap: balance;
          max-width: 560px;
        }
        .val-h2 .muted { color: #5a7066; }

        /* ── Layout ── */
        .val-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ════════════════════
           LEFT — Comparison
        ════════════════════ */
        .val-comparison {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .val-comparison.visible { opacity: 1; transform: translateX(0); }

        .val-col-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3d5247;
          margin-bottom: 14px;
          display: block;
        }

        .val-table {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
        }

        /* Individual rows */
        .val-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.4s ease, transform 0.4s ease, background 0.2s;
        }
        .val-row.shown { opacity: 1; transform: translateX(0); }
        .val-row:hover { background: rgba(255,255,255,0.02); }

        .val-row-name {
          font-size: 13px;
          color: #8db8a0;
        }

        .val-row-price {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 12px;
          color: #3d5247;
          text-decoration: line-through;
          text-decoration-color: #2d3d35;
        }

        /* Subtotal row */
        .val-row--subtotal {
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .val-row--subtotal .val-row-name {
          font-size: 12px;
          font-weight: 700;
          color: #5a7066;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .val-row--subtotal .val-row-price {
          color: #5a7066;
          text-decoration: line-through;
        }

        /* NUVEN row */
        .val-row--nuven {
          background: rgba(76,186,122,0.05);
          border-bottom: none;
        }
        .val-row--nuven .val-row-name {
          font-size: 13px;
          font-weight: 700;
          color: #e8ede9;
        }
        .val-row--nuven .val-row-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .val-nuven-price {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 18px;
          font-weight: 500;
          color: #4cba7a;
          letter-spacing: -0.02em;
        }
        .val-nuven-saving {
          font-size: 10px;
          font-weight: 700;
          color: #4cba7a;
          background: rgba(76,186,122,0.1);
          border: 1px solid rgba(76,186,122,0.2);
          padding: 1px 7px;
          border-radius: 100px;
          letter-spacing: 0.04em;
        }

        .val-table-note {
          font-size: 11px;
          color: #2d3d35;
          margin-top: 12px;
          text-align: center;
        }

        /* ════════════════════
           RIGHT — Pricing
        ════════════════════ */
        .val-pricing {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .val-pricing.visible { opacity: 1; transform: translateX(0); }

        /* Main card */
        .val-price-card {
          background: rgba(76,186,122,0.04);
          border: 1px solid rgba(76,186,122,0.25);
          border-radius: 18px;
          padding: 28px 24px;
          text-align: center;
        }

        .val-price-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3d5247;
          margin-bottom: 16px;
          display: block;
        }

        .val-price-main {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 500;
          color: #e8ede9;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 4px;
        }

        .val-price-main span {
          font-size: 0.5em;
          color: #5a7066;
          font-weight: 400;
          letter-spacing: 0;
        }

        .val-price-sub {
          font-size: 12px;
          color: #3d5247;
          margin-bottom: 20px;
        }

        .val-saving-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(76,186,122,0.08);
          border: 1px solid rgba(76,186,122,0.2);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 700;
          color: #4cba7a;
          margin-bottom: 24px;
        }

        .val-saving-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4cba7a;
          flex-shrink: 0;
        }

        .val-cta-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Guarantee card */
        .val-guarantee {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .val-guarantee-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(76,186,122,0.08);
          border: 1px solid rgba(76,186,122,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #4cba7a;
        }

        .val-guarantee-title {
          font-size: 13px;
          font-weight: 700;
          color: #e8ede9;
          margin: 0 0 4px;
        }

        .val-guarantee-body {
          font-size: 12px;
          color: #5a7066;
          line-height: 1.55;
          margin: 0;
        }

        /* Trust row */
        .val-trust {
          display: flex;
          justify-content: center;
          gap: 20px;
          padding-top: 4px;
        }

        .val-trust-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #2d3d35;
        }

        .val-trust-item svg { opacity: 0.6; }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .val-layout { grid-template-columns: 1fr; gap: 32px; }
        }

        @media (max-width: 560px) {
          .val-section  { padding: 64px 20px; }
          .val-header   { margin-bottom: 40px; }
          .val-trust    { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>

      <section ref={ref} id="valor" className="val-section">
        <div className="val-inner">

          {/* Header */}
          <div className={`val-header ${visible ? 'visible' : ''}`}>
            <SectionLabel>Estructura de valor</SectionLabel>
            <h2 className="val-h2">
              Lo que pagás.{' '}
              <span className="muted">Lo que recibís.</span>
            </h2>
          </div>

          <div className="val-layout">

            {/* LEFT — comparison table */}
            <div className={`val-comparison ${visible ? 'visible' : ''}`}>
              <span className="val-col-label">vs. comprar suplementos por separado</span>

              <div className="val-table">
                {COMPARISON_ITEMS.map((item, i) => (
                  <ComparisonRow
                    key={item.name}
                    item={item}
                    index={i}
                    visible={visible}
                  />
                ))}

                {/* Subtotal */}
                <div className="val-row val-row--subtotal shown">
                  <span className="val-row-name">Total por separado</span>
                  <span className="val-row-price">{formatARS(TOTAL_SUELTO)}</span>
                </div>

                {/* NUVEN */}
                <div className="val-row val-row--nuven shown">
                  <span className="val-row-name">Pack Energía NUVEN</span>
                  <div className="val-row-right">
                    <span className="val-nuven-price">{formatARS(PACK_PRICE)}</span>
                    <span className="val-nuven-saving">
                      −{SAVING_PCT}% vs suelto
                    </span>
                  </div>
                </div>
              </div>

              <p className="val-table-note">
                Sin el tiempo de investigar, comprar 5 productos y coordinar dosis.
              </p>
            </div>

            {/* RIGHT — pricing */}
            <div className={`val-pricing ${visible ? 'visible' : ''}`}>

              <div className="val-price-card">
                <span className="val-price-eyebrow">Pack individual · pago único</span>

                <p className="val-price-main">
                  desde {formatARS(1800000)}
                  <span> / pack</span>
                </p>
                <p className="val-price-sub">Envío incluido a todo el país</p>

                <div className="val-saving-pill">
                  <span className="val-saving-dot" />
                  Ahorrás {formatARS(SAVING)} vs. comprar suelto
                </div>

                <div className="val-cta-stack">
                  <Button size="lg" href="#packs">
                    Armar mi protocolo →
                  </Button>
                  <Button variant="secondary" size="lg" href="#packs">
                    Ver los 6 packs
                  </Button>
                </div>
              </div>

              {/* Guarantee */}
              <div className="val-guarantee">
                <div className="val-guarantee-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p className="val-guarantee-title">Garantía 30 días sin preguntas</p>
                  <p className="val-guarantee-body">
                    Si en 30 días no notás diferencia, te devolvemos el dinero.
                    Sin formularios, sin esperas, sin letra chica.
                  </p>
                </div>
              </div>

              {/* Trust */}
              <div className="val-trust">
                {[
                  'Pago único',
                  'Sin suscripciones',
                  'ANMAT compatible',
                ].map((t) => (
                  <span key={t} className="val-trust-item">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ComparisonRow({
  item, index, visible,
}: {
  item: { name: string; price: number }
  index: number
  visible: boolean
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShown(true), index * 80 + 300)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <div
      className={`val-row ${shown ? 'shown' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="val-row-name">{item.name}</span>
      <span className="val-row-price">{formatARS(item.price)}</span>
    </div>
  )
}