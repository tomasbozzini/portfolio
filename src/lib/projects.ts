import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { emblems, type Emblem, type ResolvedEmblem } from './emblems';
import { techIcon } from './techIcons';

export type Project = CollectionEntry<'proyectos'>;

/** Lo mínimo que necesita una tarjeta. Serializable, para poder cruzar a la isla de React. */
export type ProjectCard = {
  slug: string;
  title: string;
  category: string;
  status?: string;
  summary: string;
  stack: string[];
  featured: boolean;
  cover: { src: string; srcset: string } | null;
  emblem: ResolvedEmblem | null;
};

export const projectHref = (slug: string) => `/proyectos/${slug}`;

/** Todos los proyectos, ordenados por el campo `order`. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('proyectos');
  return all.sort((a, b) => a.data.order - b.data.order);
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
    status: project.data.status,
    summary: project.data.summary,
    stack: project.data.stack,
    featured: project.data.featured,
    cover: await optimizedCover(project),
    emblem: resolveEmblem(project),
  };
}

export async function getProjectCards(): Promise<ProjectCard[]> {
  const projects = await getProjects();
  return Promise.all(projects.map(toCard));
}
