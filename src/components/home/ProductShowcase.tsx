import { featuredProducts, productRanges, products } from "@/data/products";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { ProductCard } from "@/components/products/ProductCard";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * PRODUCTS
 * ========
 * A short, curated set on the homepage rather than all 21 — the catalogue page
 * exists for that. The two ranges are introduced first, because "which of these
 * two families am I looking at" is the question a visitor has before they have
 * any interest in an individual pack.
 */
export function ProductShowcase() {
  const ranges = [productRanges.vedic, productRanges.super];

  return (
    <section aria-labelledby="products-heading" className="section-y bg-cream-50">
      <Container width="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our products"
            title={
              <>
                Two ranges, <span className="text-brand-600">one foundation.</span>
              </>
            }
            lead="Everything SCT makes traces back to the same objective set in 2015 — give the soil a dependable source of organic carbon, and build from there."
            className="max-w-2xl"
          />
          <CTAButton href="/products" variant="secondary" className="shrink-0">
            View all {products.length} products
          </CTAButton>
        </div>

        {/* ---- The two ranges ---------------------------------------------- */}
        <ScrollReveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-2">
          {ranges.map((range) => (
            <RevealItem
              key={range.id}
              variants={fadeUp}
              as="article"
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-7 transition-[border-color,box-shadow] duration-400 hover:shadow-soft sm:p-8",
                range.id === "vedic"
                  ? "border-brand-100 bg-gradient-to-br from-brand-50 to-white hover:border-brand-300"
                  : "border-saffron-100 bg-gradient-to-br from-saffron-50 to-white hover:border-saffron-300",
              )}
            >
              <p
                className={cn(
                  "text-eyebrow",
                  range.id === "vedic" ? "text-brand-700" : "text-saffron-700",
                )}
              >
                {range.tagline}
              </p>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-ink-900">
                {range.name}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-500">
                {range.description}
              </p>
              <div className="mt-6">
                <CTAButton href={`/products?range=${range.id}`} variant="text">
                  Explore the {range.name} range
                </CTAButton>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>

        {/* ---- Featured products -------------------------------------------- */}
        <ScrollReveal
          stagger={0.07}
          as="ul"
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {featuredProducts.map((product) => (
            <RevealItem key={product.id} variants={fadeUp} as="li" className="h-full">
              <ProductCard product={product} className="h-full" />
            </RevealItem>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
