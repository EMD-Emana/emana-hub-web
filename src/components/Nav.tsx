'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EmanaMark } from './Icon';

const links = [
  { href: '/#servicios', label: 'Servicios', id: 'servicios' },
  { href: '/#casos', label: 'Casos', id: 'casos' },
  { href: '/#proceso', label: 'Proceso', id: 'proceso' },
  { href: '/#faq', label: 'FAQ', id: 'faq' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav__inner">
          <Link href="/" className="nav__brand" aria-label="EMANA, inicio">
            <EmanaMark />
            <span>EMANA</span>
          </Link>
          <nav className="nav__links" aria-label="Navegación principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav__link">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/#contacto" className="btn btn--primary btn--sm nav__cta">
            Hablemos
          </Link>
          <button
            type="button"
            className={`nav__toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>

      <div id="menu-movil" className={`nav__mobile${open ? ' is-open' : ''}`}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href} className="nav__mobileLink" onClick={() => setOpen(false)}>
            {l.label}
            <small>0{i + 1}</small>
          </Link>
        ))}
        <Link href="/#contacto" className="nav__mobileLink" onClick={() => setOpen(false)}>
          Contacto
          <small>05</small>
        </Link>
        <div className="nav__mobileFoot">
          <a href="mailto:hola@emanahub.com">hola@emanahub.com</a>
          <span>Lima, Perú · Trabajamos en LatAm</span>
        </div>
      </div>
    </>
  );
}
