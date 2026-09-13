'use client';

import React from 'react';
import Background from "../../background/background";
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { Download, FolderOpen } from 'lucide-react';
import { aboutMe, cvUrl } from '@/data';

const Hero = () => {
  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      <Background />

      {/* content */}
      <div className="relative z-10 text-center">

        {/* subtitle */}
        <div data-aos="fade-up" className="sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-600 text-sm text-muted-foreground dark:text-gray-200 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Available for Opportunities
          </span>
        </div>

        {/* title */}
        <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          Hi, I&apos;m{' '}
          <span className="text-indigo-800 dark:text-yellow-300">
            {aboutMe.nickname || aboutMe.name || "Goldie"}
          </span>
        </h1>

        {/* typewrite effects */}
        <div data-aos="fade-up" data-aos-delay="200" className="text-xl sm:text-2xl md:text-3xl text-black dark:text-white font-semibold mb-4 sm:mb-8 h-12">
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "UI/UX Designer",
              2000,
              "Software Engineer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-mono"
          />
        </div>

        {/* description */}
        <p data-aos="fade-up" data-aos-delay="300" className="text-lg text-muted-foreground dark:text-gray-200 max-w-2xl mx-auto mb-10">
          Building modern digital experiences with creative solutions and modern technologies.
          Passionate about developing applications, solving technical challenges, and continuously learning.
        </p>

        {/* button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects">
            <Button data-aos="fade-up" data-aos-delay="400" size="lg" className="w-fit mx-auto sm:mx-0">
              <FolderOpen className="w-5 h-5 mr-2" />
              View Projects
            </Button>
          </a>

          <a 
            href={cvUrl} 
            download="Goldie_Gladwin_CV_Resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button data-aos="fade-up" data-aos-delay="400" size="lg" className="w-fit mx-auto sm:mx-0">
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Hero;