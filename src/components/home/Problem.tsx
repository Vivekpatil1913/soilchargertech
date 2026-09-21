import { Heading, Reveal, Section, Shell } from "@/components/ui";

/**
 * THE PROBLEM, IN THE FARMER'S OWN WORDS
 * ======================================
 * The pattern from docs/design-reference-sumago.md §6 — plain statements of
 * what is going wrong, set before any solution appears, phrased the way the
 * customer would phrase it rather than the way the company would.
 *
 * Every line is drawn from SCT's own writing. The founder's letter and the
 * Marathi articles captured in docs/sct-legacy-blog-archive.md are full of
 * these complaints already; they have simply never appeared anywhere a visitor
 * would see them. The source is named above each line so nobody later mistakes
 * them for invented copy.
 *
 * This is also the section AgroStar and every Maharashtra competitor lack
 * entirely — see docs/agrostar-benchmark.md §6. It is the cheapest point of
 * difference on the whole site.
 */

const COMPLAINTS = [
  // Blog 14 — orchard soils measured at 0.3% organic carbon against 2% for fertile ground.
  "The soil has gone hard and lifeless",
  // Blog 133 — grape growers spraying three times a day and still losing the crop.
  "Spraying three times a day, and still losing the crop",
  // Blog 14 — tomato and chilli failing across whole talukas, year after year.
  "The same disease comes back every single season",
  // Founder's letter — overuse of chemicals after the Green Revolution.
  "Fertiliser costs more every year, the yield does not follow",
  // Blog 133 — expenses climbing while the vineyard gives nothing back.
  "Input bills keep climbing and nothing is left over",
  // Blog 2 — soil lost its strength through loss of organic carbon.
  "Water drains straight through, or sits and rots the roots",
  // Blog 133 — rejection rising every year from residue.
  "Buyers reject the produce over residue",
  // Blog 129 — the cost of illness in farming households.
  "Illness in the house that nobody wants to trace back to the field",
  // Blog 133 — the question SCT keeps returning to.
  "Nobody can tell me if disease causes weakness, or weakness causes disease",
  // Founder's letter — farmers left to guess between competing advice.
  "Everybody sells me something, nobody explains anything",
];

export function Problem() {
  return (
    <Section ground="soil" labelledBy="problem-heading" fx>
      <Shell size="wide">
        <Heading
          id="problem-heading"
          eyebrow="Why we started"
          accent="saffron"
          tone="onDark"
          align="center"
          title={
            <>
              We started with the problem,
              <br className="hidden sm:block" /> not with a product.
            </>
          }
          lead="These are the sentences SCT hears in the field, season after season. If any of them sound like your own, you are in the right place."
        />

        <ul className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-3">
          {COMPLAINTS.map((complaint, index) => (
            <Reveal key={complaint} as="li" delay={index * 0.04}>
              <p className="rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-[0.92rem] font-medium leading-snug text-earth-50 backdrop-blur-sm transition-colors duration-300 hover:border-saffron-400/45 hover:bg-white/10">
                &ldquo;{complaint}&rdquo;
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <figure className="mx-auto max-w-3xl border-l-2 border-saffron-500 pl-6 sm:pl-8">
            <blockquote className="font-display text-[1.2rem] font-semibold leading-relaxed text-white sm:text-[1.4rem]">
              &ldquo;Do diseases come because of weakness, or does weakness come because of disease?
              We need to work on the weakness. But where are we working?&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[0.88rem] text-earth-100/70">
              Mr. Ram Mukhekar — Founder, Soil Charger Technology
            </figcaption>
          </figure>
        </Reveal>
      </Shell>
    </Section>
  );
}
