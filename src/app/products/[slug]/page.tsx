import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import {
  Button,
  Container,
  Eyebrow,
  ImagePlaceholder,
  PlaceholderNotice,
  Section,
  SectionHeading,
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { DosageStrip } from '@/components/products/DosageStrip'
import { ProductSpecifications } from '@/components/products/ProductSpecifications'
import { ProductCard } from '@/components/products/ProductCard'
import { ContactFormLazy } from '@/components/forms/ContactFormLazy'
import { JsonLd, productJsonLd } from '@/lib/seo/jsonld'
import { content } from '@/lib/content/repository'

const lineLabel = { super: 'Super', vedic: 'SCT Vedic' } as const

/** All 21 products are known at build time, so every page prerenders. */
export async function generateStaticParams() {
  const products = await content.getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await content.getProduct(slug)
  if (!product) return {}

  // Falls back to a factual sentence rather than leaving the description empty
  // — two legacy products have no copy at all.
  const description =
    product.shortDescription ||
    `${product.name} — part of the ${lineLabel[product.line]} range from Soil Charger Technology.`

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: product.name,
      description,
      url: `/products/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await content.getProduct(slug)

  if (!product) notFound()

  const siblings = (await content.getProductsByLine(product.line))
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <section className="surface-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hairline-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="relative">
          <Breadcrumb
            crumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]}
          />

          <Container>
            <div className="grid gap-10 pt-8 pb-20 lg:grid-cols-12 lg:gap-16 lg:pt-12 lg:pb-24">
              <div className="lg:col-span-5">
                {product.image ? (
                  // Contained, not cropped — see the note in ProductCard.
                  <div className="aspect-square w-full rounded-sm bg-white p-6">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      width={product.image.width}
                      height={product.image.height}
                      priority
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder label={`${product.name} pack shot`} ratio="1/1" />
                )}
              </div>

              <div className="flex flex-col gap-6 lg:col-span-7">
                <Eyebrow>{lineLabel[product.line]} range</Eyebrow>
                <h1 className="text-display-lg">{product.name}</h1>

                {product.shortDescription ? (
                  <p className="text-body-lg text-ink-muted max-w-xl">{product.shortDescription}</p>
                ) : (
                  <p className="text-body-lg text-ink-subtle max-w-xl italic">
                    Product description awaiting client copy.
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-4">
                  <Button href="/contact">
                    Enquire about this product <ArrowRight aria-hidden="true" className="size-4" />
                  </Button>
                  <Button href="/technology/how-it-works" variant="secondary">
                    How it works
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Dosage first — it is the only hard data published, and what a grower needs. */}
      {(product.ratio || product.packing) && (
        <Section rhythm="compact">
          <DosageStrip product={product} />
        </Section>
      )}

      {product.meta.provenance !== 'verified' && (
        <Section rhythm="compact">
          <PlaceholderNotice className="max-w-3xl" label={product.name} meta={product.meta} />
        </Section>
      )}

      {product.functions.length > 0 && (
        <Section rhythm="default" tone="sunken">
          <SectionHeading
            index={1}
            eyebrow="Functions"
            title={`What ${product.name} does`}
            description="As published by the manufacturer."
          />

          <ol className="border-hairline mt-12 max-w-4xl border-t">
            {product.functions.map((fn, index) => (
              <li key={fn.slice(0, 40)} className="border-hairline flex gap-6 border-b py-6">
                <span className="data-value text-accent shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-ink-muted">{fn}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section rhythm="default">
        <SectionHeading
          index={2}
          eyebrow="Specifications"
          title="Technical data"
          description="Only values published by the manufacturer are shown."
        />
        <div className="mt-12 max-w-3xl">
          <ProductSpecifications product={product} />
        </div>
      </Section>

      {/* Enquiry inline, with the product pre-selected — the legacy product
          page ended in a reviews widget and offered no way to ask about it. */}
      <Section id="enquiry" rhythm="default" tone="dark">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              index={3}
              eyebrow="Enquire"
              title={`Ask about ${product.name}`}
              description="Tell us your crop and conditions and we will advise on rate and programme."
            />
          </div>
          <div className="lg:col-span-8">
            <ContactFormLazy productSlug={product.slug} productName={product.name} />
          </div>
        </div>
      </Section>

      {siblings.length > 0 && (
        <Section rhythm="default" tone="sunken">
          <SectionHeading
            index={4}
            eyebrow="Related"
            title={`More from the ${lineLabel[product.line]} range`}
            action={
              <Button href={`/products?line=${product.line}`} variant="secondary">
                View the range <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <ProductCard key={sibling.slug} product={sibling} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
