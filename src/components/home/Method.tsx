import { ArrowRight, BookOpen, FlaskConicalOff, GlassWater, Leaf } from "lucide-react";

import { Button, Reveal, Shell } from "@/components/ui";

/**
 * THE THREE PRINCIPLES
 * ====================
 * SCT's own method, from docs/sct-legacy-content.md §3.3.
 *
 * Two things were repaired in carrying it across. On the live site the three
 * modals have their bullets shuffled between them — the "Method" popup carries
 * a Meditation bullet, the "Meditation" popup carries a Rule bullet. They are
 * regrouped correctly here. And SCT's own names are kept, because Method /
 * Rule / Meditation is their vocabulary, but each gets a plain second line so a
 * first-time reader knows what it means without opening anything.
 *
 * Laid out as an infographic — Method and Rule either side of a living plant,
 * Meditation beneath it, all three joined by one orbit — because SCT's own
 * position is that all three together is what "100% SCT" means.
 */

const PRINCIPLES = [
  {
    number: "01",
    name: "Method",
    plain: "What to give, and how often",
    icon: GlassWater,
    tone: "brand",
    points: [
      "A basal dose of Krushi Amrut, Root Charger and Nutri Charger every 60 days, as the plant needs it.",
      "At least once a week, through soil, drip or drenching: Soil Charger 1 litre and Health Charger 600 g per acre.",
      "Every spray mixed with a Fruit Charger.",
    ],
  },
  {
    number: "02",
    name: "Rule",
    plain: "What never to do",
    icon: FlaskConicalOff,
    tone: "saffron",
    points: [
      "No chemical fertiliser at all — granular or water-soluble.",
      "No cultivation that moves or exposes the soil. Do not cut weeds in the rain; wait for dry weather.",
      "For crop protection use only Pest Fighter, Pest Cleaner, Disease Fighter and Fungi Cleaner. No chemicals.",
    ],
  },
  {
    number: "03",
    name: "Meditation",
    plain: "Learning, every single day",
    icon: BookOpen,
    tone: "earth",
    points: [
      "Watch the daily video and make notes. SCT calls this the breath of SCT Vedic.",
      "Read the daily article in the WhatsApp group. This is the water.",
      "Three to five minutes a day talking to another SCT farmer. This is the food.",
    ],
  },
] as const;

type Principle = (typeof PRINCIPLES)[number];

const TONE = {
  brand: {
    rail: "border-t-brand-600",
    badge: "bg-brand-50 text-brand-700 ring-brand-100",
    title: "text-brand-900",
    bar: "bg-brand-600",
    bullet: "text-brand-600",
    blob: "bg-[radial-gradient(circle,var(--color-brand-100)_0%,transparent_70%)] text-brand-700",
  },
  saffron: {
    rail: "border-t-saffron-500",
    badge: "bg-saffron-50 text-saffron-600 ring-saffron-100",
    title: "text-ink-900",
    bar: "bg-saffron-500",
    bullet: "text-saffron-500",
    blob: "bg-[radial-gradient(circle,var(--color-saffron-100)_0%,transparent_70%)] text-earth-700",
  },
  earth: {
    rail: "border-t-earth-600",
    badge: "bg-earth-50 text-earth-700 ring-earth-100",
    title: "text-earth-800",
    bar: "bg-earth-600",
    bullet: "text-earth-600",
    blob: "bg-[radial-gradient(circle,var(--color-earth-100)_0%,transparent_70%)] text-earth-700",
  },
} as const;

function PrincipleCard({ principle }: { principle: Principle }) {
  const Icon = principle.icon;
  const tone = TONE[principle.tone];
  return (
    <article
      className={`group relative h-full rounded-[1.4rem] border border-t-2 border-white/80 bg-white/88 p-6 shadow-[0_24px_60px_-28px_rgba(16,58,32,0.38)] backdrop-blur-md transition-all duration-400 [transition-timing-function:var(--ease-expressive)] motion-safe:hover:-translate-y-1 hover:shadow-[0_30px_70px_-26px_rgba(16,58,32,0.45)] sm:p-7 ${tone.rail}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`grid size-12 place-items-center rounded-full font-serif text-lg font-semibold ring-1 ring-inset ${tone.badge}`}
          >
            {principle.number}
          </span>
          <h3
            className={`mt-3 font-serif text-[1.9rem] font-bold leading-none tracking-tight sm:text-[2.1rem] ${tone.title}`}
          >
            {principle.name}
          </h3>
          <p className="mt-2 text-[0.95rem] text-ink-500">{principle.plain}</p>
          <span aria-hidden className={`mt-4 block h-0.5 w-9 rounded-full ${tone.bar}`} />
        </div>

        <span
          aria-hidden
          className={`relative grid size-24 shrink-0 place-items-center rounded-full transition-transform duration-500 motion-safe:group-hover:scale-105 ${tone.blob}`}
        >
          <Icon className="size-11" strokeWidth={1.5} />
          <Leaf className="absolute right-3 top-3 size-5 rotate-12 fill-leaf-400 text-leaf-600" />
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {principle.points.map((point) => (
          <li key={point} className="flex gap-3 text-[0.93rem] leading-relaxed text-ink-700">
            <Leaf
              aria-hidden
              className={`mt-[0.28em] size-4 shrink-0 -rotate-45 fill-current ${tone.bullet}`}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* --------------------------------------------------------------------------
   The centrepiece: a sprout in a sphere of soil, roots showing, circled by one
   orbit that changes colour through the three principles.
   -------------------------------------------------------------------------- */

const LEAF = "M0 0 C 10 -18, 44 -26, 62 -6 C 44 10, 14 12, 0 0 Z";
const RIB = "M3 -1 C 20 -8, 40 -10, 58 -6";

function SproutLeaf({ transform, small = false }: { transform: string; small?: boolean }) {
  return (
    <g transform={transform}>
      <path d={LEAF} fill={small ? "url(#m-leaf-soft)" : "url(#m-leaf)"} />
      <path d={RIB} fill="none" stroke="#dff2c6" strokeOpacity="0.7" strokeWidth="1.2" />
    </g>
  );
}

const SPECKS = Array.from({ length: 46 }, (_, i) => ({
  x: 78 + ((i * 53) % 245),
  y: 212 + ((i * 37) % 112),
  r: 0.8 + ((i * 7) % 5) * 0.35,
}));

function SystemVisual() {
  return (
    <svg
      viewBox="-40 -10 480 435"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="A young plant growing from healthy soil with its roots showing, circled by the three principles: healthy soil, stronger crops, sustainable farming."
    >
      <defs>
        <clipPath id="m-sphere">
          <circle cx="200" cy="200" r="116" />
        </clipPath>
        <radialGradient id="m-sky" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#fffdf1" />
          <stop offset="60%" stopColor="#eef5e2" />
          <stop offset="100%" stopColor="#d9ead0" />
        </radialGradient>
        <linearGradient id="m-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e4629" />
          <stop offset="45%" stopColor="#452a17" />
          <stop offset="100%" stopColor="#24150b" />
        </linearGradient>
        <linearGradient id="m-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2f8a36" />
          <stop offset="55%" stopColor="#5fb043" />
          <stop offset="100%" stopColor="#a6d85f" />
        </linearGradient>
        <linearGradient id="m-leaf-soft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6cb454" />
          <stop offset="100%" stopColor="#b6e18f" />
        </linearGradient>
        <linearGradient id="m-stem" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3d7a2c" />
          <stop offset="100%" stopColor="#7cc04f" />
        </linearGradient>
        <linearGradient id="m-arc-top" gradientUnits="userSpaceOnUse" x1="31" y1="155" x2="369" y2="155">
          <stop offset="0%" stopColor="var(--color-brand-600)" />
          <stop offset="100%" stopColor="var(--color-saffron-500)" />
        </linearGradient>
        <linearGradient id="m-arc-right" gradientUnits="userSpaceOnUse" x1="369" y1="155" x2="200" y2="375">
          <stop offset="0%" stopColor="var(--color-saffron-500)" />
          <stop offset="100%" stopColor="var(--color-earth-600)" />
        </linearGradient>
        <linearGradient id="m-arc-left" gradientUnits="userSpaceOnUse" x1="200" y1="375" x2="31" y2="155">
          <stop offset="0%" stopColor="var(--color-earth-600)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
        <radialGradient id="m-halo" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connectors out to the side cards (desktop only reads them as such). */}
      <path d="M-40 150 L22 155" stroke="var(--color-brand-600)" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M378 155 L440 150" stroke="var(--color-saffron-500)" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* The orbit. */}
      <path d="M31 155 A175 175 0 0 1 369 155" fill="none" stroke="url(#m-arc-top)" strokeWidth="2" />
      <path d="M369 155 A175 175 0 0 1 200 375" fill="none" stroke="url(#m-arc-right)" strokeWidth="2" />
      <path d="M200 375 A175 175 0 0 1 31 155" fill="none" stroke="url(#m-arc-left)" strokeWidth="2" />
      <circle
        className="method-orbit"
        cx="200"
        cy="200"
        r="152"
        fill="none"
        stroke="var(--color-brand-700)"
        strokeOpacity="0.18"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />

      {/* Leaves riding the orbit. */}
      <SproutLeaf small transform="translate(62 70) rotate(-150) scale(0.5)" />
      <SproutLeaf small transform="translate(338 70) scale(-1 1) rotate(-150) scale(0.5)" />
      <SproutLeaf small transform="translate(74 318) rotate(160) scale(0.45)" />
      <SproutLeaf small transform="translate(326 318) scale(-1 1) rotate(160) scale(0.45)" />

      {/* The sphere: halo, sky, soil, roots. */}
      <circle cx="200" cy="200" r="132" fill="url(#m-halo)" />
      <g clipPath="url(#m-sphere)">
        <rect x="60" y="60" width="280" height="280" fill="url(#m-sky)" />
        <path
          d="M60 204 Q100 192 140 200 T220 198 T300 202 T350 196 L350 340 L60 340 Z"
          fill="url(#m-soil)"
        />
        {SPECKS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#a0703f" fillOpacity={0.35} />
        ))}
        <g fill="none" stroke="#ecd0a6" strokeLinecap="round">
          <path d="M200 200 C 199 240, 204 272, 198 330" strokeWidth="3.2" />
          <path d="M200 212 C 180 230, 160 240, 138 272" strokeWidth="2.2" />
          <path d="M200 212 C 222 232, 245 240, 264 274" strokeWidth="2.2" />
          <path d="M199 232 C 175 256, 170 282, 158 314" strokeWidth="1.8" />
          <path d="M201 234 C 224 260, 230 286, 244 316" strokeWidth="1.8" />
          <path d="M198 252 C 185 272, 188 298, 178 326" strokeWidth="1.4" />
          <path d="M202 254 C 214 276, 212 302, 224 328" strokeWidth="1.4" />
          <g strokeWidth="0.9" strokeOpacity="0.8">
            <path d="M172 236 C 160 244, 148 243, 124 250" />
            <path d="M230 238 C 245 246, 258 245, 280 250" />
            <path d="M150 262 C 140 276, 128 286, 116 302" />
            <path d="M252 266 C 262 280, 276 288, 288 304" />
            <path d="M170 290 C 158 300, 150 316, 146 332" />
            <path d="M232 292 C 244 304, 252 318, 256 334" />
            <path d="M138 272 C 126 276, 112 274, 100 280" />
            <path d="M264 274 C 278 278, 290 276, 302 282" />
          </g>
        </g>
        <SproutLeaf small transform="translate(118 200) rotate(-60) scale(0.3)" />
        <SproutLeaf small transform="translate(286 202) scale(-1 1) rotate(-60) scale(0.3)" />
      </g>
      <circle cx="200" cy="200" r="116" fill="none" stroke="#ffffff" strokeWidth="5" />
      <circle cx="200" cy="200" r="121" fill="none" stroke="var(--color-brand-700)" strokeOpacity="0.1" />

      {/* The sprout breaks out of the sphere. */}
      <g className="method-sway">
        <path d="M200 202 C 198 170, 203 138, 200 76" fill="none" stroke="url(#m-stem)" strokeWidth="5" strokeLinecap="round" />
        <SproutLeaf transform="translate(200 180) scale(-1 1) rotate(-14) scale(0.95)" />
        <SproutLeaf transform="translate(200 172) rotate(-18) scale(0.95)" />
        <SproutLeaf transform="translate(200 146) scale(-1 1) rotate(-30) scale(1.1)" />
        <SproutLeaf transform="translate(200 138) rotate(-32) scale(1.1)" />
        <SproutLeaf transform="translate(200 112) scale(-1 1) rotate(-48) scale(0.85)" />
        <SproutLeaf transform="translate(200 106) rotate(-50) scale(0.85)" />
        <SproutLeaf transform="translate(200 80) scale(-1 1) rotate(-72) scale(0.55)" />
        <SproutLeaf transform="translate(200 78) rotate(-76) scale(0.6)" />
      </g>

      {/* The three nodes. */}
      {[
        { x: 31, y: 155, c: "var(--color-brand-600)" },
        { x: 369, y: 155, c: "var(--color-saffron-500)" },
        { x: 200, y: 375, c: "var(--color-earth-600)" },
      ].map((n) => (
        <g key={n.x}>
          <circle className="method-pulse" cx={n.x} cy={n.y} r="10" fill={n.c} />
          <circle cx={n.x} cy={n.y} r="10" fill={n.c} stroke="#fff" strokeWidth="3.5" />
        </g>
      ))}

      <g className="fill-ink-700 font-sans" fontSize="12.5" fontWeight="600" textAnchor="middle">
        <text x="56" y="194">Healthy</text>
        <text x="56" y="210">Soil</text>
        <text x="344" y="194">Stronger</text>
        <text x="344" y="210">Crops</text>
        <text x="200" y="404">Sustainable</text>
        <text x="200" y="420">Farming</text>
      </g>
    </svg>
  );
}

export function Method({ cta = true }: { cta?: boolean }) {
  const [method, rule, meditation] = PRINCIPLES;
  return (
    <section
      aria-labelledby="method-heading"
      className="section-y relative isolate overflow-hidden bg-[linear-gradient(180deg,#fbfcf7_0%,#f2f7ec_55%,#eef3e4_100%)]"
    >
      {/* Ground: a field fading in from below, warm light from the right, soil at the foot. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[url('/images/hero/field-landscape-1600.webp')] bg-cover bg-bottom opacity-30 [mask-image:linear-gradient(to_top,#000_0%,#000_30%,transparent_100%)]" />
        <div className="absolute -right-40 bottom-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,196,110,0.45)_0%,transparent_65%)] blur-2xl" />
        <div className="absolute -left-40 top-20 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(119,210,157,0.25)_0%,transparent_65%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_top,rgba(74,46,26,0.55),rgba(74,46,26,0.15)_55%,transparent)]" />
        <img
          src="/images/legacy/leaf.png"
          alt=""
          className="absolute -bottom-6 -left-8 w-40 rotate-[20deg] opacity-70 blur-[2px] sm:w-52"
        />
        <img
          src="/images/legacy/leaf.png"
          alt=""
          className="absolute -bottom-10 -right-6 w-32 -rotate-[30deg] opacity-60 blur-[3px] sm:w-44"
        />
      </div>

      <Shell size="wide">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="text-eyebrow inline-flex items-center gap-3 text-brand-800">
              <span aria-hidden className="h-px w-10 bg-brand-700/50 sm:w-16" />
              <Leaf aria-hidden className="size-4 -rotate-45 fill-brand-700 text-brand-700" />
              <span className="tracking-[0.22em]">The method</span>
              <span aria-hidden className="h-px w-10 bg-brand-700/50 sm:w-16" />
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="method-heading"
              className="mt-4 font-serif text-[2.3rem] font-bold leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[3.6rem]"
            >
              Three principles. <span className="text-brand-700">One living system.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-700 sm:text-[1.08rem]">
              SCT calls a farmer who follows all three a 100% SCT user. Two out of three is where
              most of the problems come from — the products are built assuming the whole system is
              running.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,31rem)_minmax(0,1fr)]">
          <Reveal className="mx-auto w-full max-w-sm lg:col-start-2 lg:row-start-1 lg:max-w-none">
            <SystemVisual />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-start-1 lg:row-start-1 lg:mt-4">
            <PrincipleCard principle={method} />
          </Reveal>

          <Reveal delay={0.16} className="lg:col-start-3 lg:row-start-1 lg:mt-4">
            <PrincipleCard principle={rule} />
          </Reveal>

          <Reveal
            delay={0.24}
            className="relative z-10 lg:col-span-3 lg:row-start-2 lg:mx-auto lg:-mt-1 lg:w-full lg:max-w-[38rem]"
          >
            <PrincipleCard principle={meditation} />
          </Reveal>
        </div>

        {/* Redundant on /technology, which is where the link goes. */}
        {cta && (
          <Reveal delay={0.12} className="relative z-10 mt-8 flex justify-center">
            <Button href="/technology" size="lg" className="group px-9">
              See the full method
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              />
            </Button>
          </Reveal>
        )}
      </Shell>
    </section>
  );
}
