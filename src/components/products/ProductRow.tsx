import { ArrowUpRight, Package } from "lucide-react";

import type { Category, Product } from "@/data/products";
import { cn } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * ONE PRODUCT INSIDE A CATEGORY
 * =============================
 * A row rather than a card. Every product in a category shares the same
 * description, benefits and dosage — those belong to the category and are
 * stated once above this list. What differs between them is the pack, so the
 * pack is what this row leads with.
 *
 * A grid of near-identical cards would imply more difference between them than
 * actually exists, and would push the category's own information off the
 * screen.
 */
export function ProductRow({
  product,
  category,
  className,
}: {
  product: Product;
  category: Category;
  className?: string;
}) {
  return (
    <Link
      href={`/products/${category.slug}/${product.slug}`}
      className={cn(
        "group flex items-center gap-4 rounded-2xl border border-hairline bg-white p-4 transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:border-brand-300 hover:shadow-card motion-safe:hover:-translate-y-0.5 sm:gap-5 sm:p-5",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-squircle ring-1 ring-inset transition-transform duration-400 motion-safe:group-hover:scale-110 sm:size-14",
          category.range === "vedic"
            ? "bg-brand-50 text-brand-700 ring-brand-200"
            : "bg-saffron-50 text-saffron-700 ring-saffron-200",
        )}
      >
        <Package aria-hidden className="size-5 sm:size-6" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2.5">
          <span className="font-display text-[1rem] font-bold text-ink-900">
            {product.pack ?? product.name}
          </span>

          {product.provisional ? (
            <span className="rounded-full bg-saffron-50 px-2.5 py-0.5 text-[0.68rem] font-semibold text-saffron-700 ring-1 ring-inset ring-saffron-200">
              Awaiting confirmation
            </span>
          ) : null}
        </span>

        <span className="mt-1 block text-[0.86rem] leading-snug text-ink-500">
          {product.note ?? `${category.name} — ${product.pack ?? "pack size on request"}`}
        </span>
      </span>

      <ArrowUpRight
        aria-hidden
        className="size-5 shrink-0 text-brand-600 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
