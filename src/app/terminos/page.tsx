import type { Metadata } from 'next';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones generales de los servicios de EMANA.',
  alternates: { canonical: '/terminos' },
};

export default function TerminosPage() {
  return (
    <div className="page page-enter">
      <div className="wrap">
        <div className="legal">
          <p className="eyebrow">
            <span className="eyebrow__dot" /> Legal
          </p>
          <h1 className="page-title" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}>
            Términos y condiciones
          </h1>
          <p className="legal__updated">Última actualización: noviembre de 2026</p>

          <h2>1. Objeto</h2>
          <p>
            Estos términos regulan el uso de este sitio web y las condiciones generales de los
            servicios de diseño, desarrollo, posicionamiento y automatización ofrecidos por EMANA.
            Cada proyecto se rige además por la propuesta y el contrato firmados con el cliente.
          </p>

          <h2>2. Propuestas y alcance</h2>
          <p>
            Las propuestas detallan alcance, entregables, plazos e inversión. Todo trabajo adicional
            se cotiza por separado y requiere aprobación escrita. Los plazos comienzan cuando se
            recibe el anticipo y los insumos necesarios del cliente.
          </p>

          <h2>3. Pagos</h2>
          <p>
            Salvo acuerdo distinto, los proyectos se facturan con un anticipo del 50 % y el saldo
            contra entrega. Los servicios recurrentes se facturan por adelantado. Los importes no
            incluyen impuestos cuando corresponda.
          </p>

          <h2>4. Obligaciones del cliente</h2>
          <ul>
            <li>Entregar información veraz, contenido y accesos necesarios para el proyecto.</li>
            <li>Designar una persona responsable de las aprobaciones.</li>
            <li>Contar con los derechos sobre logos, imágenes y textos que nos proporcione.</li>
            <li>Cumplir los plazos de revisión acordados para no afectar el cronograma.</li>
          </ul>

          <h2>5. Propiedad intelectual</h2>
          <p>
            Al liquidarse el pago total, el cliente recibe la titularidad del código, los diseños y
            los contenidos desarrollados específicamente para su proyecto. EMANA conserva el derecho
            de mostrar el proyecto en su portafolio salvo pacto de confidencialidad.
          </p>

          <h2>6. Garantía y soporte</h2>
          <p>
            Corregimos sin costo cualquier defecto atribuible a nuestro trabajo durante los 30 días
            posteriores a la entrega. Los cambios de alcance y las nuevas funcionalidades se cotizan
            aparte.
          </p>

          <h2>7. Limitación de responsabilidad</h2>
          <p>
            No garantizamos posiciones específicas en buscadores ni resultados comerciales
            determinados, porque dependen de factores externos. Nuestra responsabilidad se limita al
            importe efectivamente pagado por el servicio contratado.
          </p>

          <h2>8. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia
            se resolverá primero mediante diálogo directo y, de persistir, ante los tribunales de
            Lima.
          </p>

          <h2>9. Contacto</h2>
          <p>
            Escribe a <a href={`mailto:${site.email}`}>{site.email}</a> para cualquier consulta
            sobre estos términos.
          </p>
        </div>
      </div>
    </div>
  );
}
