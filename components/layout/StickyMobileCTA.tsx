'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { formatARS } from '@/data/packs'

export function StickyMobileCTA() {
  const { totalItems, totalPrice, toggleCart } = useCart()
  const count = totalItems()
  const total = totalPrice()

  const [pricePulse, setPricePulse] = useState(false)
  const prevTotal = useRef(total)

  useEffect(() => {
    if (total !== prevTotal.current) {
      setPricePulse(true)
      const t = setTimeout(() => setPricePulse(false), 500)
      prevTotal.current = total
      return () => clearTimeout(t)
    }
  }, [total])

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20">
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key="with-items"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
            style={{
              background: 'linear-gradient(to top, rgba(6,9,7,0.99) 60%, rgba(6,9,7,0.85) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 -1px 0 rgba(76,186,122,0.1), 0 -24px 48px rgba(0,0,0,0.5)',
            }}
          >
            {/* Main CTA button */}
            <motion.button
              onClick={toggleCart}
              whileTap={{ scale: 0.97 }}
              className="w-full relative overflow-hidden rounded-2xl flex items-center justify-between px-5 py-4 transition-all duration-300 group"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 8px 32px rgba(76,186,122,0.3)',
              }}
              aria-label={`Ver carrito con ${count} pack${count > 1 ? 's' : ''}, total ${formatARS(total)}`}
            >
              {/* Shimmer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }}
              />

              {/* Left — action */}
              <div className="flex items-center gap-3 relative z-10">
                {/* Pack count badge */}
                <div className="w-7 h-7 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-syne font-black text-sm text-black leading-none">{count}</span>
                </div>
                <div className="text-left">
                  <p className="font-syne font-black text-[15px] text-black leading-tight">
                    Activar mi protocolo
                  </p>
                  <p className="text-[10px] text-black/60 font-medium leading-none mt-0.5">
                    {count === 1 ? '1 pack seleccionado' : `${count} packs combinados`}
                  </p>
                </div>
              </div>

              {/* Right — price */}
              <motion.div
                animate={pricePulse ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-right relative z-10"
              >
                <p className="font-syne font-black text-lg text-black leading-tight">
                  {formatARS(total)}
                </p>
                <p className="text-[10px] text-black/55 font-medium leading-none mt-0.5">
                  pago único
                </p>
              </motion.div>
            </motion.button>

            {/* Microcopy */}
            <p className="text-center text-[10px] text-[var(--text-3)] mt-2.5 flex items-center justify-center gap-1.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Envío gratis · Garantía 30 días · Sin suscripción
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
            style={{
              background: 'linear-gradient(to top, rgba(6,9,7,0.99) 60%, rgba(6,9,7,0.85) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 -1px 0 rgba(255,255,255,0.05), 0 -24px 48px rgba(0,0,0,0.5)',
            }}
          >
            <motion.a
              href="#packs"
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-between w-full rounded-2xl border border-[var(--border-accent)] px-5 py-4 transition-all duration-300 group"
              style={{ background: 'rgba(76,186,122,0.06)' }}
              aria-label="Crear mi protocolo personalizado"
            >
              <div>
                <p className="font-syne font-black text-[15px] text-[var(--text)] leading-tight">
                  Crear mi protocolo
                </p>
                <p className="text-[10px] text-[var(--text-3)] mt-0.5 font-medium">
                  Desde $17.000 ARS · Pago único
                </p>
              </div>
              <span className="text-accent text-xl transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}