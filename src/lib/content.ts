export const site = {
  name: 'EMANA',
  legalName: 'EMANA — Estudio digital',
  domain: 'emanahub.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emanahub.com',
  email: 'hola@emanahub.com',
  city: 'Lima, Perú',
  locale: 'es_PE',
  description:
    'Estudio digital en Lima, Perú. Diseñamos webs, tiendas virtuales, SEO, agentes de IA y software a medida que trabajan como un solo sistema.',
  tagline: 'Estudio digital · Lima, Perú',
} as const;

export type ServiceIcon = 'web' | 'seo' | 'store' | 'agent' | 'system';

export interface Service {
  slug: string;
  index: string;
  icon: ServiceIcon;
  title: string;
  short: string;
  lead: string;
  bullets: string[];
  deliverables: string[];
  outcome: string;
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'desarrollo-web',
    index: '01',
    icon: 'web',
    title: 'Desarrollo web',
    short: 'Landing pages y sitios corporativos que cargan rápido y convierten.',
    lead:
      'Una web no es un folleto: es tu mejor vendedor. Diseñamos y programamos sitios que explican en segundos qué haces, generan confianza y convierten visitas en conversaciones.',
    bullets: [
      'Diseño a medida, sin plantillas recicladas',
      'Next.js y Core Web Vitals medidos, no prometidos',
      'Formularios, WhatsApp y analítica conectados',
      'Contenido editable sin tocar código',
    ],
    deliverables: [
      'Prototipo navegable antes de programar',
      'Sitio publicado, con dominio y certificados',
      'Panel para editar textos e imágenes',
      'Capacitación grabada para tu equipo',
    ],
    outcome: 'Una web que se ve como tu negocio y trabaja como tu mejor vendedor.',
    faq: [
      {
        q: '¿Puedo editar la web sin saber programar?',
        a: 'Sí. Dejamos un panel donde tu equipo cambia textos, imágenes y productos. Al cierre te entregamos los accesos y una capacitación grabada.',
      },
      {
        q: '¿La web queda a mi nombre?',
        a: 'Siempre. El dominio, el hosting y las cuentas del proyecto quedan a nombre de tu organización. Nosotros solo administramos mientras trabajamos juntos.',
      },
    ],
  },
  {
    slug: 'seo',
    index: '02',
    icon: 'seo',
    title: 'SEO técnico y contenido',
    short: 'Para que te encuentren quienes ya están buscando lo que ofreces.',
    lead:
      'El SEO no es magia ni una lista de palabras clave: es hacer que Google entienda tu sitio y que tus textos respondan a lo que tu cliente realmente escribe.',
    bullets: [
      'Auditoría técnica: velocidad, indexación, datos estructurados',
      'Contenido escrito por intención de búsqueda',
      'Perfil de Empresa en Google y SEO local',
      'Reporte mensual con Search Console y Analytics',
    ],
    deliverables: [
      'Auditoría con prioridades ordenadas por impacto',
      'Correcciones técnicas aplicadas',
      'Calendario de contenidos y artículos publicados',
      'Panel de métricas para ver el avance',
    ],
    outcome: 'Más visibilidad orgánica y mejores prospectos, con datos para demostrarlo.',
    faq: [
      {
        q: '¿Garantizan el primer lugar en Google?',
        a: 'Nadie serio puede garantizarlo. Lo que sí hacemos es medir: posiciones, clics, impresiones y consultas generadas. Si el avance se estanca, cambiamos la estrategia.',
      },
      {
        q: '¿Cuánto tarda en verse el resultado?',
        a: 'Las correcciones técnicas se notan en semanas. El contenido y la autoridad tardan entre tres y seis meses. Lo decimos desde la primera reunión para que nadie espere milagros.',
      },
    ],
  },
  {
    slug: 'tiendas-virtuales',
    index: '03',
    icon: 'store',
    title: 'Tiendas virtuales',
    short: 'Catálogo, pagos y envíos listos para vender desde el primer día.',
    lead:
      'Una tienda que pierde un pedido por un checkout confuso cuesta más que la tienda entera. Construimos ecommerce rápidos, claros y conectados con tu operación.',
    bullets: [
      'Catálogo administrable con variantes y stock',
      'Pasarela de pagos y checkout sin fricción',
      'Envíos, retiros y seguimiento de pedidos',
      'Libro de Reclamaciones virtual incluido',
    ],
    deliverables: [
      'Tienda publicada con catálogo cargado',
      'Pagos y envíos probados con pedidos reales',
      'Panel de pedidos y reportes de venta',
      'Manual de operación para tu equipo',
    ],
    outcome: 'Una tienda que vende sin que tengas que estar mirando el celular.',
    faq: [
      {
        q: '¿Trabajan con Mercado Pago o pasarelas locales?',
        a: 'Integramos la pasarela que mejor se adapte a tu volumen y a tu tipo de negocio: Mercado Pago, Culqi, Niubiz o Stripe. Comparamos comisiones contigo antes de decidir.',
      },
      {
        q: '¿Necesito el Libro de Reclamaciones?',
        a: 'Si vendes en Perú, sí: es obligatorio para el comercio electrónico. Lo incluimos desde el inicio, no como un extra al final.',
      },
    ],
  },
  {
    slug: 'agentes-ia',
    index: '04',
    icon: 'agent',
    title: 'Agentes de IA',
    short: 'Asistentes que responden, califican y agendan mientras tu equipo duerme.',
    lead:
      'El 60 % de los mensajes llega fuera de horario. Un agente entrenado con la información de tu negocio contesta en segundos, califica al prospecto y agenda en tu calendario.',
    bullets: [
      'Entrenado con tus documentos, precios y catálogo',
      'WhatsApp, web y canales internos',
      'Calificación de prospectos y derivación a una persona',
      'Agenda conectada a tu calendario real',
    ],
    deliverables: [
      'Agente configurado y probado con casos reales',
      'Base de conocimiento editable por tu equipo',
      'Panel de conversaciones y métricas',
      'Reglas de escalamiento a humano',
    ],
    outcome: 'Ningún mensaje sin responder, ningún prospecto olvidado.',
    faq: [
      {
        q: '¿El agente puede equivocarse?',
        a: 'Sí, como cualquier asistente. Por eso lo limitamos a la información de tu negocio, definimos qué no puede responder y configuramos derivación a una persona cuando la conversación lo amerita.',
      },
      {
        q: '¿Puedo seguir escribiendo yo?',
        a: 'Claro. Puedes tomar la conversación en cualquier momento desde el panel. El agente se retira y tú continúas con todo el historial a la vista.',
      },
    ],
  },
  {
    slug: 'software-a-medida',
    index: '05',
    icon: 'system',
    title: 'Software a medida',
    short: 'Paneles, integraciones y automatizaciones que ordenan la operación.',
    lead:
      'Cuando el negocio crece, las hojas de cálculo dejan de alcanzar. Construimos el sistema que tu operación ya necesita: con roles, permisos, datos y automatizaciones.',
    bullets: [
      'Paneles por rol y permisos granulares',
      'Integraciones con tus herramientas actuales',
      'Automatizaciones con trazabilidad y auditoría',
      'Arquitectura pensada para crecer',
    ],
    deliverables: [
      'Mapa de procesos y alcance firmado',
      'Aplicación desplegada y migrada',
      'Documentación técnica y funcional',
      'Soporte y mejoras posteriores al lanzamiento',
    ],
    outcome: 'Menos trabajo repetitivo, más decisiones con datos a la vista.',
    faq: [
      {
        q: '¿Reemplazan las herramientas que ya uso?',
        a: 'No necesariamente. Casi siempre conviene integrar lo que ya funciona (CRM, ERP, correo) y construir solo lo que es propio de tu operación.',
      },
      {
        q: '¿Cuánto cuesta un sistema a medida?',
        a: 'Depende del alcance. Trabajamos por fases: primero resolvemos el proceso más caro de operar y medimos el ahorro antes de ampliar. La propuesta incluye alcance, entregables y cronograma por escrito.',
      },
    ],
  },
];

export interface Stage {
  id: string;
  label: string;
  title: string;
  service: string;
  slug: string;
  copy: string;
  proof: string;
  shape: 'portal' | 'sphere' | 'cube' | 'torus' | 'helix';
}

export const stages: Stage[] = [
  {
    id: 'presencia',
    label: 'Presencia',
    title: 'Una página que explica todo',
    service: 'Desarrollo web',
    slug: 'desarrollo-web',
    copy:
      'El negocio existe, pero en internet no. Empezamos con un sitio que dice qué haces, para quién y cómo contactarte. Rápido, claro y medible.',
    proof: 'Landing en 5 días · Core Web Vitals en verde',
    shape: 'portal',
  },
  {
    id: 'visibilidad',
    label: 'Visibilidad',
    title: 'Aparecer cuando te buscan',
    service: 'SEO',
    slug: 'seo',
    copy:
      'La página ya está en línea. Ahora necesita que Google la entienda y que tus textos hablen del problema que resuelves, no solo de tu marca.',
    proof: 'Auditoría técnica · contenido por intención',
    shape: 'sphere',
  },
  {
    id: 'venta',
    label: 'Venta',
    title: 'Una tienda que cierra sola',
    service: 'Tiendas virtuales',
    slug: 'tiendas-virtuales',
    copy:
      'El catálogo entra, el pago se procesa y el pedido llega a tu equipo. Sin capturas por WhatsApp ni inventarios paralelos en Excel.',
    proof: 'Pagos, envíos y Libro de Reclamaciones',
    shape: 'cube',
  },
  {
    id: 'atencion',
    label: 'Atención',
    title: 'Alguien que responde siempre',
    service: 'Agentes de IA',
    slug: 'agentes-ia',
    copy:
      'Son las once de la noche y alguien pregunta por precios. El agente responde con tu información, califica y agenda. Tu equipo lo ve listo por la mañana.',
    proof: 'Respuesta en segundos · agenda real',
    shape: 'torus',
  },
  {
    id: 'operacion',
    label: 'Operación',
    title: 'El sistema que lo sostiene',
    service: 'Software a medida',
    slug: 'software-a-medida',
    copy:
      'Ventas, atención y operación comparten los mismos datos. El negocio ya no depende de la memoria de una persona: depende de un sistema.',
    proof: 'Roles, permisos y automatizaciones',
    shape: 'helix',
  },
];

export type CaseTone = 'blue' | 'green' | 'coral' | 'gold';

export interface Case {
  name: string;
  sector: string;
  service: string;
  status: string;
  copy: string;
  tone: CaseTone;
  preview: 'dashboard' | 'editorial' | 'playful' | 'shop';
  url?: string;
}

export const cases: Case[] = [
  {
    name: 'Inspira Salud Ocupacional',
    sector: 'Salud ocupacional',
    service: 'Software a medida',
    status: 'En uso',
    copy:
      'Plataforma con roles para exámenes médicos ocupacionales, asistencia, roster, boletas y solicitudes. Acceso privado para el equipo.',
    tone: 'blue',
    preview: 'dashboard',
  },
  {
    name: 'SNP Arbitraje',
    sector: 'Formación legal',
    service: 'Web + aula virtual',
    status: 'Publicado',
    copy:
      'Sitio institucional, aula virtual y audiencias en línea para una escuela de arbitraje con alumnos en varios países.',
    tone: 'gold',
    preview: 'editorial',
  },
  {
    name: 'Sonrisas de Colores',
    sector: 'Educación',
    service: 'Web + juego interactivo',
    status: 'En producción',
    copy:
      'Sitio de la Asociación Capitán Muelitas con un juego de cartas para aprender hábitos de salud bucal jugando.',
    tone: 'coral',
    preview: 'playful',
  },
  {
    name: 'EMANA Beauty',
    sector: 'Perfumería y belleza',
    service: 'Tienda virtual',
    status: 'En desarrollo',
    copy:
      'Ecommerce de perfumes con venta al por mayor, catálogo por marcas y una experiencia de compra pensada para móvil.',
    tone: 'green',
    preview: 'shop',
  },
];

export const processSteps = [
  {
    n: '01',
    title: 'Diagnóstico',
    copy:
      'Entendemos el negocio, no solo el brief. Revisamos procesos, datos y objetivos en una sesión de 45 minutos.',
    detail: 'Mapa de procesos · objetivos · métricas de partida',
  },
  {
    n: '02',
    title: 'Diseño',
    copy:
      'Prototipo navegable antes de programar. Ves y usas lo que se va a construir, con contenido real de tu negocio.',
    detail: 'Wireframes · UI · prototipo interactivo',
  },
  {
    n: '03',
    title: 'Construcción',
    copy:
      'Sprints de dos semanas con demo al final de cada uno. Rendimiento, accesibilidad y SEO desde la primera línea.',
    detail: 'Código propio · pruebas · revisión conjunta',
  },
  {
    n: '04',
    title: 'Lanzamiento',
    copy:
      'Deploy, dominio, analítica y capacitación. Después medimos, iteramos y mejoramos con datos reales.',
    detail: 'Publicación · capacitación · soporte',
  },
];

export const faqs = [
  {
    q: '¿Cuánto cuesta una página web en Perú?',
    a: 'Depende del alcance: no cuesta lo mismo una landing de una sección que un sitio corporativo con blog e integraciones. Después de la primera reunión enviamos una propuesta por escrito con alcance, entregables e inversión. La cotización no tiene costo.',
  },
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Una landing suele estar lista en una a dos semanas; un sitio corporativo, en tres a cinco; una tienda con pasarela de pagos, entre cuatro y seis. En la propuesta queda un cronograma con hitos y fechas.',
  },
  {
    q: '¿Quién es dueño del código y de las cuentas?',
    a: 'Tú. El dominio, el hosting, el repositorio y las cuentas quedan a nombre de tu organización. Al cierre del proyecto te entregamos todos los accesos y la documentación.',
  },
  {
    q: '¿El agente de IA puede agendar citas y derivar a una persona?',
    a: 'Sí. Si lo conectamos al calendario que ya usa tu equipo, ofrece horarios disponibles y deja la cita registrada. También sabe cuándo pasar la conversación a una persona: porque el cliente lo pide o porque la consulta lo amerita.',
  },
  {
    q: '¿Por qué mi negocio no aparece en Google?',
    a: 'Las causas más comunes son falta de indexación, ausencia de Perfil de Empresa, un sitio lento o textos que no responden a lo que la gente busca. Lo revisamos con Search Console y Analytics y proponemos qué corregir primero.',
  },
  {
    q: '¿Trabajan con negocios fuera de Perú?',
    a: 'Sí. Trabajamos con equipos de toda Latinoamérica de forma remota. Las reuniones se agendan en horario de Lima y todo el avance queda documentado.',
  },
];

export const techStack = [
  'nextjs',
  'react',
  'typescript',
  'tailwindcss',
  'threejs',
  'gsap',
  'nodejs',
  'nestjs',
  'express',
  'mysql',
  'drizzle-orm',
  'vercel',
  'figma',
  'git',
];

export const stats = [
  { value: '5', label: 'disciplinas, un solo equipo' },
  { value: '24/7', label: 'agentes que atienden sin horario' },
  { value: '90+', label: 'Core Web Vitals como objetivo' },
  { value: '100%', label: 'código y cuentas a tu nombre' },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
