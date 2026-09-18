import type { ContentImage, ContentMeta, SeoFields } from './content'

/**
 * Applications — the crop or context a product is used in.
 *
 * The existing site verifies only a handful of contexts, and only in passing
 * inside dosage strings ("Orchards 3 to 5 liters per acre", "Vegetable 1 to 3
 * liters per acre", "5 to 7 ml for grapes"). Everything broader that the brief
 * asked for — Water, Environmental, Industrial — has no source content and
 * ships as a flagged placeholder.
 */
export interface Application {
  slug: string
  name: string
  excerpt: string
  description: string[]
  /** Products applicable to this context, by slug. */
  productSlugs: string[]
  image?: ContentImage
  featured: boolean
  seo?: Partial<SeoFields>
  meta: ContentMeta
}
