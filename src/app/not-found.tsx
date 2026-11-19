import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page page-enter">
      <div className="wrap" style={{ minHeight: '60vh', display: 'grid', alignContent: 'center', gap: 18 }}>
        <p className="eyebrow">
          <span className="eyebrow__dot" /> 404
        </p>
        <h1 className="page-title" style={{ margin: 0 }}>
          Esta página
          <br />
          <span className="serif grad-text">no existe (todavía).</span>
        </h1>
        <p className="lead">Puede que la hayamos movido o que el enlace esté mal escrito.</p>
        <div className="pill-row" style={{ marginTop: 10 }}>
          <Link href="/" className="btn btn--primary">
            Volver al inicio
          </Link>
          <Link href="/#servicios" className="btn btn--ghost">
            Ver servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
