import type { ContentMeta } from './content'

/** One of the four pillars. Each is a "do X, not Y" contrast. */
export interface Pillar {
  index: number
  /** The thing to work on — "Nourishment". */
  focus: string
  /** The thing not to work on — "Disease". */
  against: string
  /** The full line as published: "Work on nourishment not on disease." */
  statement: string
  meta: ContentMeta
}

export interface Principle {
  index: number
  /** "Method" | "Rule" | "Meditation" */
  name: string
  /** The plain-language label the site gives it: "Follow Nutrition". */
  label: string
  rules: string[]
  meta: ContentMeta
}

export interface TimelineEntry {
  /** Year or period as published; some steps carry no date. */
  period?: string
  title: string
  description: string
  meta: ContentMeta
}

export interface Statistic {
  label: string
  value: number
  /** Rendered after the formatted number, e.g. "+". */
  suffix?: string
  meta: ContentMeta
}

export interface Testimonial {
  quote: string
  author: string
  location?: string
  language: 'en' | 'mr' | 'hi'
  meta: ContentMeta
}
