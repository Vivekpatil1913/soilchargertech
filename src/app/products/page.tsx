import type { Metadata } from 'next'
import { Container, Eyebrow, Section } from '@/components/ui'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ProductFilter } from '@/components/products/ProductFilter'
import { ProductGrid } from '@/components/products/ProductGrid'
import { content } from '@/lib/content/repository'
import type { ProductLine } from '@/types/product'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Twenty-one products across two ranges — the original Super range and the later SCT Vedic range — for soil, root, leaf, fruit and plant protection.',
  alternates: { canonical: '/products' },
}

function parseLine(value: string | string[] | undefined): ProductLine | null {
  const raw = Array.isArray(value) ? value[0] : value
  return raw === 'super' || raw === 'vedic' ? raw : null
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const active = parseLine(params.line)

  const [all, lines] = await Promise.all([content.getProducts(), content.getProductLines()])

  const counts = Object.fromEntries(
    lines.map((line) => [line.id, all.filter((product) => product.line === line.id).length])
  )

  const products = active ? all.filter((product) => product.line === active) : all
  const activeLine = lines.find((line) => line.id === active)

  return (
    <>
      <section className="surface-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hairline-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="relative">
          <Breadcrumb crumbs={[{ label: 'Products' }]} />
          <Container>
            <div className="flex flex-col gap-8 pt-8 pb-20 lg:pt-16 lg:pb-24">
              <Eyebrow>Products</Eyebrow>
              <h1 className="text-display-lg max-w-3xl">
                {activeLine ? `${activeLine.name} range` : 'Two ranges, twenty-one products'}
              </h1>
              <p className="text-body-lg text-ink-muted max-w-2xl">
                {activeLine
                  ? activeLine.description
                  : 'The original Super range and the later SCT Vedic range, applied to soil, root, leaf, fruit and plant protection.'}
              </p>
            </div>
          </Container>
        </div>
      </section>

      <Section rhythm="compact">
        <ProductFilter lines={lines} active={active} counts={counts} total={all.length} />

        <div className="mt-10">
          <p className="eyebrow mb-8" aria-live="polite">
            Showing {products.length} of {all.length}
          </p>
          <ProductGrid products={products} />
        </div>
      </Section>
    </>
  )
}
