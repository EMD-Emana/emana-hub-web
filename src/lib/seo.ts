import type { Metadata, Viewport } from 'next';
import { site } from './content';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'EMANA — Webs, SEO, tiendas virtuales y agentes de IA',
    template: '%s · EMANA',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: 'EMANA', url: site.url }],
  creator: 'EMANA',
  publisher: 'EMANA',
  keywords: [
    'desarrollo web Perú',
    'agencia web Lima',
    'tiendas virtuales',
    'agentes de IA WhatsApp',
    'SEO técnico',
    'software a medida',
    'automatización de procesos',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: 'EMANA — El sistema digital que hace crecer tu negocio',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMANA — Webs, SEO, tiendas virtuales y agentes de IA',
    description: site.description,
  },
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/brand/favicon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#05070D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    logo: `${site.url}/brand/brand-logo.png`,
    image: `${site.url}/opengraph-image`,
    areaServed: ['PE', 'LATAM'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    knowsAbout: [
      'Desarrollo web',
      'Optimización SEO',
      'Tiendas virtuales',
      'Agentes de inteligencia artificial',
      'Software a medida',
    ],
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: 'es-PE',
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.url}/servicios/${slug}`,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: ['PE', 'LATAM'],
    serviceType: name,
  };
}
