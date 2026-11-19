'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      el.classList.add('is-active');
      const target = event.target as HTMLElement | null;
      el.classList.toggle('is-link', Boolean(target?.closest('a, button, summary, [data-cursor]')));
    };

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 17}px, ${y - 17}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const leave = () => el.classList.remove('is-active');

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
