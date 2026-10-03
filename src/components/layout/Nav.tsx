'use client';
import React, { useState, useEffect } from 'react';
import Logo from '@/components/common/Logo';
import { Navlinks, cvUrl } from '@/lib/constants';
import Link from 'next/link';
import { Download, MenuIcon } from 'lucide-react';
import ThemeToggler from '@/components/common/ThemeToggler';

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className={`transition-all ${navBg ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'fixed'
        } duration-300 h-[12vh] z-50 fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <Logo />

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center space-x-10">
          {Navlinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="nav__link text-sm font-medium hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center space-x-4">
          <ThemeToggler />

          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Minimalis Profesional CV Surat Lamaran Kerja Resume.pdf"
            className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>

          {/* BURGER MENU */}
          <MenuIcon
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
