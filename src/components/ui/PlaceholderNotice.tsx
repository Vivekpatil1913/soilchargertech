import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ContentMeta } from '@/types/content'

/**
 * Placeholder bands are visible in development and on staging
 * (NEXT_PUBLIC_ALLOW_PLACEHOLDERS=true), and invisible in production.
 *
 * This is deliberate: the client walks the staging site and sees exactly which
 * blocks are awaiting their input, while a real visitor never sees scaffolding.
 */
function noticesVisible() {
  return (
    process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ALLOW_PLACEHOLDERS === 'true'
  )
}

interface PlaceholderNoticeProps {
  meta: ContentMeta
  /** What this block will contain once the client supplies content. */
  label: string
  className?: string
}

/**
 * Marks content that is architected but not yet sourced.
 *
 * The brief was explicit: never invent technical claims, specifications,
 * certifications, statistics, customers or projects. Where the existing site
 * had nothing to verify, the shape ships and this band says so out loud.
 */
export function PlaceholderNotice({ meta, label, className }: PlaceholderNoticeProps) {
  if (meta.provenance === 'verified' || !noticesVisible()) return null

  const isPlaceholder = meta.provenance === 'placeholder'

  return (
    <div
      data-provenance={meta.provenance}
      className={cn(
        'flex gap-3 rounded-sm border border-dashed p-4',
        'border-warning/50 bg-warning-soft text-ink-muted',
        className
      )}
    >
      <AlertTriangle aria-hidden="true" className="text-warning mt-0.5 size-4 shrink-0" />
      <div className="text-caption flex flex-col gap-1">
        <p className="text-warning font-mono tracking-wider uppercase">
          {isPlaceholder ? 'Placeholder content' : 'Needs verification'} — {label}
        </p>
        {meta.note && <p>{meta.note}</p>}
        {meta.source && <p>Source: {meta.source}</p>}
      </div>
    </div>
  )
}
