import { NextResponse } from "next/server";

import { extendSession, startSession } from "@/lib/session";

export async function middleware(request) {
  const response = NextResponse.next();

  if (!request.cookies.has("session")) {
    await startSession();
  } else {
    await extendSession();
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ]
};
