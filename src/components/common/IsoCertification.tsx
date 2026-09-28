import { Award, Globe2, MapPin, ShieldCheck } from "lucide-react";

import { Reveal, Section, Shell } from "@/components/ui";
import { images } from "@/data/images";
import { contact, site } from "@/data/site";
import Image from "@/shims/Image";

/**
 * ISO 9001:2015 CERTIFICATION
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
 * The presentation. The mark now sits on a small staged scene — a podium, the
 * certificate behind it, lab glassware and leaves — built from CSS, inline SVG
 * and the two legacy PNGs (the mark and the leaf), so no stock photography is
 * introduced. The claim uses the site's display type with the standard eyebrow,
 * and the three fact cards stack icon / label / rule / value.
 *
 * The mark keeps its slow vertical drift — the old site's `vert-move` — on a
 * seven-second clock, only for visitors who have not asked for reduced motion.
 * See `badge-float` in globals.css.
 *
 * ABOUT THE PARAGRAPH
 * -------------------
 * SCT's own copy, reproduced. Their published version ends mid-sentence — the
 * source string was truncated in their database. The fragment is dropped
 * rather than guessed at: no claim has been added, removed or strengthened.
 *
 * The three cards restate facts already on this site (src/data/site.ts).
 */

const STANDARD = "ISO 9001:2015";

const MARKERS = [
  { icon: ShieldCheck, label: "Quality management", value: STANDARD },
  { icon: Award, label: "Working on soil since", value: String(site.founded) },
  {
    icon: MapPin,
    label: "Manufactured in",
    value: `${contact.address.city}, ${contact.address.state}`,
  },
];

const LEAF = "/images/legacy/leaf.png";

/* ---- Scene pieces ------------------------------------------------------ */

function Leaf({ className }: { className: string }) {
  return (
    <img
      src={LEAF}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className={`pointer-events-none absolute select-none ${className}`}
    />
  );
}

/** A plain-paper certificate: heading, standard, ruled lines, seal ribbon. */
function Certificate() {
  return (
    <div
      aria-hidden
      className="absolute left-[27%] top-[6%] h-[64%] w-[46%] rounded-[0.35rem] bg-white shadow-[0_30px_60px_-24px_rgba(9,78,48,0.35),0_2px_6px_rgba(9,78,48,0.08)]"
    >
      <div className="absolute inset-[5%] rounded-[0.2rem] border border-ink-300/40">
        <div className="absolute inset-[3%] rounded-[0.15rem] border border-ink-300/25" />
      </div>

      {/* Ribbon + seal, top right. */}
      <div className="absolute right-[9%] top-0 flex h-[28%] w-[16%] flex-col items-center bg-gradient-to-b from-brand-700 to-brand-600 [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)]">
        <span className="mt-auto mb-[28%] grid aspect-square w-[82%] place-items-center rounded-full bg-white/95 ring-2 ring-brand-500/60">
          <span className="aspect-square w-[62%] rounded-full bg-brand-600/85" />
        </span>
      </div>

      <div className="absolute inset-x-[12%] top-[20%] text-center">
        <p className="font-serif text-[clamp(0.7rem,1.6vw,1.1rem)] tracking-[0.08em] text-ink-600">
          CERTIFICATE
        </p>
        <p className="mt-[6%] text-[clamp(0.5rem,1vw,0.72rem)] font-semibold text-ink-800">
          {STANDARD}
        </p>
        <div className="mx-auto mt-[12%] space-y-[0.4rem]">
          <span className="block h-[3px] w-full rounded bg-ink-300/40" />
          <span className="block h-[3px] w-[88%] rounded bg-ink-300/30" />
          <span className="block h-[3px] w-[94%] rounded bg-ink-300/30" />
          <span className="block h-[3px] w-[70%] rounded bg-ink-300/25" />
        </div>
      </div>

      <Globe2
        className="absolute bottom-[14%] right-[18%] size-[14%] text-ink-400/70"
        strokeWidth={1.2}
      />
      <span className="absolute bottom-[16%] left-[16%] h-px w-[28%] bg-ink-300/50" />
    </div>
  );
}

/** Microscope and glassware on a low plinth — inline SVG, brand-neutral greys. */
function Lab() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 260"
      className="absolute right-[0%] top-[27%] w-[35%] drop-shadow-[0_18px_24px_rgba(9,78,48,0.18)]"
    >
      <defs>
        <linearGradient id="iso-steel" x1="0" x2="1">
          <stop offset="0" stopColor="#f4f6f5" />
          <stop offset="0.55" stopColor="#dde3df" />
          <stop offset="1" stopColor="#b9c2bc" />
        </linearGradient>
        <linearGradient id="iso-dark" x1="0" x2="1">
          <stop offset="0" stopColor="#3a423d" />
          <stop offset="1" stopColor="#1c2320" />
        </linearGradient>
        <linearGradient id="iso-glass" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#dfeee5" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Microscope */}
      <rect x="44" y="210" width="92" height="16" rx="5" fill="url(#iso-steel)" />
      <path d="M100 212h26c10-46 6-96-22-130l-18 13c22 30 24 72 14 117z" fill="url(#iso-steel)" />
      <rect x="48" y="150" width="68" height="9" rx="2" fill="url(#iso-dark)" />
      <rect x="70" y="159" width="10" height="20" rx="2" fill="url(#iso-steel)" />
      <g transform="rotate(-18 86 124)">
        <rect x="74" y="36" width="24" height="84" rx="7" fill="url(#iso-steel)" />
        <rect x="78" y="18" width="16" height="22" rx="3" fill="url(#iso-dark)" />
        <rect x="79" y="118" width="14" height="20" rx="2" fill="url(#iso-dark)" />
        <rect x="74" y="72" width="24" height="7" fill="#2a3830" opacity="0.45" />
      </g>
      <circle cx="116" cy="166" r="11" fill="url(#iso-dark)" />
      <circle cx="116" cy="166" r="5" fill="#8a918c" />

      {/* Test-tube rack */}
      <rect x="128" y="214" width="62" height="10" rx="2" fill="url(#iso-steel)" />
      {[138, 154, 170].map((x) => (
        <g key={x}>
          <rect x={x - 5} y="176" width="10" height="42" rx="5" fill="url(#iso-glass)" stroke="#c6d3ca" />
          <rect x={x - 4} y="200" width="8" height="17" rx="4" fill="#2a3830" opacity="0.8" />
        </g>
      ))}

      {/* Beaker with a sprout */}
      <path d="M150 162h26v48a6 6 0 0 1-6 6h-14a6 6 0 0 1-6-6z" fill="url(#iso-glass)" stroke="#c6d3ca" />
      <path d="M163 208c0-18 0-30 2-44" stroke="#16a05c" strokeWidth="2" fill="none" />
      <path d="M164 176c-10-2-16-10-16-18 8 0 16 6 16 18z" fill="#43b87a" />
      <path d="M165 168c6-10 16-12 22-10-2 8-10 14-22 10z" fill="#16a05c" />
    </svg>
  );
}

function Scene() {
  return (
    <div className="relative mx-auto aspect-[20/17] w-full max-w-[40rem]">
      {/* Soft ground */}
      <span
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-brand-300/25 blur-3xl"
      />
      <Leaf className="-left-[6%] -top-[4%] w-[26%] rotate-[-24deg] opacity-40 blur-[3px]" />
      <Leaf className="-bottom-[8%] -left-[10%] w-[34%] rotate-[18deg] opacity-60 blur-[6px]" />

      {/* Pale panels behind the certificate and the lab */}
      <span
        aria-hidden
        className="absolute left-[34%] top-[1%] h-[66%] w-[40%] rounded-[1.25rem] bg-gradient-to-b from-brand-100/80 to-brand-50/30"
      />
      <span
        aria-hidden
        className="absolute right-[0%] top-[28%] h-[42%] w-[28%] rounded-[1rem] bg-gradient-to-b from-brand-100/70 to-transparent"
      />

      {/* Lab plinth */}
      <span
        aria-hidden
        className="absolute bottom-[21%] right-[-1%] h-[9%] w-[36%] rounded-[50%] bg-gradient-to-b from-white to-[#e6ece8] shadow-[0_10px_24px_-8px_rgba(9,78,48,0.25)]"
      />

      <Certificate />
      <Lab />

      {/* Main podium: top face + side band */}
      <span
        aria-hidden
        className="absolute bottom-[6%] left-[2%] h-[16%] w-[72%] rounded-[50%] bg-gradient-to-b from-[#e7ece9] to-[#cfd8d2] shadow-[0_30px_40px_-18px_rgba(9,78,48,0.35)]"
      />
      <span
        aria-hidden
        className="absolute bottom-[11%] left-[2%] h-[15%] w-[72%] rounded-[50%] bg-gradient-to-b from-white via-[#f6f8f7] to-[#e9eeeb] ring-1 ring-white"
      />

      {/* The mark */}
      <div className="absolute bottom-[14%] left-[8%] w-[46%]">
        <Image
          src={images.certification.iso.src}
          alt={images.certification.iso.alt}
          width={346}
          height={288}
          sizes="(min-width: 1024px) 290px, 45vw"
          className="badge-float relative w-full drop-shadow-[0_24px_36px_rgba(9,78,48,0.35)]"
        />
      </div>

      {/* Foreground leaves at the podium's edge */}
      <Leaf className="bottom-[9%] left-[40%] w-[20%] rotate-[118deg]" />
      <Leaf className="bottom-[15%] left-[48%] w-[13%] rotate-[62deg] opacity-95" />
    </div>
  );
}

/* ---- Section ----------------------------------------------------------- */

export function IsoCertification({ ground = "light" }: { ground?: "light" | "tint" }) {
  return (
    <Section ground={ground} labelledBy="iso-heading" className="relative overflow-hidden">
      {/* Faint leaf in the far corner, as in the backdrop of the mock. */}
      <Leaf className="-right-[7%] -top-[10%] hidden w-[20rem] rotate-[160deg] opacity-[0.07] blur-[3px] lg:block" />

      <Shell size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ---- The scene ------------------------------------------------- */}
          <Reveal className="order-2 lg:order-1">
            <Scene />
          </Reveal>

          {/* ---- The claim ------------------------------------------------- */}
          <div className="relative order-1 lg:order-2">
            <Reveal>
              <p className="text-eyebrow inline-flex items-center gap-2 text-brand-700">
                <span aria-hidden className="size-1.5 rounded-full bg-current" />
                Certified quality
                <span aria-hidden className="h-px w-6 bg-current" />
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id="iso-heading" className="text-h2 mt-4 text-ink-900">
                An <span className="text-brand-600">{STANDARD}</span>
                <br className="hidden sm:block" /> certified company
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
                      className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-4 shadow-[0_18px_40px_-28px_rgba(9,78,48,0.35)] transition-[border-color,transform] duration-400 hover:-translate-y-0.5 hover:border-brand-300 sm:flex-col sm:items-start sm:gap-0 sm:p-5"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="min-w-0 sm:mt-5">
                        <span className="block text-[0.7rem] font-bold uppercase leading-snug tracking-[0.14em] text-ink-400 sm:min-h-[2.2rem]">
                          {marker.label}
                        </span>
                        <span aria-hidden className="mt-2 block h-0.5 w-8 rounded-full bg-brand-500 sm:mt-3" />
                        <span className="mt-2 block font-display text-[1rem] font-bold text-ink-900 sm:mt-3">
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
