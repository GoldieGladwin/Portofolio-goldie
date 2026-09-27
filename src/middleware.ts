import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DOORPASS_SESSION_COOKIE,
  LEGACY_DOORPASS_COOKIE,
  getDoorpassSecret,
  verifyDoorpassSessionToken,
} from './lib/doorpass/core';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dznrxxcvvovcuaokyrbh.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bnJ4eGN2dm92Y3Vhb2t5cmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTczMjUsImV4cCI6MjEwNTE3MzMyNX0.MPi8wZO3zhTW3a-bdH81zNebzepfqxt9LSEZt6KBOHc';

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const secretDoorpass = getDoorpassSecret();

    // Helper untuk response 404 dan membersihkan cookie doorpass yang tidak valid/stale
    const send404 = () => {
      const notFoundUrl = new URL('/not-found', request.url);
      const response404 = NextResponse.rewrite(notFoundUrl, { status: 404 });
      response404.cookies.delete(DOORPASS_SESSION_COOKIE);
      response404.cookies.delete(LEGACY_DOORPASS_COOKIE);
      return response404;
    };

    // Jika ADMIN_DOORPASS belum disetel di .env / Vercel (kosong), tolak mutlak semua akses admin
    if (!secretDoorpass) {
      return send404();
    }

    // 1. Ekstrak input doorpass dari URL (?doorpass=password ATAU /admin/doorpass=password)
    let inputDoorpass = searchParams.get('doorpass');
    if (!inputDoorpass && pathname.includes('/admin/doorpass=')) {
      const parts = pathname.split('/admin/doorpass=');
      if (parts[1]) {
        inputDoorpass = decodeURIComponent(parts[1].split('/')[0]);
      }
    }

    // KONDISI 1: User memasukkan doorpass di URL
    if (inputDoorpass !== null) {
      if (inputDoorpass.trim() === secretDoorpass) {
        // Doorpass valid! Arahkan ke /admin/login dengan query doorpass agar form login terbuka
        if (pathname !== '/admin/login') {
          const loginUrl = new URL('/admin/login', request.url);
          loginUrl.searchParams.set('doorpass', secretDoorpass);
          const redirectRes = NextResponse.redirect(loginUrl);
          redirectRes.cookies.delete(LEGACY_DOORPASS_COOKIE);
          return redirectRes;
        }
        // Jika sudah di /admin/login dengan doorpass valid, izinkan render
        const nextRes = NextResponse.next();
        nextRes.cookies.delete(LEGACY_DOORPASS_COOKIE);
        return nextRes;
      } else {
        // Doorpass salah -> 404 Not Found!
        return send404();
      }
    }

    // KONDISI 2: TIDAK ada doorpass di URL (misal pengunjung hanya mengetik /admin atau /admin/login)
    // Cek apakah user SUDAH login dan memiliki cookie session doorpass yang sah
    const doorpassSessionCookie = request.cookies.get(DOORPASS_SESSION_COOKIE)?.value;
    const isDoorpassSessionValid = await verifyDoorpassSessionToken(
      doorpassSessionCookie,
      secretDoorpass
    );

    // Inisialisasi Supabase SSR untuk memeriksa sesi autentikasi
    let supabaseResponse = NextResponse.next({ request });
    supabaseResponse.cookies.delete(LEGACY_DOORPASS_COOKIE);

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

    // Jika user SUDAH login dan memiliki sesi doorpass yang valid dengan password .env saat ini:
    if (user && isDoorpassSessionValid) {
      // Jika mencoba membuka /admin atau /admin/login saat sudah login, bawa langsung ke dashboard proyek
      if (pathname === '/admin' || pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin/proyek', request.url));
      }
      return supabaseResponse;
    }

    // Jika BELUM login atau sesi doorpass tidak cocok dengan password saat ini:
    // WAJIB ditolak ke 404! (Mengetik /admin doang tidak akan pernah membuka login)
    return send404();
  } catch (err) {
    console.error('CRITICAL middleware error caught:', err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};

