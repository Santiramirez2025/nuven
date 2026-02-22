'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { formatARS } from '@/data/packs'
import { Button } from '@/components/ui/Button'

const PACK_BENEFITS: Record<string, string> = {
  longevidad: 'Activa vías de longevidad celular',
  energia: 'Mejora mitocondrial sostenida',
  cerebro: 'Claridad mental y foco profundo',
  fisico: 'Rendimiento y recuperación',
  hormonas: 'Equilibrio hormonal natural',
  'bienestar-mental': 'Calma, sueño y resiliencia',
}

function getBenefit(packId: string): string {
  const key = Object.keys(PACK_BENEFITS).find((k) => packId.toLowerCase().includes(k))
  return key ? PACK_BENEFITS[key] : 'Optimización de alto rendimiento'
}

export function CartDrawer() {
  const { isOpen, items, totalPrice, totalItems, removeItem, toggleCart } = useCart()
  const total = totalPrice()
  const count = totalItems()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 280, mass: 0.9 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] z-50 flex flex-col"
            style={{
              background: 'linear-gradient(160deg, rgba(10,16,12,0.98) 0%, rgba(6,9,7,0.99) 100%)',
              borderLeft: '1px solid rgba(76,186,122,0.12)',
              boxShadow: '-24px 0 80px rgba(0,0,0,0.6), -1px 0 0 rgba(76,186,122,0.08)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[var(--border)]">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-syne text-lg font-black tracking-tight text-[var(--text)]">
                    Mi protocolo
                  </h2>
                  <AnimatePresence>
                    {count > 0 && (
                      <motion.span
                        key={count}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-black text-black font-syne"
                        style={{ background: 'var(--accent)' }}
                      >
                        {count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-[var(--text-3)] mt-0.5 tracking-wide">
                  Protocolo personalizado
                </p>
              </div>

              <button
                onClick={toggleCart}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--border-accent)] transition-all duration-200 flex-shrink-0 mt-0.5"
                aria-label="Cerrar carrito"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l8 8M9 1L1 9"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3 scrollbar-none">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-5"
                  >
                    {/* Decorative circle */}
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border border-[var(--border-accent)] opacity-30" />
                      <div className="absolute inset-3 rounded-full border border-[var(--border-accent)] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center text-3xl">🧬</div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="font-syne font-bold text-[var(--text)] text-base">
                        Tu protocolo está en blanco
                      </p>
                      <p className="text-sm text-[var(--text-3)] leading-relaxed max-w-[220px]">
                        Combiná hasta 3 packs para una optimización completa.
                      </p>
                    </div>

                    <button
                      onClick={toggleCart}
                      className="mt-1 text-xs font-semibold text-accent underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      Explorar packs →
                    </button>
                  </motion.div>
                ) : (
                  items.map((item, i) => (
                    <motion.div
                      key={item.pack.id}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                      className="group relative flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] transition-all duration-300 hover:border-[rgba(76,186,122,0.2)] cursor-default overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.025)' }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(76,186,122,0.05) 0%, transparent 70%)' }}
                      />

                      {/* Icon */}
                      <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: 'rgba(76,186,122,0.08)', border: '1px solid rgba(76,186,122,0.15)' }}
                      >
                        {item.pack.icon}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-syne font-bold text-sm text-[var(--text)] truncate leading-tight">
                          {item.pack.name}
                        </p>
                        <p className="text-[11px] text-[var(--text-3)] mt-0.5 truncate">
                          {getBenefit(item.pack.id)}
                        </p>
                        <p className="text-accent font-bold text-sm mt-1.5 font-syne">
                          {formatARS(item.pack.price)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.pack.id)}
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[var(--text-3)] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                        aria-label={`Eliminar ${item.pack.name}`}
                      >
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M1 1l8 8M9 1L1 9"/>
                        </svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {/* Incentive block */}
              <AnimatePresence>
                {items.length > 0 && items.length < 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-1 p-4 rounded-2xl flex items-start gap-3"
                    style={{
                      background: 'rgba(76,186,122,0.04)',
                      border: '1px dashed rgba(76,186,122,0.2)',
                    }}
                  >
                    <span className="text-accent mt-0.5 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text)] leading-snug">
                        Maximizá tus resultados
                      </p>
                      <p className="text-[11px] text-[var(--text-3)] mt-0.5 leading-relaxed">
                        Podés combinar {3 - items.length} protocolo{3 - items.length > 1 ? 's' : ''} más. Los efectos se potencian sinérgicamente.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer CTA */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-5 pb-6 pt-4 border-t border-[var(--border)] space-y-4"
              >
                {/* Total */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-[var(--text-3)] uppercase tracking-widest font-semibold">Total</p>
                    <p className="text-[10px] text-[var(--text-3)] mt-0.5">Pago único · Sin suscripción</p>
                  </div>
                  <div className="text-right">
                    <span className="font-syne text-2xl font-black text-[var(--text)]">{formatARS(total)}</span>
                    <p className="text-[10px] text-accent mt-0.5">+ Envío gratis</p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => { window.location.href = '/checkout' }}
                  className="w-full relative overflow-hidden rounded-full py-4 font-syne font-black text-sm text-black transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 8px 32px rgba(76,186,122,0.25)',
                  }}
                >
                  <span className="relative z-10">Activar mi protocolo →</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)' }}
                  />
                </button>

                {/* Trust line */}
                <p className="text-center text-[10px] text-[var(--text-3)] flex items-center justify-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Pago seguro · Garantía 30 días · Envío gratis
                </p>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}