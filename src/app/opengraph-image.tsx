import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const alt = 'EMANA — estudio digital: webs, SEO, tiendas virtuales y agentes de IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Logo oficial (PNG) embebido como data URI; si falla, cae a un bloque de marca. */
function logoDataUri(): string | null {
  try {
    const file = readFileSync(join(process.cwd(), 'public/brand/brand-logo.png'));
    return `data:image/png;base64,${file.toString('base64')}`;
  } catch {
    return null;
  }
}

export default function OpengraphImage() {
  const logo = logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 76px',
          background: '#05070D',
          backgroundImage:
            'radial-gradient(60% 70% at 82% 22%, rgba(46,107,255,.45), transparent 62%), radial-gradient(40% 50% at 12% 95%, rgba(34,224,255,.16), transparent 70%)',
          color: '#F4F7FF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={262} height={43} alt="" />
          ) : (
            <div style={{ display: 'flex', fontSize: 30, letterSpacing: 10 }}>EMANA</div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: -3, maxWidth: 940 }}>
            De una página web a un negocio
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              letterSpacing: -3,
              backgroundImage: 'linear-gradient(100deg,#8FB4FF,#4F82FF,#22E0FF)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            que se opera solo.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 23, color: '#909BB8' }}>
          <span>Webs · SEO · Tiendas · Agentes de IA · Software a medida</span>
          <span>emanahub.com</span>
        </div>
      </div>
    ),
    size,
  );
}
