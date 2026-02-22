'use client'

import { useState } from 'react'
import { formatARS } from '@/data/packs'
import { useCart } from '@/hooks/useCart'
import type { Pack } from '@/types'

// Pack accent colors — mapped from colorVar to solid values
const PACK_COLORS: Record<string, { solid: string; glow: string; bg: string }> = {
  longevidad:       { solid: '#c9a96e', glow: 'rgba(201,169,110,0.12)', bg: 'rgba(201,169,110,0.06)' },
  energia:          { solid: '#4cba7a', glow: 'rgba(76,186,122,0.15)',  bg: 'rgba(76,186,122,0.07)'  },
  cerebro:          { solid: '#60a5fa', glow: 'rgba(96,165,250,0.12)',  bg: 'rgba(96,165,250,0.06)'  },
  fisico:           { solid: '#f97316', glow: 'rgba(249,115,22,0.12)',  bg: 'rgba(249,115,22,0.06)'  },
  hormonas:         { solid: '#a78bfa', glow: 'rgba(167,139,250,0.12)', bg: 'rgba(167,139,250,0.06)' },
  'bienestar-mental': { solid: '#67e8f9', glow: 'rgba(103,232,249,0.12)', bg: 'rgba(103,232,249,0.06)' },
}

interface PackCardProps {
  pack: Pack
  index: number
  visible: boolean
}

export function PackCard({ pack, index, visible }: PackCardProps) {
  const { addItem, items, canAddMore } = useCart()
  const inCart   = items.some((i) => i.pack.id === pack.id)
  const cartFull = !canAddMore() && !inCart
  const [expanded, setExpanded] = useState(false)
  const color = PACK_COLORS[pack.id] ?? PACK_COLORS['energia']
  const shown = visible

  return (
    <>
      <article
        className={`pc ${pack.featured ? 'pc--featured' : ''} ${inCart ? 'pc--incart' : ''}`}
        style={{
          '--c-solid': color.solid,
          '--c-glow':  color.glow,
          '--c-bg':    color.bg,
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.55s ease ${index * 90}ms, transform 0.55s ease ${index * 90}ms`,
        } as React.CSSProperties}
        aria-label={`Pack ${pack.name}`}
      >
        {/* Top accent line */}
        <div className="pc-accent-line" />

        {/* Featured badge */}
        {pack.featured && (
          <span className="pc-badge">Más popular</span>
        )}

        {/* Glow bg on hover */}
        <div className="pc-glow" aria-hidden="true" />

        {/* ── Header ── */}
        <div className="pc-header">
          <span className="pc-order">
            {String(pack.order).padStart(2, '0')}
          </span>
          <h3 className="pc-name">{pack.name}</h3>
          <p className="pc-tagline">{pack.benefitMain}</p>
        </div>

        {/* ── Ingredients pills ── */}
        <div className="pc-ingredients">
          {pack.ingredients.map((ing) => (
            <div key={ing.name} className="pc-ing">
              <span className="pc-ing-dose">{ing.dose}</span>
              <span className="pc-ing-name">{ing.name.split(' (')[0]}</span>
            </div>
          ))}
        </div>

        {/* ── Audience ── */}
        <button
          className="pc-audience"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <span className="pc-audience-label">Para vos si</span>
          <span className="pc-audience-chevron" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>

        <div className="pc-audience-body-wrap">
          <div className="pc-audience-body-inner">
            <p className="pc-audience-text">{pack.audience}</p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="pc-footer">
          <div className="pc-price-block">
            <span className="pc-price">{formatARS(pack.price)}</span>
            <span className="pc-price-sub">por unidad · envío incluido</span>
          </div>

          <button
            className={`pc-cta ${inCart ? 'pc-cta--incart' : ''} ${cartFull ? 'pc-cta--disabled' : ''}`}
            disabled={cartFull}
            onClick={() => !inCart && addItem(pack)}
            aria-label={
              inCart    ? `${pack.name} ya en carrito` :
              cartFull  ? 'Máximo 3 packs' :
                          `Agregar ${pack.name} al carrito`
            }
          >
            {inCart ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                En carrito
              </>
            ) : cartFull ? 'Máx. 3' : 'Agregar'}
          </button>
        </div>
      </article>
    </>
  )
}