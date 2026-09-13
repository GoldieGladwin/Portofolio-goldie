'use client';

import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data'
import { ArrowLeft, CheckCircle2, ExternalLink, Sparkles, User, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const PaperPlane = ({ tilt = 'left' }: { tilt?: 'left' | 'right' }) => (
  <div className="relative flex flex-col items-center">
    {/* Vapor / dash contrail line above plane */}
    <div className="mb-0.5 sm:mb-1 h-3 sm:h-5 w-0 border-l-2 border-dashed border-indigo-400/50 dark:border-indigo-400/40" />

    {/* Paper Airplane with subtle angle */}
    <div
      className={cn(
        'relative transition-transform duration-300 hover:scale-125',
        tilt === 'left' ? '-rotate-[15deg]' : 'rotate-[15deg]'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 drop-shadow-[0_4px_10px_rgba(99,102,241,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main body / left wing */}
        <path
          d="M12 2L2 22L12 17L22 22L12 2Z"
          className="fill-indigo-600 dark:fill-indigo-500"
        />
        {/* Shaded right wing */}
        <path
          d="M12 2L12 17L22 22L12 2Z"
          className="fill-indigo-700 dark:fill-indigo-600 opacity-80"
        />
        {/* Center fold crease */}
        <path
          d="M12 2V17"
          className="stroke-white/90"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Inner wing shadow fold */}
        <path
          d="M12 17L7 20.5L12 2Z"
          className="fill-indigo-800/40"
        />
      </svg>
    </div>
  </div>
)

export default function DetailProjectPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-100 px-3 pt-28 pb-20 dark:bg-gray-900 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 lg:pt-40">
      <div className="relative mx-auto max-w-6xl">
        {/* Navigation & Header */}
        <div className="relative z-10 mb-10 sm:mb-14 lg:mb-16 text-center">
          <div className="mb-4 sm:mb-6 flex justify-start">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-3.5 py-2 text-xs sm:text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 hover:shadow dark:border-gray-700 dark:bg-gray-800/80 dark:hover:text-indigo-400 sm:px-4"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1" />
              Back to Overview
            </Link>
          </div>

          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Projects Showcase
          </span>

          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Detail Project
          </h1>

          <p className="mx-auto mt-2.5 sm:mt-4 max-w-2xl px-2 text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
            Explore detailed architectural highlights, core features, and technical implementations behind each of my featured applications.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {projects.map((project, index) => {
            const imageOnLeft = index % 2 === 0
            const isFirst = index === 0
            const isLast = index === projects.length - 1

            return (
              <div
                key={project.slug}
                className="group/card relative"
              >
                {/* Suspension System */}
                {isFirst ? (
                  <>
                    {/* Left Paper Plane & Short Rope */}
                    <div className="pointer-events-none absolute bottom-full left-6 sm:left-12 lg:left-20 -translate-x-1/2 z-20 flex flex-col items-center">
                      <div className="animate-float-slow">
                        <PaperPlane tilt="left" />
                      </div>
                      {/* Short rope to Card 1 */}
                      <div className="w-[2.5px] sm:w-[3px] h-10 sm:h-14 lg:h-16 bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-500 dark:from-indigo-400 dark:via-indigo-500 dark:to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.35)]" />
                    </div>

                    {/* Right Paper Plane & Short Rope */}
                    <div className="pointer-events-none absolute bottom-full right-6 sm:right-12 lg:right-20 translate-x-1/2 z-20 flex flex-col items-center">
                      <div className="animate-float-slow" style={{ animationDelay: '0.8s' }}>
                        <PaperPlane tilt="right" />
                      </div>
                      {/* Short rope to Card 1 */}
                      <div className="w-[2.5px] sm:w-[3px] h-10 sm:h-14 lg:h-16 bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-500 dark:from-indigo-400 dark:via-indigo-500 dark:to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.35)]" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Other cards: 2 cables bridging directly from the bottom ring of previous card */}
                    <div className="pointer-events-none absolute -top-12 sm:-top-16 lg:-top-20 left-6 sm:left-12 lg:left-20 -translate-x-1/2 w-[2.5px] sm:w-[3px] h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-500 dark:from-indigo-400 dark:via-indigo-500 dark:to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.35)]" />
                    <div className="pointer-events-none absolute -top-12 sm:-top-16 lg:-top-20 right-6 sm:right-12 lg:right-20 translate-x-1/2 w-[2.5px] sm:w-[3px] h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-500 dark:from-indigo-400 dark:via-indigo-500 dark:to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.35)]" />
                  </>
                )}

                {/* Top Attachment Grommets / Rings on this Card */}
                <div className="pointer-events-none absolute -top-2 sm:-top-2.5 left-6 sm:left-12 lg:left-20 -translate-x-1/2 z-20 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-white shadow-md dark:border-indigo-400 dark:bg-gray-900">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-600 dark:bg-indigo-300" />
                </div>
                <div className="pointer-events-none absolute -top-2 sm:-top-2.5 right-6 sm:right-12 lg:right-20 translate-x-1/2 z-20 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-white shadow-md dark:border-indigo-400 dark:bg-gray-900">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-600 dark:bg-indigo-300" />
                </div>

                {/* Bottom Attachment Grommets / Rings on this Card (if not last card) */}
                {!isLast && (
                  <>
                    <div className="pointer-events-none absolute -bottom-2 sm:-bottom-2.5 left-6 sm:left-12 lg:left-20 -translate-x-1/2 z-20 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-white shadow-md dark:border-indigo-400 dark:bg-gray-900">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-600 dark:bg-indigo-300" />
                    </div>
                    <div className="pointer-events-none absolute -bottom-2 sm:-bottom-2.5 right-6 sm:right-12 lg:right-20 translate-x-1/2 z-20 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-white shadow-md dark:border-indigo-400 dark:bg-gray-900">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-600 dark:bg-indigo-300" />
                    </div>
                  </>
                )}

                {/* Hanging Card Section */}
                <section
                  id={project.slug}
                  className="scroll-mt-36 origin-top rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white/80 p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl backdrop-blur-md transition-all duration-500 group-hover/card:-translate-y-1 group-hover/card:rotate-[0.4deg] group-hover/card:shadow-2xl dark:border-gray-800 dark:bg-gray-800/70"
                >
                  <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Image Column */}
                    <div
                      data-aos={imageOnLeft ? 'fade-right' : 'fade-left'}
                      data-aos-duration="900"
                      data-aos-anchor-placement="top-bottom"
                      className={cn(
                        'group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 shadow-md dark:border-gray-700 lg:col-span-6',
                        !imageOnLeft && 'lg:order-2'
                      )}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority={index === 0}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      {project.category && (
                        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 rounded-lg bg-black/70 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md">
                          {project.category}
                        </div>
                      )}
                    </div>

                    {/* Content Column */}
                    <div
                      data-aos={imageOnLeft ? 'fade-left' : 'fade-right'}
                      data-aos-duration="900"
                      data-aos-delay="150"
                      data-aos-anchor-placement="top-bottom"
                      className={cn(
                        'flex flex-col justify-center lg:col-span-6',
                        !imageOnLeft && 'lg:order-1'
                      )}
                    >
                      {/* Meta info / Badge */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-mono text-[11px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          0{index + 1} / {project.slug}
                        </span>
                        {project.role && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] sm:text-xs text-muted-foreground dark:bg-gray-700 dark:text-gray-300">
                            <User className="h-3 w-3" />
                            {project.role}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {project.title}
                      </h2>

                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                        {project.longDescription || project.description}
                      </p>

                      {/* Key Features */}
                      {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="mt-4 sm:mt-6">
                          <h3 className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <Layers className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                            Key Architectural Highlights
                          </h3>
                          <ul className="mt-2 sm:mt-3 grid gap-2">
                            {project.keyFeatures.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack Tags */}
                      <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-indigo-50 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200/70 transition-colors hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:ring-indigo-800/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2')}
                          >
                            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Live Demo
                          </a>
                        ) : null}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2')}
                          >
                            <FaGithub className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                    </div>
                  </div>
                </section>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}