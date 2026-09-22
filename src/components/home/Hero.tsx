import { ArrowRight, Leaf, Phone, ShieldCheck, Sprout } from "lucide-react";

import { Brand, NoTranslate } from "@/components/common/NoTranslate";
import { Button, Eyebrow, Reveal, Shell } from "@/components/ui";
import { images } from "@/data/images";
import { categoryCount } from "@/data/products";
import { contact, site, stats } from "@/data/site";
import { formatNumber, telHref } from "@/lib/utils";
import Image from "@/shims/Image";

/**
 * HERO
 * ====
 * A two-column opening rather than a full-bleed photograph with text laid over
 * it. Three reasons, all of them the reference's:
 *
 *   · The headline sits on paper, so it is legible at every viewport without
 *     a scrim fighting the photograph underneath it.
 *   · The page begins with words, not with atmosphere. An institution says
 *     what it is in the first line.
 *   · It costs one image instead of a video, which matters on a 3G connection
 *     in a field.
 *
 * The photograph still carries the emotion — it is simply beside the argument
 * instead of behind it.
 */
export function Hero() {
  const photo = images.hero.main;

  return (
    <section aria-labelledby="hero-title" className="ground-canvas relative overflow-hidden">
      <Shell className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-16">
        {/* ---- The argument ---------------------------------------------- */}
        <div>
          <Reveal>
            <Eyebrow>Soil-first agriculture · Since {site.founded}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 id="hero-title" className="text-display mt-4 text-ink-900">
              Feed the soil,
              <br />
              and the crop follows.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <span aria-hidden className="rule-harvest mt-5" />
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-lead mt-6 max-w-xl text-ink-500">
              <Brand pad="after" /> makes organic inputs that rebuild organic carbon, strengthen the
              root zone and let a crop feed itself — {categoryCount} products across two
              ranges, developed in Nashik and used by farmers across India.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/products" size="lg">
                See the products
                <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href={telHref(contact.phones[0])} variant="secondary" size="lg">
                <Phone aria-hidden className="size-4" />
                <NoTranslate className="tabular-nums">{contact.phones[0]}</NoTranslate>
              </Button>
            </div>
          </Reveal>

          {/* A quiet line of reassurance, not a row of badges. */}
          <Reveal delay={0.22}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink-100 pt-6 text-xs text-ink-500">
              {[
                { icon: Leaf, label: "No chemical fertiliser" },
                { icon: Sprout, label: "Built on organic carbon" },
                { icon: ShieldCheck, label: "Safe for soil life" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon aria-hidden className="size-3.5 shrink-0 text-forest-600" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- The photograph -------------------------------------------- */}
        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink-100 shadow-card sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>

          {/* The founding year, set on the photograph. One figure, because a
              hero that carries four of them is a dashboard, not an opening. */}
          <div className="absolute -bottom-4 left-4 rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-card sm:left-6">
            <p className="font-display text-2xl font-bold tabular-nums text-forest-800">
              {site.founded}
            </p>
            <p className="text-meta mt-1 text-ink-500">Working on soil since</p>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

/**
 * STAT BAND
 * =========
 * A thin forest strip directly under the hero. It is deliberately not part of
 * the hero: figures are evidence, and evidence belongs after the claim.
 */
export function StatBand() {
  return (
    <section aria-label="Soil Charger Technology at a glance" className="ground-forest grain relative overflow-hidden">
      <span aria-hidden className="edge-harvest" />
      <span aria-hidden className="grain-layer" />

      <Shell className="relative grid grid-cols-2 gap-x-6 gap-y-8 py-9 lg:grid-cols-4 lg:py-10">
        {stats.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 0.05}>
            <div className="lg:border-l lg:border-white/10 lg:pl-6">
              <p className="font-display text-3xl font-bold tabular-nums text-harvest-400">
                {stat.value === null
                  ? "—"
                  : stat.format === "year"
                    ? String(stat.value)
                    : formatNumber(stat.value)}
                {stat.suffix ?? ""}
              </p>
              <p className="text-meta mt-2 text-white/70">{stat.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">{stat.caption}</p>
            </div>
          </Reveal>
        ))}
      </Shell>
    </section>
  );
}
