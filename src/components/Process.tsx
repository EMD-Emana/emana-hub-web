'use client';

import { useEffect, useRef } from 'react';
import { processSteps } from '@/lib/content';

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const steps = Array.from(host.querySelectorAll<HTMLElement>('[data-step]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="proceso" aria-labelledby="proceso-title">
      <div className="wrap">
        <div className="section__head">
          <div>
            <div className="section__index">04 — Proceso</div>
            <h2 className="h2" id="proceso-title">
              Sin sorpresas.
              <br />
              <span className="serif grad-text">Sin cajas negras.</span>
            </h2>
          </div>
          <div className="section__aside">
            <p className="lead">
              Cuatro etapas, fechas claras y una demo al final de cada sprint. Siempre sabes en qué
              está tu proyecto y qué viene después.
            </p>
          </div>
        </div>

        <div className="process__list" ref={ref}>
          {processSteps.map((step) => (
            <div className="step" key={step.n} data-step>
              <span className="step__n">{step.n}</span>
              <h3 className="step__title">{step.title}</h3>
              <div className="step__right">
                <p className="step__copy">{step.copy}</p>
                <span className="step__detail">{step.detail}</span>
              </div>
              <span className="step__bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
