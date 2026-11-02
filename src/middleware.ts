import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Lansman: Site tüm kullanıcılara ve dünyaya doğrudan açıktır.
  return NextResponse.next();
}

// Middleware matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
