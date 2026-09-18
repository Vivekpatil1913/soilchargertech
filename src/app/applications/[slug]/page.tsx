import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button, PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { ProductCard } from '@/components/products/ProductCard'
import { content } from '@/lib/content/repository'

export async function generateStaticParams() {
  const applications = await content.getApplications()
  return applications.map((application) => ({ slug: application.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const application = await content.getApplication(slug)
  if (!application) return {}

  const thin = application.meta.provenance === 'placeholder'

  return {
    title: application.name,
    description:
      application.excerpt ||
      `${application.name} — application guidance from Soil Charger Technology.`,
    alternates: { canonical: `/applications/${application.slug}` },
    // Don't index a page with nothing behind it yet.
    ...(thin ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const application = await content.getApplication(slug)
  if (!application) notFound()

  const all = await content.getProducts()
  const related = all.filter((product) => application.productSlugs.includes(product.slug))

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Applications', href: '/applications' }, { label: application.name }]}
        eyebrow="Application"
        title={application.name}
        description={application.excerpt || 'Awaiting content.'}
      />

      <Section rhythm="default">
        {application.description.length > 0 ? (
          <div className="text-body-lg text-ink-muted flex max-w-3xl flex-col gap-5">
            {application.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <PlaceholderNotice
            className="max-w-2xl"
            label={`${application.name} — descriptive content`}
            meta={application.meta}
          />
        )}
      </Section>

      {related.length > 0 && (
        <Section tone="sunken" rhythm="default">
          <SectionHeading
            index={1}
            eyebrow="Products"
            title={`Used in ${application.name.toLowerCase()}`}
            description="Products whose published dosage guidance names this context."
            action={
              <Button href="/products" variant="secondary">
                All products <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
