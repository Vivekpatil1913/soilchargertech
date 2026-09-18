import type { ContentImage, ContentMeta, Locale, SeoFields } from './content'

export interface Article {
  slug: string
  /** Numeric id from the legacy `/sub-blogs?id={id}` route. Drives the 301 map. */
  legacyId: number
  title: string
  /**
   * True when the slug could not be derived from the title — Devanagari titles
   * strip to nothing under ASCII slugification. These need a human-supplied
   * slug before launch; machine-translating them would be inventing content.
   */
  slugNeedsReview: boolean
  language: Locale
  author?: string
  excerpt: string
  /** Body paragraphs, already stripped of the CMS's inline styling. */
  paragraphs: string[]
  image?: ContentImage
  /**
   * The legacy CMS stores no publish date on any of the 21 posts, so ordering
   * falls back to legacy id. Undefined until the client supplies real dates.
   */
  publishedAt?: string
  featured: boolean
  seo?: Partial<SeoFields>
  meta: ContentMeta
}
