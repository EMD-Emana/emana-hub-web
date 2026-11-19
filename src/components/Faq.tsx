import Link from 'next/link';
import { faqs, site } from '@/lib/content';

export default function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="faq__grid">
          <div data-reveal>
            <div className="section__index">06 — Preguntas</div>
            <h2 className="h2" id="faq-title">
              Lo que todos
              <br />
              <span className="serif grad-text">preguntan.</span>
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Y si tu duda no está aquí, escríbenos: contestamos correos de verdad, no formularios
              automáticos.
            </p>
            <Link href="/#contacto" className="btn btn--ghost" style={{ marginTop: 24 }}>
              Hacer una pregunta
            </Link>
          </div>

          <div className="faq__list" data-reveal data-delay="0.1">
            {faqs.map((item, i) => (
              <details className="faq__item" key={item.q} open={i === 0}>
                <summary>
                  {item.q}
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <div className="faq__a">{item.a}</div>
              </details>
            ))}
            <p className="note">
              ¿Prefieres hablar directo? Escríbenos a{' '}
              <a href={`mailto:${site.email}`} style={{ color: 'var(--cyan)' }}>
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
