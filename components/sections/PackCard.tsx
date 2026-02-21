'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatARS } from '@/data/packs'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import type { Pack } from '@/types'

interface PackCardProps {
  pack: Pack
  index: number
}

export function PackCard({ pack, index }: PackCardProps) {
  const { addItem, items, canAddMore } = useCart()
  const inCart = items.some((i) => i.pack.id === pack.id)
  const cartFull = !canAddMore() && !inCart

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={cn(
        'relative rounded-3xl border p-9 overflow-hidden',
        'transition-all duration-350 cursor-default group',
        'hover:border-[var(--border-accent)] hover:-translate-y-1',
        'hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]',
        pack.featured
          ? 'border-[var(--border-accent)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)]'
          : 'border-[var(--border)] bg-[var(--surface)]'
      )}
      style={{ '--pack-color': pack.colorVar } as React.CSSProperties}
      aria-label={`Pack ${pack.name}`}
    >
      {/* Glow background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 20%, ${pack.colorVar} 0%, transparent 60%)` }}
      />

      {/* Featured badge */}
      {pack.featured && (
        <span className="absolute top-5 right-5 bg-accent text-black text-[11px] font-bold font-syne tracking-wide px-3 py-1 rounded-full uppercase">
          Más popular
        </span>
      )}

      {/* Header */}
      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-3)] mb-5">
        Pack {String(pack.order).padStart(2, '0')}
      </p>

      <div className="w-14 h-14 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-2xl mb-6 transition-colors group-hover:border-[var(--border-accent)]">
        {pack.icon}
      </div>

      <h3 className="font-syne text-[28px] font-black tracking-tight mb-2">
        {pack.name}
      </h3>

      <p className="text-sm text-accent font-medium mb-5 leading-snug">
        {pack.benefitMain}
      </p>

      {/* Benefits */}
      <ul className="space-y-2.5 mb-6" role="list">
        {pack.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-2)] leading-snug">
            <span className="text-accent mt-0.5 flex-shrink-0">—</span>
            {benefit}
          </li>
        ))}
      </ul>

      {/* Audience */}
      <div className="py-3 border-t border-[var(--border)] mb-6">
        <p className="text-[13px] text-[var(--text-3)]">
          <strong className="text-[var(--text-2)]">Para vos si:</strong> {pack.audience}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-syne text-[22px] font-black">
            {formatARS(pack.price)}
            <span className="text-[13px] font-normal text-[var(--text-3)] ml-1">/ unidad</span>
          </p>
          <p className="text-[12px] text-[var(--text-3)] mt-0.5">
            Envío incluido · Pago único
          </p>
        </div>

        <Button
          variant={inCart ? 'ghost' : 'outline'}
          size="sm"
          disabled={cartFull}
          onClick={() => addItem(pack)}
          aria-label={inCart ? `${pack.name} ya en carrito` : `Agregar ${pack.name} al carrito`}
        >
          {inCart ? '✓ En carrito' : cartFull ? 'Máx. 3' : 'Agregar →'}
        </Button>
      </div>
    </motion.article>
  )
}