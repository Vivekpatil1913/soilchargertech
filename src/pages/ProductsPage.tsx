import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { CategoryCard } from "@/components/products/CategoryCard";
import { Reveal, Section, Shell } from "@/components/ui";
import {
  categories,
  categoriesByRange,
  categoryCount,
  productRanges,
  productsAreProvisional,
  type ProductRange,
} from "@/data/products";
import { cn } from "@/lib/utils";

type Filter = ProductRange | "all";

function isRange(value: string | null): value is ProductRange {
  return value === "vedic" || value === "super";
}

/**
 * LEVEL 1 — THE CATEGORY GRID
 * ===========================
 * All 21 categories. `?range=vedic` deep-links a filtered view, so a WhatsApp
 * message can point at one range rather than the whole list.
 *
 * Filtering is client-side and instant. Twenty-one items is far too few to
 * justify pagination or a search index.
 */
export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("range");
  const [filter, setFilter] = useState<Filter>(isRange(param) ? param : "all");

  const visible = useMemo(
    () => (filter === "all" ? categories : categoriesByRange(filter)),
    [filter],
  );

  function choose(next: Filter) {
    setFilter(next);
    // Keep the URL shareable without pushing a history entry per click.
    setSearchParams(next === "all" ? {} : { range: next }, { replace: true });
  }

  const FILTERS: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All categories", count: categoryCount },
    { id: "vedic", label: productRanges.vedic.name, count: categoriesByRange("vedic").length },
    { id: "super", label: productRanges.super.name, count: categoriesByRange("super").length },
  ];

  return (
    <>
      <Seo
        title="Products"
        description={`${categoryCount} product categories across two ranges — SCT Vedic and Super. Soil chargers, root chargers, crop nutrition and natural crop protection, with published dosage and pack sizes.`}
        path="/products"
      />

      <PageHero
        eyebrow="Our products"
        title={
          <>
            {categoryCount} categories, <span className="text-shine">two ranges.</span>
          </>
        }
        lead="Everything here traces back to the objective SCT set in 2015 — give the soil a dependable source of organic carbon, and build outward. Pick a category to see the products inside it."
      />

      <Section ground="light" labelledBy="catalogue-heading">
        <Shell size="wide">
          <h2 id="catalogue-heading" className="sr-only">
            Product categories
          </h2>

          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by range">
            {FILTERS.map((option) => {
              const active = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => choose(option.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.9rem] font-semibold transition-all duration-300",
                    active
                      ? "shadow-brand-glow border-brand-600 bg-brand-600 text-white"
                      : "border-hairline bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
                  )}
                >
                  {option.label}
                  <span className={active ? "text-brand-100" : "text-ink-400"}>{option.count}</span>
                </button>
              );
            })}
          </div>

          {/* The active range explains itself, so the filter is not just a chip. */}
          {filter !== "all" ? (
            <p className="mt-7 max-w-2xl text-[0.95rem] leading-relaxed text-ink-500">
              {productRanges[filter].description}
            </p>
          ) : null}

          <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((category, index) => (
              <Reveal
                key={category.id}
                as="li"
                delay={Math.min(index, 7) * 0.05}
                className="h-full min-w-0"
              >
                <CategoryCard category={category} className="h-full" />
              </Reveal>
            ))}
          </ul>

          <div className="mx-auto mt-12 max-w-3xl space-y-4 rounded-2xl border border-hairline bg-white p-6 text-center">
            <p className="text-[0.86rem] leading-relaxed text-ink-500">
              Descriptions, benefits, dosage and pack sizes are reproduced from SCT&apos;s own
              published material, and the photographs are SCT&apos;s own. For guidance on your crop
              and soil, call the SCT team — they will answer for your field rather than in general.
            </p>

            {productsAreProvisional ? (
              <p className="text-[0.84rem] leading-relaxed text-saffron-700">
                The individual products listed inside each category are generated from SCT&apos;s
                published pack sizes and are marked as awaiting confirmation. They will be replaced
                with SCT&apos;s own product list.
              </p>
            ) : null}
          </div>
        </Shell>
      </Section>

      <ContactCta />
    </>
  );
}
