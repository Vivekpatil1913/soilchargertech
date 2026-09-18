import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

export function ProductGrid({
  products,
  headingLevel = 'h2',
}: {
  products: Product[]
  headingLevel?: 'h2' | 'h3'
}) {
  if (products.length === 0) {
    return (
      <p className="text-ink-muted border-hairline border border-dashed p-10 text-center">
        No products match this filter.
      </p>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} headingLevel={headingLevel} />
      ))}
    </div>
  )
}
