import Link from 'next/link';
import { cases, type Case } from '@/lib/content';
import { IconArrowUpRight } from './Icon';

function Preview({ kind }: { kind: Case['preview'] }) {
  if (kind === 'dashboard') {
    return (
      <div className="mock mock--dash" aria-hidden="true">
        <div className="mock__side">
          <span className="mock__dot is-brand" />
          <span className="mock__dot" />
          <span className="mock__dot" />
          <span className="mock__dot" />
          <span className="mock__dot" />
          <span className="mock__dot" style={{ width: '60%', marginTop: 'auto' }} />
        </div>
        <div className="mock__main">
          <span className="mock__bar" />
          <div className="mock__kpis">
            <div className="mock__kpi">
              <b>128</b>
              <span>Exámenes</span>
            </div>
            <div className="mock__kpi">
              <b>96%</b>
              <span>Asistencia</span>
            </div>
            <div className="mock__kpi">
              <b>14</b>
              <span>Roster hoy</span>
            </div>
          </div>
          <div className="mock__chart" />
          <div className="mock__kpis" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="mock__kpi">
              <b>·</b>
              <span>Boletas emitidas</span>
            </div>
            <div className="mock__kpi">
              <b>·</b>
              <span>Solicitudes</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'editorial') {
    return (
      <div className="mock mock--editorial" aria-hidden="true">
        <div className="mock__nav">
          <span />
          <span />
          <span />
          <b>SNP ARBITRAJE</b>
        </div>
        <div className="mock__hero">
          El arbitraje
          <br />
          se aprende
          <br />
          practicando.
        </div>
        <div className="mock__rule" />
        <div className="mock__cols">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  if (kind === 'playful') {
    return (
      <div className="mock mock--playful" aria-hidden="true">
        <div className="mock__title">Aprende jugando</div>
        <div className="mock__row">
          <div className="mock__card" />
          <div className="mock__card" />
          <div className="mock__card" />
        </div>
        <div className="mock__row" style={{ opacity: 0.7 }}>
          <div className="mock__card" />
          <div className="mock__card" />
        </div>
      </div>
    );
  }

  return (
    <div className="mock mock--shop" aria-hidden="true">
      <div className="mock__top">
        <b>EMANA BEAUTY</b>
        <span />
      </div>
      <div className="mock__grid">
        <div className="mock__prod" />
        <div className="mock__prod" />
        <div className="mock__prod" />
      </div>
      <div className="mock__top">
        <span />
        <span style={{ width: 18 }} />
      </div>
    </div>
  );
}

export default function Cases() {
  return (
    <section className="section" id="casos" aria-labelledby="casos-title">
      <div className="wrap">
        <div className="section__head">
          <div>
            <div className="section__index">02 — Casos</div>
            <h2 className="h2" id="casos-title">
              Proyectos reales,
              <br />
              <span className="serif grad-text">no maquetas.</span>
            </h2>
          </div>
          <div className="section__aside">
            <p className="lead">
              Trabajamos con negocios que ya están operando: salud, educación, legal y comercio.
              Algunos son de acceso privado, pero todos se usan todos los días.
            </p>
          </div>
        </div>

        <div className="cases__grid" data-reveal-group>
          {cases.map((item) => (
            <article className="case" key={item.name}>
              <div className={`case__preview case__preview--${item.tone}`}>
                <Preview kind={item.preview} />
              </div>
              <div className="case__body">
                <div className="case__head">
                  <div>
                    <h3 className="case__name">{item.name}</h3>
                    <p className="case__sector">{item.sector}</p>
                  </div>
                  <span className="case__status">
                    <i />
                    {item.status}
                  </span>
                </div>
                <p className="case__copy">{item.copy}</p>
                <div className="case__tag">
                  <span>{item.service}</span>
                  <IconArrowUpRight />
                </div>
                <span className="case__glyph" aria-hidden="true">
                  {item.name.slice(0, 1)}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="note" data-reveal>
          ¿Quieres ver un caso completo? Escríbenos y te mostramos el proyecto en una llamada.
          {' '}
          <Link href="/#contacto" style={{ color: 'var(--cyan)' }}>
            Agendar →
          </Link>
        </p>
      </div>
    </section>
  );
}
