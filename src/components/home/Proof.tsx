import { ArrowUpRight, Quote } from "lucide-react";

import { Button, Heading, Reveal, Section, Shell } from "@/components/ui";
import { galleryPhotos } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * FARMER VOICES
 * =============
 * The quotes are reproduced exactly as SCT published them — Marathi, in
 * Devanagari, with the farmer's own name, village and the number he chose to
 * publish. They are not translated on the page. A farmer reading this site
 * reads Marathi, and an English gloss beside a Marathi quote would say, quite
 * clearly, that the quote is an exhibit for somebody else's benefit.
 *
 * `lang="mr"` on the blockquote is doing real work: it switches the type to
 * the Devanagari serif and opens the leading, and it stops Google Translate
 * from re-translating a quotation that is already in the reader's language.
 *
 * See src/data/testimonials.ts for the sourcing rule. Two of the four entries
 * are placeholders awaiting real collection; that file is the only place that
 * says which, deliberately.
 */
export function Proof() {
  /* A short strip of field photography under the quotes. Four is enough to
     say "there are photographs"; the gallery is one click away. */
  const strip = galleryPhotos.slice(0, 4);

  return (
    <Section id="farmer-stories" ground="canvas" labelledBy="proof-heading">
      <Shell>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            id="proof-heading"
            eyebrow="In their own words"
            title="Farmers who made the change."
            lead="Published by SCT, in the farmers' own Marathi, with the numbers they chose to give out."
            className="max-w-2xl"
          />

          <Reveal delay={0.12}>
            <Button href="/gallery" variant="secondary" className="shrink-0 whitespace-nowrap">
              Photographs and films
              <ArrowUpRight aria-hidden className="size-4" />
            </Button>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} as="li" delay={index * 0.06} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-colors duration-300 hover:border-forest-200">
                <Quote aria-hidden className="size-5 shrink-0 text-harvest-400" />

                <blockquote
                  lang="mr"
                  className="mt-4 flex-1 font-display text-[0.95rem] leading-loose text-ink-800"
                >
                  {testimonial.quote}
                </blockquote>

                <figcaption className="mt-5 border-t border-ink-100 pt-4">
                  <p lang="mr" className="text-sm font-semibold text-ink-900">
                    {testimonial.name}
                  </p>
                  <p lang="mr" className="mt-0.5 text-xs text-ink-500">
                    {testimonial.location}
                  </p>
                  {testimonial.phone ? (
                    <p className="mt-2 text-xs tabular-nums text-forest-700">{testimonial.phone}</p>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        {/* ---- A glimpse of the gallery -------------------------------- */}
        {strip.length > 0 ? (
          <Reveal delay={0.1}>
            <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {strip.map((photo) => (
                <li key={photo.src} className="min-w-0">
                  <Link
                    href="/gallery"
                    className="group block overflow-hidden rounded-xl border border-ink-100"
                  >
                    <span className="relative block aspect-[4/3]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Shell>
    </Section>
  );
}
