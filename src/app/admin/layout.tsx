import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { revokeDoorpassAction } from '@/lib/doorpass';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function logoutAction() {
  'use server';
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  // Hapus seluruh cookie sesi Supabase auth agar tidak ada sesi tertinggal
  for (const c of cookieStore.getAll()) {
    if (c.name.startsWith('sb-') || c.name.includes('auth-token')) {
      cookieStore.delete(c.name);
    }
  }

  // Kunci kembali pintu admin dengan menghapus cookie doorpass
  await revokeDoorpassAction();

  // Kembalikan ke homepage normal untuk pengunjung
  redirect('/');
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika belum login (misal di halaman /admin/login), biarkan page login yang memvalidasi
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-6">
          <span className="font-bold text-slate-800 text-lg">Admin Panel</span>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin/proyek"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Manajemen Proyek
            </Link>
            <Link
              href="/proyek"
              target="_blank"
              className="text-xs text-slate-500 hover:text-indigo-600 transition-colors bg-slate-100 px-2.5 py-1 rounded-md"
            >
              Lihat Website ↗
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 hidden sm:inline">{user?.email}</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="w-full">{children}</main>
    </div>
  );
}
