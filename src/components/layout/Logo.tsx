import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import logoMark from '../../../public/images/logo-mark.png'

/**
 * Header lockup: the client's emblem plus a live text wordmark.
 *
 * The supplied original is a square JPEG — emblem above a two-line maroon
 * wordmark on solid white. It is used here as the emblem only, cut out to
 * transparency by `npm run generate:logo`, for two reasons:
 *
 *   - At header size the original's stacked wordmark would be ~7px per line.
 *   - Its maroon type measures roughly 2:1 against the dark footer and dark page
 *     heroes. Setting the wordmark as live text means it inverts with the
 *     surface and stays legible everywhere.
 *
 * The complete original lockup is still used at size for the favicon and app
 * icons, where it sits on the brand off-white and reads correctly.
 *
 * Imported statically so Next has the intrinsic dimensions at build time — the
 * logo can never cause layout shift.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('group inline-flex items-center gap-3', className)}>
      <Image
        src={logoMark}
        alt=""
        aria-hidden="true"
        priority
        sizes="52px"
        className="h-9 w-auto shrink-0 lg:h-10"
      />

      {/* The accessible name comes from this text, which is what a voice-control
          user will actually say. */}
      <span className="font-display text-ink flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-tight">Soil Charger</span>
        <span className="text-ink-subtle font-mono text-[0.625rem] tracking-[0.18em] uppercase">
          Technology
        </span>
      </span>
    </Link>
  )
}
