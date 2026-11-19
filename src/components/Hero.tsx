'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { IconArrowRight } from './Icon';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const lines: { words: string[]; accent?: boolean }[] = [
  { words: ['De', 'una', 'página'] },
  { words: ['web', 'a', 'un', 'negocio'] },
  { words: ['que', 'se', 'opera', 'solo.'], accent: true },
];

export default function Hero() {
  useEffect(() => {
    const id = requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.classList.remove('is-ready');
    };
  }, []);

  let index = 0;

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <HeroScene />
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              Estudio digital · Lima, Perú
            </p>

            <h1 className="hero__title" id="hero-title">
              {lines.map((line, li) => (
                <span className="line" key={li}>
                  {line.words.map((word) => {
                    const i = index;
                    index += 1;
                    const isAccent = line.accent && (word === 'opera' || word === 'solo.');
                    return (
                      <span key={`${li}-${word}-${i}`}>
                        <span
                          className={`word${isAccent ? ' serif grad-text' : ''}`}
                          style={{ '--i': i } as React.CSSProperties}
                        >
                          {word}
                        </span>
                        {word !== line.words[line.words.length - 1] ? ' ' : ''}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p className="hero__sub">
              Diseñamos y construimos webs, tiendas virtuales, SEO y agentes de IA que trabajan
              como un solo sistema — para que vendas más y tu equipo se ocupe de lo importante.
            </p>

            <div className="hero__actions">
              <Link href="/#contacto" className="btn btn--primary">
                Agenda una llamada
                <IconArrowRight className="btn__arrow" />
              </Link>
              <Link href="/#servicios" className="btn btn--ghost">
                Ver servicios
              </Link>
            </div>

            <div className="hero__meta">
              <span>
                <i /> 5 disciplinas, un solo equipo
              </span>
              <span>
                <i /> Proyectos reales en producción
              </span>
              <span>
                <i /> Respuesta en 24 h hábiles
              </span>
            </div>
          </div>

          <div aria-hidden="true" />
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scrollLine" />
      </div>
    </section>
  );
}
