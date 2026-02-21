'use client'
import { useCart } from '@/hooks/useCart'
import { formatARS } from '@/data/packs'
import { cn } from '@/lib/utils'

export function StickyMobileCTA() {
  const { totalItems, totalPrice, toggleCart } = useCart()
  const count = totalItems()
  const total = totalPrice()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 pb-safe">
      <div className="px-4 py-3 bg-[rgba(8,12,10,0.95)] backdrop-blur-xl border-t border-[var(--border)]">
        {count > 0 ? (
          <button
            onClick={toggleCart}
            className="w-full bg-accent text-black font-syne font-bold text-base py-4 rounded-full flex items-center justify-between px-6"
          >
            <span>Ver mi protocolo ({count})</span>
            <span>{formatARS(total)}/mes</span>
          </button>
        ) : (
          <a
            href="#packs"
            className="block w-full bg-accent text-black font-syne font-bold text-base py-4 rounded-full text-center"
          >
            Elegir mi pack — desde $17.000 ARS
          </a>
        )}
      </div>
    </div>
  )
}
