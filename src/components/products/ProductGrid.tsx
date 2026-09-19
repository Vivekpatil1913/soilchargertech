"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { products as allProducts, productRanges, type ProductRange } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * The full catalogue with a range filter. Filtering is client-side over a small
 * static array — no fetch, no loading state, and the cards re-flow with a short
 * stagger so the change reads as a transition rather than a jump.
 */

type Filter = "all" | ProductRange;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All products" },
  { id: "vedic", label: productRanges.vedic.name },
  { id: "super", label: productRanges.super.name },
];

export function ProductGrid({ initialRange = "all" }: { initialRange?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialRange);

  const products = useMemo(
    () => (filter === "all" ? allProducts : allProducts.filter((p) => p.range === filter)),
    [filter],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter products by range"
        className="flex flex-wrap items-center gap-2"
      >
        {FILTERS.map((option) => {
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2.5 text-[0.85rem] font-semibold transition-colors duration-250",
                isActive
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-hairline bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {option.label}
            </button>
          );
        })}

        <p aria-live="polite" className="ml-auto text-[0.82rem] text-ink-400">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {filter !== "all" ? (
        <p className="mt-5 max-w-2xl text-[0.9rem] leading-relaxed text-ink-500">
          {productRanges[filter].description}
        </p>
      ) : null}

      <motion.ul
        key={filter}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.05)}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <motion.li key={product.id} variants={fadeUp} className="h-full">
            <ProductCard product={product} className="h-full" />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
