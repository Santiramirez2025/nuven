# NUVEN — Arquitectura Técnica & Roadmap

## Stack Final

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Framework | Next.js 14 (App Router) | RSC = menos JS al cliente, SEO nativo, streaming |
| Lenguaje | TypeScript strict | Elimina bugs en runtime, autocomplete en data |
| Estilos | Tailwind CSS + CSS Custom Properties | Tailwind para utility classes, CSS vars para design tokens compartidos entre CSS y JS |
| Animaciones | Framer Motion | API declarativa, AnimatePresence para cart drawer, viewport-triggered anims |
| Estado global | Zustand + persist middleware | Más liviano que Redux, persistencia localStorage nativa, sin boilerplate |
| Pagos | MercadoPago SDK | Único procesador relevante en AR; preparado para Stripe en expansión internacional |
| Deploy | Vercel | Zero-config Next.js, Edge Network, región `gru1` (São Paulo) para latencia AR |
| Analytics | Vercel Analytics + GA4 + Meta Pixel | Analytics sin cookies de Vercel, conversiones en GA4/Meta |
| Fonts | next/font (Google Fonts) | Zero layout shift, self-hosted automático, subset optimizado |

---

## Estructura de Carpetas

```
nuven/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fuentes, metadata global, cart drawer
│   ├── page.tsx                  # Landing page (secciones lazy-loaded)
│   ├── sitemap.ts                # Sitemap dinámico
│   ├── robots.ts                 # Robots.txt
│   ├── api/
│   │   ├── checkout/route.ts     # POST → crea preferencia MercadoPago
│   │   └── webhooks/
│   │       └── mercadopago/route.ts  # IPN handler
│   ├── packs/[slug]/             # (futuro) Páginas individuales de pack
│   ├── checkout/                 # (futuro) Flow checkout
│   ├── blog/                     # (futuro) Blog educativo
│   └── legal/                    # Términos, privacidad, ANMAT
│
├── components/
│   ├── ui/                       # Átomos reutilizables
│   │   ├── Button.tsx            # Variantes: primary/secondary/ghost/outline
│   │   ├── Badge.tsx             # Variantes: default/accent/gold
│   │   ├── SectionLabel.tsx      # Label con línea decorativa
│   │   └── Reveal.tsx            # Wrapper con intersection observer
│   │
│   ├── sections/                 # Secciones de landing (server o client según necesidad)
│   │   ├── HeroSection.tsx       # Above the fold — client (animaciones Framer)
│   │   ├── MarqueeBar.tsx        # Server component
│   │   ├── ProblemaSection.tsx   # Client (reveal animations)
│   │   ├── PacksGrid.tsx         # Client (cart interaction)
│   │   ├── PackCard.tsx          # Client (cart + hover)
│   │   ├── DiferencialSection.tsx
│   │   ├── TestimoniosSection.tsx
│   │   ├── ValorSection.tsx
│   │   ├── UrgenciaSection.tsx
│   │   ├── FAQSection.tsx        # Client (accordion state)
│   │   ├── CTAFinal.tsx
│   │   └── DisclaimerSection.tsx # Server (texto estático)
│   │
│   └── layout/
│       ├── Navbar.tsx            # Client (scroll state + cart toggle)
│       ├── CartDrawer.tsx        # Client (Zustand + AnimatePresence)
│       ├── Footer.tsx            # Server component
│       └── StickyMobileCTA.tsx   # Client (cart state)
│
├── data/
│   ├── packs.ts                  # Source of truth: 6 packs tipados
│   ├── testimonials.ts           # Testimonios
│   └── faq.ts                    # FAQ items
│
├── hooks/
│   ├── useCart.ts                # Zustand store con persist
│   └── useIntersection.ts        # IntersectionObserver hook
│
├── lib/
│   ├── utils.ts                  # cn(), formatARS(), helpers
│   ├── mercadopago.ts            # MP API client + webhook verify
│   └── seo.ts                    # Site config, schemas JSON-LD
│
├── styles/
│   └── globals.css               # Design tokens CSS vars, base styles, utilities
│
├── types/
│   └── index.ts                  # Pack, CartItem, CartState, FAQ, Testimonial...
│
├── public/
│   ├── og-image.jpg              # 1200x630 para OpenGraph
│   ├── favicon.ico
│   └── images/
│
├── vercel.json                   # Cache headers, región gru1
├── next.config.mjs               # Image optimization, security headers
├── tailwind.config.ts            # Design tokens en Tailwind
├── tsconfig.json                 # Strict mode, path aliases
└── .env.example                  # Variables de entorno documentadas
```

---

## Arquitectura de Carrito (Zustand)

```typescript
// Estado
interface CartState {
  items: CartItem[]          // máx 3 packs distintos
  isOpen: boolean            // controla CartDrawer

  // Actions
  addItem(pack, isSubscription?)   // valida límite 3 packs
  removeItem(packId)
  updateQuantity(packId, qty)
  clearCart()
  toggleCart()

  // Computed
  totalItems()               // suma quantities
  totalPrice()               // respeta modo sub vs compra única
  canAddMore()               // items.length < 3
}
```

**Persistencia:** `zustand/middleware/persist` con `localStorage`. Solo persiste `items`, no estado UI.

**Regla de negocio:** máximo 3 packs distintos por orden (validado en cliente y en API).

---

## Flujo de Checkout con MercadoPago

```
Usuario confirma → POST /api/checkout
  ↓
createPreference(items) → MP API
  ↓
Retorna { preferenceId, initPoint }
  ↓
Redirect a initPoint (MP hosted checkout)
  ↓
MP procesa pago → Webhook POST /api/webhooks/mercadopago
  ↓
handlePayment → actualiza DB → email confirmación → fulfillment
  ↓
MP redirect back_url → /checkout/success
```

---

## Performance: Objetivo Lighthouse 95+

| Técnica | Implementación |
|---------|---------------|
| RSC por defecto | Server components = 0 JS al cliente |
| Dynamic imports | Todas las secciones below-fold con `dynamic()` |
| Font optimization | `next/font` self-hosted, `display: swap`, `preload: true` |
| Image optimization | `next/image` con AVIF + WebP, lazy loading nativo |
| CSS optimization | Tailwind purge, CSS vars para tokens, no runtime CSS-in-JS |
| Animations | Framer Motion solo en componentes client, no en SSR |
| Scroll animations | IntersectionObserver nativo, sin resize listeners |
| Bundle analysis | `@next/bundle-analyzer` para detectar bloat |
| Edge cache | Vercel CDN + `Cache-Control: immutable` en assets estáticos |

---

## SEO Profesional

- **Metadata dinámica:** `generateMetadata()` por page
- **OpenGraph + Twitter Cards:** configurados en `layout.tsx` y por page
- **JSON-LD:** Organization en root layout, Product en pages de pack
- **Sitemap dinámico:** `/sitemap.ts` genera URLs desde `PACKS` array
- **Robots:** `/robots.ts` — bloquea `/api/` y `/checkout/`
- **Canonical:** `alternates.canonical` en metadata
- **Keywords locales:** "suplementos Argentina", "ANMAT", "biohacking Argentina"

---

## Design System: Tokens

```css
/* Color */
--bg, --bg-2, --bg-3         /* Dark backgrounds */
--surface, --surface-2        /* Cards, panels */
--border, --border-accent     /* 7% white, 15% green */
--text, --text-2, --text-3   /* Hierarchy */
--accent, --accent-2, --accent-3  /* Green scale */
--gold                        /* Premium accent */

/* Spacing: --space-{1|2|3|4|5|6|8|10|12|16|20|24|32} */
/* Radius: --radius-sm, --radius, --radius-lg, --radius-full */
/* Shadows: --shadow-card, --shadow-glow */
```

**Tipografía:**
- **Display/Headings:** Syne 700/800 — agresivo, moderno, científico
- **Body:** DM Sans 300/400/500 — limpio, legible, neutral

---

## Seguridad & Legal Argentina

**Headers de seguridad** (configurados en `next.config.mjs`):
- `X-Frame-Options: DENY` — previene clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — desactiva cámara/micro/geo

**Cumplimiento ANMAT:**
- Disclaimer legal completo en `DisclaimerSection.tsx`
- Sin claims médicos (curar, tratar, prevenir enfermedades)
- Claims funcionales dentro del CAA Capítulo V
- RNPA y RNE referenciados en footer
- Aviso legal en checkout page

**Páginas legales a crear en `/legal/`:**
- `terminos` — Términos y condiciones + ley 24.240 (defensa consumidor)
- `privacidad` — Ley 25.326 (protección datos personales)
- `devoluciones` — Política 30 días + proceso
- `anmat` — Números RNPA por producto

---

## Roadmap Técnico 90 días

### Sprint 1 (Días 1–15): Base
- [ ] `npm install` y verificar build
- [ ] Variables de entorno en Vercel (MP_ACCESS_TOKEN, etc.)
- [ ] Deploy initial a Vercel con dominio nuven.com.ar
- [ ] Completar componentes faltantes: `ProblemaSection`, `TestimoniosSection`, `ValorSection`, `UrgenciaSection`, `CTAFinal`
- [ ] Imágenes OG, favicon, product shots
- [ ] Integrar `react-hot-toast` en addItem del carrito

### Sprint 2 (Días 16–30): Checkout real
- [ ] Crear cuenta MercadoPago Business
- [ ] Conectar `/api/checkout` con credenciales reales
- [ ] Página `/checkout` con formulario + summary
- [ ] Páginas de resultado: `/checkout/success`, `/checkout/failure`
- [ ] Webhook IPN → actualización de orden
- [ ] Email de confirmación (Resend o SendGrid)

### Sprint 3 (Días 31–45): Conversion optimization
- [ ] GA4 con events: `add_to_cart`, `begin_checkout`, `purchase`
- [ ] Meta Pixel con eventos de conversión
- [ ] A/B test en headline hero (Vercel Edge Config)
- [ ] Heatmaps (Hotjar o Microsoft Clarity — gratis)
- [ ] Mobile UX review con usuarios reales

### Sprint 4 (Días 46–60): Content & SEO
- [ ] Blog: estructura con MDX o Sanity CMS
- [ ] 4 artículos educativos con keywords long-tail
- [ ] Páginas individuales de pack `/packs/[slug]`
- [ ] Reviews/ratings con schema markup
- [ ] Internal linking strategy

### Sprint 5 (Días 61–75): Suscripciones
- [ ] MP Subscriptions API para cobro recurrente
- [ ] Dashboard de usuario con historial de pedidos
- [ ] Gestión de suscripción (pausar, cancelar)
- [ ] Email flow: onboarding → día 7 → día 30

### Sprint 6 (Días 76–90): Scale prep
- [ ] Performance audit: Lighthouse CI en CI/CD
- [ ] Database: Supabase o PlanetScale para órdenes/usuarios
- [ ] Inventory management básico
- [ ] Affiliate/referral system básico
- [ ] Internacionalización estructura (next-intl) para Uruguay/Chile

---

## Para escalar a USD 100k/mes

**Revenue math:** 100k USD ÷ ~25 USD promedio por pack = 4.000 transacciones/mes.
Con ticket promedio de 2 packs = ~2.000 clientes activos.
Con churn mensual 15% → necesitás +300 nuevos/mes mínimo.

**Palancas técnicas:**
1. **Suscripción como default** — LTV 6x vs compra única. Hacer el toggle suscripción visualmente prominente.
2. **Post-purchase upsell** — En `/checkout/success`: "Completá tu stack con Pack Cerebro".
3. **Bundle pricing** — Stack de 3 packs con 20% descuento vs individuales.
4. **Referral program** — `/ref/[code]` con tracking de conversión.
5. **Email automation** — Abandono de carrito (1h, 24h, 72h). Tasa recuperación ~15%.
6. **Landing pages por keyword** — `/longevidad-suplementos`, `/nootripicos-argentina`, etc.
7. **Performance:** cada 100ms de latencia = -1% conversión en mobile. Mantener LCP < 1.8s.
8. **WhatsApp Business API** — En AR, WhatsApp tiene >90% de penetración. Integrar para soporte y recuperación.

**Stack adicional para escala:**
- Base de datos: Supabase (PostgreSQL) para órdenes, usuarios, subscripciones
- CMS: Sanity para blog y contenido de packs sin deploys
- Email: Resend + React Email para transaccionales
- Soporte: Intercom o Crisp
- Fulfillment: integración con OCA API para tracking automático
