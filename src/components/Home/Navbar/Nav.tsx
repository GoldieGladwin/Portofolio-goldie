'use client';
import React, { useState, useEffect } from 'react'
import Logo from '@/components/helper/Logo'
import { Navlinks } from '@/Constant/Constant'
import Link from 'next/link'
import { Download, MenuIcon } from 'lucide-react';
import ThemeToggler from '@/components/helper/ThemeToggler';
import { cvUrl } from '@/data';


type Props = {
  openNav: () => void;
}

const Nav = ({ openNav }: Props) => {

  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 h-[10vh] sm:h-[12vh] transition-all duration-300 ${navBg
          ? "dark:bg-gray-900/95 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200/50 dark:border-gray-800/50"
          : "bg-transparent"
        }`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* logo */}
        <Logo />
        {/* navlinks */}
        <div className="hidden lg:flex items-center space-x-10">
          {Navlinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className="dark:text-white text-black hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-all duration-200"
              >
                <p>{link.name}</p>
              </Link>
            );
          })}
        </div>
        {/* Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href={cvUrl}
            download="Goldie_Gladwin_CV_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="box-border relative z-20 inline-flex items-center justify-center w-auto px-3.5 sm:px-6 py-2 sm:py-2.5 overflow-hidden font-semibold text-white transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer group shadow-sm hover:shadow-md text-xs sm:text-sm"
          >
            <span className="relative z-20 flex items-center space-x-1.5 sm:space-x-2">
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Download CV</span>
            </span>
          </a>
          {/* theme toggler */}
          <ThemeToggler />
          {/* burger menu */}
          <MenuIcon onClick={openNav} className="w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Nav;