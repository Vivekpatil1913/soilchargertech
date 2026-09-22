import { ArrowLeft, Info, Leaf, MessageCircle, Package, Phone } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

import { NoTranslate } from "@/components/common/NoTranslate";
import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { CategoryCard } from "@/components/products/CategoryCard";
import { ProductRow } from "@/components/products/ProductRow";
import { Button, Reveal, Section, Shell } from "@/components/ui";
import {
  categories,
  categoryCount,
  categoryImageSrcSet,
  getCategory,
  productRanges,
} from "@/data/products";
import { contact } from "@/data/site";
import { SITE_URL } from "@/lib/constants";
import { cn, telHref, whatsappHref } from "@/lib/utils";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * LEVEL 2 — ONE CATEGORY
 * ======================
 * Everything SCT published about this category — what it does, how it helps
 * the crop, how much to use — followed by the products inside it.
 *
 * The description, benefits and dosage sit here rather than on the individual
 * product pages because they are true of every product in the category. Stating
 * them once and listing packs underneath is both more honest and less to read.
 *
 * Ordered the way a farmer reads it: what it is, what it does, how much to use,
 * which pack, then how to ask about it.
 */
export default function CategoryPage() {
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getCategory(slug) : undefined;

  if (!category) return <Navigate to="/404" replace />;

  const range = productRanges[category.range];
  const related = categories
    .filter((c) => c.id !== category.id && c.range === category.range)
    .slice(0, 4);

  /* No price or availability — SCT publishes neither, and inventing them would
     be both wrong and a structured-data violation. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: category.name,
    description: category.summary,
    category: category.group,
    brand: { "@type": "Brand", name: range.name },
    manufacturer: { "@type": "Organization", name: "Soil Charger Technology" },
    url: `${SITE_URL}/products/${category.slug}`,
    hasVariant: category.skus.map((sku) => ({
      "@type": "Product",
      name: sku.name,
      url: `${SITE_URL}/products/${category.slug}/${sku.slug}`,
    })),
  };

  return (
    <>
      <Seo
        title={category.name}
        description={`${category.summary} Part of the ${range.name} range from Soil Charger Technology.`}
        path={`/products/${category.slug}`}
        jsonLd={jsonLd}
      />

      <Section ground="canvas" rhythm="sm">
        <Shell size="wide">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[0.88rem] font-semibold text-ink-500 transition-colors hover:text-forest-700"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
            />
            All {categoryCount} categories
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* ---- Pack -------------------------------------------------- */}
            <Reveal>
              <div className="shadow-card relative aspect-square overflow-hidden rounded-2xl bg-white">
                <Image
                  {...categoryImageSrcSet(category)}
                  alt={`${category.name} product pack`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 440px"
                  className="object-contain p-5"
                />
              </div>
            </Reveal>

            {/* ---- Copy -------------------------------------------------- */}
            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-wide text-white",
                    category.range === "vedic" ? "bg-forest-700" : "bg-harvest-700",
                  )}
                >
                  <NoTranslate>{range.name}</NoTranslate>
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-semibold text-ink-500 ring-1 ring-inset ring-hairline">
                  {category.group}
                </span>
              </div>

              <NoTranslate as="h1" className="text-h1 mt-6 text-ink-900">
                {category.name}
              </NoTranslate>
              <p className="text-lead mt-4 text-ink-500">{category.summary}</p>

              <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6">
                <p className="text-eyebrow text-harvest-700">What it does</p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-600">
                  {category.detail}
                </p>
              </div>

              {category.benefits.length > 0 ? (
                <div className="mt-8">
                  <p className="text-eyebrow text-harvest-700">How it helps your crop</p>
                  <ul className="mt-4 space-y-3">
                    {category.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-600"
                      >
                        <Leaf aria-hidden className="mt-1 size-4 shrink-0 text-forest-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {category.dosage.length > 0 ? (
                <div className="mt-8">
                  <p className="text-eyebrow text-harvest-700">How much to use</p>
                  <dl className="mt-4 overflow-hidden rounded-xl border border-ink-100">
                    {category.dosage.map((line, index) => (
                      <div
                        key={line.label}
                        className={cn(
                          "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5",
                          index % 2 === 0 ? "bg-white" : "bg-canvas-50",
                        )}
                      >
                        <dt className="text-[0.88rem] font-semibold text-ink-700">{line.label}</dt>
                        <dd className="font-display text-[1.02rem] font-bold text-forest-700">
                          {line.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-[0.82rem] text-ink-400">
                    These rates apply to every product in this category.
                  </p>
                </div>
              ) : null}

              {category.note ? (
                <p className="mt-6 flex gap-3 rounded-xl border border-harvest-200 bg-harvest-50 px-5 py-4 text-[0.88rem] leading-relaxed text-harvest-800">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-harvest-600" />
                  <span>{category.note}</span>
                </p>
              ) : null}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref(
                    contact.whatsapp,
                    `Hello SCT, I would like to know more about ${category.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-glow-green inline-flex items-center justify-center gap-2.5 rounded-full bg-forest-600 px-7 py-4 text-[0.95rem] font-bold text-white transition-all duration-300 hover:bg-forest-500 motion-safe:hover:-translate-y-0.5"
                >
                  <MessageCircle aria-hidden className="size-4" />
                  Ask about this on WhatsApp
                </a>

                <a
                  href={telHref(contact.phones[0])}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-forest-200 bg-white px-7 py-4 text-[0.95rem] font-semibold text-forest-800 transition-colors hover:border-forest-400"
                >
                  <Phone aria-hidden className="size-4" />
                  <NoTranslate>{contact.phones[0]}</NoTranslate>
                </a>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ---- The products inside this category -------------------------- */}
      <Section ground="light" labelledBy="skus-heading">
        <Shell size="wide">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-eyebrow text-harvest-700">Available in</p>
              <h2 id="skus-heading" className="text-h2 mt-3 text-ink-900">
                {category.skus.length}{" "}
                {category.skus.length === 1 ? "product" : "products"} in this category
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.86rem] text-ink-500 ring-1 ring-inset ring-hairline">
              <Package aria-hidden className="size-4 text-forest-600" />
              Same dosage across the category
            </p>
          </div>

          {category.skus.length > 0 ? (
            <ul className="mt-9 grid gap-3 md:grid-cols-2">
              {category.skus.map((sku, index) => (
                <Reveal key={sku.id} as="li" delay={Math.min(index, 6) * 0.05}>
                  <ProductRow product={sku} category={category} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="mt-9 rounded-2xl border border-ink-100 bg-white p-7 text-[0.94rem] leading-relaxed text-ink-500">
              SCT has not published pack sizes for this category yet. Call the team on{" "}
              <a href={telHref(contact.phones[0])} className="font-semibold text-forest-700">
                <NoTranslate>{contact.phones[0]}</NoTranslate>
              </a>{" "}
              and they will tell you what is available.
            </p>
          )}

          {category.skus.some((sku) => sku.provisional) ? (
            <p className="mt-7 max-w-3xl rounded-2xl border border-harvest-200 bg-harvest-50 p-5 text-[0.86rem] leading-relaxed text-harvest-800">
              The products above are generated from the pack sizes SCT published for this category.
              They are marked as awaiting confirmation and will be replaced with SCT&apos;s own
              product list.
            </p>
          ) : null}
        </Shell>
      </Section>

      {related.length > 0 ? (
        <Section ground="canvas" labelledBy="related-heading">
          <Shell size="wide">
            <h2 id="related-heading" className="text-h2 text-ink-900">
              More from the <NoTranslate pad="both">{range.name}</NoTranslate> range
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.id} as="li" delay={index * 0.06} className="h-full min-w-0">
                  <CategoryCard category={item} className="h-full" />
                </Reveal>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/products" variant="secondary">
                View all {categoryCount} categories
              </Button>
            </div>
          </Shell>
        </Section>
      ) : null}

      <ContactCta />
    </>
  );
}
