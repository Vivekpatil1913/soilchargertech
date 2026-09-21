import { ArrowLeft } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { Button, Card, Reveal, Section, Shell } from "@/components/ui";
import { articles, getArticle } from "@/data/knowledge";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

export default function KnowledgeArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  // A mistyped or retired slug lands on the 404 route rather than throwing.
  if (!article) return <Navigate to="/404" replace />;

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    author: { "@type": "Organization", name: "Soil Charger Technology" },
    publisher: { "@type": "Organization", name: "Soil Charger Technology" },
  };

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/knowledge/${article.slug}`}
        image={article.image.src}
        jsonLd={jsonLd}
      />

      <article>
        <header className="ground-forest">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 fx-mesh" />
            <div className="absolute inset-0 fx-dots opacity-50" />
            <div className="bloom bloom-a absolute -left-32 -top-24 size-[28rem] bg-brand-500/25" />
          </div>

          <Shell className="relative pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-44">
            <Link
              href="/knowledge"
              className="group inline-flex items-center gap-2 text-[0.88rem] font-semibold text-sage-300 transition-colors hover:text-white"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              Knowledge centre
            </Link>

            <p className="text-eyebrow mt-8 text-leaf-400">{article.category}</p>
            <h1 className="text-h1 mt-4 max-w-3xl text-white">{article.title}</h1>
            <p className="text-lead mt-5 max-w-2xl text-sage-300/85">{article.excerpt}</p>
            <p className="mt-5 text-[0.84rem] text-sage-400">{article.readingTime}</p>
          </Shell>
        </header>

        <Shell className="relative">
          <div className="shadow-card-lg relative -mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </Shell>

        <Section ground="light">
          <Shell size="narrow">
            <div className="text-[1.04rem] leading-[1.78] text-ink-600">
              <p className="text-[1.12rem] leading-[1.72] text-ink-700">{article.intro}</p>

              {article.body.map((section) => (
                <section key={section.heading} className="mt-11">
                  <h2 className="text-h3 text-ink-900">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <Card className="mt-12 p-7 sm:p-8" lift={false}>
              <h2 className="text-h3 text-ink-900">Have a question about your own soil?</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
                Reading about soil only goes so far. Describe your field, your crop and what you are
                seeing, and the SCT team will answer for your situation specifically.
              </p>
              <div className="mt-7">
                <Button href="/contact">Talk to an expert</Button>
              </div>
            </Card>
          </Shell>
        </Section>
      </article>

      {more.length > 0 ? (
        <Section ground="tint" labelledBy="more-reading">
          <Shell size="wide">
            <h2 id="more-reading" className="text-h2 text-ink-900">
              More reading
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item, index) => (
                <Reveal key={item.slug} as="li" delay={index * 0.06} className="h-full">
                  <Card className="h-full overflow-hidden">
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
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-700">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-display text-[1rem] font-bold leading-snug text-ink-900">
                        <Link
                          href={`/knowledge/${item.slug}`}
                          className="after:absolute after:inset-0"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-ink-500">
                        {item.excerpt}
                      </p>
                    </div>
                  </Card>
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
