import { ArrowRight } from 'lucide-react'
import { Button, Section, SectionHeading } from '@/components/ui'
import { ProductCard } from '@/components/products/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { content } from '@/lib/content/repository'

/**
 * Featured products.
 *
 * Picks the products with the most complete verified content rather than an
 * arbitrary first-six, so the homepage leads with the ones that actually have
 * functions and dosage data behind them.
 */
export async function Products() {
  const all = await content.getProducts()

  const featured = [...all]
    .sort((a, b) => {
      const score = (p: (typeof all)[number]) =>
        p.functions.length + (p.ratio ? 3 : 0) + (p.packing ? 2 : 0) + (p.shortDescription ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 6)

  return (
    <Section tone="sunken" rhythm="default">
      <SectionHeading
        index={4}
        eyebrow="Products"
        title="Two ranges, twenty-one products"
        description="The original Super range and the later SCT Vedic range, applied to soil, root, leaf, fruit and plant protection."
        action={
          <Button href="/products" variant="secondary">
            All products <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product, index) => (
          // Children stay server-rendered; Reveal only wraps them.
          <Reveal key={product.slug} delay={(index % 3) * 0.08} className="h-full">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
