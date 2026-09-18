import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge, PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { JsonLd, articleJsonLd } from '@/lib/seo/jsonld'
import { content } from '@/lib/content/repository'

export async function generateStaticParams() {
  const articles = await content.getArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await content.getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt.slice(0, 160),
    alternates: { canonical: `/resources/articles/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt.slice(0, 200),
      url: `/resources/articles/${article.slug}`,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await content.getArticle(slug)
  if (!article) notFound()

  const all = await content.getArticles()
  const more = all.filter((item) => item.slug !== article.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />

      <PageHero
        crumbs={[
          { label: 'Resources', href: '/resources' },
          { label: 'Articles', href: '/resources/articles' },
          { label: article.title },
        ]}
        eyebrow="Article"
        title={<span lang={article.language}>{article.title}</span>}
        description={article.author ? `By ${article.author}` : 'Soil Charger Technology'}
      >
        {article.language !== 'en' && <Badge>मराठी</Badge>}
      </PageHero>

      {article.image && (
        <Section rhythm="compact">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            /*
              Natural aspect ratio, not a forced 16:9 box. These article images
              are wide banners — 1600x480 is typical — so cropping them to 16:9
              both cut the artwork and made the rendered element tall enough to
              become the LCP candidate. Letting them keep their own shape shows
              the whole image and costs less paint.
            */
            className="border-hairline bg-surface-sunken h-auto w-full border"
          />
        </Section>
      )}

      <Section rhythm="default">
        <div
          lang={article.language}
          className="text-body-lg text-ink-muted flex max-w-3xl flex-col gap-5"
        >
          {article.paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>

        {article.meta.provenance !== 'verified' && (
          <PlaceholderNotice
            className="mt-12 max-w-2xl"
            label={article.title}
            meta={article.meta}
          />
        )}
      </Section>

      {more.length > 0 && (
        <Section tone="sunken" rhythm="default">
          <h2 className="text-h2">More articles</h2>
          <ul className="border-hairline mt-10 grid gap-px border-t lg:grid-cols-3">
            {more.map((item) => (
              <li
                key={item.slug}
                className="border-hairline group relative flex flex-col gap-3 border-b py-8 lg:px-8 lg:first:pl-0"
              >
                <h3 className="text-h4 font-display">
                  <Link
                    href={`/resources/articles/${item.slug}`}
                    lang={item.language}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {item.title}
                  </Link>
                </h3>
                <span className="text-accent mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem]">
                  Read <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
