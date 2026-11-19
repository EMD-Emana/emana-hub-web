import Link from 'next/link';
import { EmanaLogo } from './Icon';
import { services, site } from '@/lib/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <EmanaLogo gradientId="footer-mark" />
            <p>
              Estudio digital en Lima. Diseñamos y construimos webs, tiendas, agentes de IA y
              software que trabajan como un solo sistema.
            </p>
            <a href={`mailto:${site.email}`} className="link-arrow">
              {site.email}
            </a>
          </div>

          <div className="footer__col">
            <h4>Servicios</h4>
            {services.map((s) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <h4>Estudio</h4>
            <Link href="/#casos">Casos</Link>
            <Link href="/#proceso">Proceso</Link>
            <Link href="/#faq">Preguntas</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>

          <div className="footer__col">
            <h4>Contacto</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.city}</span>
            <span>Lun–Vie · 9:00–18:00</span>
            <span>Respuesta en 24 h hábiles</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} EMANA. Todos los derechos reservados.</span>
          <nav aria-label="Legal">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
            <Link href="/cookies">Cookies</Link>
          </nav>
          <span>Hecho en Lima, Perú 🇵🇪</span>
        </div>

        <div className="footer__word" aria-hidden="true">
          EMANA
        </div>
      </div>
    </footer>
  );
}
