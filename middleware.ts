import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  // If token exists and user is on login or home page, redirect to /menu
  if (token && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If no token and trying to access protected routes
  if (!token && ["/home", "/checkout"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/home", "/checkout"],
};
