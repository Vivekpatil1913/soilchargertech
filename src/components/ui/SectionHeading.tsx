import { cn } from '@/lib/utils/cn'
import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  eyebrow?: string
  /** Zero-padded index rendered inside the eyebrow. */
  index?: number
  title: string
  description?: string
  /** Heading level. Exactly one <h1> per page — sections default to h2. */
  as?: 'h1' | 'h2' | 'h3'
  align?: 'start' | 'center'
  /** Optional CTA rendered opposite the title on wide screens. */
  action?: React.ReactNode
  className?: string
}

const titleSizes = {
  h1: 'text-display-lg',
  h2: 'text-h2',
  h3: 'text-h3',
} as const

/**
 * Used by every section on the site. Centralising it is what guarantees the
 * eyebrow → title → description rhythm is identical on all 14 homepage bands
 * and every inner page (the old site had 8 <h1>s and no consistent hierarchy).
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  as: Tag = 'h2',
  align = 'start',
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered && 'items-center text-center',
        action && !centered && 'lg:flex-row lg:items-end lg:justify-between',
        className
      )}
    >
      <div className={cn('flex flex-col gap-4', centered ? 'max-w-2xl' : 'max-w-3xl')}>
        {(eyebrow || index !== undefined) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}

        <Tag className={titleSizes[Tag]}>{title}</Tag>

        {description && <p className="text-body-lg text-ink-muted">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
