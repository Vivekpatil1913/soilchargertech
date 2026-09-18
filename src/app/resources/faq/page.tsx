import type { Metadata } from 'next'
import { PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { Accordion } from '@/components/ui/Accordion'
import { PageHero } from '@/components/layout/PageHero'
import { JsonLd } from '@/lib/seo/jsonld'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'How Soil Charger Technology is applied: dosage intervals, what to avoid, chemical fertiliser compatibility and the three operating principles.',
  alternates: { canonical: '/resources/faq' },
}

export default async function FaqPage() {
  const [faq, unanswered] = await Promise.all([content.getFaq(), content.getUnansweredQuestions()])

  return (
    <>
      {/* Only verified answers go into FAQPage schema. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: { '@type': 'Answer', text: entry.answer.join(' ') },
          })),
        }}
      />

      <PageHero
        crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'FAQ' }]}
        eyebrow="FAQ"
        title="Questions, answered from the source."
        description="Every answer below comes from published company material. Questions that cannot be answered from it are listed separately rather than guessed at."
      />

      <Section rhythm="default">
        <Accordion
          headingLevel="h2"
          defaultOpen={null}
          items={faq.map((entry) => ({
            title: entry.question,
            content: (
              <div className="text-ink-muted flex max-w-3xl flex-col gap-4">
                {entry.answer.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            ),
          }))}
        />
      </Section>

      <Section tone="sunken" rhythm="default">
        <SectionHeading
          index={2}
          eyebrow="Outstanding"
          title="Questions we cannot yet answer"
          description="These are the questions buyers ask most, and nothing on the current website answers them."
        />

        <ul className="border-hairline mt-12 max-w-3xl border-t">
          {unanswered.questions.map((question, index) => (
            <li key={question} className="border-hairline flex gap-6 border-b py-5">
              <span className="data-value text-ink-subtle shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-ink-muted">{question}</p>
            </li>
          ))}
        </ul>

        <PlaceholderNotice className="mt-10 max-w-2xl" label="FAQ answers" meta={unanswered} />
      </Section>
    </>
  )
}
