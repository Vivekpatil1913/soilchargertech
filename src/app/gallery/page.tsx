import type { Metadata } from 'next'
import Image from 'next/image'
import { ImagePlaceholder, PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photographs from the field, seminars and demonstrations at Soil Charger Technology.',
  alternates: { canonical: '/gallery' },
}

/**
 * Gallery.
 *
 * The images here were recovered from the Internet Archive: the live media host
 * returns 404 for every one of the 40 photographs the legacy gallery references.
 * Captions could not be recovered because the originals carried none — every
 * legacy <img> had an empty alt attribute — so alt text is generic and flagged
 * for the client to replace.
 */
export default async function GalleryPage() {
  const { images, meta } = await content.getGallery()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Gallery' }]}
        eyebrow="Gallery"
        title={images.length > 0 ? 'From the field.' : 'Awaiting photographs.'}
        description="Field visits, seminars and demonstrations."
      />

      <Section rhythm="default">
        {images.length > 0 ? (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <li key={image.src} className="border-hairline overflow-hidden border">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    // The first row is close enough to the fold to be worth
                    // eager loading; everything below waits.
                    loading={index < 3 ? 'eager' : 'lazy'}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="bg-surface-sunken aspect-3/2 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </li>
              ))}
            </ul>

            <PlaceholderNotice className="mt-12 max-w-2xl" label="Gallery captions" meta={meta} />
          </>
        ) : (
          <>
            <PlaceholderNotice
              className="mb-12 max-w-2xl"
              label="Photo gallery"
              meta={{
                provenance: 'placeholder',
                source: 'soilchargertechnology.com/photo-gallery',
                note: 'No gallery imagery is available. Run `npm run process:images` to build the recovered set, or supply originals.',
              }}
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }, (_, index) => (
                <li key={index}>
                  <ImagePlaceholder label={`Gallery image ${index + 1}`} ratio="3/2" />
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>
    </>
  )
}
