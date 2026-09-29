import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { emblems, type Emblem, type ResolvedEmblem } from './emblems';
import { techIcon } from './techIcons';
import { localePath, ui, type Lang } from '../i18n/ui';
import type { Category } from '../config/site';

type ProjectEs = CollectionEntry<'proyectos'>;

/**
 * Un proyecto en un idioma. `data` es el frontmatter en español con título, resumen y
 * estado reemplazados por la traducción (si existe). `category` queda en español porque
 * es la clave del filtro y del patrón; para mostrarla, usar `categoryLabel`.
 */
export type Project = {
  data: ProjectEs['data'];
  /** Entrada a pasarle a render(): la traducción si existe, si no la original. */
  body: ProjectEs | CollectionEntry<'proyectosEn'>;
  lang: Lang;
  translated: boolean;
  categoryLabel: string;
};

/** Lo mínimo que necesita una tarjeta. Serializable, para poder cruzar a la isla de React. */
export type ProjectCard = {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  status?: string;
  summary: string;
  stack: string[];
  featured: boolean;
  cover: { src: string; srcset: string } | null;
  emblem: ResolvedEmblem | null;
};

export const projectHref = (slug: string, lang: Lang = 'es') =>
  localePath(lang, `/proyectos/${slug}`);

/** Todos los proyectos en un idioma, ordenados por el campo `order`. */
export async function getProjects(lang: Lang = 'es'): Promise<Project[]> {
  const all = await getCollection('proyectos');
  const translations = lang === 'en' ? await getCollection('proyectosEn') : [];
  const bySlug = new Map(translations.map((entry) => [entry.data.slug, entry]));

  return all
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const t = bySlug.get(entry.data.slug);
      const data = t
        ? {
            ...entry.data,
            title: t.data.title,
            summary: t.data.summary,
            status: t.data.status,
            gallery: entry.data.gallery.map((shot, i) => ({
              ...shot,
              alt: t.data.galleryAlt[i] ?? shot.alt,
            })),
          }
        : entry.data;
      return {
        data,
        body: t ?? entry,
        lang,
        translated: lang === 'es' || Boolean(t),
        categoryLabel: ui[lang].categories[entry.data.category as Category],
      };
    });
}

/**
 * Optimiza la portada en tiempo de build. Devuelve null si el proyecto todavía no
 * tiene imagen: en ese caso la tarjeta dibuja el patrón generado.
 */
async function optimizedCover(project: Project) {
  if (!project.data.cover) return null;
  const image = await getImage({
    src: project.data.cover,
    widths: [480, 800, 1200],
    format: 'webp',
  });
  return { src: image.src, srcset: image.srcSet.attribute };
}

/** Arma el emblema con el logo de la esquina ya resuelto, para no mandar simple-icons al navegador. */
function resolveEmblem(project: Project): ResolvedEmblem | null {
  if (!project.data.emblem) return null;
  const data: Emblem = emblems[project.data.emblem];
  const icon = data.badge ? techIcon(data.badge) : null;
  return {
    color: data.color,
    svg: data.svg,
    badge: icon ? { path: icon.path, color: icon.color } : null,
  };
}

export async function toCard(project: Project): Promise<ProjectCard> {
  return {
    slug: project.data.slug,
    title: project.data.title,
    category: project.data.category,
    categoryLabel: project.categoryLabel,
    status: project.data.status,
    summary: project.data.summary,
    stack: project.data.stack,
    featured: project.data.featured,
    cover: await optimizedCover(project),
    emblem: resolveEmblem(project),
  };
}

export async function getProjectCards(lang: Lang = 'es'): Promise<ProjectCard[]> {
  const projects = await getProjects(lang);
  return Promise.all(projects.map(toCard));
}
