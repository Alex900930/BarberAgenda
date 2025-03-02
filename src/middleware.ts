import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Rutas protegidas
  const adminRoutes = ['/admin'];
  const authRoutes = ['/login'];

  // Redirigir si ya está autenticado
  if (authRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Proteger rutas de admin
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(request.url)}`, request.url));
    }
    
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/forbidden', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};