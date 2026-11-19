'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { services, type Service } from '@/lib/content';
import { serviceIcons, IconArrowRight } from './Icon';

function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];
  return (
    <article className="service" data-service>
      <div className="service__top">
        <span className="service__icon">
          <Icon />
        </span>
        <span className="service__index">{service.index}</span>
      </div>
      <h3 className="service__title">{service.title}</h3>
      <p className="service__short">{service.short}</p>
      <ul className="service__list">
        {service.bullets.slice(0, 3).map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <span className="service__cta">
        Ver detalle
        <IconArrowRight />
      </span>
      <Link href={`/servicios/${service.slug}`} className="service__link" aria-label={`${service.title}: ver detalle`}>
        <span className="sr-only">{service.title}</span>
      </Link>
    </article>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const hover = window.matchMedia('(hover: hover)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!hover.matches || reduce.matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-service]'));

    const onMove = (card: HTMLElement) => (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      const rx = (y / rect.height - 0.5) * -5;
      const ry = (x / rect.width - 0.5) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    };
    const onLeave = (card: HTMLElement) => () => {
      card.style.transform = '';
    };

    const cleanups = cards.map((card) => {
      const move = onMove(card);
      const leave = onLeave(card);
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      return () => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="section" id="servicios" aria-labelledby="servicios-title">
      <div className="wrap">
        <div className="section__head">
          <div>
            <div className="section__index">01 — Servicios</div>
            <h2 className="h2" id="servicios-title">
              Cinco piezas.
              <br />
              <span className="serif grad-text">Un solo sistema.</span>
            </h2>
          </div>
          <div className="section__aside">
            <p className="lead">
              Cada servicio funciona por separado, pero rinde más cuando se conecta con el resto.
              Entramos donde más te duele y crecemos desde ahí.
            </p>
          </div>
        </div>

        <div className="services__grid" ref={ref} data-reveal-group>
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
