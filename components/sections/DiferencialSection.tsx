'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const DIFFERENTIALS = [
  {
    num: '01',
    title: 'Dosis activas, no decorativas',
    body: 'La mayoría de las marcas pone lo suficiente para listar el ingrediente en la etiqueta. Nosotros dosificamos para que funcione. Cada miligramo tiene una razón.',
    proof: 'Ej: Ashwagandha KSM-66 a 600mg — la dosis usada en estudios clínicos.',
  },
  {
    num: '02',
    title: 'Formas biodisponibles',
    body: 'Magnesio glicinato, no óxido. Zinc bisglicinato, no sulfato. B6 en forma P5P. La forma del ingrediente determina cuánto absorbés realmente.',
    proof: 'El magnesio óxido tiene ~4% de absorción. El glicinato, hasta 80%.',
  },
  {
    num: '03',
    title: 'Sistema diseñado para combinar',
    body: 'Cada pack fue formulado sabiendo que vas a usar más de uno. Sin solapamientos de dosis, sin interacciones problemáticas.',
    proof: '6 packs, 0 duplicaciones de ingrediente activo entre ellos.',
  },
  {
    num: '04',
    title: 'Cumplimiento ANMAT real',
    body: 'RNPA activo, director técnico habilitado, producción con RNE. No es un importado sin aval ni una marca sin trazabilidad.',
    proof: 'Cada producto tiene número de RNPA verificable en el registro público.',
  },
  {
    num: '05',
    title: 'Transparencia radical',
    body: 'Etiqueta completa, dosis visibles, proveedor de materias primas identificado. Sabés exactamente qué tomás y en qué cantidad.',
    proof: 'Sin mezclas propietarias opacas. Sin "blend" que oculte dosis reales.',
  },
]

const CHECKLIST = [
  { text: 'Ingredientes con respaldo en literatura científica', cat: 'Ciencia' },
  { text: 'Dosis que aparecen en los estudios', cat: 'Ciencia' },
  { text: 'Formas de alta biodisponibilidad', cat: 'Formulación' },
  { text: 'Sin gluten, sin colorantes artificiales', cat: 'Calidad' },
  { text: 'Producido en Argentina bajo BPM', cat: 'Regulatorio' },
  { text: 'RNPA por producto, RNE del establecimiento', cat: 'Regulatorio' },
  { text: 'Director técnico habilitado', cat: 'Regulatorio' },
  { text: 'Garantía de satisfacción 30 días', cat: 'Confianza' },
]

const CAT_COLORS: Record<string, string> = {
  Ciencia:     'rgba(96,165,250,0.12)',
  Formulación: 'rgba(76,186,122,0.12)',
  Calidad:     'rgba(251,191,36,0.12)',
  Regulatorio: 'rgba(167,139,250,0.12)',
  Confianza:   'rgba(249,115,22,0.12)',
}
const CAT_TEXT: Record<string, string> = {
  Ciencia:     '#60a5fa',
  Formulación: '#4cba7a',
  Calidad:     '#fbbf24',
  Regulatorio: '#a78bfa',
  Confianza:   '#f97316',
}

function DifferentialItem({
  d, index, visible, active, onClick,
}: {
  d: (typeof DIFFERENTIALS)[0]
  index: number
  visible: boolean
  active: boolean
  onClick: () => void
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShown(true), index * 90)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <button
      className="dif-item"
      onClick={onClick}
      aria-expanded={active}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateX(0)' : 'translateX(-16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <div className="dif-item-header">
        <span className="dif-num">{d.num}</span>
        <span className="dif-title">{d.title}</span>
        <span className="dif-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>

      <div className="dif-body-wrap">
        <div className="dif-body-inner">
          <p className="dif-body">{d.body}</p>
          <div className="dif-proof">
            <span className="dif-proof-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </span>
            <span>{d.proof}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function CheckItem({
  item, index, visible,
}: {
  item: (typeof CHECKLIST)[0]
  index: number
  visible: boolean
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShown(true), index * 55 + 400)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <li
      className="dif-check-item"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateX(0)' : 'translateX(10px)',
        transition: `opacity 0.4s ease ${index * 55}ms, transform 0.4s ease ${index * 55}ms`,
      }}
    >
      <span className="dif-check-dot"
        style={{ background: CAT_TEXT[item.cat] }} />
      <span className="dif-check-text">{item.text}</span>
      <span className="dif-check-cat"
        style={{ background: CAT_COLORS[item.cat], color: CAT_TEXT[item.cat] }}>
        {item.cat}
      </span>
    </li>
  )
}

export function DiferencialSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [checkVisible, setCheckVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          setTimeout(() => setVisible(true), 200)
          setTimeout(() => setCheckVisible(true), 500)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i: number) =>
    setActiveIndex((prev) => (prev === i ? -1 : i))

  return (
    <>
      <style>{`
        .dif-section {
          background: #060a08;
          padding: 96px 24px;
          position: relative;
        }

        .dif-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .dif-header {
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .dif-header.visible { opacity: 1; transform: translateY(0); }

        .dif-h2 {
          font-size: clamp(30px, 5vw, 52px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 0;
          text-wrap: balance;
          max-width: 560px;
        }
        .dif-h2 .muted { color: #5a7066; }

        /* ── Layout ── */
        .dif-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Accordion ── */
        .dif-accordion {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dif-item {
          width: 100%;
          text-align: left;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .dif-item:hover {
          background: rgba(76,186,122,0.03);
          border-color: rgba(76,186,122,0.15);
        }

        .dif-item[aria-expanded="true"] {
          background: rgba(76,186,122,0.04);
          border-color: rgba(76,186,122,0.22);
        }

        .dif-item-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 16px;
        }

        .dif-num {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 11px;
          color: #4cba7a;
          letter-spacing: 0.08em;
          flex-shrink: 0;
          opacity: 0.6;
          width: 22px;
        }

        .dif-title {
          font-size: 14px;
          font-weight: 600;
          color: #e8ede9;
          letter-spacing: -0.01em;
          flex: 1;
          line-height: 1.3;
        }

        .dif-chevron {
          color: #3d5247;
          flex-shrink: 0;
          transition: transform 0.3s ease, color 0.2s;
        }

        .dif-item[aria-expanded="true"] .dif-chevron {
          transform: rotate(180deg);
          color: #4cba7a;
        }

        /* ── Accordion body — CSS grid trick for smooth animation ── */
        .dif-body-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dif-item[aria-expanded="true"] .dif-body-wrap {
          grid-template-rows: 1fr;
        }

        .dif-body-inner {
          overflow: hidden;
          padding: 0 16px;
          transition: padding 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dif-item[aria-expanded="true"] .dif-body-inner {
          padding: 2px 16px 14px;
        }

        .dif-body {
          font-size: 13px;
          color: #8db8a0;
          line-height: 1.65;
          margin: 0 0 10px;
        }

        /* Proof — visually attached to body, not floating */
        .dif-proof {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          background: rgba(76,186,122,0.06);
          border: 1px solid rgba(76,186,122,0.1);
          border-radius: 7px;
          padding: 8px 10px;
          font-size: 12px;
          color: #4cba7a;
          line-height: 1.5;
        }

        .dif-proof-icon {
          flex-shrink: 0;
          margin-top: 1px;
          opacity: 0.8;
        }

        /* ── Checklist card ── */
        .dif-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
          position: sticky;
          top: 100px;
        }

        .dif-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dif-card-label {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3d5247;
          font-weight: 700;
          margin-bottom: 16px;
          display: block;
        }

        .dif-checklist {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dif-check-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 10px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: background 0.2s, border-color 0.2s;
        }

        .dif-check-item:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.05);
        }

        .dif-check-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dif-check-text {
          font-size: 12px;
          color: #8db8a0;
          flex: 1;
          line-height: 1.4;
        }

        .dif-check-cat {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 2px 6px;
          border-radius: 100px;
          white-space: nowrap;
        }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .dif-layout { grid-template-columns: 1fr; gap: 36px; }
          .dif-card { position: static; }
        }

        @media (max-width: 560px) {
          .dif-section { padding: 64px 20px; }
          .dif-header { margin-bottom: 40px; }
        }
      `}</style>

      <section ref={ref} id="diferencial" className="dif-section">
        <div className="dif-inner">

          <div className={`dif-header ${titleVisible ? 'visible' : ''}`}>
            <SectionLabel>Por qué funciona</SectionLabel>
            <h2 className="dif-h2">
              No es solo{' '}
              <span className="muted">lo que ponemos.</span>
            </h2>
          </div>

          <div className="dif-layout">

            <div className="dif-accordion">
              {DIFFERENTIALS.map((d, i) => (
                <DifferentialItem
                  key={d.num}
                  d={d}
                  index={i}
                  visible={visible}
                  active={activeIndex === i}
                  onClick={() => toggle(i)}
                />
              ))}
            </div>

            <div className={`dif-card ${checkVisible ? 'visible' : ''}`}>
              <span className="dif-card-label">Lo que NUVEN garantiza</span>
              <ul className="dif-checklist">
                {CHECKLIST.map((item, i) => (
                  <CheckItem
                    key={item.text}
                    item={item}
                    index={i}
                    visible={checkVisible}
                  />
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}