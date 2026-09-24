import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { Card, Reveal, Section, Shell } from "@/components/ui";
import { articles } from "@/data/knowledge";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * KNOWLEDGE
 * =========
 * SCT's third principle makes daily reading part of the method, so this is not
 * a blog bolted on for SEO — it is the written half of a system the farmer is
 * asked to follow.
 *
 * The old site holds 21 long-form articles, 10 of them in Marathi, captured in
 * docs/sct-legacy-blog-archive.md. Migrating them is a content job rather than
 * a build one; the shape here is ready for them.
 */
export default function KnowledgePage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <Seo
        title="Knowledge"
        description="Articles on organic carbon, soil health and natural crop management, written for farmers by the Soil Charger Technology team."
        path="/knowledge"
      />

      <PageHero
        eyebrow="Knowledge centre"
        title={
          <>
            Understand it, then <span className="text-shine">decide.</span>
          </>
        }
        lead="SCT's position is that a farmer who understands why a treatment works stops needing to be told what to do. Everything here is written for that."
      />

      <Section ground="light" labelledBy="articles-heading">
        <Shell size="wide">
          <h2 id="articles-heading" className="sr-only">
            Articles
          </h2>

          {/* ---- Lead article ------------------------------------------- */}
          {lead ? (
            <Reveal>
              <Card className="overflow-hidden lg:flex-row">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[52%]">
                  <Image
                    src={lead.image.src}
                    alt={lead.image.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover transition-transform duration-[900ms] motion-safe:group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center p-7 sm:p-10">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-brand-700">
                    {lead.category}
                  </p>
                  <h2 className="text-h2 mt-4 text-ink-900">
                    <Link href={`/knowledge/${lead.slug}`} className="after:absolute after:inset-0">
                      {lead.title}
                    </Link>
                  </h2>
                  <p className="text-lead mt-5 text-ink-500">{lead.excerpt}</p>
                  <p className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-brand-700">
                    Read the article
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </p>
                </div>
              </Card>
            </Reveal>
          ) : null}

          {/* ---- The rest ------------------------------------------------ */}
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, index) => (
              <Reveal key={article.slug} as="li" delay={index * 0.06} className="h-full">
                <Card className="h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 380px"
                      className="object-cover transition-transform duration-[900ms] motion-safe:group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-700">
                      {article.category}
                    </p>
                    <h3 className="mt-2.5 font-display text-[1.05rem] font-bold leading-snug text-ink-900">
                      <Link
                        href={`/knowledge/${article.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-ink-500">
                      {article.excerpt}
                    </p>
                    <p className="mt-5 text-[0.8rem] text-ink-400">{article.readingTime}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Shell>
      </Section>

      <ContactCta />
    </>
  );
}
