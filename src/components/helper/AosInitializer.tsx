'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AosInitializer() {
  const pathname = usePathname()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true,
      anchorPlacement: 'top-bottom',
    })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [pathname])

  return null
}