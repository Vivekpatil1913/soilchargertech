import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CategoryCard } from "@/components/products/CategoryCard";
import { NoTranslate } from "@/components/common/NoTranslate";
import { Button, Heading, Reveal, Section, Shell } from "@/components/ui";
import { categoriesByRange, categoryCount, featuredCategories, productRanges } from "@/data/products";
import Link from "@/shims/Link";

/**
 * PRODUCTS — THE CENTREPIECE
 * ==========================
 * The section the rest of the page exists to reach, and the only one on the
 * home page that sits on the forest ground. White cards lift off a dark band
 * far harder than off a pale one, so the catalogue gets the strongest contrast
 * available anywhere on the site — and nothing else competes for it.
 *
 * The two ranges are introduced before any individual pack: "which of these two
 * families am I looking at" is the question a visitor has before they have any
 * interest in a single product.
 *
 * Five featured categories here, not all twenty-one. The catalogue page exists
 * for the full set.
 */
export function Products() {
  const ranges = [productRanges.vedic, productRanges.super];

  return (
    <Section id="products" ground="forest" labelledBy="products-heading">
      <Shell>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            id="products-heading"
            eyebrow="What we make"
            tone="onDark"
            title="Two ranges, one foundation."
            lead="Everything SCT makes traces back to the same objective set in 2015 — give the soil a dependable source of organic carbon, and build outward from there."
            className="max-w-2xl"
          />

          <Reveal delay={0.14}>
            <Button href="/products" variant="harvest" className="shrink-0 whitespace-nowrap">
              All {categoryCount} categories
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </Reveal>
        </div>

        {/* ---- The two ranges ------------------------------------------- */}
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {ranges.map((range, index) => (
            <Reveal key={range.id} as="li" delay={index * 0.08} className="h-full">
              <Link
                href={`/products?range=${range.id}`}
                className="group flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.05] p-6 transition-colors duration-300 hover:border-harvest-400/40 hover:bg-white/[0.09] sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-eyebrow text-harvest-400">{range.tagline}</p>
                  <span className="text-meta shrink-0 tabular-nums text-white/40">
                    {categoriesByRange(range.id).length} categories
                  </span>
                </div>

                <NoTranslate as="h3" className="mt-4 font-display text-xl font-semibold text-white">
                  {range.name}
                </NoTranslate>
                <span aria-hidden className="rule-harvest-sm mt-3" />

                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
                  {range.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-harvest-300">
                  Explore the <NoTranslate pad="both">{range.name}</NoTranslate> range
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* ---- Featured categories -------------------------------------- */}
        <h3 className="text-meta mt-12 border-t border-white/10 pt-8 text-white/40">
          Where most farmers start
        </h3>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredCategories.map((category, index) => (
            <Reveal key={category.id} as="li" delay={index * 0.05} className="h-full min-w-0">
              <CategoryCard category={category} className="h-full" />
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-xs text-white/40">
          Dosage shown on every card is SCT&apos;s own published figure. Open a category to see the
          products inside it.
        </p>
      </Shell>
    </Section>
  );
}
