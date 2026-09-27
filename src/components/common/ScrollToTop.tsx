'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Sembunyikan tombol ScrollToTop pada rute admin atau not-found
  if (pathname?.startsWith('/admin') || pathname === '/not-found') {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className='fixed bottom-4 animate-pulse right-4 z-30'>
      {isVisible && (
        <Button
          className="bg-blue-700 hover:bg-blue-800 cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none shadow-lg"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
