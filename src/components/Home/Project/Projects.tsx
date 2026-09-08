import SectionHeading from '@/components/helper/SectionHeading'
import React from 'react'
import { projects } from '../../../../data'
import ProjectCard from './projectcard'

const Projects = () => {
  return (
    <div 
    data-aos="fade-up" date-aos-delay={400} date-aos-anchor-placement="top-center" 
    id='projects'
    className='py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24'>
        <SectionHeading title_1='Feature' title_2='Projects' description='A section of my project and my work' />
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