'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { NavItem } from '@/types/navigation'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils/cn'

interface MobileMenuProps {
  items: NavItem[]
  cta: NavItem
  pathname: string
}

/**
 * Slide-in navigation panel.
 *
 * Animated in CSS rather than with a JS animation runtime: a translate and a
 * fade do not justify ~50 KB gz on the critical path of every page. The panel
 * stays mounted and `inert` when closed, which keeps it out of the tab order
 * and the accessibility tree without breaking the transition.
 */
export function MobileMenu({ items, cta, pathname }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Closing on navigation is handled on each link's click rather than by
  // watching `pathname` in an effect — setting state synchronously in an effect
  // triggers a cascading re-render, and the click is the real event.
  const close = () => setOpen(false)

  const closeAndRestoreFocus = () => {
    close()
    triggerRef.current?.focus()
  }

  // Lock the page behind the panel and restore the exact scroll position on
  // close — `overflow: hidden` alone jumps the page to the top on iOS.
  useEffect(() => {
    if (!open) return
    const { scrollY } = window
    const { body } = document
    const previous = body.style.cssText

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    return () => {
      body.style.cssText = previous
      window.scrollTo(0, scrollY)
    }
  }, [open])

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Focus trap — Tab must not escape the open panel into the page behind it.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
        (element) => element.offsetParent !== null
      )

    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const nodes = focusables()
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', onKeyDown)
    return () => panel.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="text-ink hover:bg-surface-sunken -mr-2 inline-flex size-11 items-center justify-center rounded-sm transition-colors lg:hidden"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {/* Scrim */}
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-350 lg:hidden',
          'motion-reduce:transition-none',
          open ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      />

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cn(
          'bg-bg border-hairline fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l lg:hidden',
          'ease-out-expo transition-transform duration-350 motion-reduce:transition-none',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-18 shrink-0 items-center justify-end px-5">
          <button
            type="button"
            onClick={closeAndRestoreFocus}
            aria-label="Close menu"
            className="text-ink hover:bg-surface-sunken -mr-2 inline-flex size-11 items-center justify-center rounded-sm transition-colors"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-5 pb-8">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-hairline border-b py-1">
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    'text-h4 font-display block py-3',
                    pathname.startsWith(item.href) ? 'text-accent' : 'text-ink'
                  )}
                >
                  {item.label}
                </Link>

                {item.children && (
                  <ul className="mb-3 flex flex-col gap-1 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className="text-ink-muted hover:text-accent block py-1.5 text-[0.9375rem]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <Button href={cta.href} onClick={close} size="lg" className="mt-8 w-full">
            {cta.label}
          </Button>
        </nav>
      </div>
    </>
  )
}
