import type { MetadataRoute } from 'next'
import { content } from '@/lib/content/repository'
import { site } from '@/config/site'

/**
 * Sitemap.
 *
 * The legacy site had none — /sitemap.xml returned 404 and robots.txt was a
 * zero-byte file.
 *
 * Only indexable routes appear here. Pages that are architecturally complete
 * but have no content behind them yet (case studies, gallery, certifications,
 * brochures, open roles, legal) are marked `noindex` in their own metadata and
 * are deliberately excluded — listing empty pages in a sitemap invites Google
 * to crawl and devalue them.
 */
const url = (path: string) => new URL(path, site.url).toString()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles, applications] = await Promise.all([
    content.getProducts(),
    content.getArticles(),
    content.getApplications(),
  ])

  const lastModified = new Date()

  const staticRoutes: Array<{
    path: string
    priority: number
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
  }> = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/technology', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/technology/how-it-works', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/technology/advantages', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/applications', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about/leadership', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/resources', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/resources/articles', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/resources/videos', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/resources/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/distributorship', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: url(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    ...products.map((product) => ({
      url: url(`/products/${product.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...articles.map((article) => ({
      url: url(`/resources/articles/${article.slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),

    // Only applications with real content — the placeholder ones are noindex.
    ...applications
      .filter((application) => application.meta.provenance !== 'placeholder')
      .map((application) => ({
        url: url(`/applications/${application.slug}`),
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
  ]
}
