export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from '@/components/helper/SectionHeading'
import { cn } from '@/lib/utils'
import { favoriteActivities, goals, learningNow } from '@/data'
import About from '@/components/Home/About/About'
import { ArrowLeft } from 'lucide-react'

export default function AboutDetailPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-100 px-3 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 lg:pt-40 dark:bg-gray-900">
      {/* Top Breadcrumb & Navigation */}
      <div className="relative mx-auto max-w-6xl mb-2 sm:mb-4">
        <div className="flex justify-start">
          <Link
            href="/#about"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/80 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:text-indigo-600 hover:shadow dark:border-gray-700 dark:bg-gray-800/80 dark:hover:text-indigo-400 sm:px-4 sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 sm:h-4 sm:w-4" />
            Back to Overview
          </Link>
        </div>
      </div>

      <About showDetailLink={false} />

      {/* Favorite Activities Section */}
      <section className="mx-auto w-[94%] sm:w-[90%] max-w-6xl border-t border-gray-200 py-10 sm:py-14 md:py-16 dark:border-gray-700">
        <div data-aos="fade-up">
          <SectionHeading
            title_1="My Favorite"
            title_2="Activities"
            description="A few activities that I enjoy in my free time."
          />
        </div>

        <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
          {favoriteActivities.map((activity, index) => {
            const imageOnLeft = index % 2 === 0

            return (
              <article
                key={activity.id}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={Math.min(index * 50, 150)}
                data-aos-anchor-placement="top-bottom"
                className="grid grid-cols-1 items-center gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div
                  className={cn(
                    'relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md dark:bg-gray-800',
                    !imageOnLeft && 'lg:order-2'
                  )}
                >
                  <Image
                    src={activity.image}
                    alt={activity.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className={cn(!imageOnLeft && 'lg:order-1', 'space-y-2 sm:space-y-3')}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
                    {activity.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* What I am Learning Now Section */}
      <section className="mx-auto w-[94%] sm:w-[90%] max-w-6xl border-t border-gray-200 py-10 sm:py-14 md:py-16 dark:border-gray-700">
        <div data-aos="fade-up">
          <SectionHeading
            title_1="What I am"
            title_2="Learning Now"
            description="Things I am currently exploring and improving."
          />
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 md:gap-5">
          {learningNow.map((item, index) => (
            <article 
              key={item.id} 
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 50, 150)}
              data-aos-duration="600"
              data-aos-anchor-placement="top-bottom"
              className="group rounded-xl sm:rounded-2xl border border-gray-200/60 bg-white/50 p-4 sm:p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/50"
            >
              <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gray-100 shadow-inner transition-transform duration-300 group-hover:scale-110 dark:bg-gray-800">
                <item.icon className={cn('h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300', item.iconClassName)} />
              </div>
              <h2 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Goals & Roadmap Section */}
      <section className="mx-auto w-[94%] sm:w-[90%] max-w-6xl border-t border-gray-200 py-10 sm:py-14 md:py-16 dark:border-gray-700">
        <div data-aos="fade-up">
          <SectionHeading
            title_1="Goals &"
            title_2="Roadmap"
            description="The milestones I want to reach step by step."
          />
        </div>

        <div className="relative mx-auto mt-8 sm:mt-12 max-w-5xl">
          {/* Vertical Timeline Line */}
          <div
            data-aos="fade-down"
            data-aos-duration="650"
            className="absolute bottom-6 left-3.5 top-6 w-0.5 bg-gradient-to-b from-blue-300 via-blue-500 to-indigo-700 dark:from-blue-400/30 dark:via-blue-400/70 dark:to-indigo-400/30 sm:left-4 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-8 sm:space-y-10 md:space-y-14">
            {goals.map((goal, index) => {
              const cardOnLeft = index % 2 === 0
              const isInProgress = goal.status === 'In Progress'

              return (
                <div
                  key={goal.id}
                  className={cn(
                    'relative flex items-center md:min-h-36',
                    cardOnLeft ? 'md:justify-start' : 'md:justify-end'
                  )}
                >
                  {/* Timeline Dot */}
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-offset="40"
                    data-aos-anchor-placement="top-bottom"
                    className={cn(
                      'absolute left-3.5 top-6 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-4 border-gray-100 bg-gray-100 dark:border-gray-900 dark:bg-gray-900 sm:left-4 sm:top-8 sm:h-8 sm:w-8 md:left-1/2',
                      isInProgress
                        ? 'before:h-2.5 before:w-2.5 sm:before:h-3 sm:before:w-3 before:animate-pulse before:rounded-full before:bg-blue-500 before:shadow-[0_0_14px_rgba(59,130,246,0.9)]'
                        : 'before:h-2.5 before:w-2.5 sm:before:h-3 sm:before:w-3 before:rounded-full before:border-2 before:border-gray-400 dark:before:border-gray-500'
                    )}
                  />

                  {/* Card */}
                  <div
                    data-aos={cardOnLeft ? 'fade-right' : 'fade-left'}
                    data-aos-duration="650"
                    data-aos-offset="40"
                    data-aos-anchor-placement="top-bottom"
                    className={cn(
                      'relative ml-7 w-[calc(100%-1.75rem)] rounded-xl sm:rounded-2xl border border-gray-200/80 bg-white/75 p-4 sm:p-6 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_0_28px_rgba(59,130,246,0.15)] dark:border-white/10 dark:bg-zinc-900/75 sm:ml-10 sm:w-[calc(100%-2.5rem)] md:ml-0 md:w-[calc(50%-2.5rem)] lg:w-[calc(50%-3rem)]',
                      cardOnLeft
                        ? 'md:after:absolute md:after:right-[-2.5rem] lg:md:after:right-[-3rem] md:after:top-8 md:after:h-px md:after:w-10 lg:md:after:w-12 md:after:bg-blue-300 dark:md:after:bg-blue-400/50'
                        : 'md:after:absolute md:after:left-[-2.5rem] lg:md:after:left-[-3rem] md:after:top-8 md:after:h-px md:after:w-10 lg:md:after:w-12 md:after:bg-blue-300 dark:md:after:bg-blue-400/50'
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                        {goal.phase}
                      </span>
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-medium',
                          isInProgress
                            ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-gray-300 bg-gray-100 text-gray-600 dark:border-white/15 dark:bg-white/5 dark:text-gray-400'
                        )}
                      >
                        {goal.status}
                      </span>
                    </div>
                    <h2 className="mt-2.5 sm:mt-3 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      {goal.title}
                    </h2>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}