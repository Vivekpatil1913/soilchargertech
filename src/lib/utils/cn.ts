import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge has to be taught this project's custom scales.
 *
 * Out of the box it groups every `text-*` class together and keeps only the
 * last one. Because our font sizes (`text-body-lg`) and our semantic colours
 * (`text-on-accent`) are both custom names it cannot recognise, a button
 * composed as `cn(variant, size)` silently lost its text colour — the size
 * class came last and won.
 *
 * That is not a cosmetic bug: on a dark surface the primary button fell back to
 * inherited near-white on a light-green fill, measured at 1.76:1 against a
 * 4.5:1 requirement.
 *
 * Declaring the font-size scale here keeps the two groups distinct, so a colour
 * and a size can coexist on the same element.
 */
export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-xl',
            'display-lg',
            'h2',
            'h3',
            'h4',
            'body-lg',
            'body',
            'caption',
            'data',
          ],
        },
      ],
    },
  },
})

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
