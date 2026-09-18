/**
 * Per-IP rate limiting for form endpoints.
 *
 * Uses Upstash Redis when configured, and falls back to an in-memory window
 * otherwise. The fallback is honest about its limits: it is per-instance, so on
 * a multi-instance deployment it throttles per server rather than globally.
 * That is still far better than the legacy site, which had no limiting at all
 * on any of its five public endpoints.
 */
interface Bucket {
  count: number
  resetAt: number
}

const memory = new Map<string, Bucket>()

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

function sweep(now: number) {
  // Keeps the map from growing without bound on a long-lived instance.
  if (memory.size < 5000) return
  for (const [key, bucket] of memory) {
    if (bucket.resetAt <= now) memory.delete(key)
  }
}

async function limitViaUpstash(key: string): Promise<{ ok: boolean; remaining: number } | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  try {
    const response = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['PEXPIRE', key, String(WINDOW_MS), 'NX'],
      ]),
      cache: 'no-store',
    })

    if (!response.ok) return null

    const [incr] = (await response.json()) as Array<{ result: number }>
    const count = incr?.result ?? 0
    return { ok: count <= MAX_REQUESTS, remaining: Math.max(0, MAX_REQUESTS - count) }
  } catch {
    // Never let a limiter outage take the form down with it.
    return null
  }
}

export async function rateLimit(identifier: string) {
  const key = `sct:form:${identifier}`

  const upstash = await limitViaUpstash(key)
  if (upstash) return upstash

  const now = Date.now()
  sweep(now)

  const bucket = memory.get(key)
  if (!bucket || bucket.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, remaining: MAX_REQUESTS - 1 }
  }

  bucket.count += 1
  return { ok: bucket.count <= MAX_REQUESTS, remaining: Math.max(0, MAX_REQUESTS - bucket.count) }
}

/** Best-effort client IP from the usual proxy headers. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return headers.get('x-real-ip') ?? 'unknown'
}
