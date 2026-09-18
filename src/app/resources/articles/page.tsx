import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Twenty-one articles on soil carbon, crop nutrition, soil health and the consequences of chemical-led agriculture — in English and Marathi.',
  alternates: { canonical: '/resources/articles' },
}

export default async function ArticlesPage() {
  const articles = await content.getArticles()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Articles' }]}
        eyebrow="Articles"
        title="Written for growers."
        description="Twenty-one articles, published in English and Marathi."
      />

      <Section rhythm="default">
        <ul className="border-hairline grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="border-hairline group relative flex flex-col gap-4 border-b py-8 sm:px-8 sm:first:pl-0"
            >
              {article.image && (
                <Image
                  src={article.image.src}
                  alt=""
                  aria-hidden="true"
                  width={article.image.width}
                  height={article.image.height}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="border-hairline bg-surface-sunken aspect-3/2 w-full border object-cover"
                />
              )}

              {article.language !== 'en' && <Badge>मराठी</Badge>}

              <h2 className="text-h4 font-display">
                <Link
                  href={`/resources/articles/${article.slug}`}
                  lang={article.language}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {article.title}
                </Link>
              </h2>

              <p lang={article.language} className="text-ink-muted line-clamp-3 text-[0.9375rem]">
                {article.excerpt}
              </p>

              <span className="text-accent mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem]">
                Read
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-250 group-hover:translate-x-0.5"
                />
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
