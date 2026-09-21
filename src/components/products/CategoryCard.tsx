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
 * image panel with a scrim and corner badges, then name, one-line benefit, a
 * dosage marquee, and the count of products inside.
 *
 * WHY THE DOSAGE IS ON THE CARD
 * -----------------------------
 * A farmer comparing categories is not asking about mode of action. He is
 * asking how much to put and what it comes in. SCT publishes both, so both
 * appear before the click rather than a page deep. No competitor site reviewed
 * for this project does that — they stop at a name and a photograph.
 *
 * Dosage lines are long ("2–3 ml per litre, 1 to 2 times a day") and a category
 * may carry three. They scroll rather than wrap, which would leave cards in the
 * same row at different heights.
 *
 * PUT THIS CARD IN A `min-w-0` GRID OR FLEX ITEM
 * ----------------------------------------------
 * The dosage track below is `white-space: nowrap`, so the card's min-content
 * width is the full length of the longest dosage line — about 950px. A grid
 * item defaults to `min-width: auto`, which is that min-content width, so the
 * column grows to 950px and the card runs off the side of a phone. The site
 * clips horizontal overflow at the root, so it fails silently: no scrollbar,
 * just a card with its right half cut off. `min-w-0` on the item lets the
 * column take the space it actually has and the marquee clip as intended.
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

  /* Duplicated deliberately: -50% only loops seamlessly when the track holds
     the content twice. */
  const chips = category.dosage.map((line) => `${line.label} · ${line.value}`);
  const track = chips.length > 0 ? [...chips, ...chips] : [];

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

        {track.length > 0 ? (
          <div className="marquee mt-3.5 h-7">
            <div
              className="marquee-track h-full items-center gap-2 pr-2"
              style={{ "--dur": "26s" } as React.CSSProperties}
            >
              {track.map((chip, index) => (
                <span
                  key={`${chip}-${index}`}
                  className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-brand-50 px-3 py-1 text-[0.74rem] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-3.5 text-[0.76rem] text-ink-400">Dosage on request — call the SCT team.</p>
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
