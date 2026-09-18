/**
 * Content provenance — the mechanism that keeps this rebuild honest.
 *
 * Every content record declares where it came from. Nothing is invented: if a
 * fact could not be verified on soilchargertechnology.com it is either
 * `placeholder` (we architected the shape, the client supplies the substance)
 * or `needs-verification` (the old site asserts it, but it should not be
 * repeated until confirmed).
 *
 * Enforcement:
 *  - `<PlaceholderNotice>` renders a visible band in dev / `?audit=1`
 *  - `npm run audit:content` prints every non-verified record as a checklist
 *  - production builds fail on placeholder primary content unless
 *    NEXT_PUBLIC_ALLOW_PLACEHOLDERS is set
 */
export type Provenance =
  /** Taken verbatim (or losslessly edited) from the existing website. */
  | 'verified'
  /** The old site asserts this, but it is doubtful or unsourced. Do not publish as fact. */
  | 'needs-verification'
  /** No source content exists. Shape only — awaiting client input. */
  | 'placeholder'

export interface ContentMeta {
  provenance: Provenance
  /** Where this came from, e.g. 'soilchargertechnology.com/sub-product/88'. */
  source?: string
  /** Why it is flagged, and what the client must supply. */
  note?: string
}

/** Every content record carries provenance. */
export interface WithMeta {
  meta: ContentMeta
}

/**
 * An image. `alt` is REQUIRED and non-empty by construction — the old site had
 * 79 of 94 images with empty or "..." alt text, and this type makes repeating
 * that mistake a compile error.
 */
export interface ContentImage {
  src: string
  alt: string
  width: number
  height: number
  /** Base64 LQIP, generated at build time. */
  blurDataURL?: string
}

/** Localised string. English required; Marathi/Hindi optional until translated. */
export interface LocalisedText {
  en: string
  mr?: string
  hi?: string
}

export type Locale = 'en' | 'mr' | 'hi'

export interface SeoFields {
  title: string
  description: string
  /** Defaults to the page's own hero image when omitted. */
  ogImage?: ContentImage
  noindex?: boolean
}

/** Shared shape for anything that lives at a slug and can be listed. */
export interface ContentEntry extends WithMeta {
  slug: string
  title: string
  excerpt: string
  image?: ContentImage
  seo?: Partial<SeoFields>
  publishedAt?: string
  featured?: boolean
}
