'use client'

import { useEffect, useRef, useState } from 'react'
import { PackCard } from './PackCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PACKS, PACK_COMBINATIONS } from '@/data/packs'
import { useCart } from '@/hooks/useCart'

const STACK_COLORS: Record<string, string> = {
  'stack-rendimiento': '#4cba7a',
  'stack-lider':       '#a78bfa',
  'stack-longevidad':  '#c9a96e',
}

export function PacksGrid() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [activeStack, setActiveStack] = useState<string | null>(null)
  const { items } = useCart()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          setTimeout(() => setVisible(true), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const sortedPacks = [...PACKS].sort((a, b) => a.order - b.order)

  const isHighlighted = (packId: string) => {
    if (!activeStack) return true
    const stack = PACK_COMBINATIONS.recommended.find((s) => s.id === activeStack)
    return stack?.packIds.includes(packId) ?? true
  }

  return (
    <>
      <style>{`
        /* ════════════════════════════════════════
           PACKS GRID
        ════════════════════════════════════════ */
        .pg-section {
          background: #060a08;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }

        .pg-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 40% at 50% 0%,
            rgba(76,186,122,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .pg-inner {
          max-width: 1140px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .pg-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .pg-header.visible { opacity: 1; transform: translateY(0); }

        .pg-h2 {
          font-size: clamp(30px, 5vw, 52px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 12px;
          text-wrap: balance;
        }
        .pg-h2 .muted { color: #5a7066; }

        .pg-subtitle {
          font-size: 15px;
          color: #5a7066;
          line-height: 1.65;
          margin: 0;
        }
        .pg-subtitle strong { color: #8db8a0; font-weight: 500; }

        /* ── Stack selector ── */
        .pg-stacks {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin: 40px 0 48px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .pg-stacks.visible { opacity: 1; transform: translateY(0); }

        .pg-stack-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3d5247;
          display: flex;
          align-items: center;
          padding-right: 8px;
          font-weight: 600;
        }

        .pg-stack-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          font-size: 12px;
          font-weight: 600;
          color: #5a7066;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .pg-stack-btn:hover {
          border-color: rgba(255,255,255,0.14);
          color: #8db8a0;
        }

        .pg-stack-btn.active {
          background: rgba(255,255,255,0.05);
          color: #e8ede9;
        }

        .pg-stack-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Grid ── */
        .pg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        /* ── Footer note ── */
        .pg-note {
          text-align: center;
          margin-top: 32px;
          font-size: 12px;
          color: #2d3d35;
          opacity: 0;
          transition: opacity 0.5s ease 0.6s;
        }
        .pg-note.visible { opacity: 1; }

        /* ════════════════════════════════════════
           PACK CARD
        ════════════════════════════════════════ */
        .pc {
          position: relative;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow: hidden;
          transition:
            border-color 0.25s,
            background 0.25s,
            transform 0.25s,
            opacity 0.4s,
            box-shadow 0.25s;
        }

        .pc:hover {
          border-color: var(--c-solid);
          border-color: color-mix(in srgb, var(--c-solid) 40%, transparent);
          transform: translateY(-3px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.4);
        }

        .pc--featured {
          border-color: rgba(76,186,122,0.3);
          background: rgba(76,186,122,0.04);
        }

        /* Dimmed when stack active and not in stack */
        .pc--dimmed {
          opacity: 0.3;
          transform: scale(0.98);
        }

        /* Glow */
        .pc-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(circle at 80% 10%,
            var(--c-glow) 0%, transparent 60%);
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .pc:hover .pc-glow { opacity: 1; }

        /* Top accent line */
        .pc-accent-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--c-solid);
          opacity: 0.5;
          transition: opacity 0.25s;
        }
        .pc:hover .pc-accent-line { opacity: 1; }
        .pc--featured .pc-accent-line { opacity: 0.9; }

        /* Featured badge */
        .pc-badge {
          position: absolute;
          top: 14px; right: 14px;
          background: #4cba7a;
          color: #000;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 100px;
        }

        /* ── Header ── */
        .pc-header { display: flex; flex-direction: column; gap: 6px; }

        .pc-order {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 10px;
          color: var(--c-solid);
          letter-spacing: 0.1em;
          opacity: 0.6;
        }

        .pc-name {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #e8ede9;
          margin: 0;
          line-height: 1;
        }

        .pc-tagline {
          font-size: 12px;
          color: #5a7066;
          line-height: 1.5;
          margin: 0;
        }

        /* ── Ingredients ── */
        .pc-ingredients {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .pc-ing {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 6px 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 8px;
          transition: background 0.15s, border-color 0.15s;
        }

        .pc:hover .pc-ing {
          background: var(--c-bg);
          border-color: color-mix(in srgb, var(--c-solid) 15%, transparent);
        }

        .pc-ing-dose {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: var(--c-solid);
          white-space: nowrap;
          flex-shrink: 0;
          min-width: 56px;
        }

        .pc-ing-name {
          font-size: 12px;
          color: #8db8a0;
          line-height: 1.3;
        }

        /* ── Audience accordion ── */
        .pc-audience {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 12px 0 0;
          cursor: pointer;
          gap: 8px;
        }

        .pc-audience-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #3d5247;
        }

        .pc-audience-chevron {
          color: #3d5247;
          flex-shrink: 0;
          transition: transform 0.3s ease, color 0.2s;
        }

        .pc-audience[aria-expanded="true"] .pc-audience-chevron {
          transform: rotate(180deg);
          color: var(--c-solid);
        }

        .pc-audience-body-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        .pc-audience[aria-expanded="true"] + .pc-audience-body-wrap {
          grid-template-rows: 1fr;
        }

        .pc-audience-body-inner { overflow: hidden; }

        .pc-audience-text {
          font-size: 12px;
          color: #5a7066;
          line-height: 1.65;
          margin: 0;
          padding: 10px 0 2px;
        }

        /* ── Footer ── */
        .pc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: auto;
        }

        .pc-price-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pc-price {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 20px;
          font-weight: 500;
          color: #e8ede9;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .pc-price-sub {
          font-size: 10px;
          color: #2d3d35;
          letter-spacing: 0.02em;
        }

        /* CTA button */
        .pc-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 100px;
          border: 1px solid var(--c-solid);
          background: transparent;
          color: var(--c-solid);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }

        .pc-cta:hover:not(.pc-cta--disabled):not(.pc-cta--incart) {
          background: var(--c-solid);
          color: #000;
        }

        .pc-cta--incart {
          background: var(--c-bg);
          border-color: var(--c-solid);
          opacity: 0.8;
          cursor: default;
        }

        .pc-cta--disabled {
          opacity: 0.3;
          cursor: not-allowed;
          border-color: rgba(255,255,255,0.1);
          color: #3d5247;
        }

        /* ── Mobile ── */
        @media (max-width: 960px) {
          .pg-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .pg-section { padding: 64px 20px; }
          .pg-grid    { grid-template-columns: 1fr; }
          .pg-stacks  { gap: 6px; }
          .pg-stack-label { display: none; }
        }
      `}</style>

      <section ref={ref} id="packs" className="pg-section">
        <div className="pg-inner">

          {/* Header */}
          <div className={`pg-header ${titleVisible ? 'visible' : ''}`}>
            <SectionLabel centered>Sistema modular NUVEN</SectionLabel>
            <h2 className="pg-h2">
              6 packs.{' '}
              <span className="muted">Un sistema.</span>
            </h2>
            <p className="pg-subtitle">
              Cada pack resuelve un eje específico de tu biología.{' '}
              <strong>Combiná hasta 3 — las fórmulas no se solapan.</strong>
            </p>
          </div>

          {/* Stack selector */}
          <div className={`pg-stacks ${titleVisible ? 'visible' : ''}`}>
            <span className="pg-stack-label">Ver stacks</span>
            {PACK_COMBINATIONS.recommended.map((stack) => (
              <button
                key={stack.id}
                className={`pg-stack-btn ${activeStack === stack.id ? 'active' : ''}`}
                onClick={() =>
                  setActiveStack((prev) => (prev === stack.id ? null : stack.id))
                }
                style={
                  activeStack === stack.id
                    ? { borderColor: STACK_COLORS[stack.id], color: STACK_COLORS[stack.id] }
                    : {}
                }
              >
                <span
                  className="pg-stack-dot"
                  style={{ background: STACK_COLORS[stack.id] }}
                />
                {stack.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="pg-grid">
            {sortedPacks.map((pack, i) => (
              <div
                key={pack.id}
                className={!isHighlighted(pack.id) ? 'pc--dimmed' : ''}
                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <PackCard pack={pack} index={i} visible={visible} />
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className={`pg-note ${visible ? 'visible' : ''}`}>
            Pago único · Sin suscripciones · Sin compromisos · Envío gratis a todo el país
          </p>

        </div>
      </section>
    </>
  )
}