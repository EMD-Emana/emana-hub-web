import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Journey from '@/components/Journey';
import Cases from '@/components/Cases';
import AgentDemo from '@/components/AgentDemo';
import Process from '@/components/Process';
import Tech from '@/components/Tech';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import { faqs, site } from '@/lib/content';
import { faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'EMANA — Webs, SEO, tiendas virtuales y agentes de IA',
  description: site.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div className="page-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Journey />
      <Cases />
      <AgentDemo />
      <Process />
      <Tech />
      <Faq />
      <Contact />
    </div>
  );
}
