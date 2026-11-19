import { stats } from '@/lib/content';

export default function Stats() {
  return (
    <section className="section section--flush" aria-label="Datos del estudio">
      <div className="wrap">
        <div className="stats" data-reveal-group>
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat__value">{stat.value}</div>
              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
