import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

// ── Above fold: estático, LCP crítico ──────────────────────────────────────
import { HeroSection }    from '@/components/sections/HeroSection'
import { SocialProofBar } from '@/components/sections/SocialProofBar'
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA'

// ── Skeletons ───────────────────────────────────────────────────────────────
import { SectionSkeleton } from '@/components/ui/SectionSkeleton'

// ── Below fold: lazy con skeletons ──────────────────────────────────────────
const ProblemaSection    = dynamic(() => import('@/components/sections/ProblemaSection').then(m => ({ default: m.ProblemaSection })), { loading: () => <SectionSkeleton height={500} /> })
const DiferencialSection = dynamic(() => import('@/components/sections/DiferencialSection').then(m => ({ default: m.DiferencialSection })), { loading: () => <SectionSkeleton height={400} /> })
const ResultsSection     = dynamic(() => import('@/components/sections/ResultsSection').then(m => ({ default: m.ResultsSection })), { loading: () => <SectionSkeleton height={360} /> })
const TestimoniosSection = dynamic(() => import('@/components/sections/TestimoniosSection').then(m => ({ default: m.TestimoniosSection })), { loading: () => <SectionSkeleton height={480} /> })
const PacksGrid          = dynamic(() => import('@/components/sections/PacksGrid').then(m => ({ default: m.PacksGrid })), { loading: () => <SectionSkeleton height={600} /> })
const ValorSection       = dynamic(() => import('@/components/sections/ValorSection').then(m => ({ default: m.ValorSection })), { loading: () => <SectionSkeleton height={320} /> })
const UrgenciaSection    = dynamic(() => import('@/components/sections/UrgenciaSection').then(m => ({ default: m.UrgenciaSection })), { loading: () => <SectionSkeleton height={280} /> })
const FAQSection         = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })), { loading: () => <SectionSkeleton height={440} /> })
const CTAFinal           = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })), { loading: () => <SectionSkeleton height={300} /> })
const MarqueeBar         = dynamic(() => import('@/components/sections/MarqueeBar').then(m => ({ default: m.MarqueeBar })), { loading: () => <SectionSkeleton height={48} /> })
const Footer             = dynamic(() => import('@/components/layout/Footer').then(m => ({ default: m.Footer })), { loading: () => <SectionSkeleton height={200} /> })

// ── Schemas ─────────────────────────────────────────────────────────────────
const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    brand: { '@type': 'Brand', name: siteConfig.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '847',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
]

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: `${siteConfig.url}/og.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
  },
  alternates: { canonical: siteConfig.url },
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* Multi-schema SEO */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ABOVE FOLD — estático */}
      <HeroSection />
      <SocialProofBar />

      {/* BELOW FOLD — lazy, narrativa optimizada para conversión */}
      <MarqueeBar />
      <ProblemaSection />
      <DiferencialSection />
      <ResultsSection />
      <TestimoniosSection />
      <PacksGrid />
      <ValorSection />
      <UrgenciaSection />
      <FAQSection />
      <CTAFinal />
      <Footer />

      {/* UI persistente — estático, sin lazy */}
      <StickyMobileCTA />
    </>
  )
}