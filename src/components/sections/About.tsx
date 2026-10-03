'use client';

import SectionHeading from '@/components/common/SectionHeading';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { aboutMe, highlights, stats } from '@/lib/constants';
import CounterApresiasi from './CounterApresiasi';

// Dynamic import Lanyard untuk Desktop
const Lanyard = dynamic(() => import('@/components/visual/Lanyard'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl flex items-center justify-center bg-slate-200/50 dark:bg-gray-800/50">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  ),
});

type AboutProps = {
  showDetailLink?: boolean;
};

const About = ({ showDetailLink = true }: AboutProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="about" className="py-8 sm:py-12 md:py-16 bg-gray-100 dark:bg-gray-900 scroll-mt-24">
      {/* section heading */}
      <div data-aos="fade-down" data-aos-duration="600">
        <SectionHeading
          title_1="About"
          title_2="Me"
          description="Get to know me better and my journey as a developer."
        />
      </div>

      <div className="grid w-[94%] sm:w-[90%] max-w-6xl mx-auto grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Kolom Visual: 3D Lanyard di Desktop, 3D Flip Card di Mobile */}
        <div
          data-aos="fade-right"
          data-aos-duration="650"
          data-aos-anchor-placement="top-bottom"
          className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[600px] h-[360px] sm:h-[440px] md:h-[460px] lg:h-auto lg:aspect-square mx-auto flex items-center justify-center"
        >
          {isDesktop ? (
            /* DESKTOP: 3D Lanyard Card dengan Fisika Interaktif */
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
          ) : (
            /* MOBILE: Kartu 3D Flip Interaktif (Klik berputar ke As Diamond) */
            <div
              className="relative w-full h-full max-h-[420px] aspect-[3/4] cursor-pointer select-none [perspective:1200px] group"
              onClick={() => setIsFlipped((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-label="Klik kartu untuk melihat kartu As Diamond"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
            >
              <div
                className={cn(
                  "relative w-full h-full rounded-3xl transition-transform duration-700 ease-out [transform-style:preserve-3d] shadow-2xl",
                  isFlipped && "[transform:rotateY(180deg)]"
                )}
              >
                {/* DEPAN MOBILE: FOTO PROFIL */}
                <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 [backface-visibility:hidden]">
                  <Image
                    src="/images/Gold.jpg"
                    alt="Foto Profil Siswa Goldie Gladwin"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    sizes="(max-width: 640px) 340px, 420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider mb-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      SMK RPL • Full Stack Developer
                    </div>
                    <h4 className="text-xl font-bold tracking-tight">Goldie Gladwin</h4>
                    <p className="text-xs text-slate-300">Software Engineering Student &amp; Web Developer</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
                    <span>Klik balik</span>
                  </div>
                </div>

                {/* BELAKANG MOBILE: AS DIAMOND */}
                <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-900 bg-white [backface-visibility:hidden] [transform:rotateY(180deg)] p-3 sm:p-4 flex flex-col items-center justify-between shadow-2xl">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                    <Image
                      src="/images/gold-back.jpg"
                      alt="Kartu As Diamond milik Goldie Gladwin"
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 340px, 420px"
                    />
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none px-4">
                    <span className="inline-block bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-lg border border-white/10">
                      ♦ Ace of Diamonds ♦ (Klik lagi untuk kembali)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          data-aos="fade-left"
          data-aos-duration="650"
          data-aos-delay="80"
          data-aos-anchor-placement="top-bottom"
          className="space-y-4 sm:space-y-6 flex-1 min-w-0 break-words lg:-translate-y-6"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold break-words">
            {aboutMe.role || "A passionate developer who loves to create projects"}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {aboutMe.description}
          </p>

          {aboutMe.quote && (
            <blockquote className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-3 sm:pl-4 italic text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
              &ldquo;{aboutMe.quote}&rdquo;
            </blockquote>
          )}

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
            {highlights.map((item, index) => {
              return (
                <div
                  key={item.text}
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index * 50, 150)}
                  data-aos-anchor-placement="top-bottom"
                  className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  </div>

                  <span className="text-muted-foreground break-words">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {showDetailLink && (
              <Link
                href="/about/detail-about"
                className={cn(buttonVariants({ variant: 'default', size: 'default' }), 'w-fit text-xs sm:text-sm')}
              >
                More About Me
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            )}
            <CounterApresiasi />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 sm:mt-14 md:mt-16 w-[94%] sm:w-[90%] max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => {
            return (
              <div
                key={stat.label}
                data-aos="zoom-in-up"
                data-aos-delay={index * 50}
                data-aos-anchor-placement="top-bottom"
                className="bg-white dark:bg-gray-800 shadow rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
