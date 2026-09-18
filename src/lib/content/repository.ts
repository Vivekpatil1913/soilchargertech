import type { Application, Article, ContentMeta, Product, ProductLineInfo, Project } from '@/types'
import type { Pillar, Principle, Statistic, Testimonial, TimelineEntry } from '@/types/technology'
import type { FaqEntry } from '@/data/faq'
import type { ContentImage } from '@/types/content'
import { createLocalRepository } from './adapters/local'

/** Grouped so a CMS adapter can fetch each bundle in one query. */
export interface TechnologyContent {
  pillars: Pillar[]
  principles: Principle[]
  timeline: TimelineEntry[]
  knowledgeLoop: ReadonlyArray<{ channel: string; role: string; description: string }>
}

export interface CompanyContent {
  founderStatement: { intro: string; paragraphs: string[]; meta: ContentMeta }
  vision: { points: string[]; meta: ContentMeta }
  mission: { points: string[]; meta: ContentMeta }
  team: ReadonlyArray<{ name: string; role: string }>
  teamMeta: ContentMeta
  founderPortrait: ContentImage
  benefits: Array<{ title: string; description: string; meta: ContentMeta }>
}

/**
 * The CMS seam.
 *
 * No component imports from `@/data` — an ESLint rule enforces it. Everything
 * reads through this interface, so moving to Sanity, Payload or Strapi means
 * writing one new adapter and changing the single line at the bottom of this
 * file. Zero component changes.
 */
export interface ContentRepository {
  getProducts(): Promise<Product[]>
  getProduct(slug: string): Promise<Product | null>
  getProductsByLine(line: ProductLineInfo['id']): Promise<Product[]>
  getProductLines(): Promise<ProductLineInfo[]>
  /** Resolve a legacy `/sub-product/{id}` route to its new slug, for 301s. */
  getProductSlugByLegacyId(legacyId: number): Promise<string | null>

  getArticles(): Promise<Article[]>
  getArticle(slug: string): Promise<Article | null>
  getArticleSlugByLegacyId(legacyId: number): Promise<string | null>

  getApplications(): Promise<Application[]>
  getApplication(slug: string): Promise<Application | null>

  getProjects(): Promise<Project[]>
  getProject(slug: string): Promise<Project | null>
  /** Shown in place of an empty case-study list. */
  getProjectsPlaceholder(): Promise<ContentMeta>

  getTechnology(): Promise<TechnologyContent>
  getCompany(): Promise<CompanyContent>
  getStatistics(): Promise<Statistic[]>
  getTestimonials(): Promise<Testimonial[]>

  getGallery(): Promise<{ images: ContentImage[]; meta: ContentMeta }>
  getAboutImages(): Promise<ContentImage[]>

  getFaq(): Promise<FaqEntry[]>
  getUnansweredQuestions(): Promise<ContentMeta & { questions: string[] }>
}

export const content: ContentRepository = createLocalRepository()
