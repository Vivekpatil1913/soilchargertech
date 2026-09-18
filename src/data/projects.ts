import type { Project } from '@/types/project'

/**
 * Case studies.
 *
 * DELIBERATELY EMPTY.
 *
 * The existing website contains no project, no location, no field result and no
 * customer reference of any kind — while simultaneously claiming 1,000,000
 * farmers. That gap is the single biggest credibility problem identified in the
 * Phase 1 audit.
 *
 * Inventing case studies here would be the most damaging possible breach of the
 * brief, so this array stays empty. The `/projects` route, the Project type, the
 * card and detail layouts and the JSON-LD are all built and waiting; the moment
 * the client supplies real field data it drops in here with no code changes.
 *
 * See `npm run audit:content` — this is reported as the top outstanding item.
 */
export const projects: Project[] = []

/** Shown on /projects while the list is empty, instead of a blank page. */
export const projectsPlaceholder = {
  provenance: 'placeholder',
  note: 'No case study data exists on the current website. Required from the client: farm/location, crop, products used, duration, and measured before/after results.',
} as const
