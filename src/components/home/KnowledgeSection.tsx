import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/knowledge";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { fadeUp } from "@/lib/animations";

/**
 * KNOWLEDGE CENTRE
 * ================
 * Teaching rather than selling. SCT's third principle asks the farmer to keep
 * studying, so the site has to give them something to study — and none of these
 * pieces sells a product.
 *
 * Three on the homepage; the rest live on /knowledge.
 */
export function KnowledgeSection({ limit = 3 }: { limit?: number }) {
  const featured = articles.slice(0, limit);

  return (
    <section aria-labelledby="knowledge-heading" className="section-y bg-cream-100">
      <Container width="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Knowledge centre"
            title={
              <>
                Soil health, <span className="text-brand-600">explained simply.</span>
              </>
            }
            lead="Written for a farmer, not for a laboratory. No product is being sold in any of these."
            className="max-w-2xl"
          />
          <CTAButton href="/knowledge" variant="secondary" className="shrink-0">
            All articles
          </CTAButton>
        </div>

        <ScrollReveal
          stagger={0.09}
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {featured.map((article) => (
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
                        className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
