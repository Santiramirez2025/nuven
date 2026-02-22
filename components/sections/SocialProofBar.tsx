'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 847, suffix: '+', label: 'protocolos activos' },
  { value: 4.9, suffix: '', label: 'rating promedio', isDecimal: true },
  { value: 6,   suffix: '', label: 'packs del sistema' },
  { value: 98,  suffix: '%', label: 'recomendarían NUVEN' },
]

const BADGES = [
  { text: 'Formulado en Argentina' },
  { text: 'ANMAT compatible' },
  { text: 'Sin solapamiento de dosis' },
  { text: 'Sistema validado' },
]

function useCountUp(target: number, isDecimal = false, trigger: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, target)
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [trigger, target, isDecimal])

  return isDecimal ? count.toFixed(1) : count
}

function StatItem({
  value,
  suffix,
  label,
  isDecimal = false,
  trigger,
}: {
  value: number
  suffix: string
  label: string
  isDecimal?: boolean
  trigger: boolean
}) {
  const count = useCountUp(value, isDecimal, trigger)

  return (
    <div className="stat-item">
      <span className="stat-value">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function SocialProofBar() {
  const ref = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .spb {
          background: #080c0a;
          border-top: 1px solid rgba(76, 186, 122, 0.12);
          border-bottom: 1px solid rgba(76, 186, 122, 0.12);
          padding: 40px 24px;
          position: relative;
          overflow: hidden;
        }

        .spb::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(76, 186, 122, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .spb-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ── Stats row ── */
        .spb-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 0 16px;
          position: relative;
        }

        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(76, 186, 122, 0.15);
        }

        .stat-value {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 500;
          color: #4cba7a;
          letter-spacing: -0.02em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-size: 12px;
          color: #5a7066;
          text-align: center;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ── Divider ── */
        .spb-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(76,186,122,0.15) 30%, rgba(76,186,122,0.15) 70%, transparent);
        }

        /* ── Badges row ── */
        .spb-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .spb-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border: 1px solid rgba(76, 186, 122, 0.2);
          border-radius: 100px;
          background: rgba(76, 186, 122, 0.05);
          font-size: 12px;
          color: #8db8a0;
          letter-spacing: 0.04em;
          font-weight: 500;
          white-space: nowrap;
          transition: border-color 0.2s, background 0.2s;
        }

        .spb-badge:hover {
          border-color: rgba(76, 186, 122, 0.4);
          background: rgba(76, 186, 122, 0.08);
        }

        .spb-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4cba7a;
          flex-shrink: 0;
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .spb { padding: 32px 20px; }
          .spb-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 0;
          }
          .stat-item:nth-child(2)::after { display: none; }
          .stat-item:nth-child(3)::after { display: none; }
          .stat-item:nth-child(4)::after { display: none; }
          .stat-item:nth-child(odd)::after {
            display: block;
          }
          .stat-item {
            padding: 0 12px;
          }
        }
      `}</style>

      <section ref={ref} className="spb">
        <div className="spb-inner">
          <div className="spb-stats">
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} trigger={triggered} />
            ))}
          </div>

          <div className="spb-divider" />

          <div className="spb-badges">
            {BADGES.map((b) => (
              <span key={b.text} className="spb-badge">
                <span className="spb-badge-dot" />
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}