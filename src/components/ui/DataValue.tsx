import { cn } from '@/lib/utils/cn'

interface DataValueProps extends React.ComponentPropsWithoutRef<'span'> {
  value: string | number
  /** Unit rendered at reduced emphasis, e.g. "L/acre", "g", "pH". */
  unit?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-caption',
  md: 'text-data',
  lg: 'text-h3',
} as const

/**
 * Every scientific value on the site renders through this: dosages, pack sizes,
 * pH, EC, counts, years.
 *
 * Putting measurements in tabular mono is the cheapest, highest-impact move
 * available for reading as a laboratory rather than a brochure — and
 * `tabular-nums` keeps columns of figures optically aligned in spec tables.
 */
export function DataValue({ value, unit, size = 'md', className, ...props }: DataValueProps) {
  return (
    <span className={cn('data-value', sizes[size], className)} {...props}>
      {value}
      {unit && <span className="text-ink-subtle ml-1">{unit}</span>}
    </span>
  )
}
