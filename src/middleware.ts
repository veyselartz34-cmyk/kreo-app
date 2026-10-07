import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Sadece admin ve kreo2026 sifresi ile girilebilir
    if (user === 'admin' && pwd === 'kreo2026') {
      return NextResponse.next();
    }
  }

  return new NextResponse('Kreo - Site su an gizlidir. Erisim yetkiniz yok.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Middleware'in calisacagi rotalar (statik dosyalar haric)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
