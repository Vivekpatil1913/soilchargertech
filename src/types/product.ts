import type { ContentImage, ContentMeta, SeoFields } from './content'

/**
 * The two product lines the existing site organises its catalogue into.
 * "Super" is the original range; "Vedic" is the later SCT Vedic range.
 */
export type ProductLine = 'super' | 'vedic'

export interface ProductLineInfo {
  id: ProductLine
  name: string
  description: string
  meta: ContentMeta
}

/**
 * A technical specification row.
 *
 * Only `ratio` and `packing` are verifiable from the existing product pages.
 * Rows such as NPK, pH, EC, CFU count and shelf life are architected here but
 * ship as `placeholder` until the client supplies them — the brief was explicit
 * that specifications must not be invented.
 */
export interface ProductSpec {
  label: string
  value: string
  /** Rendered at reduced emphasis after the value, e.g. "L/acre". */
  unit?: string
  meta: ContentMeta
}

export interface Product {
  slug: string
  /** Numeric id from the legacy `/sub-product/{id}` route. Drives the 301 map. */
  legacyId: number
  name: string
  line: ProductLine
  /** One-sentence summary used on cards and as the meta description fallback. */
  shortDescription: string
  /** Numbered "Functions of …" list from the legacy page. May be empty. */
  functions: string[]
  /** Dosage, e.g. "Orchards 3 to 5 liters per acre". */
  ratio?: string
  /** Pack sizes, e.g. "2 liter, 5 liter, 20 liter". */
  packing?: string
  specifications: ProductSpec[]
  image?: ContentImage
  /** Crops/contexts this product applies to. Empty until verified. */
  applications: string[]
  featured: boolean
  seo?: Partial<SeoFields>
  meta: ContentMeta
}

/** A product whose legacy page carried no usable copy at all. */
export function isEmptyProduct(product: Product): boolean {
  return (
    !product.shortDescription &&
    product.functions.length === 0 &&
    !product.ratio &&
    !product.packing
  )
}
