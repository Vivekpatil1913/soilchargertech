import { site } from '@/config/site'
import type { Article } from '@/types/article'
import type { Product } from '@/types/product'

const abs = (path: string) => new URL(path, site.url).toString()

/**
 * Organization + LocalBusiness.
 *
 * `legalName` is deliberately omitted: the legacy footer says "Soil Charger
 * Technologies INC" while the rest of the site says "Soil Charger Technology",
 * and asserting the wrong registered name in structured data is worse than
 * asserting none. `sameAs` lists only the three confirmed profiles — the
 * legacy LinkedIn href was a generic ad-tracking URL.
 */
export function organizationJsonLd() {
  const { address, contacts } = site

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    foundingDate: String(site.foundedYear),
    founder: { '@type': 'Person', name: site.founder.name },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street}, ${address.locality}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    contactPoint: Object.values(contacts)
      .filter((contact) => contact.phone)
      .map((contact) => ({
        '@type': 'ContactPoint',
        contactType: contact.label,
        email: contact.email,
        telephone: contact.phone,
        areaServed: 'IN',
        availableLanguage: ['en', 'mr', 'hi'],
      })),
    sameAs: [site.social.youtube, site.social.facebook, site.social.instagram].filter(Boolean),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-IN',
  }
}

/**
 * Product schema.
 *
 * `offers` and `aggregateRating` are intentionally absent. No price, currency,
 * availability or rating data exists anywhere on the legacy site, and inventing
 * them would be both a Google structured-data violation and a lie. Google will
 * simply show a product result without a price rather than a rich snippet — the
 * correct trade.
 */
export function productJsonLd(product: Product) {
  // Second line of defence. The content generator already strips claim-bearing
  // sentences, but structured data is machine-consumed as fact, so a record
  // that is not fully verified never contributes a description here regardless.
  const describable = product.meta.provenance === 'verified' && product.shortDescription

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': abs(`/products/${product.slug}/#product`),
    name: product.name,
    url: abs(`/products/${product.slug}`),
    ...(describable ? { description: product.shortDescription } : {}),
    ...(product.image ? { image: abs(product.image.src) } : {}),
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': `${site.url}/#organization` },
    category: product.line === 'vedic' ? 'SCT Vedic' : 'Super',
    ...(product.packing
      ? {
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Pack sizes', value: product.packing },
            ...(product.ratio
              ? [{ '@type': 'PropertyValue', name: 'Application rate', value: product.ratio }]
              : []),
          ],
        }
      : {}),
  }
}

export function articleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': abs(`/resources/articles/${article.slug}/#article`),
    headline: article.title,
    url: abs(`/resources/articles/${article.slug}`),
    ...(article.excerpt ? { description: article.excerpt } : {}),
    inLanguage: article.language === 'mr' ? 'mr-IN' : 'en-IN',
    // `datePublished` is omitted: the legacy CMS stores no dates. Asserting a
    // fabricated one would misrepresent the content's age.
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
  }
}

/** Renders a JSON-LD block. Server-only — never pass user input here. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
