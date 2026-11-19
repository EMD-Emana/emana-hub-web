'use client';

import { useEffect, useRef, useState } from 'react';
import { IconCheck, IconClock, IconSpark } from './Icon';

type Msg = { kind: 'in' | 'out' | 'meta'; text: string; time?: string };

const script: Msg[] = [
  { kind: 'in', text: 'Hola, ¿atienden los sábados?', time: '23:04' },
  {
    kind: 'out',
    text: '¡Hola! Sí, sábados de 9 a 13. ¿Buscas algo en particular?',
    time: '23:04',
  },
  { kind: 'in', text: 'Quiero una web para mi restaurante.', time: '23:05' },
  { kind: 'meta', text: 'Intención detectada · desarrollo web' },
  {
    kind: 'out',
    text: 'Perfecto. Te propongo una llamada de 15 min el jueves a las 4 p. m. ¿Te queda bien?',
    time: '23:05',
  },
  { kind: 'in', text: 'Sí, jueves 4 está bien.', time: '23:06' },
  { kind: 'meta', text: 'Cita creada · jueves 4:00 p. m.' },
  {
    kind: 'out',
    text: 'Listo ✅ Te envié la invitación por correo. Nos vemos el jueves.',
    time: '23:06',
  },
];

export default function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setShown(script.length);
      return;
    }
    if (paused) return;

    if (shown >= script.length) {
      const id = window.setTimeout(() => setShown(1), 5200);
      return () => window.clearTimeout(id);
    }

    const next = script[shown];
    const delay = next.kind === 'in' ? 1250 : next.kind === 'meta' ? 800 : 2100;
    const id = window.setTimeout(() => setShown((n) => n + 1), delay);
    return () => window.clearTimeout(id);
  }, [shown, paused, reduced]);

  const waiting = !reduced && !paused && shown < script.length && script[shown].kind === 'out';

  return (
    <section className="section" id="agente" aria-labelledby="agente-title">
      <div className="wrap">
        <div className="agent__grid">
          <div data-reveal>
            <div className="section__index">03 — Agente de IA</div>
            <h2 className="h2" id="agente-title">
              El mensaje que nadie
              <br />
              <span className="serif grad-text">contestó.</span>
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              El 60 % de las consultas llega fuera de horario. Este agente responde en segundos,
              califica al prospecto y agenda en tu calendario. Sin sonar a robot.
            </p>

            <ul className="agent__list">
              <li>
                <span className="n">01</span>
                <span>
                  <b>Entrenado con tu negocio.</b> Precios, horarios, servicios y preguntas
                  frecuentes: la información sale de tus documentos, no de internet.
                </span>
              </li>
              <li>
                <span className="n">02</span>
                <span>
                  <b>Califica y deriva.</b> Detecta intención de compra, pide los datos que faltan y
                  pasa la conversación a una persona cuando hace falta.
                </span>
              </li>
              <li>
                <span className="n">03</span>
                <span>
                  <b>Todo queda registrado.</b> Cada conversación, cita y resultado en un panel que
                  tu equipo puede revisar.
                </span>
              </li>
            </ul>

            <div className="pill-row" style={{ marginTop: 26 }}>
              <span className="pill">
                <i /> WhatsApp
              </span>
              <span className="pill">
                <i /> Web
              </span>
              <span className="pill">
                <i /> Agenda
              </span>
              <span className="pill">
                <i /> Panel
              </span>
            </div>
          </div>

          <div ref={ref} data-reveal data-delay="0.1">
            <div className="chat" aria-label="Ejemplo de conversación con un agente de EMANA">
              <div className="chat__head">
                <div className="chat__avatar">E</div>
                <div className="chat__who">
                  <b>Asistente de EMANA</b>
                  <span>En línea</span>
                </div>
                <span className="chat__tag">Demo</span>
              </div>

              <div className="chat__body" aria-live="off">
                {script.slice(0, shown).map((msg, i) => {
                  if (msg.kind === 'meta') {
                    return (
                      <span className="chat__meta" key={`${i}-${msg.text}`}>
                        <IconCheck style={{ width: 12, height: 12 }} />
                        {msg.text}
                      </span>
                    );
                  }
                  return (
                    <div className={`msg msg--${msg.kind}`} key={`${i}-${msg.text}`}>
                      {msg.text}
                      <small>{msg.time}</small>
                    </div>
                  );
                })}
                {waiting && (
                  <span className="chat__typing" aria-label="Escribiendo">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>

              <div className="chat__foot">
                <span>Escribe un mensaje…</span>
                <b aria-hidden="true">
                  <IconSpark style={{ width: 15, height: 15 }} />
                </b>
              </div>
            </div>

            <div className="pill-row" style={{ marginTop: 14, justifyContent: 'space-between' }}>
              <span className="pill">
                <IconClock style={{ width: 13, height: 13 }} /> Respuesta: 2,4 s
              </span>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setShown(1)}
                aria-label="Reiniciar la demostración"
              >
                Reiniciar demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
