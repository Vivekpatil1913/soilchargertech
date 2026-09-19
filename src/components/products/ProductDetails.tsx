import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { productRanges, products, type Product } from "@/data/products";
import { contact } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/utils";
import { Container } from "@/components/common/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { PlaceholderNote } from "@/components/common/Badge";
import { ProductVisual } from "./ProductVisual";
import { ProductCard } from "./ProductCard";

/**
 * A single product page.
 *
 * Description, composition and dosage are bracketed placeholders — SCT has not
 * published them, and guessing at an agricultural dosage would be worse than
 * leaving the field empty. Until they arrive, the page's job is to name the
 * product accurately and put the visitor in touch with someone who can advise
 * on their crop.
 */
export function ProductDetails({ product }: { product: Product }) {
  const range = productRanges[product.range];
  const related = products
    .filter((p) => p.id !== product.id && p.range === product.range)
    .slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-100 pb-16 pt-[7.5rem] lg:pb-20 lg:pt-[9.5rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-20 size-[30rem] bloom bg-brand-200/45"
        />

        <Container width="wide" className="relative">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[0.85rem] font-semibold text-ink-500 transition-colors hover:text-brand-700"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
            />
            All products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* ---- Visual ------------------------------------------------- */}
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
              ) : (
                <ProductVisual product={product} className="size-full" />
              )}
            </div>

            {/* ---- Copy --------------------------------------------------- */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-wide text-white ${
                    product.range === "vedic" ? "bg-brand-600" : "bg-earth-700"
                  }`}
                >
                  {range.name}
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-semibold text-ink-500 ring-1 ring-inset ring-hairline">
                  {product.category}
                </span>
              </div>

              <h1 className="text-h1 mt-6 text-ink-900">{product.name}</h1>
              <p className="text-lead mt-5 text-ink-500">{product.summary}</p>

              <dl className="mt-10 space-y-8">
                <div>
                  <dt className="text-eyebrow text-brand-700">About this product</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
                    {product.detail}
                  </dd>
                </div>

                <div>
                  <dt className="text-eyebrow text-brand-700">Application</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
                    {product.application}
                  </dd>
                </div>

                <div>
                  <dt className="text-eyebrow text-brand-700">Part of</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
                    {range.description}
                  </dd>
                </div>
              </dl>

              <PlaceholderNote>
                Product description, composition and dosage are awaiting SCT&apos;s approved copy.
                For guidance on your crop and soil today, speak to the SCT team — they will answer
                for your specific field rather than in general.
              </PlaceholderNote>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact" size="lg">
                  Enquire about this product
                </CTAButton>
                <a
                  href={whatsappHref(
                    contact.whatsapp,
                    `Hello SCT, I would like to know more about ${product.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-brand-200 bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-brand-800 transition-colors hover:border-brand-500 hover:text-brand-700"
                >
                  Ask on WhatsApp
                </a>
              </div>

              <a
                href={telHref(contact.phones[0])}
                className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-ink-600 transition-colors hover:text-brand-700"
              >
                <Phone aria-hidden className="size-4" />
                {contact.phones[0]}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="section-y bg-cream-50">
          <Container width="wide">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 id="related-heading" className="text-h2 text-ink-900">
                More from {range.name}
              </h2>
              <CTAButton href="/products" variant="text">
                View all products
              </CTAButton>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id} className="h-full">
                  <ProductCard product={item} className="h-full" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
