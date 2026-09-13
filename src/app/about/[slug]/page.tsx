export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image'
import SectionHeading from '@/components/helper/SectionHeading'
import { cn } from '@/lib/utils'
import { favoriteActivities, goals, learningNow } from '@/data'
import About from '@/components/Home/About/About'

export default function AboutDetailPage() {
  return (
    <main className="min-h-screen bg-gray-100 pt-12 dark:bg-gray-900">
      <About showDetailLink={false} />

      <section className="mx-auto w-[90%] max-w-6xl border-t border-gray-200 py-16 dark:border-gray-700">
        <div data-aos="fade-up">
          <SectionHeading
            title_1="My Favorite"
            title_2="Activities"
            description="A few activities that I enjoy in my free time."
          />
        </div>

        <div className="mt-12 space-y-12">
          {favoriteActivities.map((activity, index) => {
            const imageOnLeft = index % 2 === 0

            return (
              <article
                key={activity.id}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={index * 100}
                data-aos-anchor-placement="top-bottom"
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={cn(
                    'relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-800',
                    !imageOnLeft && 'lg:order-2'
                  )}
                >
                  <Image
                    src={activity.image}
                    alt={activity.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className={cn(!imageOnLeft && 'lg:order-1')}>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {activity.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-[90%] max-w-6xl border-t border-gray-200 py-16 dark:border-gray-700">
        <div data-aos="fade-up">
          <SectionHeading
            title_1="What I am"
            title_2="Learning Now"
            description="Things I am currently exploring and improving."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {learningNow.map((item, index) => (
            <article 
              key={item.id} 
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="700"
              data-aos-anchor-placement="top-bottom"
              className="text-center group p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <item.icon className={cn('h-9 w-9 transition-transform duration-300', item.iconClassName)} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[90%] max-w-6xl border-t border-gray-200 py-16 dark:border-gray-700">
        <div data-aos="fade-up">
          <SectionHeading
            title_1="Goals &"
            title_2="Roadmap"
            description="The milestones I want to reach step by step."
          />
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div data-aos="fade-down" data-aos-duration="1000" className="absolute bottom-8 left-4 top-8 w-px bg-gradient-to-b from-blue-300 via-blue-500 to-indigo-700 dark:from-blue-400/30 dark:via-blue-400/70 dark:to-indigo-400/30 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-14">
            {goals.map((goal, index) => {
              const cardOnLeft = index % 2 === 0
              const isInProgress = goal.status === 'In Progress'

              return (
                <div
                  key={goal.id}
                  className={cn(
                    'relative flex items-center md:min-h-40',
                    cardOnLeft ? 'md:justify-start' : 'md:justify-end'
                  )}
                >
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-offset="100"
                    data-aos-anchor-placement="top-bottom"
                    className={cn(
                      'absolute left-4 top-8 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-gray-100 bg-gray-100 dark:border-gray-900 dark:bg-gray-900 md:left-1/2',
                      isInProgress
                        ? 'before:h-3 before:w-3 before:animate-pulse before:rounded-full before:bg-blue-500 before:shadow-[0_0_14px_rgba(59,130,246,0.9)]'
                        : 'before:h-3 before:w-3 before:rounded-full before:border-2 before:border-gray-400 dark:before:border-gray-500'
                    )}
                  />

                  <div
                    data-aos={cardOnLeft ? 'fade-right' : 'fade-left'}
                    data-aos-duration="800"
                    data-aos-offset="120"
                    data-aos-anchor-placement="top-bottom"
                    className={cn(
                      'relative ml-10 w-[calc(100%-2.5rem)] rounded-2xl border border-gray-200/80 bg-white/75 p-6 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_0_28px_rgba(59,130,246,0.15)] dark:border-white/10 dark:bg-zinc-900/75 md:ml-0 md:w-[calc(50%-3rem)]',
                      cardOnLeft
                        ? 'md:after:absolute md:after:right-[-3rem] md:after:top-10 md:after:h-px md:after:w-12 md:after:bg-blue-300 dark:md:after:bg-blue-400/50'
                        : 'md:after:absolute md:after:left-[-3rem] md:after:top-10 md:after:h-px md:after:w-12 md:after:bg-blue-300 dark:md:after:bg-blue-400/50'
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-300">
                        {goal.phase}
                      </span>
                      <span
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-[11px] font-medium',
                          isInProgress
                            ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-gray-300 bg-gray-100 text-gray-600 dark:border-white/15 dark:bg-white/5 dark:text-gray-400'
                        )}
                      >
                        {goal.status}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                      {goal.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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