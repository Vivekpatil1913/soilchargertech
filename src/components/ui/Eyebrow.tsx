import { cn } from '@/lib/utils/cn'

interface EyebrowProps extends React.ComponentPropsWithoutRef<'p'> {
  /**
   * Zero-padded section index, e.g. `4` renders "04 /". Part of the engineering
   * -drawing motif: numbered sections signal a document, not a brochure.
   */
  index?: number
}

/** Mono, letterspaced, uppercase label above a heading. "04 / TECHNOLOGY" */
export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p className={cn('eyebrow', className)} {...props}>
      {index !== undefined && (
        <span className="text-accent">{String(index).padStart(2, '0')} / </span>
      )}
      {children}
    </p>
  )
}
