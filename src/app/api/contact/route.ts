import { NextResponse, type NextRequest } from 'next/server'
import { contactSchema, MIN_SUBMIT_MS } from '@/lib/forms/schemas'
import { clientIp, rateLimit } from '@/lib/forms/ratelimit'
import { sendEnquiry } from '@/lib/forms/mailer'
import { site } from '@/config/site'

/** Never cached, never prerendered. */
export const dynamic = 'force-dynamic'

/**
 * Enquiry endpoint.
 *
 * Defence in depth, cheapest check first so a bot costs us as little as
 * possible:
 *
 *   1. Origin check      — rejects cross-site posts outright
 *   2. Honeypot          — a field no human can see or tab to
 *   3. Timing floor      — submissions faster than a human can type
 *   4. Rate limit        — per IP, 5 per 10 minutes
 *   5. Schema validation — the same Zod object the browser used
 *
 * Steps 2 and 3 return a fake success. Telling a bot precisely why it was
 * rejected just helps it adapt; a human never triggers either.
 */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  // Same-origin form posts from some browsers omit Origin entirely.
  if (!origin) return true

  try {
    const allowed = new Set([new URL(site.url).host, request.nextUrl.host])
    return allowed.has(new URL(origin).host)
  } catch {
    return false
  }
}

function reference(): string {
  return `SCT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Request rejected.' }, { status: 403 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    // Field-level errors so the client can attach them to the right inputs.
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', fieldErrors },
      { status: 422 }
    )
  }

  const values = parsed.data
  const ref = reference()

  // Silent rejections — look identical to success from the outside.
  if (values.website) {
    console.warn(`[enquiry] honeypot triggered from ${clientIp(request.headers)}`)
    return NextResponse.json({ reference: ref }, { status: 200 })
  }

  if (values.elapsedMs !== undefined && values.elapsedMs < MIN_SUBMIT_MS) {
    console.warn(`[enquiry] submitted in ${values.elapsedMs}ms — below human floor`)
    return NextResponse.json({ reference: ref }, { status: 200 })
  }

  const limit = await rateLimit(clientIp(request.headers))
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many enquiries from this connection. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': '600' } }
    )
  }

  try {
    const result = await sendEnquiry(values, ref)

    if (result.loggedOnly && process.env.NODE_ENV === 'production') {
      // Do not report success for a message nobody will ever read.
      console.error('[enquiry] no mail provider configured in production')
      return NextResponse.json(
        { error: 'The enquiry service is temporarily unavailable. Please email us directly.' },
        { status: 503 }
      )
    }

    return NextResponse.json({ reference: ref }, { status: 200 })
  } catch (error) {
    console.error('[enquiry] delivery failed', error)
    return NextResponse.json(
      { error: 'We could not send your enquiry. Please email us directly.' },
      { status: 502 }
    )
  }
}
