import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Articles, videos, brochures and frequently asked questions about Soil Charger Technology.',
  alternates: { canonical: '/resources' },
}

export default async function ResourcesPage() {
  const articles = await content.getArticles()

  const sections = [
    {
      href: '/resources/articles',
      title: 'Articles',
      detail: `${articles.length} published, English and Marathi`,
    },
    { href: '/resources/videos', title: 'Videos', detail: 'Daily field and training videos' },
    { href: '/resources/faq', title: 'FAQ', detail: 'Application, dosage and what to avoid' },
    { href: '/resources/brochures', title: 'Brochures', detail: 'Awaiting documents' },
  ]

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources' }]}
        eyebrow="Resources"
        title="Everything published, in one place."
        description="The written and recorded material behind the method."
      />

      <Section rhythm="default">
        <ul className="border-hairline grid gap-px border-t sm:grid-cols-2">
          {sections.map((section) => (
            <li
              key={section.href}
              className="border-hairline group relative flex flex-col gap-3 border-b py-10 sm:px-8 sm:first:pl-0 sm:even:border-l"
            >
              <h2 className="text-h3 font-display">
                <Link
                  href={section.href}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {section.title}
                </Link>
              </h2>
              <p className="text-ink-muted">{section.detail}</p>
              <span className="text-accent mt-2 inline-flex items-center gap-1.5 text-[0.9375rem]">
                Open{' '}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-250 group-hover:translate-x-0.5"
                />
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
