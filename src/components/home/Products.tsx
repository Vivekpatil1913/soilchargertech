import { ArrowRight } from "lucide-react";

import { CategoryCard } from "@/components/products/CategoryCard";
import { Button, Card, Heading, Reveal, Section, Shell } from "@/components/ui";
import { categoryCount, featuredCategories, productRanges } from "@/data/products";
import { cn } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * PRODUCTS — THE CENTREPIECE
 * ==========================
 * On the deep-green ground, because white cards lift off a dark band far
 * harder than off a pale one. This is the section the rest of the page exists
 * to reach, so it gets the strongest visual treatment on the site.
 *
 * The two ranges are introduced before any individual pack: "which of these
 * two families am I looking at" is the question a visitor has before they have
 * any interest in a single product.
 *
 * Five featured products here, not all twenty-one. The catalogue page exists
 * for the full set.
 */
export function Products() {
  const ranges = [productRanges.vedic, productRanges.super];

  return (
    <Section id="products" ground="forest" labelledBy="products-heading" fx>
      <Shell size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            id="products-heading"
            eyebrow="What we make"
            tone="onDark"
            title={
              <>
                Two ranges, <span className="text-shine">one foundation.</span>
              </>
            }
            lead="Everything SCT makes traces back to the same objective set in 2015 — give the soil a dependable source of organic carbon, and build outward from there."
            className="max-w-2xl"
          />

          <Reveal delay={0.16}>
            <Button href="/products" variant="onDark" className="shrink-0">
              View all {categoryCount} categories
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </Reveal>
        </div>

        {/* ---- The two ranges ------------------------------------------- */}
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {ranges.map((range, index) => (
            <Reveal key={range.id} as="li" delay={index * 0.1} className="h-full">
              <Card
                tone="glass"
                className={cn(
                  "h-full p-7 sm:p-8",
                  range.id === "vedic"
                    ? "hover:border-brand-400/50"
                    : "hover:border-saffron-400/50",
                )}
              >
                {/* saffron-100, not saffron-300.
                    These two eyebrows are how the Vedic and Super ranges are
                    told apart at a glance. Simulated against deuteranopia and
                    protanopia — which between them affect roughly 8% of men,
                    and this audience is overwhelmingly male — leaf-400 and
                    saffron-300 collapse to a perceptual separation of 2.3 and
                    8.1: the same colour, for those readers. saffron-100 keeps
                    the range's warm identity but carries the distinction on
                    lightness instead of hue, which survives both (25.4 / 26.4)
                    and reads more clearly on the dark ground besides. */}
                <p
                  className={cn(
                    "text-eyebrow",
                    range.id === "vedic" ? "text-leaf-400" : "text-saffron-100",
                  )}
                >
                  {range.tagline}
                </p>

                <h3 className="mt-4 font-display text-2xl font-extrabold text-white">
                  {range.name}
                </h3>

                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-sage-300/85">
                  {range.description}
                </p>

                <Link
                  href={`/products?range=${range.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-leaf-400 transition-colors hover:text-leaf-300"
                >
                  Explore the {range.name} range
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                  />
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>

        {/* ---- Featured packs ------------------------------------------- */}
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredCategories.map((category, index) => (
            <Reveal key={category.id} as="li" delay={index * 0.06} className="h-full min-w-0">
              <CategoryCard category={category} className="h-full" />
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-center text-[0.84rem] text-sage-400">
          Dosage shown on every card is SCT&apos;s own published figure. Open a category to see the products inside it.
        </p>
      </Shell>
    </Section>
  );
}
