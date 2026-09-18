import { NextResponse, type NextRequest } from 'next/server'
import { articleIdRedirects, pathRedirects } from '@/config/redirects'

/**
 * 301s from the legacy Laravel site.
 *
 * Every legacy URL is live today and carries whatever authority the old domain
 * has accumulated. Launching without these would drop all of it and hand every
 * inbound link a 404.
 *
 * 308 rather than 301 so the method is preserved, and because Next treats it as
 * the permanent redirect — search engines honour both identically for GET.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Trailing slashes: /about-us/ should match /about-us.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  const target = pathRedirects.get(path)
  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 308)
  }

  // The legacy blog used a query string: /sub-blogs?id=133
  if (path === '/sub-blogs') {
    const id = Number(searchParams.get('id'))
    const slug = Number.isFinite(id) ? articleIdRedirects.get(id) : undefined
    return NextResponse.redirect(
      new URL(slug ?? '/resources/articles', request.url),
      308
    )
  }

  return NextResponse.next()
}

export const config = {
  /**
   * Only the legacy paths. Matching everything would put this on the hot path
   * of every static asset request for no benefit.
   */
  matcher: [
    '/index.php',
    '/about-us',
    '/vision-mission',
    '/our-team',
    '/blogs',
    '/sub-blogs',
    '/photo-gallery',
    '/sub-photo-gallery',
    '/vedio-gallery',
    '/sub-vedio-gallery',
    '/sub-product/:id',
  ],
}
