import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dznrxxcvvovcuaokyrbh.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bnJ4eGN2dm92Y3Vhb2t5cmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTczMjUsImV4cCI6MjEwNTE3MzMyNX0.MPi8wZO3zhTW3a-bdH81zNebzepfqxt9LSEZt6KBOHc';

const SECRET_DOORPASS = (
  process.env.ADMIN_DOORPASS ||
  process.env.NEXT_PUBLIC_ADMIN_DOORPASS ||
  'figmap'
).trim();

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    // 1. Ekstrak input doorpass dari URL (?doorpass=password ATAU /admin/doorpass=password)
    let inputDoorpass = searchParams.get('doorpass');
    if (!inputDoorpass && pathname.includes('/admin/doorpass=')) {
      const parts = pathname.split('/admin/doorpass=');
      if (parts[1]) {
        inputDoorpass = decodeURIComponent(parts[1].split('/')[0]);
      }
    }

    const isDoorpassParamValid = Boolean(
      inputDoorpass && inputDoorpass.trim() === SECRET_DOORPASS
    );

    const hasDoorpassCookie =
      request.cookies.get('admin_doorpass_unlocked')?.value === 'true';

    // KONDISI 1: User memasukkan doorpass valid di URL (membuka pintu admin)
    if (isDoorpassParamValid) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.delete('doorpass'); // Bersihkan URL agar rapi

      const redirectRes = NextResponse.redirect(loginUrl);
      redirectRes.cookies.set('admin_doorpass_unlocked', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      // Bersihkan sesi auth lama jika ada sisa
      for (const c of request.cookies.getAll()) {
        if (c.name.startsWith('sb-') || c.name.includes('auth-token')) {
          redirectRes.cookies.delete(c.name);
        }
      }

      return redirectRes;
    }

    // KONDISI 2: Jika Doorpass belum terbuka (tidak punya cookie & bukan dari doorpass valid)
    // Sembunyikan route /admin/* dan tampilkan 404 (Not Found)
    if (!hasDoorpassCookie) {
      const notFoundUrl = new URL('/not-found', request.url);
      const response404 = NextResponse.rewrite(notFoundUrl, { status: 404 });
      response404.cookies.delete('admin_doorpass_unlocked');
      return response404;
    }

    // KONDISI 3 & 4: Doorpass SUDAH Terbuka
    // Inisialisasi Supabase SSR untuk memeriksa sesi autentikasi
    let supabaseResponse = NextResponse.next({ request });

    let user = null;
    try {
      const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      const { data } = await supabase.auth.getUser();
      user = data?.user || null;
    } catch (authErr) {
      console.error('Supabase middleware auth check warning:', authErr);
    }

    // Jika user sudah terautentikasi:
    if (user) {
      // Jika mencoba membuka /admin atau /admin/login saat sudah login, bawa ke dashboard proyek
      if (pathname === '/admin' || pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin/proyek', request.url));
      }
      return supabaseResponse;
    }

    // Jika belum login (user == null):
    if (pathname === '/admin/login') {
      return supabaseResponse;
    }

    // Jika mencoba akses /admin/proyek atau sub-admin lain tanpa login: arahkan ke /admin/login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  } catch (err) {
    console.error('CRITICAL middleware error caught:', err);
    // Fail-safe mutlak agar Vercel tidak pernah mengembalikan 500 MIDDLEWARE_INVOCATION_FAILED
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
