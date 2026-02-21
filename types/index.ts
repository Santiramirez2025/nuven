// ─── PACK ────────────────────────────────────────────────────────────────────
export interface PackIngredient {
  name: string
  dose: string
  role: string
}

export interface Pack {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  benefitMain: string
  benefits: string[]
  audience: string
  ingredients: PackIngredient[]
  price: number          // ARS cents — evitar floats
  featured?: boolean
  icon: string
  colorVar: string       // CSS custom property value for glow
  order: number
}

// ─── CART ────────────────────────────────────────────────────────────────────
export interface CartItem {
  pack: Pack
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (pack: Pack) => void
  removeItem: (packId: string) => void
  updateQuantity: (packId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  totalItems: () => number
  totalPrice: () => number
  canAddMore: () => boolean
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────
export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  country: 'AR'
  acceptsTerms: boolean
}

export interface OrderSummary {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  currency: 'ARS'
}

// ─── TESTIMONIAL ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role: string
  initials: string
  text: string
  rating: number
  packUsed?: string
  location?: string
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: 'legal' | 'product' | 'shipping' | 'general'
}

// ─── SEO ─────────────────────────────────────────────────────────────────────
export interface PageSEO {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image?: string
  }
}
