'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TESTIMONIALS } from '@/data/testimonials'

const METRICS = [
  { value: 1200, display: '+1.200', unit: '',    label: 'Protocolos activos' },
  { value: 94,   display: '94',     unit: '%',   label: 'Satisfacción reportada' },
  { value: 4.9,  display: '4.9',    unit: '★',   label: 'Puntuación promedio' },
  { value: 8,    display: '8',      unit: ' sem', label: 'Para resultados visibles' },
]

function MetricCard({
  metric, index, visible,
}: {
  metric: (typeof METRICS)[0]
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
      className="test-metric"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease, transform 0.5s ease`,
      }}
    >
      <p className="test-metric-value">
        {metric.display}
        <span className="test-metric-unit">{metric.unit}</span>
      </p>
      <p className="test-metric-label">{metric.label}</p>
    </div>
  )
}

function TestimonialCard({
  t, index, visible,
}: {
  t: (typeof TESTIMONIALS)[0]
  index: number
  visible: boolean
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t2 = setTimeout(() => setShown(true), index * 100)
    return () => clearTimeout(t2)
  }, [visible, index])

  return (
    <div
      className="test-card"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
      }}
    >
      {/* Stars */}
      <div className="test-stars" aria-label={`${t.rating} estrellas`}>
        {Array.from({ length: 5 }).map((_, j) => (
          <span key={j} style={{ color: j < t.rating ? '#c9a96e' : '#1e2e24' }}>★</span>
        ))}
      </div>

      {/* Pack tag */}
      {t.packUsed && (
        <span className="test-pack-tag">{t.packUsed}</span>
      )}

      {/* Quote */}
      <p className="test-quote">"{t.text}"</p>

      {/* Author */}
      <div className="test-author">
        <div className="test-avatar" aria-hidden="true">
          {t.initials}
        </div>
        <div>
          <p className="test-name">{t.name}</p>
          <p className="test-role">
            {t.role}{t.location ? ` · ${t.location}` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimoniosSection() {
  const ref = useRef<HTMLElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [metricsVisible, setMetricsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          setTimeout(() => setCardsVisible(true), 200)
          setTimeout(() => setMetricsVisible(true), 400)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .test-section {
          background: #080c0a;
          padding: 96px 24px;
          position: relative;
          overflow: hidden;
        }

        .test-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(76,186,122,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .test-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .test-header {
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .test-header.visible { opacity: 1; transform: translateY(0); }

        .test-h2 {
          font-size: clamp(30px, 5vw, 52px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 0;
          text-wrap: balance;
          max-width: 560px;
        }
        .test-h2 .muted { color: #5a7066; }

        /* ── Cards grid ── */
        .test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 14px;
        }

        .test-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s, background 0.2s;
        }

        .test-card:hover {
          border-color: rgba(76,186,122,0.2);
          background: rgba(76,186,122,0.03);
        }

        /* Stars */
        .test-stars {
          display: flex;
          gap: 2px;
          font-size: 13px;
        }

        /* Pack tag */
        .test-pack-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4cba7a;
          background: rgba(76,186,122,0.08);
          border: 1px solid rgba(76,186,122,0.15);
          padding: 3px 10px;
          border-radius: 100px;
          width: fit-content;
        }

        /* Quote */
        .test-quote {
          font-size: 14px;
          color: #8db8a0;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
          flex: 1;
        }

        /* Author */
        .test-author {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: auto;
        }

        .test-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(76,186,122,0.08);
          border: 1px solid rgba(76,186,122,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #4cba7a;
          flex-shrink: 0;
        }

        .test-name {
          font-size: 13px;
          font-weight: 700;
          color: #e8ede9;
          margin: 0;
        }

        .test-role {
          font-size: 11px;
          color: #3d5247;
          margin: 0;
        }

        /* ── Metrics row ── */
        .test-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-top: 14px;
        }

        .test-metric {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 24px 20px;
          text-align: center;
          transition: border-color 0.2s;
        }

        .test-metric:hover {
          border-color: rgba(76,186,122,0.15);
        }

        .test-metric-value {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 500;
          color: #e8ede9;
          line-height: 1;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }

        .test-metric-unit {
          font-size: 0.55em;
          color: #4cba7a;
          margin-left: 2px;
        }

        .test-metric-label {
          font-size: 11px;
          color: #3d5247;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin: 0;
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .test-grid    { grid-template-columns: repeat(2, 1fr); }
          .test-metrics { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .test-section  { padding: 64px 20px; }
          .test-grid     { grid-template-columns: 1fr; }
          .test-header   { margin-bottom: 40px; }
        }
      `}</style>

      <section ref={ref} id="testimonios" className="test-section">
        <div className="test-inner">

          {/* Header */}
          <div className={`test-header ${titleVisible ? 'visible' : ''}`}>
            <SectionLabel>Resultados reales</SectionLabel>
            <h2 className="test-h2">
              Lo que dicen los que{' '}
              <span className="muted">ya optimizaron.</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.id}
                t={t}
                index={i}
                visible={cardsVisible}
              />
            ))}
          </div>

          {/* Metrics */}
          <div className="test-metrics">
            {METRICS.map((m, i) => (
              <MetricCard
                key={m.label}
                metric={m}
                index={i}
                visible={metricsVisible}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}