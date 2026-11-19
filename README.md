# EMANA Hub — sitio web

Sitio de **EMANA**, estudio digital en Lima que diseña y construye **webs, SEO técnico, tiendas
virtuales, agentes de IA y software a medida**. Concepto: *de una página web a un negocio que se
opera solo* — un recorrido de cinco etapas que se cuenta con una nube de partículas 3D que cambia
de forma al hacer scroll.

## Stack

- **Next.js 15** (App Router, React 19) + TypeScript strict
- **CSS propio** con tokens (sin framework de utilidades): tipografía fluida, grid, dark theme
- **Three.js** para dos escenas WebGL (hero + recorrido), cargadas en diferido
- **Lenis + GSAP ScrollTrigger** para scroll suave y revelados
- **Zod** para validar el formulario de contacto
- Tipografías auto-alojadas: **Clash Display** + **Satoshi** (Fontshare, licencia libre para web)

## En vivo

- Producción: https://emana-hub.vercel.app (proyecto `champips-projects/emana-hub`)
- Repo: https://github.com/EMD-Emana/emana-hub-web (público: Vercel Hobby no enlaza repos privados de una org)
- Deploy automático con cada push a `main`.

## Scripts

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck
```

## Estructura

```
src/app                 rutas (home, servicios/[slug], legales, sitemap, robots, OG)
src/components          secciones + primitivas (Icon, Nav, Footer, HeroScene, JourneyScene…)
src/lib/content.ts      TODO el copy y los datos (servicios, casos, FAQ, proceso, stack)
src/lib/seo.ts          metadata + JSON-LD (Organization, WebSite, Service, FAQPage, Breadcrumb)
src/styles/globals.css  sistema visual completo
public/fonts            tipografías (woff2)
public/icons            iconos del stack
```

Para cambiar textos se edita `src/lib/content.ts`. Las rutas de servicio se generan solas desde
ese archivo (`generateStaticParams`).

## Contenido y datos por confirmar

- Dominio canónico: `https://emanahub.com` (DNS en GoDaddy; verificar antes de publicar).
- Correo de contacto: `hola@emanahub.com` — **crear el buzón antes de lanzar**.
- Estados de casos tomados de los documentos de Emana (Inspira en uso, SNP publicado, Sonrisas en
  producción, EMANA Beauty en desarrollo). No hay testimonios, cifras de clientes ni logos de
  terceros inventados.
- El formulario **no envía correo** sin `RESEND_API_KEY`; en ese caso la API responde 503 y la UI
  ofrece el correo directo. No simula envíos.

## Variables de entorno

```bash
RESEND_API_KEY=re_...            # opcional, para el formulario
CONTACT_TO=hola@emanahub.com
CONTACT_FROM="EMANA <web@emanahub.com>"
```

## Accesibilidad y rendimiento

- `prefers-reduced-motion`: desactiva partículas animadas, marquesina y transiciones.
- Escenas 3D con `IntersectionObserver` + pausa al ocultar la pestaña; se liberan al desmontar.
- Foco visible, contraste AA, HTML semántico, `details/summary` nativo en FAQ.
- Todo el contenido es legible sin JavaScript y sin WebGL.
