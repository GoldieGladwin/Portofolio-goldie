import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data';
import { ArrowLeft, CheckCircle2, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

// Dynamic Route: app/proyek/[id]/page.tsx (Modul 02 Step 7 & Modul 03)
interface ProyekDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProyekDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  let project = projects.find((p) => p.id === id || p.slug === id);

  if (!project && !isNaN(Number(id))) {
    const { data: dbItem } = await supabase
      .from('proyek')
      .select('*')
      .eq('id', Number(id))
      .maybeSingle();
    if (dbItem) {
      return {
        title: `${dbItem.judul} | Detail Proyek`,
        description: dbItem.deskripsi,
      };
    }
  }

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan | Portfolio',
    };
  }

  return {
    title: `${project.title} | Detail Proyek`,
    description: project.description,
  };
}

export default async function ProyekDetailPage({ params }: ProyekDetailPageProps) {
  // Await params as required by Next.js 15+ (Modul 02 Step 7)
  const { id } = await params;

  // Mencari proyek dari Supabase jika numeric ID (Modul 03)
  let project: any = null;
  if (!isNaN(Number(id))) {
    const { data: dbItem } = await supabase
      .from('proyek')
      .select('*')
      .eq('id', Number(id))
      .maybeSingle();

    if (dbItem) {
      project = {
        id: String(dbItem.id),
        slug: String(dbItem.id),
        title: dbItem.judul,
        category: dbItem.kategori || 'Web',
        kategori: dbItem.kategori || 'Web',
        role: dbItem.role || 'Full Stack Developer',
        description: dbItem.deskripsi,
        longDescription: dbItem.deskripsi,
        keyFeatures: [
          'Arsitektur responsif dan modern dengan performa optimal',
          'Navigasi antarmuka intuitif dan ramah pengguna',
          'Terintegrasi dengan database cloud Supabase PostgreSQL',
        ],
        image: dbItem.image || '/images/managemens.png',
        techStack: typeof dbItem.teknologi === 'string'
          ? dbItem.teknologi.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        githubUrl: dbItem.link || '',
        demoUrl: '',
      };
    }
  }

  // Fallback ke data lokal jika tidak ditemukan di Supabase
  if (!project) {
    project = projects.find((p) => p.id === id || p.slug === id);
  }

  // Jika ID tidak terdaftar, arahkan ke 404 kustom via notFound() (Modul 02 Step 8)
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 pt-36 pb-24 dark:bg-gray-900 sm:px-6 sm:pt-44 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Navigation Breadcrumb / Back */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 hover:shadow dark:border-gray-700 dark:bg-gray-800/80 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Link>

          <Link
            href="/proyek"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Katalog Proyek &rarr;
          </Link>
        </div>

        {/* Dynamic Project Article Container */}
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-800/80 sm:p-10 space-y-6">
          {/* Header & Badges */}
          <div className="space-y-3 border-b border-slate-100 pb-5 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {project.kategori || project.category || 'Featured'}
              </span>
              <span className="font-mono text-xs text-slate-400 dark:text-gray-400">
                Dynamic Route: /proyek/{id} (ID: #{project.id})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h1>
          </div>

          {/* Cover Image with Tailwind aspect ratio and rounded styling */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-md dark:border-gray-700 bg-slate-100 dark:bg-gray-700">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          {/* Latar Belakang & Solusi */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Latar Belakang &amp; Solusi Proyek:
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-gray-300">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Fitur Unggulan (Key Features) */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3 border-t border-slate-100 pt-5 dark:border-gray-700">
              <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-gray-200">
                <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Fitur Unggulan (Key Features):
              </h3>
              <ul className="grid gap-2.5 pt-1">
                {project.keyFeatures.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Teknologi yang Digunakan (Tailwind Chips) */}
          <div className="space-y-2 border-t border-slate-100 pt-5 dark:border-gray-700">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-gray-200">
              Teknologi yang Digunakan (Tech Stack):
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((t: string) => (
                <span
                  key={t}
                  className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-gray-700">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'gap-2')}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : null}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
              >
                <FaGithub className="h-4 w-4" />
                Source Code
              </a>
            )}

            <Link
              href="/proyek"
              className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'text-xs')}
            >
              Lihat Semua Proyek di Katalog &rarr;
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
