'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { stages } from '@/lib/content';
import { IconArrowRight } from './Icon';

const JourneyScene = dynamic(() => import('./JourneyScene'), { ssr: false });

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      const clamped = Math.max(0, Math.min(0.9999, raw));
      const next = Math.min(stages.length - 1, Math.floor(clamped * stages.length));
      setProgress(clamped);
      setStage((prev) => (prev === next ? prev : next));
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${clamped})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="journey" id="recorrido" ref={sectionRef} aria-labelledby="recorrido-title">
      <div className="journey__sticky">
        <JourneyScene stage={stage} />

        <div className="journey__content">
          <h2 id="recorrido-title" className="sr-only">
            Cómo crece un negocio digital, etapa por etapa
          </h2>

          {stages.map((s, i) => (
            <article className={`stage${i === stage ? ' is-active' : ''}`} key={s.id} aria-hidden={i !== stage}>
              <p className="stage__label">
                Etapa {i + 1} de 5 <span>· {s.label}</span>
              </p>
              <h3 className="stage__title">{s.title}</h3>
              <p className="stage__copy">{s.copy}</p>
              <p className="stage__proof">{s.proof}</p>
              <Link href={`/servicios/${s.slug}`} className="link-arrow stage__link" tabIndex={i === stage ? 0 : -1}>
                {s.service}
                <IconArrowRight />
              </Link>
            </article>
          ))}
        </div>

        <div className="journey__rail" aria-hidden="true">
          <div className="rail__bar">
            <div className="rail__fill" ref={fillRef} />
          </div>
          {stages.map((s, i) => (
            <div className={`rail__item${i === stage ? ' is-active' : ''}`} key={s.id}>
              <b>{s.label}</b>
              <i />
            </div>
          ))}
        </div>

        <div className="journey__hint" aria-hidden="true">
          <i />
          {progress < 0.98 ? 'Sigue bajando' : 'El negocio completo'}
        </div>
      </div>
    </section>
  );
}
