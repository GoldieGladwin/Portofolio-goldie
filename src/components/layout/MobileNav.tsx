'use client';

import React from 'react';
import { Navlinks } from '@/lib/constants';
import Link from 'next/link';
import { X } from 'lucide-react';

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: Props) => {
  const sidebarOpenClose = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={closeNav}
        className={`fixed ${sidebarOpenClose} inset-0 transform transition-all duration-500 z-50 bg-black opacity-70 w-full h-screen`}
      />

      {/* Nav Links */}
      <div
        className={`text-white ${sidebarOpenClose} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-indigo-900 space-y-6 z-50`}
      >
        {Navlinks.map((link) => {
          return (
            <Link key={link.name} href={link.href} onClick={closeNav}>
              <p className="nav__link text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
                {link.name}
              </p>
            </Link>
          );
        })}

        {/* Close Button */}
        <X
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 text-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;
