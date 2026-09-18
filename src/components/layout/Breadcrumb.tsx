import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { site } from '@/config/site'

export interface Crumb {
  label: string
  /** Omitted on the final crumb — the current page is not a link. */
  href?: string
}

/**
 * Breadcrumbs, on every page below the root. The legacy site had them on
 * product pages only.
 *
 * Emits BreadcrumbList JSON-LD alongside the visible trail so the two can never
 * drift apart — they are generated from the same array.
 */
export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null

  const items = [{ label: 'Home', href: '/' }, ...crumbs]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, site.url).toString() } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="py-5">
          <ol className="flex flex-wrap items-center gap-1.5">
            {items.map((crumb, index) => {
              const last = index === items.length - 1
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="text-ink-subtle size-3.5 shrink-0"
                    />
                  )}
                  {crumb.href && !last ? (
                    <Link
                      href={crumb.href}
                      className="text-caption text-ink-subtle hover:text-accent transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-caption text-ink-muted" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </Container>
    </>
  )
}
