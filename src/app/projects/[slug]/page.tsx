import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data';
import { ArrowLeft, CheckCircle2, ExternalLink, Layers, Sparkles, User } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;

  // Search by slug or by id (supports both /projects/management-siswa and /projects/1)
  const project = projects.find((p) => p.slug === slug || p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 pt-36 pb-24 dark:bg-gray-900 sm:px-6 sm:pt-44 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects/detailproject"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 hover:shadow dark:border-gray-700 dark:bg-gray-800/80 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Projects
          </Link>
        </div>

        {/* Dynamic Project Article */}
        <article className="rounded-3xl border border-gray-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-800/70 sm:p-10 space-y-8">
          {/* Header & Badges */}
          <div className="space-y-4 border-b border-gray-100 pb-6 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 ring-1 ring-inset ring-indigo-200/70 dark:ring-indigo-800/60">
                  <Sparkles className="h-3.5 w-3.5" />
                  {project.category || 'Featured Project'}
                </span>
                {project.role && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    <User className="h-3 w-3" />
                    {project.role}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs font-bold text-muted-foreground">
                Route ID: #{project.id} ({project.slug})
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {project.title}
            </h1>
          </div>

          {/* Project Cover Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg dark:border-gray-700">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          {/* Overview & Solution */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Overview & Solution
            </h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3 border-t border-gray-100 pt-6 dark:border-gray-700">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Key Architectural Highlights
              </h3>
              <ul className="grid gap-2.5 pt-1">
                {project.keyFeatures.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-3 border-t border-gray-100 pt-6 dark:border-gray-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200/70 dark:bg-indigo-950/60 dark:text-indigo-300 dark:ring-indigo-800/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
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
              href="/#contact"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-xs text-muted-foreground hover:text-indigo-600')}
            >
              Inquire About This Project →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
