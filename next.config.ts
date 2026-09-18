import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

/**
 * Content Security Policy.
 *
 * The old site loaded a script over plain http:// (mixed content) and pulled
 * from six different CDNs. This build has no third-party runtime dependencies
 * at all — fonts are self-hosted via next/font — so the policy can be tight.
 *
 * 'unsafe-inline' on style-src is required by Next's inlined critical CSS.
 *
 * script-src also carries 'unsafe-inline', and Lighthouse flags it (best
 * practices 96 rather than 100). Removing it means adopting per-request CSP
 * nonces, which forces every page to render dynamically and gives up static
 * prerendering entirely — trading a measured 98 performance score for a
 * theoretical XSS mitigation on a site that renders no user-supplied content
 * into markup and has no authenticated surface. Revisit if that changes.
 */
const isDev = process.env.NODE_ENV === 'development'

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  // The legacy media host (finalapi.soilchargertechnology.com) is deliberately
  // NOT allowed: every one of its 42 referenced images returns HTTP 404, so
  // permitting it would widen the policy for no benefit. Re-add here and in
  // `images.remotePatterns` if the client restores that host.
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'" + (isDev ? ' ws: wss:' : ''),
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  typescript: {
    // Never ship a build that does not typecheck.
    ignoreBuildErrors: false,
  },

  // NOTE: Next 16 no longer runs ESLint during `next build`, so a11y violations
  // can no longer fail the build here. They are enforced instead by
  // `npm run check` (typecheck + lint + format), which is what CI runs.

  images: {
    // AVIF first, WebP fallback. See Phase 10 budgets.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // No remote patterns: all imagery is served from /public. The legacy media
    // host is dead (every asset 404s), so nothing is proxied from it.
    remotePatterns: [],
  },

  experimental: {
    // Tree-shake icon and animation barrel imports so a single icon does not
    // pull the whole library into the bundle.
    optimizePackageImports: ['lucide-react', 'motion'],
  },

  async headers() {
    // Next already serves /_next/static with `immutable` far-future caching;
    // overriding it here is redundant and breaks dev asset invalidation.
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)
