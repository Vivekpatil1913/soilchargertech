import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Careers',
  description: `Work at Soil Charger Technology in ${site.address.city}. Open roles and internships.`,
  alternates: { canonical: '/careers' },
}

const routes = [
  { href: '/careers/openings', title: 'Open roles', detail: 'Apply for a current vacancy' },
  {
    href: '/careers/internship',
    title: 'Internships',
    detail: 'For students and recent graduates',
  },
  {
    href: '/distributorship',
    title: 'Distributorship',
    detail: 'A business opportunity, not a job',
  },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers' }]}
        eyebrow="Careers"
        title="Work on soil."
        description={`The team is based in ${site.address.city}, ${site.address.region}.`}
      />

      <Section rhythm="default">
        <ul className="border-hairline grid gap-px border-t lg:grid-cols-3">
          {routes.map((route) => (
            <li
              key={route.href}
              className="border-hairline group relative flex flex-col gap-3 border-b py-10 lg:px-8 lg:not-first:border-l lg:first:pl-0"
            >
              <h2 className="text-h3 font-display">
                <Link href={route.href} className="after:absolute after:inset-0 after:content-['']">
                  {route.title}
                </Link>
              </h2>
              <p className="text-ink-muted">{route.detail}</p>
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
