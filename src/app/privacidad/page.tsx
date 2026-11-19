import type { Metadata } from 'next';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo EMANA recopila, usa y protege tus datos personales.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return (
    <div className="page page-enter">
      <div className="wrap">
        <div className="legal">
          <p className="eyebrow">
            <span className="eyebrow__dot" /> Legal
          </p>
          <h1 className="page-title" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}>
            Política de privacidad
          </h1>
          <p className="legal__updated">Última actualización: noviembre de 2026</p>

          <h2>1. Quién trata tus datos</h2>
          <p>
            EMANA ({site.legalName}), con domicilio en Lima, Perú, es responsable de los datos
            personales que recibes a través de este sitio y de nuestros canales de contacto. Para
            cualquier consulta sobre privacidad puedes escribir a{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>2. Qué datos recopilamos</h2>
          <ul>
            <li>Datos que nos entregas al escribirnos: nombre, correo, empresa, servicio de interés y mensaje.</li>
            <li>Datos de navegación agregados: páginas vistas, dispositivo y origen del tráfico, si aceptas cookies analíticas.</li>
            <li>Datos de comunicación: el contenido de los correos y reuniones vinculadas a un proyecto.</li>
          </ul>

          <h2>3. Para qué los usamos</h2>
          <ul>
            <li>Responder tu consulta y preparar una propuesta.</li>
            <li>Ejecutar y dar soporte a los servicios contratados.</li>
            <li>Enviar comunicaciones relacionadas con el proyecto.</li>
            <li>Mejorar el sitio con métricas agregadas, nunca identificándote individualmente.</li>
          </ul>

          <h2>4. Base legal</h2>
          <p>
            Tratamos tus datos con tu consentimiento y para ejecutar la relación contractual cuando
            corresponde, conforme a la Ley N.º 29733, Ley de Protección de Datos Personales del Perú,
            y su reglamento.
          </p>

          <h2>5. Con quién los compartimos</h2>
          <p>
            No vendemos ni alquilamos datos personales. Podemos usar proveedores que actúan como
            encargados del tratamiento (correo, hosting, analítica), siempre con acuerdos de
            confidencialidad y solo para las finalidades descritas.
          </p>

          <h2>6. Cuánto tiempo los conservamos</h2>
          <p>
            Las consultas comerciales se conservan mientras exista interés en el servicio y, como
            máximo, dos años después del último contacto. Los datos vinculados a proyectos
            contratados se conservan por el plazo legal aplicable.
          </p>

          <h2>7. Tus derechos</h2>
          <p>
            Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus
            datos escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>. Responderemos en
            un plazo máximo de diez días hábiles. También puedes acudir a la Autoridad Nacional de
            Protección de Datos Personales.
          </p>

          <h2>8. Seguridad</h2>
          <p>
            Aplicamos medidas técnicas y organizativas razonables: cifrado en tránsito, acceso
            restringido a la información y respaldo de los proyectos. Ningún sistema es
            infalible; si ocurriera un incidente relevante, lo comunicaremos según la ley.
          </p>

          <h2>9. Cambios en esta política</h2>
          <p>
            Podemos actualizar este documento para reflejar cambios legales u operativos. La versión
            vigente estará siempre publicada en esta página con su fecha de actualización.
          </p>
        </div>
      </div>
    </div>
  );
}
