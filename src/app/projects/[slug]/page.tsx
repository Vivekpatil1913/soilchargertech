import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { Badge, DataValue, ImagePlaceholder, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { ProductCard } from '@/components/products/ProductCard'
import { content } from '@/lib/content/repository'

/**
 * Case study detail.
 *
 * Renders nothing today — `projects` is deliberately empty — but the layout is
 * complete so the first real case study needs no code.
 */
export async function generateStaticParams() {
  const projects = await content.getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await content.getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.excerpt,
    alternates: { canonical: `/projects/${project.slug}` },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await content.getProject(slug)
  if (!project) notFound()

  const all = await content.getProducts()
  const used = all.filter((product) => project.productSlugs.includes(product.slug))

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Case Studies', href: '/projects' }, { label: project.title }]}
        eyebrow="Case study"
        title={project.title}
        description={project.excerpt}
      >
        <div className="flex flex-wrap items-center gap-4">
          {project.application && <Badge tone="accent">{project.application}</Badge>}
          {project.location && (
            <span className="text-caption text-ink-subtle inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5" />
              {project.location}
            </span>
          )}
        </div>
      </PageHero>

      <Section rhythm="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="text-body-lg text-ink-muted flex flex-col gap-5">
              {project.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <ImagePlaceholder label={`${project.title} field photograph`} ratio="3/2" />
          </div>
        </div>
      </Section>

      {project.results.length > 0 && (
        <Section tone="sunken" rhythm="default">
          <SectionHeading index={1} eyebrow="Results" title="Measured outcomes" />
          <dl className="border-hairline mt-12 grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.label} className="border-hairline border-b py-8">
                <dt className="eyebrow">{result.label}</dt>
                <dd className="mt-3">
                  <DataValue
                    value={result.value}
                    unit={result.unit}
                    size="lg"
                    className="text-accent"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {used.length > 0 && (
        <Section rhythm="default">
          <SectionHeading index={2} eyebrow="Products used" title="Applied on this farm" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {used.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
