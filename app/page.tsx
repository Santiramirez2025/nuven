import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

// ── Above fold: static for fastest LCP ─────────────────────────────────────
import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeBar } from '@/components/sections/MarqueeBar'

// ── Below fold: lazy loaded ─────────────────────────────────────────────────
const ProblemaSection    = dynamic(() => import('@/components/sections/ProblemaSection').then(m => ({ default: m.ProblemaSection })))
const PacksGrid          = dynamic(() => import('@/components/sections/PacksGrid').then(m => ({ default: m.PacksGrid })))
const DiferencialSection = dynamic(() => import('@/components/sections/DiferencialSection').then(m => ({ default: m.DiferencialSection })))
const TestimoniosSection = dynamic(() => import('@/components/sections/TestimoniosSection').then(m => ({ default: m.TestimoniosSection })))
const ValorSection       = dynamic(() => import('@/components/sections/ValorSection').then(m => ({ default: m.ValorSection })))
const UrgenciaSection    = dynamic(() => import('@/components/sections/UrgenciaSection').then(m => ({ default: m.UrgenciaSection })))
const FAQSection         = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const CTAFinal           = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const DisclaimerSection  = dynamic(() => import('@/components/sections/DisclaimerSection').then(m => ({ default: m.DisclaimerSection })))
const Footer             = dynamic(() => import('@/components/layout/Footer').then(m => ({ default: m.Footer })))
const StickyMobileCTA    = dynamic(() => import('@/components/layout/StickyMobileCTA').then(m => ({ default: m.StickyMobileCTA })))

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
          }),
        }}
      />

      <HeroSection />
      <MarqueeBar />
      <ProblemaSection />
      <PacksGrid />
      <DiferencialSection />
      <TestimoniosSection />
      <ValorSection />
      <UrgenciaSection />
      <FAQSection />
      <CTAFinal />
      <DisclaimerSection />
      <Footer />
      <StickyMobileCTA />
    </>
  )
}
