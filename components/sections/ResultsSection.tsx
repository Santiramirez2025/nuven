'use client'

import { useEffect, useRef, useState } from 'react'

const RESULTS = [
  {
    pack: 'LONGEVIDAD',
    color: '#a78bfa',
    metric: '87%',
    timeframe: '30 días',
    claim: 'reportó mayor vitalidad y bienestar general',
    detail: 'Protección celular con Niacinamida, Resveratrol y Astaxantina.',
  },
  {
    pack: 'ENERGÍA',
    color: '#4cba7a',
    metric: '91%',
    timeframe: '14 días',
    claim: 'redujo su sensación de cansancio y fatiga',
    detail: 'CoQ10 + Complejo B + Rhodiola: el trío del metabolismo energético.',
  },
  {
    pack: 'CEREBRO',
    color: '#60a5fa',
    metric: '83%',
    timeframe: '21 días',
    claim: 'mejoró su foco y claridad mental',
    detail: 'Lion\'s Mane + Bacopa + Fosfatidilserina + L-Teanina.',
  },
  {
    pack: 'FÍSICO',
    color: '#f97316',
    metric: '94%',
    timeframe: '28 días',
    claim: 'notó mejor recuperación muscular post-entrenamiento',
    detail: 'Creatina + Colágeno + Magnesio glicinato + D3.',
  },
  {
    pack: 'HORMONAS',
    color: '#fbbf24',
    metric: '79%',
    timeframe: '45 días',
    claim: 'reportó mayor equilibrio y reducción del estrés',
    detail: 'Ashwagandha KSM-66 + Zinc + Boro + B6 (P5P).',
  },
  {
    pack: 'BIENESTAR MENTAL',
    color: '#e879f9',
    metric: '88%',
    timeframe: '21 días',
    claim: 'durmió mejor y redujo su ansiedad cotidiana',
    detail: 'Magnesio L-treonato + L-Teanina + Azafrán Affron®.',
  },
]

function ResultCard({
  result,
  index,
  visible,
}: {
  result: (typeof RESULTS)[0]
  index: number
  visible: boolean
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShown(true), index * 100)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <div
      className="rc"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        '--pack-color': result.color,
      } as React.CSSProperties}
    >
      <div className="rc-header">
        <span className="rc-pack">{result.pack}</span>
        <span className="rc-timeframe">{result.timeframe}</span>
      </div>

      <div className="rc-metric">{result.metric}</div>
      <p className="rc-claim">{result.claim}</p>

      <div className="rc-bar-track">
        <div
          className="rc-bar-fill"
          style={{
            width: shown ? result.metric : '0%',
            transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: `${index * 100 + 200}ms`,
            background: result.color,
          }}
        />
      </div>

      <p className="rc-detail">{result.detail}</p>
    </div>
  )
}

export function ResultsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
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
        .rs {
          background: #080c0a;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }

        .rs::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(76,186,122,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .rs-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .rs-eyebrow {
          display: block;
          text-align: center;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4cba7a;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .rs-title {
          text-align: center;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          color: #e8ede9;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0 0 16px;
        }

        .rs-subtitle {
          text-align: center;
          font-size: 16px;
          color: #5a7066;
          max-width: 480px;
          margin: 0 auto 64px;
          line-height: 1.6;
        }

        /* ── Grid ── */
        .rs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── Card ── */
        .rc {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s;
        }

        .rc::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--pack-color);
          opacity: 0.6;
        }

        .rc:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
        }

        .rc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .rc-pack {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--pack-color);
        }

        .rc-timeframe {
          font-size: 11px;
          color: #3d5247;
          background: rgba(255,255,255,0.04);
          padding: 3px 8px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .rc-metric {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 48px;
          font-weight: 500;
          color: var(--pack-color);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .rc-claim {
          font-size: 13px;
          color: #8db8a0;
          line-height: 1.5;
          margin: 0;
        }

        .rc-bar-track {
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
        }

        .rc-bar-fill {
          height: 100%;
          border-radius: 100px;
        }

        .rc-detail {
          font-size: 11px;
          color: #3d5247;
          line-height: 1.5;
          margin: 0;
        }

        /* ── Disclaimer ── */
        .rs-disclaimer {
          text-align: center;
          margin-top: 40px;
          font-size: 11px;
          color: #2d3d35;
          letter-spacing: 0.02em;
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .rs-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .rs { padding: 64px 20px; }
          .rs-grid { grid-template-columns: 1fr; }
          .rc-metric { font-size: 40px; }
        }
      `}</style>

      <section ref={ref} className="rs">
        <div className="rs-inner">
          <span className="rs-eyebrow">Resultados reales</span>
          <h2 className="rs-title">
            Cada pack,<br />un objetivo claro
          </h2>
          <p className="rs-subtitle">
            Datos de seguimiento interno con usuarios en fase beta.
            Cada pack fue diseñado para un resultado específico, sin solapamiento.
          </p>

          <div className="rs-grid">
            {RESULTS.map((r, i) => (
              <ResultCard key={r.pack} result={r} index={i} visible={visible} />
            ))}
          </div>

          <p className="rs-disclaimer">
            * Datos de seguimiento interno con usuarios beta. Los suplementos no reemplazan una alimentación equilibrada ni tratamiento médico.
          </p>
        </div>
      </section>
    </>
  )
}