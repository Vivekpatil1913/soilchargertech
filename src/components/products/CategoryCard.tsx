import { ArrowUpRight, Package } from "lucide-react";

import { Card } from "@/components/ui";
import type { Category } from "@/data/products";
import { categoryImage, productRanges } from "@/data/products";
import { cn } from "@/lib/utils";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * CATEGORY CARD
 * =============
 * One of the 21 categories. Anatomy follows docs/design-reference-scope.md §4 —
 * image panel with a scrim and corner badges, then name, one-line benefit, the
 * dosage, and the count of products inside.
 *
 * WHY THE DOSAGE IS ON THE CARD
 * -----------------------------
 * A farmer comparing categories is not asking about mode of action. He is
 * asking how much to put and what it comes in. SCT publishes both, so both
 * appear before the click rather than a page deep. No competitor site reviewed
 * for this project does that — they stop at a name and a photograph.
 *
 * WHY IT NO LONGER SCROLLS
 * ------------------------
 * Dosage lines are long ("2–3 ml per litre, 1 to 2 times a day") and a category
 * may carry three, so they used to run past in a marquee rather than wrap and
 * leave cards in a row at different heights. That was wrong twice over:
 *
 *   · Accessibility. Content that moves for more than five seconds needs a way
 *     to pause, stop or hide it (WCAG 2.2.2). The track paused on `:hover`,
 *     which does not exist on a phone — and a phone is where this card is
 *     mostly read. There was no pause at all on touch.
 *   · Its own purpose. The whole argument for putting dosage on the card is
 *     that it can be taken in at a glance while comparing categories. A figure
 *     that is sliding out of view cannot be.
 *
 * So the first line is shown in full and the rest collapse to a count. The
 * figure a farmer wants is legible and still, the card height stays fixed
 * across a row, and the full table is one tap away on the category page.
 *
 * PUT THIS CARD IN A `min-w-0` GRID OR FLEX ITEM
 * ----------------------------------------------
 * Still required. The dosage chip is `truncate`, and a truncating child only
 * shrinks if its ancestors are allowed to: a grid item defaults to
 * `min-width: auto`, which resolves to its min-content width, so the column
 * would grow to fit the longest dosage line and the card would run off the
 * side of a phone. The site clips horizontal overflow at the root, so it fails
 * silently — no scrollbar, just a card with its right half cut off.
 */
export function CategoryCard({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const range = productRanges[category.range];
  const isVedic = category.range === "vedic";

  /* The first dosage line in full, and a count for anything after it. One
     fixed-height row either way, so cards in a row stay level. */
  const [leadDosage, ...restDosage] = category.dosage;

  return (
    <Card className={cn("overflow-hidden", className)}>
      {/* 4:3 rather than the square the source files are, purely to keep the
          card short. `object-contain` still shows every pack whole, and because
          all the photographs share one canvas the packs stay the same visual
          size as each other across a row. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={categoryImage(category)}
          alt={`${category.name} product pack`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 320px"
          className="object-contain p-2 transition-transform duration-[900ms] [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-[1.06]"
        />

        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-wide text-white backdrop-blur",
            isVedic ? "bg-brand-700/90" : "bg-earth-700/90",
          )}
        >
          {range.name}
        </span>

        {category.skus.length > 0 ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-2.5 py-1 text-[0.68rem] font-semibold text-white backdrop-blur">
            <Package aria-hidden className="size-3" />
            {category.skus.length} {category.skus.length === 1 ? "product" : "products"}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-400">
          {category.group}
        </p>

        <h3 className="mt-2 font-display text-[1.02rem] font-bold leading-snug text-ink-900">
          {/* The whole card is clickable, but the link sits on the name so a
              screen reader announces it, not "read more". */}
          <Link href={`/products/${category.slug}`} className="after:absolute after:inset-0">
            {category.name}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-[0.86rem] leading-snug text-ink-500">
          {category.summary}
        </p>

        {leadDosage ? (
          <div className="mt-3.5 flex h-7 min-w-0 items-center gap-1.5">
            <span
              title={`${leadDosage.label} · ${leadDosage.value}`}
              className="inline-flex min-w-0 items-center truncate rounded-full bg-brand-50 px-3 py-1 text-[0.74rem] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100"
            >
              {leadDosage.label} · {leadDosage.value}
            </span>
            {restDosage.length > 0 ? (
              <span className="shrink-0 whitespace-nowrap text-[0.72rem] font-semibold text-ink-500">
                +{restDosage.length} more
              </span>
            ) : null}
          </div>
        ) : (
          <p className="mt-3.5 flex h-7 items-center text-[0.76rem] text-ink-500">
            Dosage on request — call the SCT team.
          </p>
        )}

        <span className="mt-3.5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-brand-700">
          View products
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Card>
  );
}
