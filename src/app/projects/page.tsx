import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Field results from farms using Soil Charger Technology.',
  alternates: { canonical: '/projects' },
  // No case study data exists yet; indexing an empty listing helps nobody.
  robots: { index: false, follow: true },
}

/**
 * Case studies.
 *
 * The single biggest credibility gap identified in the Phase 1 audit: the
 * current site claims a million farmers and publishes not one project,
 * location or measured result. This page, the card, the detail layout and the
 * schema are all built — the data is the only thing missing.
 */
export default async function ProjectsPage() {
  const projects = await content.getProjects()
  const placeholder = await content.getProjectsPlaceholder()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Case Studies' }]}
        eyebrow="Case studies"
        title={projects.length > 0 ? 'Results from the field.' : 'Awaiting field data.'}
        description={
          projects.length > 0
            ? 'Farms, crops, products used and measured outcomes.'
            : 'This section is built and ready. It needs real field data before it can be published.'
        }
      />

      <Section rhythm="default">
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <>
            <SectionHeading
              index={1}
              eyebrow="What is needed"
              title="A case study needs six things"
              description="Supply these for two or three farms and this section becomes the strongest page on the site."
            />

            <ol className="border-hairline mt-12 max-w-3xl border-t">
              {[
                'Farm name and location (district and state is enough)',
                'Crop, area under cultivation, and the season covered',
                'Which SCT products were used, at what rate, over what period',
                'The starting condition — soil test, organic carbon, yield history',
                'The measured outcome — soil test, organic carbon, yield, quality',
                'Permission to publish, plus photographs',
              ].map((item, index) => (
                <li key={item} className="border-hairline flex gap-6 border-b py-5">
                  <span className="data-value text-accent shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-ink-muted">{item}</p>
                </li>
              ))}
            </ol>

            <PlaceholderNotice
              className="mt-10 max-w-2xl"
              label="Case studies"
              meta={placeholder}
            />

            <div className="mt-10">
              <Button href="/contact">
                Talk to us about a case study <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </>
        )}
      </Section>
    </>
  )
}
