import { Beaker, Package } from 'lucide-react'
import type { Product } from '@/types/product'

/**
 * Application rate and pack sizes, given prominence.
 *
 * These two fields are the only technical data the legacy site publishes for
 * any product, and they were buried in a wall of inline-styled body copy. They
 * are also the two things a grower actually needs. Rendering them in tabular
 * mono, immediately under the product name, is the single highest-value change
 * on the product page.
 *
 * Markup note: inside a `<dl>`, a wrapping `<div>` may contain only `<dt>` and
 * `<dd>`. The decorative icon therefore lives inside the `<dt>` rather than
 * beside it — nesting `dt`/`dd` inside a second `div` is invalid and breaks the
 * list semantics for screen readers.
 */
export function DosageStrip({ product }: { product: Product }) {
  if (!product.ratio && !product.packing) return null

  return (
    <dl className="border-hairline bg-surface-sunken grid gap-px border sm:grid-cols-2">
      {product.ratio && (
        <div className="bg-surface p-6">
          <dt className="eyebrow flex items-center gap-2">
            <Beaker aria-hidden="true" className="text-accent size-4 shrink-0" />
            Application rate
          </dt>
          <dd className="data-value text-ink mt-3">{product.ratio}</dd>
        </div>
      )}

      {product.packing && (
        <div className="bg-surface p-6">
          <dt className="eyebrow flex items-center gap-2">
            <Package aria-hidden="true" className="text-accent size-4 shrink-0" />
            Pack sizes
          </dt>
          <dd className="data-value text-ink mt-3">{product.packing}</dd>
        </div>
      )}
    </dl>
  )
}
