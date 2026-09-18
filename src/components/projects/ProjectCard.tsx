import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { Project } from '@/types/project'
import { Badge, ImagePlaceholder } from '@/components/ui'

export function ProjectCard({
  project,
  headingLevel: Heading = 'h3',
}: {
  project: Project
  /** Follows the surrounding outline — h2 on a listing, h3 inside a section. */
  headingLevel?: 'h2' | 'h3'
}) {
  return (
    <article className="group bg-surface border-hairline hover:border-accent/40 relative flex h-full flex-col border transition-colors duration-250">
      <div className="p-4 pb-0">
        <ImagePlaceholder label={`${project.title} field photograph`} ratio="3/2" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {project.application && <Badge tone="accent">{project.application}</Badge>}

        <Heading className="text-h4 font-display">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </Heading>

        {project.location && (
          <p className="text-caption text-ink-subtle inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-3.5" />
            {project.location}
          </p>
        )}

        <p className="text-ink-muted text-[0.9375rem]">{project.excerpt}</p>

        <span className="text-accent mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9375rem]">
          Read the case study
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-250 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  )
}
