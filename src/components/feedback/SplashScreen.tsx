'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

let hasShownSplashInSession = false;

function isExcludedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname.startsWith('/admin') || pathname === '/not-found') return true;
  if (typeof window !== 'undefined') {
    const loc = window.location.pathname;
    if (loc.startsWith('/admin') || loc === '/not-found') return true;
    if (document.querySelector('[data-hide-nav="true"]')) return true;
  }
  return false;
}

export default function SplashScreen() {
  const pathname = usePathname();
  const isExcluded = isExcludedPath(pathname);
  const shouldSkip = hasShownSplashInSession || isExcluded;

  const [visible, setVisible] = useState(!shouldSkip);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (shouldSkip) {
      hasShownSplashInSession = true;
      setVisible(false);
      return;
    }

    // Animasi dipercepat: hanya 350ms jeda, lalu fade out anggun 250ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 350);

    const doneTimer = setTimeout(() => {
      hasShownSplashInSession = true;
      setVisible(false);
    }, 600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      hasShownSplashInSession = true;
    };
  }, [shouldSkip]);

  if (!visible) return null;

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 pointer-events-none select-none transition-opacity duration-250 ease-out ${
        fading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Soft Glow */}
      <div className="absolute w-52 h-52 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl pointer-events-none" />

      {/* Brand Monogram */}
      <div className="flex items-center justify-center select-none scale-90 sm:scale-100">
        <span className="font-mono font-black text-5xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
          G
        </span>
        <span className="font-mono font-black text-5xl sm:text-6xl text-indigo-600 dark:text-indigo-400 px-0.5 animate-pulse">
          .
        </span>
        <span className="font-mono font-black text-5xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
          G
        </span>
      </div>

      {/* Micro-bar Loader */}
      <div className="mt-5 w-32 sm:w-40 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
        <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full animate-[shimmer_0.6s_ease-in-out_infinite]" />
      </div>

      <p className="mt-3 font-mono text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wider">
        PORTFOLIO
      </p>
    </div>
  );
}
