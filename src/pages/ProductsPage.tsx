import { Globe2, MessageSquareText } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { EnquiryLauncher, ExportLauncher } from "@/components/forms/launchers";
import { ContactCta } from "@/components/home/ContactCta";
import { CategoryCard } from "@/components/products/CategoryCard";
import { Heading, Reveal, Section, Shell } from "@/components/ui";
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

/** Shared by the two enquiry cards at the foot of the page. */
const ENQUIRY_CARD =
  "group flex h-full w-full flex-col rounded-2xl border border-hairline bg-surface p-7 text-left transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:border-brand-300 hover:shadow-card motion-safe:hover:-translate-y-1";

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

      {/* ---- The two enquiry forms ------------------------------------- */}
      <Section ground="tint" labelledBy="enquiry-heading">
        <Shell size="wide">
          <Heading
            id="enquiry-heading"
            eyebrow="Ask about any of them"
            align="center"
            title="Not sure which one your field needs?"
            lead="Tick the products you are weighing up and send the question straight to the team — or, if you are buying for a whole region, start an export enquiry instead."
          />

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            <Reveal className="h-full">
              <EnquiryLauncher className={ENQUIRY_CARD}>
                <span className="grid size-12 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200 transition-transform duration-400 motion-safe:group-hover:scale-110">
                  <MessageSquareText aria-hidden className="size-6" />
                </span>
                <span className="mt-6 block font-display text-[1.15rem] font-bold leading-tight text-ink-900">
                  Product enquiry
                </span>
                <span className="mt-2.5 block flex-1 text-[0.9rem] leading-relaxed text-ink-500">
                  Tick what you are interested in, add your crop and your question, and it goes
                  straight to the team.
                </span>
                <span className="mt-6 block text-[0.9rem] font-bold text-brand-700">
                  Open the form
                </span>
              </EnquiryLauncher>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <ExportLauncher className={ENQUIRY_CARD}>
                <span className="grid size-12 place-items-center rounded-squircle bg-saffron-50 text-saffron-700 ring-1 ring-inset ring-saffron-200 transition-transform duration-400 motion-safe:group-hover:scale-110">
                  <Globe2 aria-hidden className="size-6" />
                </span>
                <span className="mt-6 block font-display text-[1.15rem] font-bold leading-tight text-ink-900">
                  Export enquiry
                </span>
                <span className="mt-2.5 block flex-1 text-[0.9rem] leading-relaxed text-ink-500">
                  Buying for a region, or shipping outside India? Tell us the quantity and where it
                  has to reach.
                </span>
                <span className="mt-6 block text-[0.9rem] font-bold text-saffron-700">
                  Open the form
                </span>
              </ExportLauncher>
            </Reveal>
          </div>
        </Shell>
      </Section>

      <ContactCta />
    </>
  );
}
