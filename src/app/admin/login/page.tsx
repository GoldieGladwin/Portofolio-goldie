import { redirect, notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getDoorpassSecret } from '@/lib/doorpass/core';
import { setDoorpassUnlockedAction, revokeDoorpassAction } from '@/lib/doorpass/actions';

async function loginAction(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const doorpass = (formData.get('doorpass') as string || '').trim();

  const secretDoorpass = getDoorpassSecret();

  // Jika doorpass yang dikirim form tidak sesuai dengan env -> tolak mutlak
  if (!doorpass || doorpass !== secretDoorpass) {
    await revokeDoorpassAction();
    redirect('/not-found');
  }

  const supabase = await createSupabaseServerClient();
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('Supabase Auth Error:', authError);
    const errorMsg = authError?.message || 'Kredensial tidak valid';
    redirect(`/admin/login?doorpass=${encodeURIComponent(secretDoorpass)}&error=${encodeURIComponent(errorMsg)}`);
  }

  // 1. Verifikasi Role Admin dari tabel 'profiles'
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  // Jika akun tidak terdaftar di tabel profiles atau rolenya bukan admin -> Tolak!
  if (profileError || !profile || profile.role !== 'admin') {
    console.error('Profile Verification Error:', { profile, profileError });
    await supabase.auth.signOut();
    await revokeDoorpassAction();
    redirect(`/admin/login?doorpass=${encodeURIComponent(secretDoorpass)}&error=Akses+ditolak:+Akun+Anda+bukan+admin`);
  }

  // Aktifkan sesi doorpass terenkripsi hash SHA-256 untuk admin yang berhasil login
  await setDoorpassUnlockedAction(secretDoorpass);

  redirect('/admin/proyek');
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ doorpass?: string; error?: string }>;
}) {
  const params = await searchParams;
  const secretDoorpass = getDoorpassSecret();

  const isParamValid = Boolean(params.doorpass && params.doorpass.trim() === secretDoorpass);

  // Jika doorpass di URL tidak ada atau tidak cocok persis dengan env -> 404 Not Found!
  if (!isParamValid) {
    notFound();
  }

  return (
    <main
      data-hide-nav="true"
      data-page="admin-login"
      className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-950 px-4"
    >
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Admin Login</h1>
        <p className="text-slate-500 text-sm mb-6">
          Verifikasi akun admin terhubung ke Supabase Auth &amp; tabel Profiles.
        </p>

        {params.error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 dark:bg-red-950/40 p-3 rounded-lg border border-red-200 dark:border-red-900/60">
            {params.error}
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <input
            type="hidden"
            name="doorpass"
            value={params.doorpass || ''}
          />
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1"
            >
              Email Admin
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full border border-slate-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-slate-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
