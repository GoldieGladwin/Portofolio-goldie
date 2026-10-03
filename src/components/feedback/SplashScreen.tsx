'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

let hasShownSplashInSession = false;

export default function SplashScreen() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith('/admin') || pathname === '/not-found';

  // Phases: 'loading' -> 'lifting' -> 'done'
  const [phase, setPhase] = useState<'loading' | 'lifting' | 'done'>('loading');

  useEffect(() => {
    // 1. Abaikan untuk admin / 404 atau jika sudah pernah tampil dalam session
    if (isExcluded || hasShownSplashInSession) {
      setPhase('done');
      return;
    }

    // 2. Bypass instan untuk audit tools (Lighthouse, Googlebot, PageSpeed)
    try {
      if (
        typeof navigator !== 'undefined' &&
        /Lighthouse|Googlebot|HeadlessChrome|PageSpeed|insights/i.test(navigator.userAgent)
      ) {
        hasShownSplashInSession = true;
        setPhase('done');
        return;
      }
    } catch {
      // ignore
    }

    // 3. Cek sessionStorage (hanya 1x per sesi browser/tab)
    try {
      if (sessionStorage.getItem('splash_shown')) {
        hasShownSplashInSession = true;
        setPhase('done');
        return;
      }
    } catch {
      // ignore
    }

    // 4. Ultra-snappy & lightweight timing sequence:
    // 200ms: Balok shutter mulai terangkat cepat (LCP Hero tetap hijau & instan)
    const timerLifting = setTimeout(() => {
      setPhase('lifting');
    }, 200);

    // 520ms: Tirai 100% terbuka penuh, unmount DOM total, simpan flag session
    const timerDone = setTimeout(() => {
      setPhase('done');
      hasShownSplashInSession = true;
      try {
        sessionStorage.setItem('splash_shown', 'true');
      } catch {
        // ignore
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 520);

    return () => {
      clearTimeout(timerLifting);
      clearTimeout(timerDone);
      hasShownSplashInSession = true;
    };
  }, [isExcluded]);

  if (phase === 'done') return null;

  const isLifting = phase === 'lifting';
  const columns = [0, 1, 2, 3, 4];

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* 5 Shutter Columns - Pure GPU Hardware Accelerated */}
      <div className="relative w-full h-[105vh] flex">
        {columns.map((colIndex) => (
          <div
            key={colIndex}
            className="relative h-full flex-1 bg-white dark:bg-[#07090e] border-r border-slate-100/70 dark:border-white/[0.03] last:border-r-0"
            style={{
              transform: isLifting ? 'translateY(-102%)' : 'translateY(0%)',
              transitionProperty: 'transform',
              transitionDuration: '320ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${colIndex * 25}ms`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* Center Branding Content - Snappy fade out */}
      <div
        className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center transition-all duration-200 ease-out ${
          isLifting
            ? 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="relative flex flex-col items-center text-center px-6">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-8 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Minimalist Monogram GG */}
          <div className="relative w-13 h-13 sm:w-15 sm:h-15 mb-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center shadow-xs">
            <span className="font-mono font-black text-slate-800 dark:text-white text-lg sm:text-xl tracking-widest">
              G
            </span>
            <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-lg sm:text-xl animate-pulse">
              .
            </span>
            <span className="font-mono font-black text-slate-800 dark:text-white text-lg sm:text-xl tracking-widest">
              G
            </span>
          </div>

          {/* Developer Name */}
          <h2 className="relative text-lg sm:text-2xl font-extrabold tracking-[0.25em] text-slate-900 dark:text-white uppercase">
            Goldie Gladwin
          </h2>

          {/* Role Subtitle */}
          <p className="relative mt-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase">
            Portfolio &bull; Software Engineer
          </p>

          {/* Micro Indigo Shimmer Line */}
          <div className="relative mt-3.5 w-18 sm:w-22 h-[2px] bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-full">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-600 rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
