import { NextResponse } from "next/server";

// Preserve the old router's case-insensitive service links and bookmarks.
export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const canonical = pathname.toLowerCase();
  if (pathname !== canonical) {
    const url = request.nextUrl.clone();
    url.pathname = canonical;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/CloudService", "/Backendservice"],
};
