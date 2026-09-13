import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data';
import { ArrowLeft, CheckCircle2, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Standard Modul Pembelajaran: app/proyek/[id]/page.tsx
interface HalamanDetailProps {
  params: Promise<{ id: string }>;
}

export default async function DetailProyek({ params }: HalamanDetailProps) {
  // Wajib menggunakan await sebelum mengakses properti id pada Next.js 15+
  const { id } = await params;

  // Mencari proyek berdasarkan ID atau slug
  const proyek = projects.find((p) => p.id === id || p.slug === id);

  if (!proyek) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 pt-36 pb-24 dark:bg-gray-900 sm:px-6 sm:pt-44 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Daftar Proyek
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 dark:border-gray-800 dark:bg-gray-800/80 p-6 md:p-8 shadow-xl backdrop-blur-md space-y-6">
          <div className="space-y-3 border-b border-slate-100 dark:border-gray-700 pb-4">
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {proyek.kategori || 'Web'}
              </span>
              <span className="text-xs font-mono text-slate-400">Route ID: #{id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {proyek.title}
            </h1>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
            <Image
              src={proyek.image}
              alt={proyek.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-gray-200 uppercase tracking-wider">
              Latar Belakang & Solusi:
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {proyek.longDescription || proyek.description}
            </p>
          </div>

          {proyek.keyFeatures && (
            <div className="space-y-2 border-t border-slate-100 dark:border-gray-700 pt-4">
              <h3 className="text-xs font-bold text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Fitur Unggulan:
              </h3>
              <ul className="grid gap-2">
                {proyek.keyFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-gray-700 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-gray-300">
              Teknologi yang Digunakan:
            </h3>
            <div className="flex flex-wrap gap-2">
              {proyek.techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 text-xs rounded-md font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            {proyek.githubUrl && (
              <a
                href={proyek.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
              >
                <FaGithub className="w-4 h-4" />
                Source Code
              </a>
            )}
            <Link
              href="/projects/detailproject"
              className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
            >
              Lihat Seluruh Showcase Proyek
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
