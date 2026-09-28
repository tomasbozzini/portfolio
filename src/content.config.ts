import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
import { categories } from './config/site';
import { emblemKeys } from './lib/emblems';

/**
 * Un archivo Markdown por proyecto en src/content/proyectos/.
 * El cuerpo del archivo lleva los títulos "## Problema" y "## Solución".
 * Todo lo demás (stack, enlaces, capturas) vive en el frontmatter.
 */
const proyectos = defineCollection({
  loader: glob({ base: './src/content/proyectos', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Define la URL: /proyectos/<slug>. */
      slug: z.string(),
      category: z.enum([...categories] as [string, ...string[]]),
      featured: z.boolean().default(false),
      /** Corto, se muestra como etiqueta. Si falta, no se muestra nada. */
      status: z.string().optional(),
      summary: z.string(),
      stack: z.array(z.string()).min(1),
      /** Ícono simbólico que reemplaza al patrón de la portada. Ver src/lib/emblems.ts. */
      emblem: z.enum(emblemKeys).optional(),
      /** Imagen de portada en src/assets/projects/<slug>/. Sin ella se dibuja un patrón. */
      cover: image().optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
          }),
        )
        .default([]),
      links: z
        .object({
          repo: z.url().optional(),
          demo: z.url().optional(),
        })
        .default({}),
      /** Menor = más arriba en la grilla. */
      order: z.number(),
    }),
});

export const collections = { proyectos };
