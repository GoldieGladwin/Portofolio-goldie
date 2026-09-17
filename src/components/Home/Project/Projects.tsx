'use client'

import SectionHeading from '@/components/helper/SectionHeading'
import React, { useEffect, useState } from 'react'
import ProjectCard from './projectcard'
import Link from 'next/link'
import { Filter, Layers, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ProjectItem {
  id: string
  slug: string
  title: string
  category: string
  kategori: string
  role: string
  description: string
  longDescription: string
  keyFeatures: string[]
  image: string
  techStack: string[]
  githubUrl: string
  demoUrl: string
}

const Projects = () => {
  const [projectList, setProjectList] = useState<ProjectItem[]>([])

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
              key={project.id || index}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 70, 200)}
              data-aos-anchor-placement="top-bottom"
            >
              <ProjectCard {...project} />
            </div>
          )
        })}
      </div>

      {/* Tombol Lihat Semua Proyek */}
      <div className='mt-12 flex items-center justify-center w-[90%] sm:w-[80%] mx-auto'>
        <Link
          href="/project"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Filter className="w-4 h-4" />
          Lihat Semua Proyek & Filter
        </Link>
      </div>
    </div>
  )
}

export default Projects