import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProduct, products } from "@/data/products";
import { ProductDetails } from "@/components/products/ProductDetails";
import { FinalCTA } from "@/components/home/FinalCTA";

type Params = { params: Promise<{ slug: string }> };

/** Every product is known at build time, so all 21 pages are static. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: `${product.summary} Part of the ${
      product.range === "vedic" ? "SCT Vedic" : "Super"
    } range from Soil Charger Technology.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Soil Charger Technology`,
      description: product.summary,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <>
      <ProductDetails product={product} />
      <FinalCTA />
    </>
  );
}
