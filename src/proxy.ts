import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

  const cookie = request.cookies.getAll()
  
  const aaaa = cookie.find((c) => c.value.startsWith("base64-"))?.value

  if (!aaaa) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/trips/:path*',
    '/profiles/:path*'
  ]
};