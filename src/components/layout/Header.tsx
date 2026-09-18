'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { headerCta, mainNav, visibleNav } from '@/config/navigation'
import type { NavItem } from '@/types/navigation'
import { Button, Container } from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

function isActive(pathname: string, href: string) {
  const path = href.split('?')[0] ?? href
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

function Dropdown({
  item,
  pathname,
  align = 'left',
}: {
  item: NavItem
  pathname: string
  /** Right-align panels near the viewport edge so they cannot overflow. */
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const wrapper = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)

  // A small close delay stops the panel vanishing while the pointer crosses the
  // gap between the trigger and the panel.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Focus and keyboard handlers live on the interactive elements inside, not on
  // the wrapper: React's focus events bubble, so a static container carrying
  // them would be an accessibility smell (and is flagged as one). The wrapper
  // keeps only pointer-hover enhancement, which has a full keyboard equivalent.
  const onFocusCapture = () => setOpen(true)

  const onBlurCapture = (event: React.FocusEvent) => {
    if (!wrapper.current?.contains(event.relatedTarget as Node)) setOpen(false)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <div
      ref={wrapper}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <Link
        ref={triggerRef}
        href={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={onFocusCapture}
        onBlur={onBlurCapture}
        onKeyDown={onKeyDown}
        className={cn(
          'text-body flex items-center gap-1.5 py-2 transition-colors duration-200',
          isActive(pathname, item.href) ? 'text-accent' : 'text-ink hover:text-accent'
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </Link>

      {/* The panel stays mounted and animates in CSS. A fade-and-6px-rise does
          not justify shipping a 50 KB animation runtime on every page; GSAP and
          Motion are reserved for the storytelling sections that genuinely need
          them, where they load per-route. `inert` keeps the closed panel out of
          both the tab order and the accessibility tree. */}
      {item.children && (
        <div
          inert={!open}
          aria-hidden={!open}
          className={cn(
            'bg-surface border-hairline shadow-dropdown absolute top-full z-50 w-72 rounded-sm border p-2',
            // The panel stays mounted for the CSS transition, so even while
            // invisible it contributes to document scrollWidth. Left-aligning
            // the last trigger's panel pushed the page 17px wide at 1024px.
            align === 'right' ? 'right-0' : 'left-0',
            'ease-out-expo origin-top transition-[opacity,transform] duration-250 motion-reduce:transition-none',
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1.5 opacity-0'
          )}
        >
          <ul>
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  tabIndex={open ? undefined : -1}
                  onFocus={onFocusCapture}
                  onBlur={onBlurCapture}
                  onKeyDown={onKeyDown}
                  className="hover:bg-surface-sunken block rounded-sm px-3 py-2.5 transition-colors duration-150"
                >
                  <span className="text-ink block text-[0.9375rem]">{child.label}</span>
                  {child.description && (
                    <span className="text-caption text-ink-subtle mt-0.5 block">
                      {child.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const nav = visibleNav(mainNav)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-site-header=""
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        // Sticky rather than fixed: it stays in the flow, so there is no layout
        // shift and no per-page top padding to keep in sync.
        //
        // Two resting appearances, and `globals.css` — not this file — decides
        // which applies. On a route whose first band is dark (the homepage hero,
        // every <PageHero>) the header floats over that band and its tokens
        // invert, so `.at-top` here is transparent and the stylesheet supplies a
        // scrim that dissolves into the picture. On a route that opens light
        // (404, the error boundary, the product index) none of that matches and
        // `.at-top` is simply a transparent bar on the page background.
        //
        // Once scrolled, both cases land on the same translucent light bar.
        scrolled ? 'bg-bg/90 border-hairline border-b backdrop-blur-md' : 'at-top bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-6 lg:h-20">
          <Logo />

          {/* The gap tightens at `lg` and opens back up at `xl`. At exactly
              1024px — the moment the desktop nav appears — six nav items, the
              logo and the CTA overran the viewport by 12px and the page
              scrolled sideways. It only showed while the webfont was
              unavailable (the fallback face is wider), so it was invisible on a
              warm cache and appeared during the swap period on a cold one. */}
          <nav aria-label="Main" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {nav.map((item, index) =>
              item.children?.length ? (
                <Dropdown
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  align={index >= nav.length - 2 ? 'right' : 'left'}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-body py-2 transition-colors duration-200',
                    isActive(pathname, item.href) ? 'text-accent' : 'text-ink hover:text-accent'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Button href={headerCta.href} size="sm" className="hidden sm:inline-flex">
              {headerCta.label}
            </Button>
            <MobileMenu items={nav} cta={headerCta} pathname={pathname} />
          </div>
        </div>
      </Container>
    </header>
  )
}
