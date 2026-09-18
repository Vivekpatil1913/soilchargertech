import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ImagePlaceholderProps {
  /** What belongs here, e.g. "Super Soil Charger product shot". */
  label: string
  /** CSS aspect-ratio, matching the real image's intended shape. */
  ratio?: '1/1' | '4/3' | '3/2' | '16/9'
  className?: string
}

const ratios = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-4/3',
  '3/2': 'aspect-3/2',
  '16/9': 'aspect-video',
} as const

/**
 * Stands in for an image that does not exist yet.
 *
 * Every one of the 42 images referenced by the legacy site returns HTTP 404 —
 * the media host serves nothing — so there is no original to use anywhere.
 * Rather than filling the gap with stock photography (which the brief
 * prohibits) or collapsing the layout, this reserves the exact space the real
 * image will occupy.
 *
 * Reserving the box matters for more than honesty: it holds the layout at its
 * final dimensions, so dropping real images in later causes no layout shift.
 */
export function ImagePlaceholder({ label, ratio = '4/3', className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        'border-hairline bg-surface-sunken relative flex items-center justify-center overflow-hidden rounded-sm border border-dashed',
        ratios[ratio],
        className
      )}
    >
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 opacity-50"
        style={{ backgroundSize: '32px 32px' }}
      />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <ImageOff aria-hidden="true" className="text-ink-subtle size-5" />
        <span className="text-caption text-ink-subtle font-mono">{label}</span>
      </div>
    </div>
  )
}
