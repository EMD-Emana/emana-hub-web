import { techStack } from '@/lib/content';

const labels: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  typescript: 'TypeScript',
  tailwindcss: 'Tailwind',
  threejs: 'Three.js',
  nodejs: 'Node.js',
  nestjs: 'NestJS',
  express: 'Express',
  mysql: 'MySQL',
  'drizzle-orm': 'Drizzle',
  vercel: 'Vercel',
  figma: 'Figma',
  git: 'Git',
  whatsapp: 'WhatsApp API',
  gsap: 'GSAP',
};

export default function Tech() {
  const outer = techStack.slice(0, 8);
  const inner = techStack.slice(8);

  const renderRing = (items: string[], radius: string, speed: string, offset: number, reverse: boolean) => (
    <div
      className="orbit__ring"
      style={{ '--r': radius, '--speed': speed, animationDirection: reverse ? 'reverse' : undefined } as React.CSSProperties}
    >
      {items.map((tech, i) => (
        <div
          className="orbit__dot"
          key={tech}
          style={{ '--a': `${(360 / items.length) * i + offset}deg` } as React.CSSProperties}
          title={labels[tech] ?? tech}
        >
          <span className="orbit__tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/icons/${tech}.svg`} alt="" width={26} height={26} loading="lazy" />
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="section" id="tecnologias" aria-labelledby="tech-title">
      <div className="wrap">
        <div className="tech">
          <div data-reveal>
            <div className="section__index">05 — Stack</div>
            <h2 className="h2" id="tech-title">
              Herramientas aburridas.
              <br />
              <span className="serif grad-text">Resultados serios.</span>
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Elegimos tecnología por rendimiento y mantenimiento, no por moda. Todo queda
              documentado y a tu nombre: si mañana quieres cambiar de equipo, no dependes de
              nosotros.
            </p>
            <div className="tech__chips">
              {['Código propio', 'Sin plantillas', 'Core Web Vitals', 'Accesible', 'SEO técnico'].map(
                (chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="orbit" data-reveal data-delay="0.1" aria-hidden="true">
            <div className="orbit__glow" />
            <div className="orbit__circle orbit__circle--outer" />
            <div className="orbit__circle orbit__circle--inner" />

            {renderRing(outer, 'var(--orbit-r-outer)', '78s', 0, false)}
            {renderRing(inner, 'var(--orbit-r-inner)', '58s', 24, true)}

            <div className="orbit__core">
              <span>
                EMANA
                <br />
                STACK
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
