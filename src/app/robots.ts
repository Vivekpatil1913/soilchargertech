import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

/**
 * robots.txt.
 *
 * The legacy site served a zero-byte robots.txt and no sitemap at all.
 *
 * `/dev/` holds the design-system reference and `/api/` is route handlers —
 * neither belongs in an index.
 *
 * The legacy paths (`/sub-product/…`, `/sub-blogs`) are deliberately NOT
 * disallowed. Blocking a redirecting URL stops crawlers from ever fetching it,
 * which means they never see the 301 and no link equity transfers. Old URLs
 * must stay crawlable for exactly as long as anything still links to them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dev/', '/api/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  }
}
