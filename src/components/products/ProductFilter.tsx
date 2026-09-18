import Link from 'next/link'
import type { ProductLineInfo } from '@/types/product'
import { cn } from '@/lib/utils/cn'

interface ProductFilterProps {
  lines: ProductLineInfo[]
  active: string | null
  counts: Record<string, number>
  total: number
}

/**
 * Range filter.
 *
 * Built as real links with real URLs rather than client-side state, so each
 * filtered view is shareable, bookmarkable, indexable and works without
 * JavaScript. The legacy site did this with jQuery tab state and no URL at all.
 */
export function ProductFilter({ lines, active, counts, total }: ProductFilterProps) {
  const options = [
    { id: null, name: 'All products', href: '/products', count: total },
    ...lines.map((line) => ({
      id: line.id as string | null,
      name: line.name,
      href: `/products?line=${line.id}`,
      count: counts[line.id] ?? 0,
    })),
  ]

  return (
    <nav aria-label="Filter products by range">
      <ul className="border-hairline flex flex-wrap gap-2 border-t pt-6">
        {options.map((option) => {
          const isActive = option.id === active
          return (
            <li key={option.name}>
              <Link
                href={option.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-[0.9375rem] transition-colors duration-200',
                  isActive
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-hairline text-ink-muted hover:border-accent/40 hover:text-ink'
                )}
              >
                {option.name}
                {/* No opacity dimming on the active pill: 80% white over the
                    accent fill drops below 4.5:1. Full colour, or muted ink. */}
                <span className={cn('data-value', isActive ? 'text-on-accent' : 'text-ink-subtle')}>
                  {option.count}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
