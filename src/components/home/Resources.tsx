import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge, Button, Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'

/**
 * Latest articles.
 *
 * The 21 posts are a genuine SEO asset that the legacy site wasted on
 * `?id=` query-string URLs. English posts are shown first here only because the
 * default locale is English — the Marathi posts are equal content and appear on
 * the full listing.
 */
export async function Resources() {
  const articles = await content.getArticles()

  const featured = [
    ...articles.filter((article) => article.language === 'en'),
    ...articles.filter((article) => article.language !== 'en'),
  ].slice(0, 3)

  return (
    <Section tone="sunken" rhythm="default">
      <SectionHeading
        index={9}
        eyebrow="Resources"
        title="Written for growers"
        description="Twenty-one articles on soil carbon, crop nutrition and what goes wrong when chemistry replaces biology."
        action={
          <Button href="/resources/articles" variant="secondary">
            All articles <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        }
      />

      <ul className="border-hairline mt-14 grid gap-px border-t lg:grid-cols-3">
        {featured.map((article) => (
          <li
            key={article.slug}
            className="border-hairline group relative flex flex-col gap-4 border-b py-8 lg:px-8 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0"
          >
            {article.image && (
              <Image
                src={article.image.src}
                alt=""
                aria-hidden="true"
                width={article.image.width}
                height={article.image.height}
                sizes="(min-width: 1024px) 380px, 100vw"
                className="border-hairline bg-surface-sunken aspect-3/2 w-full border object-cover"
              />
            )}

            {article.language !== 'en' && <Badge>मराठी</Badge>}

            <h3 className="text-h4 font-display">
              <Link
                href={`/resources/articles/${article.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {article.title}
              </Link>
            </h3>

            <p className="text-ink-muted line-clamp-3 text-[0.9375rem]">{article.excerpt}</p>

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
  )
}
