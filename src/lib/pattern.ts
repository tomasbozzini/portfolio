/**
 * Portadas generadas.
 *
 * Mientras un proyecto no tenga captura propia, se dibuja un patrón SVG que
 * depende de su categoría y de su slug: siempre el mismo para el mismo proyecto,
 * distinto entre proyectos. No se parece a una imagen rota, se parece a una decisión.
 *
 * Lo usan tanto los componentes .astro como la isla de React, así que devuelve
 * markup como string y no depende de ningún framework.
 */

const WIDTH = 400;
const HEIGHT = 260;

/** Hash estable de un string a entero de 32 bits. */
function seedFrom(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Generador pseudoaleatorio determinista (mulberry32). */
function makeRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

/** Sistemas: una grilla de puntos, como un plano de canchas. */
function dotGrid(rand: () => number, id: string): string {
  const step = 22;
  const accents: string[] = [];
  for (let i = 0; i < 7; i++) {
    const x = step * (1 + Math.floor(rand() * (WIDTH / step - 1)));
    const y = step * (1 + Math.floor(rand() * (HEIGHT / step - 1)));
    accents.push(`<circle cx="${x}" cy="${y}" r="3"/>`);
  }
  const bx = step * (2 + Math.floor(rand() * 4));
  const by = step * (1 + Math.floor(rand() * 3));
  return `
    <defs>
      <pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse">
        <circle cx="${step / 2}" cy="${step / 2}" r="1.4" fill="var(--color-line)"/>
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${id})"/>
    <g fill="var(--color-accent)" opacity="0.85">${accents.join('')}</g>
    <rect x="${bx}" y="${by}" width="${step * 4}" height="${step * 3}" fill="none" stroke="var(--color-accent)" stroke-width="1" opacity="0.5"/>`;
}

/** IA y automatización: trazas que conectan nodos, como un flujo. */
function traces(rand: () => number, _id: string): string {
  const lanes = 4;
  const paths: string[] = [];
  const nodes: string[] = [];
  for (let i = 0; i < lanes; i++) {
    const y = round(HEIGHT * ((i + 1) / (lanes + 1)));
    const bend = round(60 + rand() * 180);
    const drop = round(y + (rand() > 0.5 ? 34 : -34));
    paths.push(`M -10 ${y} H ${bend} V ${drop} H ${WIDTH + 10}`);
    nodes.push(`<rect x="${bend - 3.5}" y="${y - 3.5}" width="7" height="7"/>`);
  }
  const hot = Math.floor(rand() * lanes);
  return `
    <g fill="none" stroke="var(--color-line)" stroke-width="1.5">
      ${paths.map((d, i) => (i === hot ? '' : `<path d="${d}"/>`)).join('')}
    </g>
    <g fill="none" stroke="var(--color-accent)" stroke-width="1.5">
      <path d="${paths[hot]}"/>
    </g>
    <g fill="var(--color-surface)" stroke="var(--color-line)" stroke-width="1.5">
      ${nodes.map((n, i) => (i === hot ? '' : n)).join('')}
    </g>
    <g fill="var(--color-accent)">${nodes[hot]}</g>`;
}

/** Webs a medida: curvas de nivel, como las sierras de Tandil. */
function contours(rand: () => number, _id: string): string {
  const lines: string[] = [];
  const phase = rand() * Math.PI * 2;
  const count = 9;
  for (let i = 0; i < count; i++) {
    const base = 30 + i * 26;
    const amp = 14 + Math.sin(phase + i * 0.6) * 9;
    const pts: string[] = [];
    for (let x = -10; x <= WIDTH + 10; x += 20) {
      const y = base + Math.sin(phase + i * 0.45 + x / 62) * amp;
      pts.push(`${x} ${round(y)}`);
    }
    lines.push(`<polyline points="${pts.join(' ')}"/>`);
  }
  const hot = 2 + Math.floor(rand() * 4);
  return `
    <g fill="none" stroke="var(--color-line)" stroke-width="1.25" stroke-linecap="round">
      ${lines.filter((_, i) => i !== hot).join('')}
    </g>
    <g fill="none" stroke="var(--color-accent)" stroke-width="1.5" stroke-linecap="round" opacity="0.9">
      ${lines[hot]}
    </g>`;
}

/** Ingeniería: arcos concéntricos, como el barrido de un sensor. */
function orbits(rand: () => number, _id: string): string {
  const cx = round(60 + rand() * 60);
  const cy = round(HEIGHT - 30 - rand() * 40);
  const rings: string[] = [];
  for (let r = 40; r < 420; r += 34) {
    rings.push(`<circle cx="${cx}" cy="${cy}" r="${r}"/>`);
  }
  const angle = -Math.PI / 4 - rand() * 0.6;
  const rayLen = 300;
  const x2 = round(cx + Math.cos(angle) * rayLen);
  const y2 = round(cy + Math.sin(angle) * rayLen);
  return `
    <g fill="none" stroke="var(--color-line)" stroke-width="1.25">${rings.join('')}</g>
    <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="var(--color-accent)" stroke-width="1.5" opacity="0.8"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="var(--color-accent)"/>`;
}

/** Personales: trama diagonal, tranquila. */
function hatch(rand: () => number, id: string): string {
  const step = 14;
  const offset = Math.round(rand() * step);
  const hotX = Math.round(60 + rand() * 240);
  return `
    <defs>
      <pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse" patternTransform="translate(${offset} 0) rotate(-45)">
        <line x1="0" y1="0" x2="0" y2="${step}" stroke="var(--color-line)" stroke-width="1.25"/>
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${id})"/>
    <g stroke="var(--color-accent)" stroke-width="1.5" opacity="0.85">
      <line x1="${hotX}" y1="0" x2="${hotX + HEIGHT}" y2="${HEIGHT}"/>
      <line x1="${hotX + 42}" y1="0" x2="${hotX + 42 + HEIGHT}" y2="${HEIGHT}"/>
    </g>`;
}

const drawers: Record<string, (rand: () => number, id: string) => string> = {
  Sistemas: dotGrid,
  'IA y automatización': traces,
  'Webs a medida': contours,
  Ingeniería: orbits,
  Personales: hatch,
};

/**
 * Devuelve el markup SVG de la portada generada de un proyecto.
 * Es decorativo: se marca aria-hidden y el título vive en el HTML de la tarjeta.
 * `instance` distingue dos dibujos del mismo proyecto en una misma página.
 */
export function patternSvg(category: string, slug: string, instance = 'a'): string {
  const rand = makeRandom(seedFrom(`${category}:${slug}`));
  const draw = drawers[category] ?? hatch;
  // Los patrones que se dibujan con <pattern> necesitan un id único por instancia:
  // un mismo proyecto puede aparecer dos veces en la home.
  const id = `p-${slug}-${instance}`;
  return `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="h-full w-full" aria-hidden="true" focusable="false"><rect width="${WIDTH}" height="${HEIGHT}" fill="var(--color-surface)"/>${draw(rand, id)}</svg>`;
}
