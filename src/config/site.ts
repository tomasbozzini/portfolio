/**
 * Datos del sitio que no dependen del idioma: nombre, contacto, categorías, stack.
 * Los textos (en español y en inglés) viven en src/i18n/ui.ts.
 */

export const site = {
  name: 'Tomás Bozzini',
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

/* --------------------------------------------------------------------------
   Categorías de proyecto. El orden es el del filtro en la home.
   Para sumar una: agregarla acá y su nombre en inglés en src/i18n/ui.ts.
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
   Stack, agrupado por área. Los nombres y descripciones de cada área, en ui.ts (mismo orden).
   -------------------------------------------------------------------------- */
export const stackGroups = [
  {
    icon: 'frontend',
    items: ['JavaScript', 'React', 'Astro', 'Tailwind CSS'],
  },
  {
    icon: 'backend',
    items: ['Python', 'PostgreSQL', 'Supabase', 'Neon', 'PocketBase'],
  },
  {
    icon: 'ai',
    items: ['Claude (Anthropic)', 'Groq', 'Gemini', 'Make', 'n8n'],
  },
] as const;
