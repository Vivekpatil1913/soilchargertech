import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { articles, getArticle } from "@/data/knowledge";
import { Container } from "@/components/common/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { FinalCTA } from "@/components/home/FinalCTA";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/knowledge/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image.src, alt: article.image.alt }],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-cream-100 pb-12 pt-[7.5rem] lg:pt-[10rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-20 size-[30rem] bloom bg-brand-200/45"
          />

          <Container width="default" className="relative">
            <Link
              href="/knowledge"
              className="group inline-flex items-center gap-2 text-[0.85rem] font-semibold text-ink-500 transition-colors hover:text-brand-700"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              Knowledge centre
            </Link>

            <p className="text-eyebrow mt-8 text-brand-700">{article.category}</p>
            <h1 className="text-h1 mt-4 max-w-3xl text-ink-900">{article.title}</h1>
            <p className="text-lead mt-6 max-w-2xl text-ink-500">{article.excerpt}</p>
            <p className="mt-6 text-[0.82rem] text-ink-400">{article.readingTime}</p>
          </Container>
        </header>

        <Container width="default">
          <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-2xl shadow-lift">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 820px"
              className="object-cover"
            />
          </div>
        </Container>

        <div className="section-y bg-cream-50">
          <Container width="narrow">
            <div className="text-[1.02rem] leading-[1.75] text-ink-600">
              <p className="text-[1.1rem] leading-[1.7] text-ink-700">{article.intro}</p>

              {article.body.map((section) => (
                <section key={section.heading} className="mt-10">
                  <h2 className="text-h3 text-ink-900">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-hairline bg-white p-7">
              <h2 className="text-h3 text-ink-900">Have a question about your own soil?</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
                Reading about soil only goes so far. Describe your field, your crop and what you are
                seeing, and SCT&apos;s team will answer for your situation specifically.
              </p>
              <div className="mt-6">
                <CTAButton href="/contact">Talk to an expert</CTAButton>
              </div>
            </div>
          </Container>
        </div>
      </article>

      {more.length > 0 ? (
        <section aria-labelledby="more-reading" className="section-y bg-cream-100">
          <Container width="wide">
            <h2 id="more-reading" className="text-h2 text-ink-900">
              More reading
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item) => (
                <li key={item.slug}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-shadow duration-400 hover:shadow-lift">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 380px"
                        className="object-cover transition-transform duration-[900ms] motion-safe:group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[0.72rem] font-bold uppercase tracking-wider text-brand-700">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink-900">
                        <Link
                          href={`/knowledge/${item.slug}`}
                          className="after:absolute after:inset-0"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.85rem] leading-relaxed text-ink-500">
                        {item.excerpt}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <FinalCTA />
    </>
  );
}
