import SectionHeading from '@/components/helper/SectionHeading'
import React from 'react'
import { projects } from '@/data'
import ProjectCard from './projectcard'
import Link from 'next/link'
import { Filter, Sparkles } from 'lucide-react'

const Projects = () => {
  return (
    <div 
      id='projects'
      className='py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24'
    >
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <SectionHeading title_1='Featured' title_2='Projects' description='A selection of my recent works and technical projects.' />
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto'>
        {projects.map((project, index) => {
          return (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 70, 200)}
              data-aos-anchor-placement="top-bottom"
            >
              <ProjectCard {...project} />
            </div>
          )
        })}
      </div>

      {/* Navigation to searchParams Catalog & Full Showcase */}
      <div className='mt-12 flex flex-wrap items-center justify-center gap-4 w-[90%] sm:w-[80%] mx-auto'>
        <Link
          href="/project"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105"
        >
          <Filter className="w-4 h-4" />
          Katalog Proyek (Filter searchParams)
        </Link>
        <Link
          href="/projects/detailproject"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Lihat Seluruh Showcase Proyek
        </Link>
      </div>
    </div>
  )
}

export default Projects