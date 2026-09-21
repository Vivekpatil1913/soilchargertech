import { ArrowLeft, Info, Leaf, MessageCircle, Package, Phone } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { ProductRow } from "@/components/products/ProductRow";
import { Reveal, Section, Shell } from "@/components/ui";
import { categoryImageSrcSet, getCategory, getProduct, productRanges } from "@/data/products";
import { contact } from "@/data/site";
import { SITE_URL } from "@/lib/constants";
import { cn, telHref, whatsappHref } from "@/lib/utils";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * LEVEL 3 — ONE PRODUCT
 * =====================
 * The specific pack. Everything it inherits from its category — description,
 * benefits, dosage — is repeated here rather than linked away from, because
 * somebody arriving on this page from a search result or a shared WhatsApp
 * link has not read the category page and should not have to.
 *
 * The other packs in the category are listed at the bottom, so switching pack
 * size is one tap rather than a trip back up the tree.
 */
export default function ProductDetailPage() {
  const { category: categorySlug, product: productSlug } = useParams<{
    category: string;
    product: string;
  }>();

  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const product = categorySlug && productSlug ? getProduct(categorySlug, productSlug) : undefined;

  if (!category || !product) return <Navigate to="/404" replace />;

  const range = productRanges[category.range];
  const siblings = category.skus.filter((sku) => sku.slug !== product.slug);

  /* No price or availability — SCT publishes neither, and inventing them would
     be both wrong and a structured-data violation. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: category.summary,
    category: category.group,
    brand: { "@type": "Brand", name: range.name },
    manufacturer: { "@type": "Organization", name: "Soil Charger Technology" },
    url: `${SITE_URL}/products/${category.slug}/${product.slug}`,
    isVariantOf: {
      "@type": "ProductGroup",
      name: category.name,
      url: `${SITE_URL}/products/${category.slug}`,
    },
  };

  return (
    <>
      <Seo
        title={product.name}
        description={`${category.summary} ${product.pack ? `Available in ${product.pack}.` : ""} Part of the ${range.name} range from Soil Charger Technology.`}
        path={`/products/${category.slug}/${product.slug}`}
        jsonLd={jsonLd}
      />

      <Section ground="tint" className="!pt-32 sm:!pt-36 lg:!pt-44">
        <Shell size="wide">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.86rem] text-ink-500">
              <li>
                <Link href="/products" className="font-semibold transition-colors hover:text-brand-700">
                  Products
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={`/products/${category.slug}`}
                  className="group inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-brand-700"
                >
                  <ArrowLeft
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
                  />
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal>
              <div className="shadow-card-lg relative aspect-square overflow-hidden rounded-2xl bg-white">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 440px"
                    className="object-contain p-5"
                  />
                ) : (
                  <Image
                    {...categoryImageSrcSet(category)}
                    alt={`${category.name} product pack`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 440px"
                    className="object-contain p-5"
                  />
                )}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-wide text-white",
                    category.range === "vedic" ? "bg-brand-700" : "bg-earth-700",
                  )}
                >
                  {range.name}
                </span>
                <Link
                  href={`/products/${category.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-semibold text-ink-500 ring-1 ring-inset ring-hairline transition-colors hover:text-brand-700"
                >
                  {category.name}
                </Link>
              </div>

              <h1 className="text-h1 mt-6 text-ink-900">{product.name}</h1>

              {product.pack ? (
                <p className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-brand-50 px-4 py-2.5 text-[0.95rem] font-semibold text-brand-800 ring-1 ring-inset ring-brand-200">
                  <Package aria-hidden className="size-4" />
                  {product.pack}
                </p>
              ) : null}

              {product.provisional ? (
                <p className="mt-5 flex gap-3 rounded-xl border border-saffron-200 bg-saffron-50 px-5 py-4 text-[0.88rem] leading-relaxed text-earth-800">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-saffron-600" />
                  <span>
                    This pack is generated from the sizes SCT published for {category.name}. Confirm
                    availability with the team before ordering.
                  </span>
                </p>
              ) : null}

              <div className="mt-8 rounded-2xl border border-hairline bg-white p-6">
                <p className="text-eyebrow text-brand-700">What it does</p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-600">
                  {category.detail}
                </p>
              </div>

              {category.benefits.length > 0 ? (
                <div className="mt-8">
                  <p className="text-eyebrow text-brand-700">How it helps your crop</p>
                  <ul className="mt-4 space-y-3">
                    {category.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-600"
                      >
                        <Leaf aria-hidden className="mt-1 size-4 shrink-0 text-brand-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {category.dosage.length > 0 ? (
                <div className="mt-8">
                  <p className="text-eyebrow text-brand-700">How much to use</p>
                  <dl className="mt-4 overflow-hidden rounded-xl border border-hairline">
                    {category.dosage.map((line, index) => (
                      <div
                        key={line.label}
                        className={cn(
                          "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5",
                          index % 2 === 0 ? "bg-white" : "bg-sage-50",
                        )}
                      >
                        <dt className="text-[0.88rem] font-semibold text-ink-700">{line.label}</dt>
                        <dd className="font-display text-[1.02rem] font-bold text-brand-700">
                          {line.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              {category.note ? (
                <p className="mt-6 flex gap-3 rounded-xl border border-saffron-200 bg-saffron-50 px-5 py-4 text-[0.88rem] leading-relaxed text-earth-800">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-saffron-600" />
                  <span>{category.note}</span>
                </p>
              ) : null}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref(
                    contact.whatsapp,
                    `Hello SCT, I would like to order ${product.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-brand-glow inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[0.95rem] font-bold text-white transition-all duration-300 hover:bg-brand-500 motion-safe:hover:-translate-y-0.5"
                >
                  <MessageCircle aria-hidden className="size-4" />
                  Enquire on WhatsApp
                </a>

                <a
                  href={telHref(contact.phones[0])}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-brand-200 bg-white px-7 py-4 text-[0.95rem] font-semibold text-brand-800 transition-colors hover:border-brand-400"
                >
                  <Phone aria-hidden className="size-4" />
                  {contact.phones[0]}
                </a>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {siblings.length > 0 ? (
        <Section ground="light" labelledBy="siblings-heading">
          <Shell size="wide">
            <h2 id="siblings-heading" className="text-h2 text-ink-900">
              Other packs of {category.name}
            </h2>
            <ul className="mt-9 grid gap-3 md:grid-cols-2">
              {siblings.map((sku, index) => (
                <Reveal key={sku.id} as="li" delay={Math.min(index, 6) * 0.05}>
                  <ProductRow product={sku} category={category} />
                </Reveal>
              ))}
            </ul>
          </Shell>
        </Section>
      ) : null}

      <ContactCta />
    </>
  );
}
