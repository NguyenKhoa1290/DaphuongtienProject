// ================================================================
// MIDDLEWARE - Bảo vệ các route cần đăng nhập
// ----------------------------------------------------------------
// TODO [BE]: Khi có BE, thay logic này bằng verify JWT thật
// Hiện tại chỉ check xem có token trong cookie không
//
// Cách verify JWT thật sau này:
// import { jwtVerify } from 'jose'
// const secret = new TextEncoder().encode(process.env.JWT_SECRET)
// await jwtVerify(token, secret)
// ================================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các route cần đăng nhập mới vào được
const PROTECTED_ROUTES = ["/friends", "/history", "/call"];

// Các route chỉ dành cho người CHƯA đăng nhập
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO [BE]: Thay 'token' bằng tên cookie thật BE trả về
  const token = request.cookies.get("token")?.value;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Chưa đăng nhập mà vào trang protected → redirect login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đã đăng nhập mà vào login/register → redirect friends
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/friends", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/friends/:path*",
    "/history/:path*",
    "/call/:path*",
    "/login",
    "/register",
  ],
};
