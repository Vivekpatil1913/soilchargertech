'use client'

import { useEffect } from 'react'
import { Button, Section } from '@/components/ui'

/**
 * Route-level error boundary. Keeps the header and footer intact so a failed
 * section never strands the visitor on a bare page.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Replace with a real error reporter (Sentry et al.) when one is added.
    console.error(error)
  }, [error])

  return (
    <Section rhythm="spacious">
      <div className="flex max-w-xl flex-col gap-6">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="text-display-lg">This page failed to load.</h1>
        <p className="text-body-lg text-ink-muted">
          The error has been logged. Trying again will often resolve it.
        </p>
        {error.digest && <p className="data-value text-ink-subtle">Reference: {error.digest}</p>}
        <div className="mt-2 flex flex-wrap gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </Section>
  )
}
