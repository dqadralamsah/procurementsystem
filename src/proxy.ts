import { auth } from './lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();

  const publicPath = ['/signin', 'unauthorized', 'forbidden'];
  const isPublic = publicPath.includes(pathname);

  // if the user is not logged in and is trying to access a non-public route, redirect to login page
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // if the user is logged and is triying to access a public route, redirect to dashboard
  if (session && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
