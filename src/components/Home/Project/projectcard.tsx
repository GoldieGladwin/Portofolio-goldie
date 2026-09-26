import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'

type Props = {
  slug: string
  title: string
  description: string
  image: string
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
}

const ProjectCard = ({
  slug,
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
<div className="flex flex-wrap gap-3">
  <Link
    href={`/proyek/${slug}`}
    className={cn(buttonVariants({ variant: 'default' }), 'flex-1')}
  >
    View Details
  </Link>
  {demoUrl && (
    <div className="flex-1">
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Kunjungi Proyek
      </a>
    </div>
  )}
  {githubUrl && (
    <div className="flex-1">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
      >
        <FaGithub className="w-4 h-4 mr-2" />
        GitHub
      </a>
    </div>
  )}
</div>
      </div>

    </div>
  )
}
export default ProjectCard