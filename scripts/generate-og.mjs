/**
 * Genera public/og.png, la imagen que se ve al compartir el sitio en WhatsApp,
 * LinkedIn o Twitter.
 *
 * Correr con: npm run og
 * Volver a correrla si cambia el nombre, el rol o el color de acento.
 *
 * Las tipografías en scripts/fonts/ están solo para esto: el sitio usa las de
 * src/assets/fonts/, que Astro procesa aparte.
 */
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const NAME = 'Tomás Bozzini';
const ROLE_1 = 'Ingeniero en Sistemas';
const ROLE_2 = 'Desarrollo web e IA aplicada';

const INK = '#141917';
const LINE = '#2c3531';
const TEXT = '#e9e7e1';
const MUTED = '#98a29b';
const ACCENT = '#dfa23a';

const WIDTH = 1200;
const HEIGHT = 630;

/** Las trazas del patrón de "IA y automatización", como fondo de la derecha. */
function traces() {
  return [120, 315, 510]
    .map((y, i) => {
      const hot = i === 1;
      const bend = 900 + i * 45;
      const drop = y + (i % 2 === 0 ? 70 : -70);
      const color = hot ? ACCENT : LINE;
      return `<path d="M 700 ${y} H ${bend} V ${drop} H 1200" fill="none" stroke="${color}" stroke-width="3"/>
        <rect x="${bend - 8}" y="${y - 8}" width="16" height="16" fill="${color}"/>`;
    })
    .join('');
}

const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}"/>
    ${traces()}
    <rect x="80" y="342" width="420" height="3" fill="${ACCENT}"/>
  </svg>`,
);

/** libvips rasteriza el texto con el archivo de fuente que le pasamos. */
function text(value, { font, file, size, color }) {
  return sharp({
    text: {
      text: `<span foreground="${color}">${value}</span>`,
      font: `${font} ${size}`,
      fontfile: resolve(root, 'scripts/fonts', file),
      rgba: true,
      dpi: 72 * 4,
    },
  })
    .png()
    .toBuffer();
}

const name = await text(NAME, {
  font: 'Archivo Expanded Bold',
  file: 'archivo-expanded-700.ttf',
  size: 21,
  color: TEXT,
});

const role1 = await text(ROLE_1, {
  font: 'Archivo',
  file: 'archivo-400.ttf',
  size: 8,
  color: MUTED,
});

const role2 = await text(ROLE_2, {
  font: 'Archivo',
  file: 'archivo-400.ttf',
  size: 8,
  color: MUTED,
});

const out = resolve(root, 'public/og.png');

await sharp(background)
  .composite([
    { input: name, top: 215, left: 80 },
    { input: role1, top: 380, left: 80 },
    { input: role2, top: 424, left: 80 },
  ])
  .png()
  .toFile(out);

console.log(`og.png generada en ${out}`);
