import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const theme = req.cookies.get('theme')?.value

  if ( !theme ) {
    return NextResponse.redirect(new URL('/start', req.url))
  }
}

export const config = {
  matcher: ['/', '/characters/:path*', '/starships/:path*', '/planets/:path*', '/mini-histories/:path*']
}