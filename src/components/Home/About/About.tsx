import SectionHeading from '@/components/helper/SectionHeading'
import React from 'react'
import { highlights, stats } from '../../../../data'
import Lanyard from '@/components/lanyard/Lanyard'

const About = () => {
  return (
    <div id="about" className="py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24">
      {/* section heading */}
      <SectionHeading 
        title_1="About" 
        title_2="Me" 
        description="Get to know me better and my journey as a developer." 
      />
      <div className="grid w-[90%] max-w-6xl mx-auto grid-cols-1 lg:grid-cols-2 gap-12 items-center">
   {/* Image */}
<div data-aos="fade-right" date-aos-delay="0" date-aos-anchor-placement="top-center" className="relative w-full max-w-[600px] h-[380px] sm:h-auto sm:aspect-square mx-auto">
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
<div data-aos="fade-left" date-aos-delay="150" date-aos-anchor-placement="top-center" className="space-y-6 flex-1 min-w-0 break-words lg:-translate-y-8">
  <h3 className="text-2xl font-semibold break-words">
    A passionate developer who love to create projects
  </h3>

  <p className="text-muted-foreground leading-relaxed">
    I&apos;m Goldie Gladwin Rajaborn Arivianto, A passionate student and aspiring web developer who
    loves creating modern, interactive, and meaningful digital experiences.
  </p>

  <p>
    Beyond coding, I&apos;m passionate about learning and building things with
    technology. currently studying Software Engineering and exploring web
    development, especially HTML, CSS, JavaScript, React, and Next.js.
    I&apos; enjoy turning ideas into projects, solving technical challenges,
    and continuously improving my skills through hands-on experience.
  </p>

    {/* highlights */}
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
  {highlights.map((item) => {
    return (
      <div
        key={item.text}
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

  </div>
      </div>
      {/* stats */}
      <div data-aos="zoom-in" date-aos-delay="300" date-aos-anchor-placement="top-center" className="mt-16 w-[90%] max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat)=>{
            return(
              <div key={stat.label} className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
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