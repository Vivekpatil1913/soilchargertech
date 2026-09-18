import type { Metadata } from 'next'
import { ArrowRight, Youtube } from 'lucide-react'
import { Button, PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Daily field and training videos from Soil Charger Technology, published to the official YouTube channel.',
  alternates: { canonical: '/resources/videos' },
}

/**
 * Videos.
 *
 * The legacy video gallery pages exist but every thumbnail they reference is a
 * 404, and no video IDs are recoverable from the markup. The channel itself is
 * verified and active, so this page points there rather than embedding a grid
 * of broken tiles.
 */
export default function VideosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Videos' }]}
        eyebrow="Videos"
        title="A video every day."
        description="The first of the three daily practices: watch, take notes, and discuss. Published to the official channel."
      />

      <Section rhythm="default">
        <div className="border-hairline flex max-w-2xl flex-col items-start gap-6 border p-10">
          <Youtube aria-hidden="true" className="text-accent size-8" />
          <h2 className="text-h3 font-display">Official YouTube channel</h2>
          <p className="text-ink-muted">
            Field walk-throughs, application guidance and answers to user questions, posted daily.
          </p>
          <Button href={site.social.youtube} target="_blank" rel="noreferrer noopener">
            Open the channel <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <PlaceholderNotice
          className="mt-12 max-w-2xl"
          label="Curated video library"
          meta={{
            provenance: 'placeholder',
            source: 'soilchargertechnology.com/vedio-gallery',
            note: 'The legacy video gallery references thumbnails that all return 404 and contains no recoverable video IDs. Required from the client: a shortlist of videos to feature, with YouTube IDs and titles.',
          }}
        />
      </Section>
    </>
  )
}
