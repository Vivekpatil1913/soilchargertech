import type { ContentImage, ContentMeta, SeoFields } from './content'

/**
 * Case studies. NOTHING on the existing website supports this type — there is
 * not a single project, location or field result anywhere on it.
 *
 * The shape ships so the pages, routing, schema and UI are ready the moment the
 * client supplies real data. Every record is `placeholder` until then.
 */
export interface ProjectResult {
  label: string
  value: string
  unit?: string
  meta: ContentMeta
}

export interface Project {
  slug: string
  title: string
  /** e.g. "Nashik, Maharashtra" */
  location?: string
  /** Crop or context, e.g. "Grapes". */
  application?: string
  /** Products used on this project, by slug. */
  productSlugs: string[]
  excerpt: string
  summary: string[]
  results: ProjectResult[]
  image?: ContentImage
  featured: boolean
  seo?: Partial<SeoFields>
  meta: ContentMeta
}
