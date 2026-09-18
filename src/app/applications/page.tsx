import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ImagePlaceholder, PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Applications',
  description:
    'Where Soil Charger Technology is applied — orchards, vegetable crops and grapes, with published application rates for each.',
  alternates: { canonical: '/applications' },
}

export default async function ApplicationsPage() {
  const applications = await content.getApplications()
  const supported = applications.filter((a) => a.meta.provenance !== 'placeholder')
  const awaiting = applications.filter((a) => a.meta.provenance === 'placeholder')

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Applications' }]}
        eyebrow="Applications"
        title="Where it is used."
        description="The crops and contexts the published dosage guidance names directly."
      />

      <Section rhythm="default">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supported.map((application, index) => (
            <li key={application.slug}>
              <Link
                href={`/applications/${application.slug}`}
                className="group border-hairline hover:border-accent/40 bg-surface flex h-full flex-col border transition-colors duration-250"
              >
                <div className="p-4 pb-0">
                  {application.image ? (
                    <Image
                      src={application.image.src}
                      alt={application.image.alt}
                      width={application.image.width}
                      height={application.image.height}
                      // First card is the LCP element on this route.
                      priority={index === 0}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="bg-surface-sunken aspect-3/2 w-full rounded-sm object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label={`${application.name} field photograph`} ratio="3/2" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="text-h4 font-display">{application.name}</h2>
                  <p className="text-ink-muted text-[0.9375rem]">{application.excerpt}</p>
                  <span className="text-accent mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem]">
                    Explore
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-250 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {awaiting.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              index={2}
              eyebrow="Planned"
              title="Not yet documented"
              description="These application areas were requested for the new site but have no supporting content on the current one."
            />
            <div className="mt-8 flex max-w-2xl flex-col gap-4">
              {awaiting.map((application) => (
                <PlaceholderNotice
                  key={application.slug}
                  label={application.name}
                  meta={application.meta}
                />
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  )
}
