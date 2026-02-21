'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { formatARS } from '@/data/packs'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { isOpen, items, totalPrice, totalItems, removeItem, toggleCart } = useCart()
  const total = totalPrice()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--bg-3)] border-l border-[var(--border)] z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="font-syne text-xl font-bold">
                Mi protocolo
                {totalItems() > 0 && (
                  <span className="ml-2 bg-accent text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems()}
                  </span>
                )}
              </h2>
              <button
                onClick={toggleCart}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
                aria-label="Cerrar carrito"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">🧬</p>
                  <p className="text-[var(--text-2)]">Tu protocolo está vacío.</p>
                  <p className="text-sm text-[var(--text-3)] mt-2">Agregá hasta 3 packs.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.pack.id}
                    className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)]"
                  >
                    <span className="text-3xl flex-shrink-0">{item.pack.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-syne font-bold text-sm truncate">{item.pack.name}</p>
                      <p className="text-xs text-[var(--text-3)] mt-0.5">Compra única</p>
                      <p className="text-accent font-bold text-sm mt-1">
                        {formatARS(item.pack.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.pack.id)}
                      className="text-[var(--text-3)] hover:text-red-400 transition-colors text-sm flex-shrink-0"
                      aria-label={`Eliminar ${item.pack.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}

              {items.length > 0 && items.length < 3 && (
                <div className="p-3 bg-[var(--surface)] rounded-xl border border-dashed border-[var(--border-accent)] text-center">
                  <p className="text-xs text-[var(--text-3)]">
                    Podés agregar {3 - items.length} pack{3 - items.length > 1 ? 's' : ''} más
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--border)] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-2)]">Total</span>
                  <span className="font-syne text-2xl font-black">{formatARS(total)}</span>
                </div>

                <Button size="lg" className="w-full" asChild>
                  <a href="/checkout">
                    Confirmar protocolo →
                  </a>
                </Button>

                <p className="text-center text-xs text-[var(--text-3)]">
                  Garantía 30 días · Pago único · Envío gratis
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}