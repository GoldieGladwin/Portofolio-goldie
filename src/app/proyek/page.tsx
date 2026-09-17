import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

// Modul Pertemuan 03 - Step 10: Mengganti Data Statis dengan Data Supabase di Halaman Proyek
export default async function ProyekPage() {
  // Mengambil data proyek langsung dari database Supabase
  const { data: daftarProyek, error } = await supabase
    .from('proyek')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-36 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
          <h2 className="text-lg font-bold">Gagal memuat data dari Supabase:</h2>
          <p className="mt-1 font-mono text-sm">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-36 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Navigasi & Header */}
        <div className="space-y-4">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Showcase Karya Siswa
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Daftar Karya & Proyek Siswa
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">
              Koleksi karya dan proyek pengembangan web serta aplikasi yang telah saya bangun.
            </p>
          </div>
        </div>

        {/* Grid Kartu Proyek (Sesuai CardProyek di Modul Step 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {daftarProyek?.map((item) => {
            const techList = typeof item.teknologi === 'string'
              ? item.teknologi.split(',').map((t: string) => t.trim()).filter(Boolean)
              : [];

            return (
              <article
                key={item.id}
                className="bg-white dark:bg-gray-800/90 rounded-2xl border border-slate-200/80 dark:border-gray-700 p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-indigo-400/60 dark:hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  {/* Gambar Proyek */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 bg-slate-100 dark:bg-gray-700">
                    <Image
                      src={item.image || '/images/managemens.png'}
                      alt={item.judul}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {item.kategori || 'Web'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      ID Proyek: #{item.id}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.judul}
                    </h2>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-700 flex flex-col gap-3">
                  {/* Badge Teknologi */}
                  <div className="flex flex-wrap gap-1.5">
                    {techList.map((t: string) => (
                      <span
                        key={t}
                        className="text-[11px] bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2.5 py-0.5 rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions & Links */}
                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={`/project/${item.id}`}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Lihat Detail &rarr;
                    </Link>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white flex items-center gap-1"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        Repository
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Kondisi data kosong */}
        {daftarProyek && daftarProyek.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
            <p className="text-base font-semibold text-slate-700 dark:text-gray-200">
              Belum ada data proyek yang ditampilkan.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Proyek baru akan segera ditambahkan di sini.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
