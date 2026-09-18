import { cn } from '@/lib/utils/cn'

type ContainerSize = 'content' | 'wide' | 'full'

const sizes: Record<ContainerSize, string> = {
  content: 'max-w-content',
  wide: 'max-w-wide',
  full: 'max-w-none',
}

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: ContainerSize
  /** Render as a different element, e.g. `as="section"`. */
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main'
}

/**
 * Owns every horizontal gutter on the site.
 *
 * No other component sets its own page padding — that rule is what keeps the
 * left edge of the logo, the hero headline and the footer aligned to the same
 * optical line at all seven tested breakpoints.
 */
export function Container({
  size = 'content',
  as: Tag = 'div',
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-5 md:px-8 lg:px-12', sizes[size], className)}
      {...props}
    />
  )
}
