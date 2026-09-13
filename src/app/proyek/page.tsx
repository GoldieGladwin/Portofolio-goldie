import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data';
import { ArrowLeft, CheckCircle2, ExternalLink, Filter, FolderOpen, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Standar Modul Pertemuan 02: Halaman Katalog Proyek dengan Filter searchParams
interface ProyekPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProyekCatalogPage({ searchParams }: ProyekPageProps) {
  const { category } = await searchParams;

  const categories = ['Semua', 'Web', 'Mobile', 'IoT'];

  const filtered = category && category.toLowerCase() !== 'semua'
    ? projects.filter(
        (p) =>
          p.kategori?.toLowerCase() === category.toLowerCase() ||
          p.category?.toLowerCase().includes(category.toLowerCase())
      )
    : projects;

  return (
    <main className="min-h-screen bg-gray-100 px-4 pt-36 pb-24 dark:bg-gray-900 sm:px-6 sm:pt-44 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 hover:shadow dark:border-gray-700 dark:bg-gray-800/80 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Dynamic searchParams Filter
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Daftar Karya & Proyek Siswa
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">
              Pilih kategori di bawah untuk menyaring portofolio karya kejuruan:
            </p>
          </div>
        </div>

        {/* Filter Kategori berbasis query URL (searchParams) */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => {
            const isAll = cat === 'Semua';
            const href = isAll ? '/proyek' : `/proyek?category=${cat.toLowerCase()}`;
            const isActive = isAll
              ? !category || category.toLowerCase() === 'semua'
              : category?.toLowerCase() === cat.toLowerCase();

            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-600 dark:bg-gray-800 dark:text-gray-300 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Grid Kartu Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-gray-800/90 rounded-2xl border border-slate-200/80 dark:border-gray-700 p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-indigo-400/60 dark:hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {item.kategori || 'Web'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      Route ID: #{item.id}
                    </span>
                    <span>/{item.slug}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.techStack.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/proyek/${item.id}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Detail &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-muted-foreground">
              Tidak ada proyek yang ditemukan untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
