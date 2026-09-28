/**
 * Logos de tecnologías (simple-icons). Se resuelven en build y viajan como SVG
 * inline: no suman JavaScript al navegador.
 *
 * Los nombres del stack son texto libre ("PostgreSQL (Neon)", "Groq / LLaMA"),
 * así que se busca por coincidencia parcial, en el orden de esta lista.
 */
import {
  siAstro,
  siClaude,
  siGithub,
  siGooglegemini,
  siHubspot,
  siJavascript,
  siMake,
  siN8n,
  siNeon,
  siNetlify,
  siPocketbase,
  siPostgresql,
  siPython,
  siReact,
  siSqlalchemy,
  siStreamlit,
  siSupabase,
  siTailwindcss,
  siTrello,
  siWhatsapp,
  type SimpleIcon,
} from 'simple-icons';

export type TechIcon = { path: string; color: string; title: string };

// simple-icons dejó de incluir el logo de LinkedIn; va a mano.
const siLinkedin = {
  title: 'LinkedIn',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
} as SimpleIcon;

const table: [needle: string, icon: SimpleIcon][] = [
  ['linkedin', siLinkedin],
  ['supabase', siSupabase],
  ['postgres', siPostgresql],
  ['neon', siNeon],
  ['pocketbase', siPocketbase],
  ['sqlalchemy', siSqlalchemy],
  ['javascript', siJavascript],
  ['react', siReact],
  ['astro', siAstro],
  ['tailwind', siTailwindcss],
  ['python', siPython],
  ['streamlit', siStreamlit],
  ['claude', siClaude],
  ['anthropic', siClaude],
  ['gemini', siGooglegemini],
  ['make', siMake],
  ['n8n', siN8n],
  ['netlify', siNetlify],
  ['hubspot', siHubspot],
  ['trello', siTrello],
  ['whatsapp', siWhatsapp],
  ['github', siGithub],
];

/** Luminancia relativa aproximada de un color hex, de 0 a 1. */
function luminance(hex: string): number {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function techIcon(name: string): TechIcon | null {
  const key = name.toLowerCase();
  const hit = table.find(([needle]) => key.includes(needle));
  if (!hit) return null;
  const icon = hit[1];
  // Los logos muy oscuros (GitHub, por ejemplo) no se verían sobre el fondo negro.
  const color = luminance(icon.hex) < 0.08 ? 'var(--color-text)' : `#${icon.hex}`;
  return { path: icon.path, color, title: icon.title };
}

/** Iniciales para las tecnologías sin logo: "Groq / LLaMA" → "GR". */
export function monogram(name: string): string {
  const clean = name.replace(/\(.*?\)/g, '').trim();
  const words = clean.split(/[\s/]+/).filter(Boolean);
  if (words.length > 1 && words[1]!.length > 2) return (words[0]![0]! + words[1]![0]!).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}
