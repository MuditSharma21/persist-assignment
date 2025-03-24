// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Define paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPath = publicPaths.includes(path);
  
  // Get session token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect logic
  if (!token && !isPublicPath) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  if (token && (path === "/login" || path === "/signup")) {
    // Redirect to dashboard if trying to access login/signup while logged in
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};