import type { Metadata } from 'next';
import '@/styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import Motion from '@/components/Motion';
import ScrollProgress from '@/components/ScrollProgress';
import Cursor from '@/components/Cursor';
import { metadata as baseMetadata, viewport } from '@/lib/seo';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = baseMetadata;
export { viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <head>
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Nav />
        <Cursor />
        <SmoothScroll />
        <Motion />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
