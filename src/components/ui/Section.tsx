import { cn } from '@/lib/utils/cn'
import { Container } from './Container'

type Tone = 'default' | 'sunken' | 'dark'
type Rhythm = 'compact' | 'default' | 'spacious'

const tones: Record<Tone, string> = {
  default: 'bg-bg text-ink',
  sunken: 'bg-surface-sunken text-ink',
  // Flips the whole semantic layer — see `.surface-dark` in globals.css.
  dark: 'surface-dark',
}

/** Section rhythm from the design system: 80 / 120 / 160. */
const rhythms: Record<Rhythm, string> = {
  compact: 'py-14 md:py-20 lg:py-24',
  default: 'py-20 md:py-30 lg:py-40',
  spacious: 'py-24 md:py-36 lg:py-48',
}

interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
  tone?: Tone
  rhythm?: Rhythm
  /** Container width. `full` opts out of the container entirely. */
  width?: 'content' | 'wide' | 'full'
  /** Overlay the hairline engineering grid. */
  grid?: boolean
}

/**
 * The vertical rhythm primitive. Every top-level page band is a <Section>,
 * which is what stops section spacing drifting as pages get built by different
 * hands (the old site had 14 different vertical gaps on one page).
 */
export function Section({
  tone = 'default',
  rhythm = 'default',
  width = 'content',
  grid = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('relative', tones[tone], rhythms[rhythm], className)} {...props}>
      {grid && (
        <div
          aria-hidden="true"
          className="hairline-grid pointer-events-none absolute inset-0 opacity-40"
        />
      )}
      {width === 'full' ? (
        children
      ) : (
        <Container size={width} className="relative">
          {children}
        </Container>
      )}
    </section>
  )
}
