import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, Database } from 'lucide-react';

export default async function TestSupabasePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dznrxxcvvovcuaokyrbh.supabase.co';
  const isUrlConfigured = supabaseUrl && !supabaseUrl.includes('your-project-id');

  let data = null;
  let error = null;

  if (isUrlConfigured) {
    const res = await supabase.from('proyek').select('*').order('id', { ascending: true });
    data = res.data;
    error = res.error;
  }

  console.log('--- TEST SUPABASE CONNECTION ---');
  console.log('Supabase URL Configured:', isUrlConfigured);
  console.log('Data dari Supabase:', data);
  console.log('Error (jika ada):', error);
  console.log('--------------------------------');

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-36 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Status Koneksi Supabase (Step 9)
              </h1>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Halaman uji coba membaca data dari tabel <code className="bg-slate-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">proyek</code>
              </p>
            </div>
          </div>

          {!isUrlConfigured ? (
            <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Kredensial Supabase Belum Diisi di .env.local</span>
              </div>
              <p className="text-xs sm:text-sm">
                Buka file <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded font-mono">.env.local</code> di VS Code, lalu ganti nilai <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> dan <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dengan URL dan Key asli dari Supabase kamu. Jangan lupa tekan <strong>Ctrl + S</strong> untuk menyimpan!
              </p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl border border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/40 text-red-800 dark:text-red-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                <span>Gagal Mengambil Data</span>
              </div>
              <p className="text-xs sm:text-sm font-mono bg-red-100/70 dark:bg-red-900/40 p-2 rounded">
                {error.message}
              </p>
              <p className="text-xs">
                Pastikan kamu sudah menjalankan query di <code className="font-mono">supabase_schema.sql</code> dan Policy SELECT publik sudah dibuat.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 p-3 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
                <span>Koneksi Berhasil! Terhubung ke Supabase.</span>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  Data yang diterima ({data?.length || 0} proyek):
                </h2>
                <pre className="bg-slate-900 text-emerald-300 p-4 rounded-xl text-xs overflow-x-auto max-h-96">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
