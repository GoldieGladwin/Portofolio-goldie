'use client';

import React from 'react';
import { Navlinks, cvUrl } from '@/lib/constants';
import Link from 'next/link';
import { Download, X } from 'lucide-react';

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: Props) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        showNav ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      {/* Background Overlay */}
      <div
        onClick={closeNav}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
          showNav ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Nav Links Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 h-full w-[80%] max-w-sm sm:w-[65%] bg-indigo-950 dark:bg-slate-950 text-white z-50 flex flex-col justify-center px-8 sm:px-12 space-y-5 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          showNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeNav}
          aria-label="Tutup Navigasi"
          className="absolute top-5 right-5 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Links */}
        <div className="flex flex-col space-y-3.5">
          {Navlinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeNav}
                className="group flex items-center justify-between border-b border-white/15 pb-2 text-lg sm:text-2xl font-medium tracking-wide text-white hover:text-indigo-300 transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-xs text-white/40 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
              </Link>
            );
          })}
        </div>

        {/* Download CV Button for Mobile */}
        <div className="pt-3">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Minimalis Profesional CV Surat Lamaran Kerja Resume.pdf"
            onClick={closeNav}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 text-sm font-semibold shadow-md transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

