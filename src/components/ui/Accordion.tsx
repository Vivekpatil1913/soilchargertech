'use client'

import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface AccordionItem {
  /** Short label rendered in the trigger, e.g. "01". */
  marker?: string
  title: string
  /** Secondary label beside the title. */
  meta?: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Index open on first render. `null` opens none. */
  defaultOpen?: number | null
  /** When false, several panels can be open at once. */
  single?: boolean
  /**
   * Must follow the surrounding document outline. An accordion placed directly
   * under a page's h1 needs h2; one inside a section that already has an h2
   * needs h3. Skipping a level is a real navigation problem for screen readers.
   */
  headingLevel?: 'h2' | 'h3' | 'h4'
  className?: string
}

/**
 * Disclosure list.
 *
 * Height animates via `grid-template-rows: 0fr → 1fr`, which needs no JS
 * measurement and no fixed max-height guess — so long content never gets
 * clipped. Panels stay in the DOM and are hidden with `hidden`, keeping the
 * content findable by in-page search when open and out of the a11y tree when
 * closed.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  single = true,
  headingLevel: Heading = 'h3',
  className,
}: AccordionProps) {
  const baseId = useId()
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen])

  const toggle = (index: number) =>
    setOpen((current) => {
      if (current.includes(index)) return current.filter((i) => i !== index)
      return single ? [index] : [...current, index]
    })

  return (
    <div className={cn('border-hairline border-t', className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index)
        const triggerId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.title} className="border-hairline border-b">
            <Heading>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-center gap-5 py-6 text-left"
              >
                {item.marker && (
                  <span className="data-value text-accent shrink-0">{item.marker}</span>
                )}

                <span className="flex-1">
                  <span className="text-h4 font-display text-ink block">{item.title}</span>
                  {item.meta && <span className="eyebrow mt-1.5 block">{item.meta}</span>}
                </span>

                <Plus
                  aria-hidden="true"
                  className={cn(
                    'text-ink-subtle group-hover:text-accent size-5 shrink-0 transition-transform duration-250',
                    'motion-reduce:transition-none',
                    isOpen && 'rotate-45'
                  )}
                />
              </button>
            </Heading>

            <div
              className={cn(
                'ease-out-expo grid transition-[grid-template-rows] duration-400 motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                {/* `inert` rather than `hidden`: `hidden` applies display:none
                    the instant the panel closes, so the content vanishes before
                    the collapse animates. `inert` keeps it rendered while still
                    removing it from the tab order and the accessibility tree. */}
                <div id={panelId} role="region" aria-labelledby={triggerId} inert={!isOpen}>
                  <div className="pb-8">{item.content}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
