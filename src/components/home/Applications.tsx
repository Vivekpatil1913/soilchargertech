import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button, ImagePlaceholder, Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'

/**
 * Crop and context applications.
 *
 * Only the featured three are shown, because only those three are supported by
 * anything on the legacy site — and even then only as dosage exceptions
 * ("Orchards 3 to 5 liters per acre", "5 to 7 ml for grapes"). Water,
 * environmental and industrial applications have no source content at all and
 * are excluded here rather than invented.
 */
export async function Applications() {
  const all = await content.getApplications()
  const featured = all.filter((application) => application.featured)

  if (featured.length === 0) return null

  return (
    <Section rhythm="default" tone="sunken">
      <SectionHeading
        index={7}
        eyebrow="Applications"
        title="Where it is used"
        description="The contexts the product dosage guidance names directly."
        action={
          <Button href="/applications" variant="secondary">
            All applications <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((application) => (
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
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="bg-surface-sunken aspect-3/2 w-full rounded-sm object-cover"
                  />
                ) : (
                  <ImagePlaceholder label={`${application.name} field photograph`} ratio="3/2" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-h4 font-display">{application.name}</h3>
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
    </Section>
  )
}
