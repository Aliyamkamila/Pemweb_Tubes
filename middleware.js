import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Handle protected routes for dashboard
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    // Ganti r.url menjadi req.url
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access to other routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};