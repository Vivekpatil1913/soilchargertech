import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { articles } from "@/data/knowledge";
import { images } from "@/data/images";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { PlaceholderNote } from "@/components/common/Badge";
import { fadeUp } from "@/lib/animations";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Knowledge Centre",
  description:
    "Soil health, organic carbon, mycorrhiza and crop nutrition — explained in plain language for farmers. No product is sold in any of these articles.",
  alternates: { canonical: "/knowledge" },
};

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge centre"
        image={images.soil.profile}
        title={
          <>
            Soil health, <span className="text-leaf-400">explained simply.</span>
          </>
        }
        lead="SCT's third principle asks the farmer to keep studying. That only works if there is something to study — so these are written for a farmer, not for a laboratory, and none of them sells a product."
      />

      <section aria-labelledby="articles-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <h2 id="articles-heading" className="sr-only">
            All articles
          </h2>

          <ScrollReveal stagger={0.08} as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <RevealItem key={article.slug} variants={fadeUp} as="li" className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-[border-color,box-shadow,transform] duration-400 [transition-timing-function:var(--ease-out-soft)] hover:border-brand-200 hover:shadow-lift motion-safe:hover:-translate-y-1.5">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:scale-105"
                    />
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-brand-700 backdrop-blur">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink-900">
                      <Link
                        href={`/knowledge/${article.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-ink-500">
                      {article.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[0.78rem] text-ink-400">{article.readingTime}</span>
                      <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-brand-700">
                        Read more
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </ScrollReveal>

          <PlaceholderNote>
            Article summaries are written and ready. Full article bodies are to be written with
            SCT&apos;s agronomy team and translated into Marathi and Hindi — see
            src/data/knowledge.ts.
          </PlaceholderNote>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
