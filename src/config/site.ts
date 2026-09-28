/**
 * Único lugar donde viven los datos del sitio.
 * Si cambia un contacto, un servicio o un texto fijo, se cambia acá.
 */

export const site = {
  name: 'Tomás Bozzini',
  role: 'Estudiante avanzado de Ingeniería en Sistemas · Desarrollo de software a medida, web e IA aplicada',
  /** Se usa en <title> y en las metas sociales. */
  tagline: 'Construyo sistemas completos: web, datos e integración con IA.',
  description:
    'Portfolio de Tomás Bozzini, estudiante de último año de Ingeniería en Sistemas en la UNICEN (Tandil). Sistemas de gestión, webs a medida y automatización con IA.',
  locale: 'es-AR',
  location: 'Tandil, Buenos Aires, Argentina',
} as const;

export const contact: {
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  github: string;
  linkedin: string;
} = {
  email: 'tomasbozzini76@gmail.com',
  /** Solo dígitos, formato internacional, como lo pide wa.me. */
  whatsapp: '5491133907596',
  whatsappDisplay: '+54 11 3390-7596',
  github: 'https://github.com/tomasbozzini',
  /** Vacío = no se muestra el enlace. */
  linkedin: 'https://www.linkedin.com/in/tomas-pablo-bozzini-0a8182299/',
};

/** Arma un link de WhatsApp con un mensaje ya escrito. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mailtoLink = `mailto:${contact.email}`;

export const nav = [
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

/* --------------------------------------------------------------------------
   Categorías de proyecto. El orden es el del filtro en la home.
   Agregar una acá y en el enum de src/content.config.ts.
   -------------------------------------------------------------------------- */
export const categories = [
  'Sistemas',
  'IA y automatización',
  'Webs a medida',
  'Ingeniería',
  'Personales',
] as const;

export type Category = (typeof categories)[number];

/* --------------------------------------------------------------------------
   Servicios
   -------------------------------------------------------------------------- */
export const services = [
  {
    title: 'Webs a medida',
    description:
      'Landing pages, catálogos y sitios institucionales para negocios, con botón de WhatsApp y diseño propio.',
    message:
      'Hola Tomás, te escribo desde tu portfolio. Me interesa una web a medida para mi negocio.',
  },
  {
    title: 'Sistemas de gestión a medida',
    description:
      'Aplicaciones web o de escritorio para digitalizar procesos: reservas, cuotas, legajos, stock.',
    message:
      'Hola Tomás, te escribo desde tu portfolio. Necesito un sistema de gestión a medida.',
  },
  {
    title: 'Automatización e IA',
    description:
      'Bots de WhatsApp, flujos automáticos y análisis de documentos con modelos de lenguaje.',
    message:
      'Hola Tomás, te escribo desde tu portfolio. Quiero automatizar un proceso con IA.',
  },
] as const;

/** Mensaje del botón general de contacto. */
export const generalMessage =
  'Hola Tomás, te escribo desde tu portfolio. Quería hacerte una consulta.';

/* --------------------------------------------------------------------------
   Stack, agrupado por área
   -------------------------------------------------------------------------- */
export const stackGroups = [
  {
    area: 'Frontend',
    icon: 'frontend',
    description: 'Interfaces rápidas, accesibles y con diseño propio.',
    items: ['JavaScript', 'React', 'Astro', 'Tailwind CSS'],
  },
  {
    area: 'Backend y datos',
    icon: 'backend',
    description: 'Lógica, bases de datos y APIs que sostienen el sistema.',
    items: ['Python', 'PostgreSQL', 'Supabase', 'Neon', 'PocketBase'],
  },
  {
    area: 'IA y automatización',
    icon: 'ai',
    description: 'Modelos de lenguaje y flujos que trabajan solos.',
    items: ['Claude (Anthropic)', 'Groq', 'Gemini', 'Make', 'n8n'],
  },
] as const;
