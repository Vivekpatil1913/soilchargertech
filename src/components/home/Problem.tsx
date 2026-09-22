import { Quote } from "lucide-react";

import { Brand } from "@/components/common/NoTranslate";
import { Heading, Reveal, Section, Shell } from "@/components/ui";

/**
 * THE PROBLEM, IN THE FARMER'S OWN WORDS
 * ======================================
 * Plain statements of what is going wrong, set before any solution appears,
 * phrased the way the customer would phrase it rather than the way the company
 * would.
 *
 * Every line is drawn from SCT's own writing. The founder's letter and the
 * Marathi articles captured in docs/sct-legacy-blog-archive.md are full of
 * these complaints already; they have simply never appeared anywhere a visitor
 * would see them. The source is named above each line so nobody later mistakes
 * them for invented copy.
 *
 * Set as a two-column list on paper rather than as pills on a dark ground. Ten
 * short quotations are a list — giving each one a floating chip makes the
 * reader work through ten separate objects to read one idea.
 */

const COMPLAINTS = [
  // Blog 14 — orchard soils measured at 0.3% organic carbon against 2% for fertile ground.
  "The soil has gone hard and lifeless.",
  // Blog 133 — grape growers spraying three times a day and still losing the crop.
  "Spraying three times a day, and still losing the crop.",
  // Blog 14 — tomato and chilli failing across whole talukas, year after year.
  "The same disease comes back every single season.",
  // Founder's letter — overuse of chemicals after the Green Revolution.
  "Fertiliser costs more every year, the yield does not follow.",
  // Blog 133 — expenses climbing while the vineyard gives nothing back.
  "Input bills keep climbing and nothing is left over.",
  // Blog 2 — soil lost its strength through loss of organic carbon.
  "Water drains straight through, or sits and rots the roots.",
  // Blog 133 — rejection rising every year from residue.
  "Buyers reject the produce over residue.",
  // Blog 129 — the cost of illness in farming households.
  "Illness in the house that nobody wants to trace back to the field.",
  // Blog 133 — the question SCT keeps returning to.
  "Nobody can tell me if disease causes weakness, or weakness causes disease.",
  // Founder's letter — farmers left to guess between competing advice.
  "Everybody sells me something, nobody explains anything.",
];

export function Problem() {
  return (
    <Section ground="light" labelledBy="problem-heading">
      <Shell>
        <Heading
          id="problem-heading"
          eyebrow="Why we started"
          title={
            <>
              We started with the problem,
              <br className="hidden sm:block" /> not with a product.
            </>
          }
          lead="These are the sentences SCT hears in the field, season after season. If any of them sound like your own, you are in the right place."
        />

        <ul className="mt-10 grid gap-x-10 border-t border-ink-100 sm:grid-cols-2">
          {COMPLAINTS.map((complaint, index) => (
            <Reveal key={complaint} as="li" delay={Math.min(index, 5) * 0.04}>
              <p className="flex gap-3 border-b border-ink-100 py-3.5 text-sm leading-relaxed text-ink-600">
                <span
                  aria-hidden
                  className="mt-[0.6em] h-px w-3.5 shrink-0 bg-harvest-400"
                />
                {complaint}
              </p>
            </Reveal>
          ))}
        </ul>

        {/* The founder's own framing of the same question, given the weight of
            a pull quote because it is the sentence the whole company hangs on. */}
        <Reveal delay={0.1}>
          <figure className="mt-10 rounded-2xl border border-ink-100 bg-canvas-50 p-7 sm:p-9">
            <Quote aria-hidden className="size-6 text-harvest-400" />
            <blockquote className="mt-4 font-display text-lg leading-relaxed text-ink-900 sm:text-xl">
              Do diseases come because of weakness, or does weakness come because of disease? We
              need to work on the weakness. But where are we working?
            </blockquote>
            <figcaption className="text-meta mt-5 text-ink-500">
              Mr. Ram Mukhekar — Founder,
              <Brand pad="before" />
            </figcaption>
          </figure>
        </Reveal>
      </Shell>
    </Section>
  );
}
