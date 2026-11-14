import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for non-empty Supabase session cookies
    const allCookies = req.cookies.getAll();
    const hasAuthCookie = allCookies.some(
      (c) => (c.name.includes('-auth-token') || c.name.startsWith('sb-')) && Boolean(c.value && c.value.trim().length > 20)
    );

    // If no Supabase cookie is present, redirect to login
    if (!hasAuthCookie) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

