import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button, Heading, Reveal, Section, Shell } from "@/components/ui";
import { articles } from "@/data/knowledge";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * THE READING
 * ===========
 * Three articles on the home page, because SCT's third principle makes
 * learning part of the method rather than marketing attached to it. A company
 * that tells farmers to read every day should put the reading on its front
 * page.
 *
 * The first article gets a photograph and the width; the other two are rows.
 * A row of three equal cards would say these are three interchangeable items,
 * and they are not — the first one is the one to read first.
 */
export function Knowledge() {
  const [lead, ...rest] = articles.slice(0, 3);
  if (!lead) return null;

  return (
    <Section ground="canvasDown" labelledBy="knowledge-heading">
      <Shell>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            id="knowledge-heading"
            eyebrow="Knowledge centre"
            title="Soil health, explained simply."
            lead="Plain-language writing on what is actually happening under your field — no jargon, and nothing you need a degree to follow."
            className="max-w-2xl"
          />

          <Reveal delay={0.12}>
            <Button href="/knowledge" variant="secondary" className="shrink-0 whitespace-nowrap">
              All articles
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* ---- The one to read first ---------------------------------- */}
          <Reveal>
            <Link
              href={`/knowledge/${lead.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-colors duration-300 hover:border-forest-200"
            >
              <span className="relative block aspect-[16/9] border-b border-ink-100">
                <Image
                  src={lead.image.src}
                  alt={lead.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                />
              </span>

              <span className="flex flex-1 flex-col p-6">
                <span className="flex items-center gap-2.5">
                  <span className="text-meta text-harvest-700">{lead.category}</span>
                  <span aria-hidden className="text-ink-200">
                    ·
                  </span>
                  <span className="text-xs text-ink-400">{lead.readingTime}</span>
                </span>

                <span className="mt-3 block font-display text-lg font-semibold leading-snug text-ink-900">
                  {lead.title}
                </span>
                <span className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-500">
                  {lead.excerpt}
                </span>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700">
                  Read the article
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </span>
              </span>
            </Link>
          </Reveal>

          {/* ---- The next two, as rows ---------------------------------- */}
          <ul className="grid content-start gap-4">
            {rest.map((article, index) => (
              <Reveal key={article.slug} as="li" delay={(index + 1) * 0.07}>
                <Link
                  href={`/knowledge/${article.slug}`}
                  className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft transition-colors duration-300 hover:border-forest-200 sm:gap-5 sm:p-5"
                >
                  <span className="relative block size-24 shrink-0 overflow-hidden rounded-xl border border-ink-100 sm:size-28">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2.5">
                      <span className="text-meta text-harvest-700">{article.category}</span>
                      <span aria-hidden className="text-ink-200">
                        ·
                      </span>
                      <span className="text-xs text-ink-400">{article.readingTime}</span>
                    </span>

                    <span className="mt-2 block font-display text-[0.98rem] font-semibold leading-snug text-ink-900">
                      {article.title}
                    </span>
                    <span className="mt-1.5 line-clamp-2 block text-[13px] leading-relaxed text-ink-500">
                      {article.excerpt}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Shell>
    </Section>
  );
}
