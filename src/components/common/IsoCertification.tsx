import { Award, MapPin, ShieldCheck } from "lucide-react";

import { Reveal, Section, Shell } from "@/components/ui";
import { images } from "@/data/images";
import { contact, site } from "@/data/site";
import Image from "@/shims/Image";

/**
 * ISO 9001:2008 CERTIFICATION
 * ===========================
 * The old site ran this band directly above the footer on every page: a
 * centred all-caps headline, the certification mark floating on the left, and
 * one paragraph of company copy on the right.
 *
 * WHAT WAS KEPT
 * -------------
 * All of it — the claim, the mark, the wording. This is the only third-party
 * credential SCT publishes, so it earns its place on a page selling to farmers
 * who have been sold to badly before.
 *
 * WHAT CHANGED
 * ------------
 * The presentation, and only the presentation. The old band was a photographic
 * background with a green wash over it and a headline set in full caps at
 * roughly 40px, which is where most of the old site's dated feel came from.
 * Here the claim is set in the site's own display type with the standard
 * eyebrow above it, the mark sits on the brand's own halo rather than on a
 * photograph, and the paragraph gets the measure it needs to be read.
 *
 * The mark keeps its slow vertical drift — the old site's `vert-move` — on a
 * seven-second clock rather than two, and only for visitors who have not asked
 * for reduced motion. See `badge-float` in globals.css.
 *
 * ABOUT THE PARAGRAPH
 * -------------------
 * SCT's own copy, reproduced. Their published version ends mid-sentence — the
 * source string was truncated in their database and renders as "…unique
 * organic products for all" followed by a broken character. The fragment is
 * dropped rather than guessed at: no sentence has been completed on SCT's
 * behalf and no claim has been added, removed or strengthened.
 *
 * The three chips beneath restate facts already on this site (src/data/site.ts)
 * — they introduce nothing new.
 */

const MARKERS = [
  { icon: ShieldCheck, label: "Quality management", value: "ISO 9001:2008" },
  { icon: Award, label: "Working on soil since", value: String(site.founded) },
  {
    icon: MapPin,
    label: "Manufactured in",
    value: `${contact.address.city}, ${contact.address.state}`,
  },
];

export function IsoCertification({ ground = "light" }: { ground?: "light" | "tint" }) {
  return (
    <Section ground={ground} labelledBy="iso-heading">
      <Shell size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ---- The mark ------------------------------------------------ */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto grid w-full max-w-[30rem] place-items-center py-8 sm:py-10">
              {/* Halo — the brand green, not a photograph. */}
              <span
                aria-hidden
                className="absolute size-[20rem] rounded-full bg-brand-500/16 blur-3xl sm:size-[26rem]"
              />
              <span
                aria-hidden
                className="absolute size-[17rem] rounded-full border border-brand-200/70 sm:size-[21.5rem]"
              />
              <span
                aria-hidden
                className="badge-ring absolute size-[19.5rem] rounded-full border border-dashed border-brand-300/60 sm:size-[24.5rem]"
              />

              <Image
                src={images.certification.iso.src}
                alt={images.certification.iso.alt}
                width={346}
                height={288}
                sizes="(min-width: 640px) 264px, 208px"
                className="badge-float relative w-[13rem] max-w-full drop-shadow-[0_24px_44px_rgba(9,95,57,0.28)] sm:w-[16.5rem]"
              />
            </div>
          </Reveal>

          {/* ---- The claim ----------------------------------------------- */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-eyebrow inline-flex items-center gap-2 text-brand-700">
                <span aria-hidden className="size-1.5 rounded-full bg-current" />
                Certified quality
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id="iso-heading" className="text-h2 mt-4 text-ink-900">
                An <span className="text-brand-600">ISO 9001:2008</span> certified company
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-ink-500">
                <p>
                  At Soil Charger Technologies we know our responsibility to offer eco-friendly
                  products and services that efficiently satisfy the growing food, fuel and fodder
                  demands driven by social and economic development, in a safe and sustainable
                  manner.
                </p>
                <p>
                  Our company is a leading biotech company, active in the field of research,
                  manufacturing and marketing of unique organic products.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-9 grid gap-3 sm:grid-cols-3">
                {MARKERS.map((marker) => {
                  const Icon = marker.icon;
                  return (
                    <li
                      key={marker.label}
                      className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3.5 transition-colors duration-400 hover:border-brand-300"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-400">
                          {marker.label}
                        </span>
                        <span className="block truncate font-display text-[0.94rem] font-bold text-ink-900">
                          {marker.value}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
