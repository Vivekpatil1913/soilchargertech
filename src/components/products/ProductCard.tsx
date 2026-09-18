import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types/product'
import { Badge, DataValue, ImagePlaceholder } from '@/components/ui'
import { cn } from '@/lib/utils/cn'

const lineLabel = { super: 'Super', vedic: 'SCT Vedic' } as const

export function ProductCard({
  product,
  className,
  headingLevel: Heading = 'h3',
}: {
  product: Product
  className?: string
  /**
   * The card's heading level must follow the surrounding document outline.
   * On a listing page the cards sit directly under the h1, so they are h2;
   * inside a homepage section that already has an h2, they are h3.
   */
  headingLevel?: 'h2' | 'h3'
}) {
  const href = `/products/${product.slug}`

  return (
    <article
      className={cn(
        // `h-full` matters: in a grid the card may be wrapped (by Reveal, for
        // instance), and the grid stretches the wrapper rather than the card.
        // Without it, cards carrying a dosage block stand taller than those
        // that do not.
        'group bg-surface border-hairline hover:border-accent/40 relative flex h-full flex-col border transition-colors duration-250',
        className
      )}
    >
      {/*
        Packshots are `object-contain` in a square box, never `object-cover`.
        13 of the 20 product photographs are portrait — as narrow as 0.65:1 —
        so cropping them to a landscape frame slices the top and bottom off the
        packaging, taking the product name with it. A square frame wastes the
        least space across a set that is mostly portrait, and the white plate
        matches the photographs' own background so the letterboxing is invisible.
      */}
      <div className="p-4 pb-0">
        {product.image ? (
          <div className="aspect-square w-full rounded-sm bg-white p-3">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <ImagePlaceholder label={`${product.name} pack shot`} ratio="1/1" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Badge tone={product.line === 'vedic' ? 'accent' : 'neutral'}>
          {lineLabel[product.line]}
        </Badge>

        <Heading className="text-h4 font-display">
          {/* Stretched link: the whole card is the target, but only one
              focusable element exists, so keyboard order stays clean. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </Heading>

        {product.shortDescription ? (
          <p className="text-ink-muted line-clamp-3 text-[0.9375rem]">{product.shortDescription}</p>
        ) : (
          <p className="text-ink-subtle text-[0.9375rem] italic">
            Product description awaiting client copy.
          </p>
        )}

        {/* Dosage is the credibility signal — mono, up front, not buried.
            `mt-auto` lives on the footer wrapper below, not here, so the CTA
            bottom-aligns on every card regardless of what precedes it. */}
        {(product.ratio || product.packing) && (
          <dl className="border-hairline flex flex-col gap-1.5 border-t pt-4">
            {product.ratio && (
              <div className="flex gap-2">
                <dt className="eyebrow shrink-0 pt-0.5">Rate</dt>
                <dd className="data-value text-ink-muted line-clamp-1">{product.ratio}</dd>
              </div>
            )}
            {product.packing && (
              <div className="flex gap-2">
                <dt className="eyebrow shrink-0 pt-0.5">Pack</dt>
                <dd>
                  <DataValue value={product.packing} className="text-ink-muted" />
                </dd>
              </div>
            )}
          </dl>
        )}

        <span className="text-accent group-hover:text-accent-hover mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem]">
          View product
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-250 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  )
}
