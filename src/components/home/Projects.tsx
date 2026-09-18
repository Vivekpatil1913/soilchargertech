import { ArrowRight } from 'lucide-react'
import { Button, PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'
import { ProjectCard } from '@/components/projects/ProjectCard'

/**
 * Case studies.
 *
 * The legacy site claims a million farmers and shows not one project, location
 * or measured result. That gap is the biggest credibility problem the audit
 * found, and it is not something we can close by writing plausible-sounding
 * case studies.
 *
 * So: when there are no projects, this section renders an honest empty state
 * on staging (where the client sees exactly what is needed) and renders nothing
 * at all in production. The grid, card and detail layouts are built and waiting.
 */
export async function Projects() {
  const projects = await content.getProjects()

  if (projects.length === 0) {
    const visible =
      process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ALLOW_PLACEHOLDERS === 'true'

    if (!visible) return null

    return (
      <Section rhythm="default">
        <SectionHeading
          index={8}
          eyebrow="Field results"
          title="Case studies"
          description="This section is built and waiting for data."
        />
        <PlaceholderNotice
          className="mt-8 max-w-2xl"
          label="Case studies"
          meta={await content.getProjectsPlaceholder()}
        />
      </Section>
    )
  }

  return (
    <Section rhythm="default">
      <SectionHeading
        index={8}
        eyebrow="Field results"
        title="Case studies"
        action={
          <Button href="/projects" variant="secondary">
            All case studies <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
