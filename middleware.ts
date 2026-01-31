import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidCountryCode, defaultCountry } from './lib/countries'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Extract potential country code from path
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]?.toLowerCase()

  // If root path, redirect to default country
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultCountry}`
    return NextResponse.redirect(url)
  }

  // If first segment is a valid country code, allow it
  if (firstSegment && isValidCountryCode(firstSegment)) {
    return NextResponse.next()
  }

  // If first segment is not a country code, redirect to default country with the path
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultCountry}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
