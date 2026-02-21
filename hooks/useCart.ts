import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartState, Pack } from '@/types'
import { PACK_COMBINATIONS } from '@/data/packs'

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (pack: Pack) => {
        const { items, canAddMore } = get()

        // Si ya está, incrementar quantity
        const existingItem = items.find((i) => i.pack.id === pack.id)
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.pack.id === pack.id
                ? { ...i, quantity: Math.min(i.quantity + 1, 3) }
                : i
            ),
            isOpen: true,
          })
          return
        }

        if (!canAddMore()) return

        set({
          items: [...items, { pack, quantity: 1 }],
          isOpen: true,
        })
      },

      removeItem: (packId: string) => {
        set({ items: get().items.filter((i) => i.pack.id !== packId) })
      },

      updateQuantity: (packId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(packId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.pack.id === packId ? { ...i, quantity: Math.min(quantity, 3) } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalItems: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.pack.price * i.quantity, 0),

      canAddMore: () =>
        get().items.length < PACK_COMBINATIONS.maxPacks,
    }),
    {
      name: 'nuven-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)