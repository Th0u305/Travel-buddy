import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const cookie = request.cookies.getAll();

  const aaaa = cookie.find((c) => c.value.startsWith("base64-"))?.value;

  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth/reset-password") {
    const hash = window.location.hash;
    if (!hash) {
      return NextResponse.redirect(new URL("/reset-password", request.url));
    }
  }
  if (!aaaa) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile/:path*"],
};
