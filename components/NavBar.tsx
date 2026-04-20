'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Categories',   href: '#categories' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us',       href: '#why-us' },
  { label: 'Download',     href: '#download' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b transition-all duration-300 ${
        scrolled
          ? 'bg-[#00401A] border-[#E3D5CA]/20 shadow-lg'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold tracking-tight text-[#E3D5CA]">Primal Agri</span>
        <span className="text-sm text-[#E3D5CA]/70 font-medium urdu">پرائمل ایگری</span>
      </div>

      {/* Section links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[#E3D5CA]/70 hover:text-[#E3D5CA] transition"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://play.google.com/store/apps"
        className="bg-[#8B4513] text-[#E3D5CA] px-4 rounded-full text-sm font-semibold hover:bg-[#a0522d] transition inline-flex items-center min-h-[48px]"
      >
        Download App
      </a>
    </nav>
  );
}
