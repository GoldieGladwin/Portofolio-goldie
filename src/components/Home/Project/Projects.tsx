'use client'

import SectionHeading from '@/components/helper/SectionHeading'
import React, { useEffect, useState } from 'react'
import { projects as fallbackProjects } from '@/data'
import ProjectCard from './projectcard'
import Link from 'next/link'
import { Database, Filter, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const Projects = () => {
  const [projectList, setProjectList] = useState(fallbackProjects)

  useEffect(() => {
    async function fetchSupabaseProjects() {
      const { data, error } = await supabase
        .from('proyek')
        .select('*')
        .order('id', { ascending: true })

      if (data && data.length > 0) {
        setProjectList(
          data.map((item) => ({
            id: String(item.id),
            slug: String(item.id),
            title: item.judul,
            category: item.kategori || 'Web',
            kategori: item.kategori || 'Web',
            role: item.role || 'Full Stack Developer',
            description: item.deskripsi,
            longDescription: item.deskripsi,
            keyFeatures: [],
            image: item.image || '/images/managemens.png',
            techStack: typeof item.teknologi === 'string'
              ? item.teknologi.split(',').map((t: string) => t.trim()).filter(Boolean)
              : [],
            githubUrl: item.link || '',
            demoUrl: '',
          }))
        )
      }
    }

    fetchSupabaseProjects()
  }, [])

  return (
    <div 
      id='projects'
      className='py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24'
    >
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <SectionHeading title_1='Featured' title_2='Projects' description='A selection of my recent works and technical projects.' />
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto'>
        {projectList.map((project, index) => {
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

      {/* Navigation to searchParams Catalog, Supabase /proyek, & Full Showcase */}
      <div className='mt-12 flex flex-wrap items-center justify-center gap-4 w-[90%] sm:w-[80%] mx-auto'>
        <Link
          href="/proyek"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105"
        >
          <Database className="w-4 h-4" />
          Halaman /proyek (Modul Supabase)
        </Link>
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