import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const secretDoorpass = (
    process.env.ADMIN_DOORPASS ||
    process.env.NEXT_PUBLIC_ADMIN_DOORPASS ||
    'rahasia-admin'
  ).trim();

  // 1. Ekstrak input doorpass dari URL (?doorpass=password ATAU /admin/doorpass=password)
  let inputDoorpass = searchParams.get('doorpass');
  if (!inputDoorpass && pathname.includes('/admin/doorpass=')) {
    const parts = pathname.split('/admin/doorpass=');
    if (parts[1]) {
      inputDoorpass = decodeURIComponent(parts[1].split('/')[0]);
    }
  }

  const isDoorpassParamValid = Boolean(
    inputDoorpass && inputDoorpass.trim() === secretDoorpass
  );

  const hasDoorpassCookie = request.cookies.get('admin_doorpass_unlocked')?.value === 'true';

  // KONDISI 1: User memasukkan doorpass valid di URL (membuka pintu admin)
  // Sesuai permintaan: setelah memasukkan doorpass HARUS TETAP login manual dengan email & password
  if (isDoorpassParamValid) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.delete('doorpass'); // Bersihkan URL agar rapi

    const redirectRes = NextResponse.redirect(loginUrl);
    // Beri cookie doorpass terbuka
    redirectRes.cookies.set('admin_doorpass_unlocked', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    // Bersihkan sesi auth lama (jika ada sisa) agar WAJIB login manual
    for (const c of request.cookies.getAll()) {
      if (c.name.startsWith('sb-') || c.name.includes('auth-token')) {
        redirectRes.cookies.delete(c.name);
      }
    }

    return redirectRes;
  }

  // KONDISI 2: Jika Doorpass belum terbuka (bukan dari URL valid dan tidak punya cookie doorpass)
  // Pengunjung umum atau admin yang sudah logout:
  // Kunci rapat semua route /admin/* dan tampilkan 404 (Not Found)
  if (!hasDoorpassCookie) {
    const notFoundUrl = new URL('/not-found', request.url);
    const response404 = NextResponse.rewrite(notFoundUrl, { status: 404 });
    response404.cookies.delete('admin_doorpass_unlocked');
    return response404;
  }

  // KONDISI 3: Doorpass SUDAH Terbuka (Cookie admin_doorpass_unlocked aktif)
  // Cek apakah user sudah terautentikasi di Supabase Auth:
  if (user) {
    // Jika sudah login dan mencoba membuka /admin atau /admin/login, bawa ke dashboard proyek
    if (pathname === '/admin' || pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/proyek', request.url));
    }
    // Akses ke rute admin (/admin/proyek, dsb.) diizinkan
    return supabaseResponse;
  }

  // KONDISI 4: Doorpass Terbuka, TAPI Belum Login (user == null)
  // Pengguna wajib login manual di /admin/login
  if (pathname === '/admin/login') {
    return supabaseResponse;
  }

  // Jika mencoba akses /admin/proyek atau /admin lainnya tanpa login:
  // Arahkan ke /admin/login untuk mengisi form email & password
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*'],
};
