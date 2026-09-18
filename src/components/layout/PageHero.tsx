import { Container, Eyebrow } from '@/components/ui'
import { Breadcrumb, type Crumb } from '@/components/layout/Breadcrumb'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  crumbs: Crumb[]
  children?: React.ReactNode
}

/**
 * Shared hero for every page below the root.
 *
 * Carries the breadcrumb (visible trail + BreadcrumbList JSON-LD), the dark
 * surface and the hairline grid, so no route group re-implements them.
 */
export function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative">
        <Breadcrumb crumbs={crumbs} />

        <Container>
          <div className="flex flex-col gap-8 pt-8 pb-20 lg:pt-16 lg:pb-28">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-display-lg max-w-4xl">{title}</h1>
            <p className="text-body-lg text-ink-muted max-w-2xl">{description}</p>
            {children}
          </div>
        </Container>
      </div>
    </section>
  )
}
