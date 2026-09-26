'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import MobileNav from './MobileNav';

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const [is404Page, setIs404Page] = useState(false);

  useEffect(() => {
    const check404 = () => {
      const has404 = Boolean(document.querySelector('[data-hide-nav="true"]'));
      setIs404Page(has404);
    };

    check404();
    const timer = setTimeout(check404, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Sembunyikan navbar jika sedang di rute admin (/admin, /admin/login, dsb),
  // atau rute /not-found, atau halaman yang memiliki atribut data-hide-nav="true"
  if (pathname?.startsWith('/admin') || pathname === '/not-found' || is404Page) {
    return null;
  }

  const openNavHandLer = () => setShowNav(true);
  const closeNavHandLer = () => setShowNav(false);

  return (
    <div id="portfolio-navbar" className="portfolio-navbar">
      <Nav openNav={openNavHandLer} />
      <MobileNav showNav={showNav} closeNav={closeNavHandLer} />
    </div>
  );
};

export default ResponsiveNav;