import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getService, services, site } from '@/lib/content';
import { faqJsonLd, serviceJsonLd } from '@/lib/seo';
import { IconArrowRight, IconCheck, serviceIcons } from '@/components/Icon';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Servicio no encontrado' };

  const title = `${service.title} en Perú`;
  return {
    title,
    description: service.short,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title: `${service.title} · EMANA`,
      description: service.short,
      url: `${site.url}/servicios/${service.slug}`,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="page page-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service.title, service.short, service.slug)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(service.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${site.url}/#servicios` },
              {
                '@type': 'ListItem',
                position: 3,
                name: service.title,
                item: `${site.url}/servicios/${service.slug}`,
              },
            ],
          }),
        }}
      />

      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <i>/</i>
            <Link href="/#servicios">Servicios</Link>
            <i>/</i>
            <span aria-current="page">{service.title}</span>
          </nav>

          <div className="page-hero__grid">
            <div>
              <p className="eyebrow">
                <span className="service__icon" style={{ width: 34, height: 34, borderRadius: 10 }}>
                  <Icon style={{ width: 17, height: 17 }} />
                </span>
                Servicio {service.index} · EMANA
              </p>
              <h1 className="page-title">{service.title}</h1>
              <p className="lead">{service.lead}</p>
              <div className="pill-row">
                <Link href="/#contacto" className="btn btn--primary">
                  Cotizar este servicio
                  <IconArrowRight />
                </Link>
                <Link href="/#casos" className="btn btn--ghost">
                  Ver casos
                </Link>
              </div>
            </div>

            <aside className="page-aside" aria-label="Resumen del servicio">
              <div className="page-aside__row">
                <span>Resultado</span>
                <b style={{ textAlign: 'right', maxWidth: '55%' }}>{service.outcome}</b>
              </div>
              <div className="page-aside__row">
                <span>Modalidad</span>
                <b>Proyecto cerrado por fases</b>
              </div>
              <div className="page-aside__row">
                <span>Equipo</span>
                <b>Diseño + desarrollo + SEO</b>
              </div>
              <div className="page-aside__row">
                <span>Entrega</span>
                <b>Con documentación y accesos</b>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="detail">
          <aside className="detail__aside">
            <div className="page-aside">
              <p className="field__label">Siguiente paso</p>
              <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem' }}>
                Una llamada de 30 minutos para entender tu caso. Sin costo y sin compromiso.
              </p>
              <Link href="/#contacto" className="btn btn--primary btn--sm">
                Agendar
              </Link>
              <a href={`mailto:${site.email}`} className="link-arrow">
                {site.email}
              </a>
            </div>
          </aside>

          <div>
            <h2>Qué incluye</h2>
            <p>{service.lead}</p>

            <h3>En el día a día</h3>
            <ul className="list-check">
              {service.bullets.map((b) => (
                <li key={b}>
                  <IconCheck />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h3>Entregables</h3>
            <ul className="list-check">
              {service.deliverables.map((d) => (
                <li key={d}>
                  <IconCheck />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <h3>Preguntas de este servicio</h3>
            <div className="faq__list" style={{ marginTop: 8 }}>
              {service.faq.map((item, i) => (
                <details className="faq__item" key={item.q} open={i === 0}>
                  <summary>
                    {item.q}
                    <span className="faq__icon" aria-hidden="true" />
                  </summary>
                  <div className="faq__a">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-band">
          <div>
            <p className="field__label" style={{ color: 'var(--cyan)' }}>
              Siguiente paso
            </p>
            <h2>
              ¿Lo resolvemos
              <br />
              <span className="serif grad-text">juntos?</span>
            </h2>
          </div>
          <div className="cta-band__actions">
            <Link href="/#contacto" className="btn btn--primary">
              Agendar una llamada
              <IconArrowRight />
            </Link>
            <a href={`mailto:${site.email}`} className="btn btn--ghost">
              Escribir por correo
            </a>
          </div>
        </div>

        <div style={{ paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
          <p className="field__label" style={{ marginBottom: 18 }}>
            Otros servicios
          </p>
          <div className="services__grid">
            {others.map((s) => {
              const OtherIcon = serviceIcons[s.icon];
              return (
                <article className="service" key={s.slug} style={{ minHeight: 240 }}>
                  <div className="service__top">
                    <span className="service__icon">
                      <OtherIcon />
                    </span>
                    <span className="service__index">{s.index}</span>
                  </div>
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__short">{s.short}</p>
                  <Link href={`/servicios/${s.slug}`} className="service__link" aria-label={s.title}>
                    <span className="sr-only">{s.title}</span>
                  </Link>
                  <span className="service__cta" style={{ marginTop: 'auto' }}>
                    Ver detalle
                    <IconArrowRight />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
