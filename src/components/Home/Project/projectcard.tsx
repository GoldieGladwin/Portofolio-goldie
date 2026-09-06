import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { SiGithubactions } from 'react-icons/si'
import { FaGithub } from 'react-icons/fa6'

type Props = {
  title: string
  description: string
  image: string
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
}

const ProjectCard = ({
  title,
  description,
  image,
  techStack,
  demoUrl,
  githubUrl,
}: Props) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden">
      
      {/* image container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* main content */}
      <div className="p-6">
        <h3 className="text-xl text-black dark:text-white font-semibold mb-2 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>

        {/* tech stats */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => {
            return (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-indigo-600 text-white font-medium"
              >
                {tech}
              </span>
            )
          })}
        </div>

        {/* buttons */}
<div className="flex gap-3">
  {demoUrl && (
    <Button className="flex-1 p-0">
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        live demo
      </a>
    </Button>
  )}
  {githubUrl && (
    <Button variant={'outline'} className="flex-1 p-0">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center"
      >
        <FaGithub className="w-4 h-4 mr-2" />
        Github 
      </a>
    </Button>
  )}
</div>
      </div>

    </div>
  )
}
export default ProjectCard