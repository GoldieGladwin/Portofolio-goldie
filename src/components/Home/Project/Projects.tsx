import SectionHeading from '@/components/helper/SectionHeading'
import React from 'react'
import { projects } from '@/data'
import ProjectCard from './projectcard'

const Projects = () => {
  return (
    <div 
    data-aos="fade-up" data-aos-delay="400" data-aos-anchor-placement="top-center" 
    id='projects'
    className='py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24'>
        <SectionHeading title_1='Featured' title_2='Projects' description='A selection of my recent works and technical projects.' />
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto'>
            {projects.map((project,index)=>{
            return    <div key={index}>
                <ProjectCard {...project} />
            </div>
            })}
        </div>
        </div>
  )
}

export default Projects