'use client';
import SectionHeading from '@/components/helper/SectionHeading'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { aboutMe, highlights, stats } from '@/data'
import Lanyard from '@/components/lanyard/Lanyard'
import CounterApresiasi from '@/components/CounterApresiasi'

type AboutProps = {
  showDetailLink?: boolean
}

const About = ({ showDetailLink = true }: AboutProps) => {
  return (
    <div id="about" className="py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24">
      {/* section heading */}
      <div data-aos="fade-down" data-aos-duration="800">
        <SectionHeading 
          title_1="About" 
          title_2="Me" 
          description="Get to know me better and my journey as a developer." 
        />
      </div>
      <div className="grid w-[90%] max-w-6xl mx-auto grid-cols-1 lg:grid-cols-2 gap-12 items-center">
   {/* Image */}
<div data-aos="fade-right" data-aos-duration="900" data-aos-anchor-placement="top-bottom" className="relative w-full max-w-[600px] h-[380px] sm:h-auto sm:aspect-square mx-auto">
  <div className="h-full w-full rounded-2xl p-2 overflow-visible">
    <Lanyard
  position={[0, 0, 7]}
  gravity={[0, -40, 0]}
  fov={20}
  frontImage="/images/Gold.jpg"
  backImage="/images/gold-back.jpg"
  imageFit="cover"
/>
  </div>
</div>

{/* content */}
<div data-aos="fade-left" data-aos-duration="900" data-aos-delay="200" data-aos-anchor-placement="top-bottom" className="space-y-6 flex-1 min-w-0 break-words lg:-translate-y-8">
  <h3 className="text-2xl font-semibold break-words">
    {aboutMe.role || "A passionate developer who love to create projects"}
  </h3>

  <p className="text-muted-foreground leading-relaxed">
    {aboutMe.description}
  </p>

  {aboutMe.quote && (
    <blockquote className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 italic text-sm text-muted-foreground dark:text-gray-300">
      &ldquo;{aboutMe.quote}&rdquo;
    </blockquote>
  )}

    {/* highlights */}
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
  {highlights.map((item, index) => {
    return (
      <div
        key={item.text}
        data-aos="fade-up"
        data-aos-delay={300 + index * 100}
        data-aos-anchor-placement="top-bottom"
        className="flex items-center gap-3 text-sm"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
          <item.icon className="w-4 h-4 text-blue-500" />
        </div>

        <span className="text-muted-foreground">
          {item.text}
        </span>
      </div>
    );
  })}
</div>

  <div data-aos="fade-up" data-aos-delay="500" className="flex flex-wrap items-center gap-4 pt-2">
    {showDetailLink && (
      <Link
        href="/about/detail-about"
        className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'w-fit')}
      >
        More About Me
        <ArrowRight />
      </Link>
    )}
    <CounterApresiasi />
  </div>

  </div>
      </div>
      {/* stats */}
      <div className="mt-16 w-[90%] max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index)=>{
            return(
              <div 
                key={stat.label} 
                data-aos="zoom-in-up" 
                data-aos-delay={index * 120} 
                data-aos-anchor-placement="top-bottom"
                className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-xl md:text-4xl font-bold text-purple-600">
                  {stat.value}

                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default About