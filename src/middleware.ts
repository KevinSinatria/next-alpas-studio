import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && isLoggedIn !== 'true') {
    // Redirect ke login kalau belum login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Tentukan route mana saja yang kena middleware
export const config = {
  matcher: ['/admin/:path*'], // semua halaman di bawah /admin
};
