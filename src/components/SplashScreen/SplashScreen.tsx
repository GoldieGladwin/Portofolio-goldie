'use client'

import React, { useEffect, useState, useMemo } from 'react'
import AOS from 'aos'

// Partikel perayaan ringan (GPU-accelerated, hemat memori untuk HP & laptop kentang)
const PARTICLES = [
  { angle: 0, dist: 70, color: '#10B981', size: 7, shape: 'circle' },
  { angle: 30, dist: 85, color: '#F59E0B', size: 5, shape: 'star' },
  { angle: 60, dist: 75, color: '#3B82F6', size: 6, shape: 'circle' },
  { angle: 90, dist: 90, color: '#EC4899', size: 6, shape: 'star' },
  { angle: 120, dist: 75, color: '#8B5CF6', size: 7, shape: 'circle' },
  { angle: 150, dist: 85, color: '#10B981', size: 5, shape: 'star' },
  { angle: 180, dist: 70, color: '#F59E0B', size: 7, shape: 'circle' },
  { angle: 210, dist: 85, color: '#06B6D4', size: 6, shape: 'circle' },
  { angle: 240, dist: 75, color: '#8B5CF6', size: 7, shape: 'star' },
  { angle: 270, dist: 90, color: '#10B981', size: 6, shape: 'circle' },
  { angle: 300, dist: 80, color: '#F59E0B', size: 5, shape: 'star' },
  { angle: 330, dist: 85, color: '#3B82F6', size: 7, shape: 'circle' },
]

export default function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const isComplete = progress >= 100

  // Status teks dinamis sesuai persentase
  const statusMessage = useMemo(() => {
    if (progress < 30) return 'INITIALIZING SYSTEM'
    if (progress < 65) return 'LOADING PORTFOLIO'
    if (progress < 99) return 'PREPARING EXPERIENCE'
    return 'READY TO EXPLORE!'
  }, [progress])

  useEffect(() => {
    // Kunci scroll saat loading aktif agar tidak bergeser
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const startTime = performance.now()
    const targetDuration = 1250 // ~1.25 detik (cepat, responsif, tidak membebani)

    let animationFrameId: number
    let fadeTimer: NodeJS.Timeout
    let doneTimer: NodeJS.Timeout

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const fraction = Math.min(elapsed / targetDuration, 1)

      // Easing out cubic: progress mengalir mulus dan presisi
      const currentVal = Math.round((1 - Math.pow(1 - fraction, 3)) * 100)
      setProgress(currentVal)

      if (fraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress)
      } else {
        // Ketika mencapai 100% (berubah hijau & efek meriah meletup)
        // Beri jeda 450ms agar animasi perayaan selesai dinikmati
        fadeTimer = setTimeout(() => {
          setIsFading(true)
        }, 450)

        doneTimer = setTimeout(() => {
          setIsDone(true)
          document.body.style.overflow = originalOverflow || ''
          if (typeof window !== 'undefined') {
            AOS.refresh()
          }
        }, 900)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = originalOverflow || ''
    }
  }, [])

  if (isDone) return null

  // Geometri lingkaran SVG progress bar
  // Jari-jari lingkaran = 48px, Keliling (circumference) = 2 * PI * 48 ≈ 301.59
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference - (progress / 100) * circumference

  return (
    <div
      id="splash-screen"
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-500 ease-out ${
        isFading
          ? 'opacity-0 pointer-events-none scale-105 blur-[1px]'
          : 'opacity-100 scale-100'
      } bg-slate-50/98 dark:bg-[#07090E]/98 backdrop-blur-xl`}
    >
      {/* Background Ambient Glow (GPU Accelerated) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 -z-10 ${
          isComplete
            ? 'bg-emerald-500/25 dark:bg-emerald-400/20'
            : 'bg-blue-500/20 dark:bg-blue-600/20'
        }`}
      />

      {/* Kontainer Utama */}
      <div className="flex flex-col items-center text-center px-4 relative z-10 max-w-sm w-full">
        
        {/* ============================================================== */}
        {/* AREA LINGKARAN PROGRESS & MONOGRAM GG                         */}
        {/* ============================================================== */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          
          {/* Efek Meriah: Gelombang Shockwave Hijau saat Full (100%) */}
          {isComplete && (
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/80 animate-ping pointer-events-none" />
          )}

          {/* Efek Meriah: Konfeti / Partikel Sparkle Ringan Meluncur Keluar */}
          {PARTICLES.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180
            const x = Math.cos(rad) * p.dist
            const y = Math.sin(rad) * p.dist

            return (
              <span
                key={i}
                className="absolute pointer-events-none transition-all duration-500 ease-out"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  borderRadius: p.shape === 'circle' ? '9999px' : '2px',
                  transform: isComplete
                    ? `translate(${x}px, ${y}px) rotate(${p.angle * 2}deg) scale(1)`
                    : 'translate(0px, 0px) scale(0)',
                  opacity: isComplete ? 0.9 : 0,
                  boxShadow: isComplete ? `0 0 8px ${p.color}` : 'none',
                }}
              />
            )
          })}

          {/* SVG Circular Progress Bar (Loading Melingkari Buletan GG) */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 transform pointer-events-none"
            viewBox="0 0 120 120"
          >
            {/* Jalur Lingkaran Latar Belakang (Track) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-slate-200/80 dark:text-slate-800/80"
            />

            {/* Jalur Lingkaran Loading: Biru saat berputar -> Berubah Hijau saat 100% */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={isComplete ? '#10B981' : '#3B82F6'}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="transition-[stroke,stroke-dashoffset] duration-300 ease-out"
              style={{
                filter: isComplete
                  ? 'drop-shadow(0 0 6px rgba(16,185,129,0.7))'
                  : 'drop-shadow(0 0 6px rgba(59,130,246,0.6))',
              }}
            />
          </svg>

          {/* BULETAN GG (Center Monogram) */}
          <div
            className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-md ${
              isComplete
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-105'
                : 'bg-white dark:bg-[#0B0F19] border-2 border-blue-200 dark:border-blue-900/60 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
            }`}
          >
            {/* Teks Inisial GG */}
            <span
              className={`font-mono font-black text-2xl tracking-wider transition-colors duration-400 ${
                isComplete
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-blue-600 dark:text-blue-400'
              }`}
            >
              GG
            </span>

            {/* Dot Status Online / Complete */}
            <span className="absolute top-1 right-2 flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isComplete ? 'bg-emerald-400' : 'bg-blue-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 border border-white dark:border-[#0B0F19] ${
                  isComplete ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
              />
            </span>
          </div>

        </div>

        {/* Nama Pengembang */}
        <h1 className="text-sm sm:text-base font-bold tracking-[0.28em] text-slate-900 dark:text-white uppercase">
          Goldie{' '}
          <span
            className={`transition-colors duration-400 ${
              isComplete
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}
          >
            Gladwin
          </span>
        </h1>

        {/* Subtitle / Role */}
        <p className="mt-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase">
          Portfolio &bull; Software Engineering
        </p>

        {/* Badge Status & Persentase Tabular */}
        <div className="mt-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors duration-400 bg-white/70 dark:bg-gray-800/70 border-slate-200/80 dark:border-gray-700">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-400 ${
              isComplete
                ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]'
                : 'bg-blue-500 animate-pulse'
            }`}
          />
          <span className="text-[10px] font-mono tracking-widest text-slate-600 dark:text-gray-300 font-medium">
            {statusMessage}
          </span>
          <span
            className={`text-xs font-mono font-bold tabular-nums ml-1 transition-colors duration-400 ${
              isComplete
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}
          >
            {progress}%
          </span>
        </div>

      </div>
    </div>
  )
}
