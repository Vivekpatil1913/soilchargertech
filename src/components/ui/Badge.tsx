import { cn } from '@/lib/utils/cn'

type Tone = 'neutral' | 'accent' | 'mineral' | 'warning'

const tones: Record<Tone, string> = {
  neutral: 'border-hairline text-ink-muted',
  accent: 'border-charge-600/30 bg-charge-50 text-charge-800',
  mineral: 'border-mineral-500/30 bg-mineral-400/10 text-mineral-600',
  warning: 'border-warning/30 bg-warning/10 text-warning',
}

interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  tone?: Tone
}

/** Small mono label: product line, application type, article category. */
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2.5 py-1',
        'text-caption font-mono tracking-wider uppercase',
        tones[tone],
        className
      )}
      {...props}
    />
  )
}
