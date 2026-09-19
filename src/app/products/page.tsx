import type { Metadata } from "next";

import { images } from "@/data/images";
import { products, type ProductRange } from "@/data/products";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { PlaceholderNote } from "@/components/common/Badge";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The complete Soil Charger Technology catalogue — the SCT Vedic range and the Super series, across soil, root zone, foliar, nutrition, quality and crop protection.",
  alternates: { canonical: "/products" },
};

function isRange(value: string | undefined): value is ProductRange {
  return value === "vedic" || value === "super";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range } = await searchParams;
  const initialRange = isRange(range) ? range : "all";

  return (
    <>
      <PageHero
        eyebrow="Our products"
        image={images.crops.grapes}
        title={
          <>
            {products.length} products, <span className="text-leaf-400">two ranges.</span>
          </>
        }
        lead="The SCT Vedic range and the Super series. Both trace back to the same objective set in 2015 — give the soil a dependable source of organic carbon, and build from there."
      />

      <section aria-labelledby="catalogue-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <h2 id="catalogue-heading" className="sr-only">
            Product catalogue
          </h2>

          <ProductGrid initialRange={initialRange} />

          <PlaceholderNote>
            Product names and ranges are SCT&apos;s own. Descriptions, composition and dosage are
            awaiting the company&apos;s approved copy and are shown as placeholders rather than
            guessed at — for guidance on a specific crop, contact the SCT team. Pack artwork is
            illustrative while product photography is re-shot.
          </PlaceholderNote>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
