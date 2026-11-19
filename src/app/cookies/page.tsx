import type { Metadata } from 'next';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Qué cookies usa este sitio y cómo puedes gestionarlas.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <div className="page page-enter">
      <div className="wrap">
        <div className="legal">
          <p className="eyebrow">
            <span className="eyebrow__dot" /> Legal
          </p>
          <h1 className="page-title" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}>
            Política de cookies
          </h1>
          <p className="legal__updated">Última actualización: noviembre de 2026</p>

          <h2>1. Qué son las cookies</h2>
          <p>
            Son pequeños archivos que se guardan en tu dispositivo al visitar un sitio. Sirven para
            recordar preferencias, medir el uso del sitio y mejorar la experiencia.
          </p>

          <h2>2. Qué usamos</h2>
          <ul>
            <li>
              <strong>Esenciales:</strong> permiten el funcionamiento básico y la seguridad del
              sitio. No requieren consentimiento.
            </li>
            <li>
              <strong>Analíticas:</strong> nos dicen qué páginas se visitan y cómo llega la gente,
              de forma agregada. Solo se activan si las aceptas.
            </li>
            <li>
              <strong>De terceros:</strong> servicios como analítica o video pueden instalar cookies
              propias cuando se cargan, sujetas a sus políticas.
            </li>
          </ul>

          <h2>3. Cómo gestionarlas</h2>
          <p>
            Puedes eliminar o bloquear cookies desde la configuración de tu navegador. Si bloqueas
            las esenciales, algunas partes del sitio podrían no funcionar correctamente.
          </p>

          <h2>4. Más información</h2>
          <p>
            Para cualquier duda sobre cookies escríbenos a{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. También puedes consultar nuestra{' '}
            <a href="/privacidad">política de privacidad</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
