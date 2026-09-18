import { applications } from '@/data/applications'
import { articles } from '@/data/articles'
import {
  benefits,
  founderPortrait,
  founderStatement,
  mission,
  team,
  teamMeta,
  vision,
} from '@/data/company'
import { faq, unansweredQuestions } from '@/data/faq'
import { aboutImages, galleryImages, galleryMeta } from '@/data/gallery'
import { products, productLines } from '@/data/products'
import { projects, projectsPlaceholder } from '@/data/projects'
import { statistics, testimonials } from '@/data/statistics'
import { knowledgeLoop, pillars, principles, timeline } from '@/data/technology'
import type { ContentRepository } from '../repository'

/**
 * Local adapter — reads the typed data generated from the legacy site.
 *
 * Everything is synchronous underneath but the interface is async throughout,
 * so swapping in a network-backed CMS adapter later changes no call sites.
 */
export function createLocalRepository(): ContentRepository {
  const bySlug = <T extends { slug: string }>(items: T[], slug: string) =>
    items.find((item) => item.slug === slug) ?? null

  return {
    async getProducts() {
      return products
    },
    async getProduct(slug) {
      return bySlug(products, slug)
    },
    async getProductsByLine(line) {
      return products.filter((product) => product.line === line)
    },
    async getProductLines() {
      return productLines
    },
    async getProductSlugByLegacyId(legacyId) {
      return products.find((product) => product.legacyId === legacyId)?.slug ?? null
    },

    async getArticles() {
      // No publish date exists in the legacy CMS, so ordering falls back to the
      // legacy id (roughly chronological) until real dates are supplied.
      return [...articles].sort((a, b) => b.legacyId - a.legacyId)
    },
    async getArticle(slug) {
      return bySlug(articles, slug)
    },
    async getArticleSlugByLegacyId(legacyId) {
      return articles.find((article) => article.legacyId === legacyId)?.slug ?? null
    },

    async getApplications() {
      return applications
    },
    async getApplication(slug) {
      return bySlug(applications, slug)
    },

    async getProjects() {
      return projects
    },
    async getProject(slug) {
      return bySlug(projects, slug)
    },
    async getProjectsPlaceholder() {
      return projectsPlaceholder
    },

    async getTechnology() {
      return { pillars, principles, timeline, knowledgeLoop }
    },
    async getCompany() {
      return { founderStatement, vision, mission, team, teamMeta, benefits, founderPortrait }
    },
    async getStatistics() {
      return statistics
    },
    async getTestimonials() {
      return testimonials
    },

    async getGallery() {
      return { images: galleryImages, meta: galleryMeta }
    },
    async getAboutImages() {
      return aboutImages
    },

    async getFaq() {
      return faq
    },
    async getUnansweredQuestions() {
      return unansweredQuestions
    },
  }
}
