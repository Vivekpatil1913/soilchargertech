import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section rhythm="spacious" grid>
      <div className="flex max-w-xl flex-col gap-6">
        <p className="eyebrow">Error 404</p>
        <h1 className="text-display-lg">This page could not be found.</h1>
        <p className="text-body-lg text-ink-muted">
          The page may have moved, or the link may be out of date. The technology overview and the
          product range are the best places to pick up from.
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Button href="/technology">
            Explore the technology <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button href="/products" variant="secondary">
            View products
          </Button>
        </div>
      </div>
    </Section>
  )
}
