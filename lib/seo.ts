export const siteConfig = {
  name: 'NUVEN',
  tagline: 'Optimización humana desde adentro',
  description:
    'Suplementación de precisión para hombres que no aceptan el desgaste como algo inevitable. 6 packs científicos para longevidad, energía, cerebro, físico, hormonas y bienestar.',
  url: 'https://nuven.com.ar',
  ogImage: 'https://nuven.com.ar/og-image.jpg',
  twitter: '@nuvenok',
  locale: 'es_AR',
}

export function buildPageTitle(title?: string): string {
  if (!title) return `${siteConfig.name} — ${siteConfig.tagline}`
  return `${title} | ${siteConfig.name}`
}

export const defaultOpenGraph = {
  type: 'website',
  locale: siteConfig.locale,
  url: siteConfig.url,
  siteName: siteConfig.name,
  images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    },
  ],
}

/** JSON-LD for Organization */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
    email: 'hola@nuven.com.ar',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
  },
}

/** JSON-LD for a Product */
export function productSchema(pack: {
  name: string
  description: string
  price: number
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `NUVEN ${pack.name}`,
    description: pack.description,
    brand: { '@type': 'Brand', name: 'NUVEN' },
    offers: {
      '@type': 'Offer',
      price: (pack.price / 100).toString(),
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/packs/${pack.slug}`,
    },
  }
}
