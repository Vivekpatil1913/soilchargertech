'use client'

import dynamic from 'next/dynamic'

/**
 * Defers the enquiry form out of first-load JavaScript.
 *
 * MEASURED: react-hook-form + zod + @hookform/resolvers add ~105 KB gz. Loading
 * them eagerly pushed /contact and every product page to 262 KB against a
 * 165 KB budget — for a form that sits below the fold and that most visitors
 * never reach.
 *
 * `ssr: false` costs nothing here: the form cannot function without JavaScript
 * anyway, it holds no content worth indexing, and the routed contact details on
 * the page are the no-JS fallback.
 *
 * The placeholder reserves the form's height so the deferred load causes no
 * layout shift — CLS stays at 0.
 */
const ContactFormImpl = dynamic(() => import('./ContactForm').then((mod) => mod.ContactForm), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-label="Loading enquiry form"
      className="border-hairline min-h-[38rem] animate-pulse rounded-sm border border-dashed"
    />
  ),
})

export function ContactFormLazy(props: { productSlug?: string; productName?: string }) {
  return <ContactFormImpl {...props} />
}
