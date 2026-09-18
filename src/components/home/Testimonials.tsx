import { Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'

/**
 * Farmer testimonials.
 *
 * These two are the only testimonials on the entire legacy site, and both are
 * in Marathi. They are shown in the original language rather than machine
 * translated — an invented English "quote" attributed to a real, named person
 * would be a fabrication.
 *
 * The published mobile numbers that accompany them on the legacy site are
 * omitted.
 *
 * TYPOGRAPHY: set large, as pull quotes, rather than as body copy inside a
 * bordered box. Two short quotes in small type read as an afterthought on a
 * page this long — which is the opposite of what a trust section is for. The
 * quote mark is a typographic glyph in the accent colour rather than an icon,
 * so it scales with the text and costs nothing.
 *
 * Devanagari renders in the system fallback face by design: the root layout
 * deliberately does not load Noto Sans Devanagari (~200 KB) for the English
 * locale, and shipping it so two quotes render in-brand would be a poor trade
 * for every visitor. It is loaded inside the mr/hi route segments once i18n
 * lands. `lang` is set on each quote so the browser picks a sensible face and
 * screen readers switch voice.
 */
export async function Testimonials() {
  const testimonials = await content.getTestimonials()

  if (testimonials.length === 0) return null

  return (
    <Section rhythm="default">
      <SectionHeading
        index={10}
        eyebrow="From users"
        title="In their words"
        description="Published in Marathi, as written."
      />

      <ul className="border-hairline mt-14 grid gap-px border-t lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.author}
            className="border-hairline flex flex-col gap-8 border-b py-12 lg:px-10 lg:first:pl-0 lg:last:border-l lg:last:pr-0"
          >
            <blockquote className="flex flex-1 flex-col gap-8">
              <p className="text-h3 font-display text-ink leading-snug" lang={testimonial.language}>
                <span aria-hidden="true" className="text-accent pr-1 select-none">
                  &ldquo;
                </span>
                {testimonial.quote}
                <span aria-hidden="true" className="text-accent pl-0.5 select-none">
                  &rdquo;
                </span>
              </p>

              <footer className="border-hairline mt-auto flex items-baseline gap-4 border-t pt-6">
                {/* The accent tick ties the attribution to the pillar and
                    principle numbering used everywhere else on the page. */}
                <span aria-hidden="true" className="bg-accent mt-2 h-px w-6 shrink-0" />
                <div>
                  <p className="text-ink font-medium" lang={testimonial.language}>
                    {testimonial.author}
                  </p>
                  {testimonial.location && (
                    <p className="text-caption text-ink-subtle mt-1" lang={testimonial.language}>
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </Section>
  )
}
