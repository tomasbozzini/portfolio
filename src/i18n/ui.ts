/**
 * Todos los textos del sitio, en español y en inglés.
 * Los datos que no se traducen (nombre, contacto, stack) siguen en src/config/site.ts.
 * Los proyectos se traducen en src/content/proyectos-en/.
 */
import type { Category } from '../config/site';

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Idioma a partir de Astro.currentLocale. */
export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

/** Antepone /en a una ruta interna cuando hace falta. `path` empieza con "/". */
export function localePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  if (path === '/') return '/en';
  if (path.startsWith('/#')) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** La misma página en el otro idioma. Recibe el pathname actual. */
export function switchLangPath(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localePath(to, bare);
}

export const cv = {
  es: { label: 'Español', href: '/cv/CV-Tomas-Bozzini-ES.pdf' },
  en: { label: 'English', href: '/cv/CV-Tomas-Bozzini-EN.pdf' },
} as const;

type Service = { title: string; description: string; message: string };
type StackGroup = { area: string; description: string };

type Dict = {
  htmlLang: string;
  ogLocale: string;
  role: string;
  description: string;
  generalMessage: string;
  nav: { label: string; href: string }[];
  header: {
    home: string;
    sections: string;
    newTab: string;
    contact: string;
    cv: string;
    cvMenu: string;
    language: string;
  };
  skip: string;
  loader: string;
  hero: { available: string; seeProjects: string; contact: string };
  sections: {
    featured: [string, string];
    all: [string, string];
    services: [string, string, string];
    about: [string, string];
    stack: [string, string, string];
    contact: [string, string, string];
  };
  categories: Record<Category, string>;
  grid: {
    all: string;
    filterLabel: string;
    one: string;
    many: string;
    inCategory: string;
    empty: string;
    screenshot: string;
  };
  services: Service[];
  askMe: string;
  about: { paragraphs: string[]; facts: { label: string; value: string }[] };
  stack: StackGroup[];
  project: {
    back: string;
    stack: string;
    links: string;
    demo: string;
    repo: string;
    gallery: string;
    noGallery: string;
    others: string;
    prev: string;
    next: string;
    /** Aviso cuando el proyecto todavía no tiene traducción. */
    untranslated?: string;
  };
  notFound: { title: string; description: string; heading: string; body: string; home: string; projects: string };
};

export const ui: Record<Lang, Dict> = {
  es: {
    htmlLang: 'es-AR',
    ogLocale: 'es_AR',
    role: 'Estudiante avanzado de Ingeniería en Sistemas · Desarrollo de software a medida, web e IA aplicada',
    description:
      'Portfolio de Tomás Bozzini, estudiante de último año de Ingeniería en Sistemas en la UNICEN (Tandil). Sistemas de gestión, webs a medida y automatización con IA.',
    generalMessage: 'Hola Tomás, te escribo desde tu portfolio. Quería hacerte una consulta.',
    nav: [
      { label: 'Proyectos', href: '/#proyectos' },
      { label: 'Servicios', href: '/#servicios' },
      { label: 'Sobre mí', href: '/#sobre-mi' },
      { label: 'Contacto', href: '/#contacto' },
    ],
    header: {
      home: 'inicio',
      sections: 'Secciones',
      newTab: 'se abre en otra pestaña',
      contact: 'Escribime',
      cv: 'Ver CV',
      cvMenu: 'Elegí el idioma del CV',
      language: 'Idioma',
    },
    skip: 'Ir al contenido',
    loader: 'Iniciando sistema',
    hero: { available: 'Disponible para proyectos', seeProjects: 'Ver proyectos', contact: 'Contactame' },
    sections: {
      featured: ['01 / Trabajo', 'Proyectos destacados'],
      all: ['02 / Archivo', 'Todos los proyectos'],
      services: [
        '03 / Servicios',
        'Servicios',
        'Tres formas de trabajar juntos. Contame qué necesitás y te digo cómo lo resolvería.',
      ],
      about: ['04 / Perfil', 'Sobre mí'],
      stack: ['05 / Tecnologías', 'Stack', 'Las herramientas con las que construyo, separadas por capa.'],
      contact: ['06 / Hablemos', 'Contacto', 'Escribime por donde te quede más cómodo.'],
    },
    categories: {
      Sistemas: 'Sistemas',
      'IA y automatización': 'IA y automatización',
      'Webs a medida': 'Webs a medida',
      Ingeniería: 'Ingeniería',
      Personales: 'Personales',
    },
    grid: {
      all: 'Todos',
      filterLabel: 'Filtrar proyectos por categoría',
      one: 'proyecto',
      many: 'proyectos',
      inCategory: 'en',
      empty:
        'Todavía no hay nada publicado en esta categoría. Probá con otra o escribime si querés saber en qué estoy trabajando.',
      screenshot: 'Captura del proyecto',
    },
    services: [
      {
        title: 'Webs a medida',
        description:
          'Landing pages, catálogos y sitios institucionales para negocios, con botón de WhatsApp y diseño propio.',
        message: 'Hola Tomás, te escribo desde tu portfolio. Me interesa una web a medida para mi negocio.',
      },
      {
        title: 'Sistemas de gestión a medida',
        description:
          'Aplicaciones web o de escritorio para digitalizar procesos: reservas, cuotas, legajos, stock.',
        message: 'Hola Tomás, te escribo desde tu portfolio. Necesito un sistema de gestión a medida.',
      },
      {
        title: 'Automatización e IA',
        description: 'Bots de WhatsApp, flujos automáticos y análisis de documentos con modelos de lenguaje.',
        message: 'Hola Tomás, te escribo desde tu portfolio. Quiero automatizar un proceso con IA.',
      },
    ],
    askMe: 'Consultame',
    about: {
      paragraphs: [
        'Estoy terminando Ingeniería en Sistemas en la UNICEN, en Tandil. Construyo sistemas completos de punta a punta: la interfaz web, los datos y la integración con IA. Trabajo tanto en proyectos propios como para clientes, y me interesa especialmente resolver problemas concretos de un negocio con la tecnología justa.',
        'Busco un part-time remoto o híbrido y proyectos freelance. Tengo certificaciones de inglés de Cambridge.',
      ],
      facts: [
        { label: 'Carrera', value: 'Ing. en Sistemas · UNICEN' },
        { label: 'Base', value: 'Tandil, Buenos Aires' },
        { label: 'Busco', value: 'Part-time remoto/híbrido y freelance' },
        { label: 'Inglés', value: 'Certificaciones de Cambridge' },
      ],
    },
    stack: [
      { area: 'Frontend', description: 'Interfaces rápidas, accesibles y con diseño propio.' },
      { area: 'Backend y datos', description: 'Lógica, bases de datos y APIs que sostienen el sistema.' },
      { area: 'IA y automatización', description: 'Modelos de lenguaje y flujos que trabajan solos.' },
    ],
    project: {
      back: 'Volver a proyectos',
      stack: 'Stack',
      links: 'Enlaces',
      demo: 'Ver el sitio',
      repo: 'Ver el código',
      gallery: 'Capturas',
      noGallery: 'Todavía no cargué capturas de este proyecto.',
      others: 'Otros proyectos',
      prev: 'Proyecto anterior',
      next: 'Proyecto siguiente',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'Esta dirección no existe en el sitio.',
      heading: 'Esta página no existe',
      body: 'Puede que el enlace esté viejo o que haya cambiado el nombre del proyecto.',
      home: 'Ir al inicio',
      projects: 'Ver los proyectos',
    },
  },

  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    role: 'Final-year Systems Engineering student · Custom software, web development and applied AI',
    description:
      'Portfolio of Tomás Bozzini, final-year Systems Engineering student at UNICEN (Tandil, Argentina). Management systems, custom websites and AI automation.',
    generalMessage: "Hi Tomás, I'm writing from your portfolio. I have a question.",
    nav: [
      { label: 'Projects', href: '/#proyectos' },
      { label: 'Services', href: '/#servicios' },
      { label: 'About', href: '/#sobre-mi' },
      { label: 'Contact', href: '/#contacto' },
    ],
    header: {
      home: 'home',
      sections: 'Sections',
      newTab: 'opens in a new tab',
      contact: 'Message me',
      cv: 'View CV',
      cvMenu: 'Choose the CV language',
      language: 'Language',
    },
    skip: 'Skip to content',
    loader: 'Booting system',
    hero: { available: 'Available for projects', seeProjects: 'See projects', contact: 'Get in touch' },
    sections: {
      featured: ['01 / Work', 'Featured projects'],
      all: ['02 / Archive', 'All projects'],
      services: [
        '03 / Services',
        'Services',
        "Three ways to work together. Tell me what you need and I'll tell you how I'd solve it.",
      ],
      about: ['04 / Profile', 'About me'],
      stack: ['05 / Technologies', 'Stack', 'The tools I build with, grouped by layer.'],
      contact: ['06 / Let’s talk', 'Contact', 'Reach me wherever is easiest for you.'],
    },
    categories: {
      Sistemas: 'Systems',
      'IA y automatización': 'AI & automation',
      'Webs a medida': 'Custom websites',
      Ingeniería: 'Engineering',
      Personales: 'Personal',
    },
    grid: {
      all: 'All',
      filterLabel: 'Filter projects by category',
      one: 'project',
      many: 'projects',
      inCategory: 'in',
      empty:
        "Nothing published in this category yet. Try another one, or message me if you'd like to know what I'm working on.",
      screenshot: 'Screenshot of',
    },
    services: [
      {
        title: 'Custom websites',
        description:
          'Landing pages, catalogs and company sites for businesses, with a WhatsApp button and an original design.',
        message: "Hi Tomás, I'm writing from your portfolio. I'm interested in a custom website for my business.",
      },
      {
        title: 'Custom management systems',
        description:
          'Web or desktop apps that digitize processes: bookings, membership fees, records, inventory.',
        message: "Hi Tomás, I'm writing from your portfolio. I need a custom management system.",
      },
      {
        title: 'Automation & AI',
        description: 'WhatsApp bots, automated workflows and document analysis with language models.',
        message: "Hi Tomás, I'm writing from your portfolio. I'd like to automate a process with AI.",
      },
    ],
    askMe: 'Ask me',
    about: {
      paragraphs: [
        "I'm finishing my Systems Engineering degree at UNICEN, in Tandil, Argentina. I build complete systems end to end: the web interface, the data and the AI integration. I work on my own projects as well as for clients, and I especially enjoy solving a business's concrete problems with just the right technology.",
        "I'm looking for a remote or hybrid part-time role and freelance projects. I hold Cambridge English certifications.",
      ],
      facts: [
        { label: 'Degree', value: 'Systems Engineering · UNICEN' },
        { label: 'Based in', value: 'Tandil, Buenos Aires, Argentina' },
        { label: 'Looking for', value: 'Remote/hybrid part-time & freelance' },
        { label: 'English', value: 'Cambridge certifications' },
      ],
    },
    stack: [
      { area: 'Frontend', description: 'Fast, accessible interfaces with an original design.' },
      { area: 'Backend & data', description: 'The logic, databases and APIs that hold the system up.' },
      { area: 'AI & automation', description: 'Language models and workflows that run on their own.' },
    ],
    project: {
      back: 'Back to projects',
      stack: 'Stack',
      links: 'Links',
      demo: 'Visit the site',
      repo: 'View the code',
      gallery: 'Screenshots',
      noGallery: "I haven't uploaded screenshots of this project yet.",
      others: 'Other projects',
      prev: 'Previous project',
      next: 'Next project',
      untranslated: 'This project description is only available in Spanish for now.',
    },
    notFound: {
      title: 'Page not found',
      description: "This address doesn't exist on the site.",
      heading: "This page doesn't exist",
      body: 'The link may be outdated, or the project may have been renamed.',
      home: 'Go home',
      projects: 'See the projects',
    },
  },
};
