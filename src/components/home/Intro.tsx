import { ArrowRight } from 'lucide-react'
import { Button, DataValue, Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'
import { site } from '@/config/site'

const facts = [
  { label: 'Founded', value: String(site.foundedYear) },
  { label: 'Based in', value: `${site.address.city}, ${site.address.region}` },
  { label: 'Product ranges', value: 'Super · SCT Vedic' },
]

export async function Intro() {
  const { founderStatement } = await content.getCompany()

  return (
    <Section rhythm="default">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            index={1}
            eyebrow="The company"
            title="Soil was the problem, so soil was the starting point."
          />

          <div className="text-body-lg text-ink-muted mt-8 flex flex-col gap-5">
            <p>{founderStatement.intro}</p>
            {founderStatement.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/about" variant="secondary">
              About the company <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <p className="text-caption text-ink-subtle">
              {site.founder.name} — {site.founder.role}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <dl className="border-hairline grid gap-px border-t">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="border-hairline flex justify-between gap-6 border-b py-5"
              >
                <dt className="eyebrow pt-1">{fact.label}</dt>
                <dd>
                  <DataValue value={fact.value} className="text-ink text-right" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
