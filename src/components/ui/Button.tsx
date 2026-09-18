import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium ' +
  'transition-colors duration-200 ease-out-expo ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  secondary: 'border border-hairline text-ink hover:bg-surface-sunken',
  ghost: 'text-ink hover:bg-surface-sunken',
  link: 'text-accent underline underline-offset-4 hover:text-accent-hover',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-caption',
  md: 'h-11 px-6 text-body',
  lg: 'h-13 px-8 text-body-lg',
}

/** `link` has no box, so it must not inherit the height/padding of a box. */
const linkSizes: Record<Size, string> = {
  sm: 'text-caption',
  md: 'text-body',
  lg: 'text-body-lg',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof CommonProps> & { href?: undefined }

type ButtonAsLink = CommonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

/**
 * The only button in the system.
 *
 * Renders an anchor when `href` is present and a <button> otherwise, so
 * navigation is never faked with an onClick handler on a div — which is both
 * the most common a11y failure and what the old site did for every one of its
 * seven modal triggers.
 *
 * Focus rings come from the global :focus-visible rule. `outline-none` is never
 * used here or anywhere else.
 */
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === 'link' ? linkSizes[size] : sizes[size],
    className
  )

  if (props.href !== undefined) {
    const { href, children, ...rest } = props as ButtonAsLink
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { children, type = 'button', ...rest } = props as ButtonAsButton
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
