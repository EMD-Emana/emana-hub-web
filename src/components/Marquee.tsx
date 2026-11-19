const items = [
  'Desarrollo web',
  'SEO técnico',
  'Tiendas virtuales',
  'Agentes de IA',
  'Software a medida',
  'Automatización',
  'Diseño de producto',
  'Analítica',
  'Integraciones',
  'Soporte continuo',
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
