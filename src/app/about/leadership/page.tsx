import type { Metadata } from 'next'
import Image from 'next/image'
import { ImagePlaceholder, PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'
import { site } from '@/config/site'
import { JsonLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'The team behind Soil Charger Technology — production, development, operations and technical support, led by founder Mr. Ram Mukhekar.',
  alternates: { canonical: '/about/leadership' },
}

export default async function LeadershipPage() {
  const { team, teamMeta, founderPortrait } = await content.getCompany()

  const people: Array<{ name: string; role: string; portrait?: typeof founderPortrait }> = [
    { name: site.founder.name, role: 'Founder', portrait: founderPortrait },
    ...team,
  ]

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          mainEntity: {
            '@id': `${site.url}/#organization`,
            employee: people.map((person) => ({
              '@type': 'Person',
              name: person.name,
              jobTitle: person.role,
            })),
          },
        }}
      />

      <PageHero
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Leadership' }]}
        eyebrow="Leadership"
        title="The people behind it."
        description="Named on the company website. Roles as published."
      />

      <Section rhythm="default">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person, index) => (
            <li key={person.name} className="flex flex-col gap-4">
              {person.portrait ? (
                <Image
                  src={person.portrait.src}
                  alt={person.portrait.alt}
                  width={person.portrait.width}
                  height={person.portrait.height}
                  priority={index === 0}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="bg-surface-sunken aspect-square w-full rounded-sm object-cover"
                />
              ) : (
                <ImagePlaceholder label={`Portrait of ${person.name}`} ratio="1/1" />
              )}
              <div>
                <h2 className="text-h4 font-display">{person.name}</h2>
                <p className="eyebrow mt-2">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <PlaceholderNotice
          className="mt-12 max-w-2xl"
          label="Team portraits and biographies"
          meta={{
            provenance: 'placeholder',
            source: teamMeta.source,
            note: 'The legacy team page lists names and roles only. Portraits (all legacy images return 404) and short biographies are required from the client.',
          }}
        />
      </Section>
    </>
  )
}
