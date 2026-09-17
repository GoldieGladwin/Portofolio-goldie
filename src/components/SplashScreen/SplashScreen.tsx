'use client'

import React, { useEffect, useState } from 'react'
import AOS from 'aos'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'loading' | 'text-exit' | 'lifting' | 'done'>('loading')

  useEffect(() => {
    // Kunci scroll saat splash screen berjalan
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 1. 0 - 900ms: Layar full putih menampilkan teks pembuka yang rapi
    // 2. 900ms: Teks pembuka fade out secara lembut dan perlahan ke atas
    const timerTextExit = setTimeout(() => {
      setPhase('text-exit')
    }, 900)

    // 3. 1300ms: Balok-balok persegi panjang mulai terangkat pelan-pelan 1 per 1
    const timerLifting = setTimeout(() => {
      setPhase('lifting')
    }, 1300)

    // 4. 3300ms: Seluruh balok selesai terangkat dengan mulus, kembalikan scroll & refresh AOS
    const timerDone = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = originalOverflow || ''
      if (typeof window !== 'undefined') {
        AOS.refresh()
      }
    }, 3300)

    return () => {
      clearTimeout(timerTextExit)
      clearTimeout(timerLifting)
      clearTimeout(timerDone)
      document.body.style.overflow = originalOverflow || ''
    }
  }, [])

  if (phase === 'done') return null

  // 5 balok persegi panjang vertikal yang presisi (masing-masing flex-1)
  const columns = [0, 1, 2, 3, 4]
  const isLifting = phase === 'lifting'

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* Container balok-balok persegi panjang putih yang rapi & presisi */}
      <div className="relative w-full h-[105vh] flex">
        {columns.map((colIndex) => {
          return (
            <div
              key={colIndex}
              className="relative h-full flex-1 bg-white border-r border-slate-100/90 last:border-r-0"
              style={{
                transform: isLifting ? 'translateY(-102%)' : 'translateY(0%)',
                transitionProperty: 'transform',
                transitionDuration: '1350ms', // Gerakan pelan, anggun, dan mulus
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)', // Kurva sinematik premium
                transitionDelay: `${colIndex * 150}ms`, // Stagger teratur 1 per 1
                boxShadow: isLifting
                  ? '0 30px 40px -10px rgba(0, 0, 0, 0.12), 0 10px 15px -5px rgba(0, 0, 0, 0.06)'
                  : 'none',
                willChange: 'transform',
              }}
            />
          )
        })}
      </div>

      {/* Konten teks pembuka di tengah layar (bersih, minimalis, dan elegan) */}
      <div
        className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center transition-all duration-500 ease-out ${
          phase === 'text-exit' || phase === 'lifting'
            ? 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="flex flex-col items-center text-center px-6">
          {/* Logo Monogram Minimalis */}
          <div className="w-14 h-14 mb-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-xs">
            <span className="font-mono font-black text-slate-800 text-xl tracking-widest">
              GG
            </span>
          </div>

          {/* Nama Pengembang */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.3em] text-slate-900 uppercase">
            Goldie Gladwin
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-xs sm:text-sm font-medium tracking-[0.35em] text-slate-400 uppercase">
            Portfolio &bull; Software Engineer
          </p>

          {/* Garis pemisah halus */}
          <div className="mt-6 w-24 h-[1.5px] bg-slate-100 overflow-hidden rounded-full">
            <div className="h-full bg-slate-900/30 rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
