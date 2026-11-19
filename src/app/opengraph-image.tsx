import { ImageResponse } from 'next/og';

export const alt = 'EMANA — estudio digital: webs, SEO, tiendas virtuales y agentes de IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 76px',
          background: '#05070D',
          backgroundImage:
            'radial-gradient(60% 70% at 82% 22%, rgba(46,107,255,.5), transparent 62%), radial-gradient(40% 50% at 12% 95%, rgba(34,224,255,.18), transparent 70%)',
          color: '#F4F7FF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, letterSpacing: 10 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,#5B8CFF,#22E0FF)',
              color: '#05070D',
              fontSize: 30,
              letterSpacing: 0,
            }}
          >
            E
          </div>
          EMANA
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 74, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>
            De una página web a un negocio
          </div>
          <div
            style={{
              fontSize: 74,
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

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#909BB8' }}>
          <span>Webs · SEO · Tiendas · Agentes de IA · Software a medida</span>
          <span>emanahub.com</span>
        </div>
      </div>
    ),
    size,
  );
}
