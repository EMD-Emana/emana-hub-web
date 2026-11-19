import type { SVGProps } from 'react';
import { lemniscatePath } from '@/lib/lemniscate';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export function IconWeb(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.5h19M6 6.2h.01M8.6 6.2h.01M11.2 6.2h.01" />
    </svg>
  );
}

export function IconSeo(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21M7.8 11.6l2 2 3.6-4.2" />
    </svg>
  );
}

export function IconStore(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M3.5 9.5 5.2 4.5h13.6l1.7 5" />
      <path d="M4.5 9.5v10h15v-10" />
      <path d="M3.5 9.5a2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 1.4.3" />
      <path d="M9 19.5v-5h6v5" />
    </svg>
  );
}

export function IconAgent(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="7" width="16" height="12" rx="4" />
      <path d="M12 3v4M8.5 12.5h.01M15.5 12.5h.01M9 16h6" />
      <path d="M1.5 12v3M22.5 12v3" />
    </svg>
  );
}

export function IconSystem(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <path d="M17.5 14v7M14 17.5h7" />
    </svg>
  );
}

export function IconArrowUpRight(p: P) {
  return (
    <svg {...base} width="14" height="14" {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconArrowRight(p: P) {
  return (
    <svg {...base} width="15" height="15" {...p}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(p: P) {
  return (
    <svg {...base} width="16" height="16" {...p}>
      <path d="M20 6.5 9.5 17 4 11.5" />
    </svg>
  );
}

export function IconMail(p: P) {
  return (
    <svg {...base} width="18" height="18" {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconWhatsapp(p: P) {
  return (
    <svg {...base} width="18" height="18" {...p}>
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="M9 8.5c-.5 0-.9.4-1 .9-.2 1 .2 2.2 1.4 3.4 1.2 1.2 2.4 1.6 3.4 1.4.5-.1.9-.5.9-1v-.9l-1.7-.7-.8.8a5 5 0 0 1-2.1-2.1l.8-.8L9.7 8H9Z" />
    </svg>
  );
}

export function IconClock(p: P) {
  return (
    <svg {...base} width="18" height="18" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconPin(p: P) {
  return (
    <svg {...base} width="18" height="18" {...p}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconSpark(p: P) {
  return (
    <svg {...base} width="18" height="18" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

export function IconShield(p: P) {
  return (
    <svg {...base} width="18" height="18" {...p}>
      <path d="M12 21c4.5-2 7-5.6 7-10V5.5L12 3 5 5.5V11c0 4.4 2.5 8 7 10Z" />
      <path d="m9 11.5 2 2 4-4" />
    </svg>
  );
}

export const serviceIcons = {
  web: IconWeb,
  seo: IconSeo,
  store: IconStore,
  agent: IconAgent,
  system: IconSystem,
} as const;

const MARK_OUTER = lemniscatePath({ cx: 32, cy: 16, a: 26, yScale: 1.5, steps: 140 });
const MARK_INNER = lemniscatePath({ cx: 32, cy: 16, a: 23.9, yScale: 1.36, steps: 140 });

/** Isotipo: un único lazo continuo (lemniscata de Bernoulli) con degradado de marca. */
export function EmanaMark({
  gradientId = 'emana-mark',
  className,
}: {
  gradientId?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="6" y1="16" x2="58" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8FB4FF" />
          <stop offset=".45" stopColor="#2E6BFF" />
          <stop offset="1" stopColor="#22E0FF" />
        </linearGradient>
      </defs>
      <path
        d={MARK_OUTER}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={MARK_INNER}
        fill="none"
        stroke="#EAF4FF"
        strokeOpacity="0.28"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Lockup horizontal: isotipo + palabra. */
export function EmanaLogo({
  gradientId = 'emana-logo',
  className,
}: {
  gradientId?: string;
  className?: string;
}) {
  return (
    <span className={`brand-lockup${className ? ` ${className}` : ''}`}>
      <EmanaMark gradientId={gradientId} />
      <span className="brand-lockup__word">EMANA</span>
    </span>
  );
}
