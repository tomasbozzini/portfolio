import { useState, type CSSProperties } from 'react';
import type { ProjectCard } from '../lib/projects';
import { patternSvg } from '../lib/pattern';
import type { ResolvedEmblem } from '../lib/emblems';
import { localePath, type Lang, type ui } from '../i18n/ui';

type Props = {
  projects: ProjectCard[];
  /** `key` es la categoría en español (la del frontmatter); `label`, lo que se muestra. */
  categories: { key: string; label: string }[];
  lang: Lang;
  labels: (typeof ui)[Lang]['grid'];
};

const ALL = '__all__';

/** Mismo emblema que ProjectEmblem.astro, en tamaño de tarjeta. Estilos en global.css. */
function Emblem({ emblem }: { emblem: ResolvedEmblem }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid place-items-center"
      style={{ '--emblem': emblem.color } as CSSProperties}
    >
      <div className="emblem-halo size-24" />
      <div className="emblem-tile size-14 rounded-2xl">
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: emblem.svg }}
        />
        {emblem.badge && (
          <span className="emblem-badge size-6">
            <svg viewBox="0 0 24 24" width="13" height="13" fill={emblem.badge.color}>
              <path d={emblem.badge.path} />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectGrid({ projects, categories, lang, labels }: Props) {
  const [active, setActive] = useState<string>(ALL);

  const filters = [{ key: ALL, label: labels.all }, ...categories];
  const activeLabel = filters.find((f) => f.key === active)?.label ?? '';
  const visible =
    active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label={labels.filterLabel}
        className="glass inline-flex max-w-full flex-wrap gap-1 rounded-3xl p-1.5 sm:rounded-full"
      >
        {filters.map((filter) => {
          const isActive = filter.key === active;
          return (
            <button
              key={filter.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter.key)}
              className={
                'rounded-full px-4 py-2 font-ui text-sm transition-all duration-300 ' +
                (isActive
                  ? 'bg-gradient-to-r from-accent to-accent-2 font-medium text-ink-deep shadow-[0_6px_20px_-6px_var(--color-accent)]'
                  : 'text-muted hover:bg-surface-2 hover:text-text')
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-[0.72rem] tracking-wider text-muted">
        {visible.length} {visible.length === 1 ? labels.one : labels.many}
        {active !== ALL ? ` ${labels.inCategory} ${activeLabel}` : ''}
      </p>

      {visible.length === 0 ? (
        <p className="measure mt-10 font-body text-muted">
          {labels.empty}
        </p>
      ) : (
        <ul
          key={active}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((project, index) => (
            <li
              key={project.slug}
              className="card-in"
              style={{ '--i': index } as CSSProperties}
            >
              <a
                href={localePath(lang, `/proyectos/${project.slug}`)}
                className="floaty glass glow-edge group flex h-full flex-col rounded-3xl p-2"
              >
                <div className="relative aspect-16/10 overflow-hidden rounded-[1.1rem] bg-surface">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    {project.cover ? (
                      <img
                        src={project.cover.src}
                        srcSet={project.cover.srcset}
                        sizes="(min-width: 1280px) 16rem, (min-width: 640px) 45vw, 100vw"
                        alt={`${labels.screenshot} ${project.title}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // Con emblema, el fondo va liso; el patrón solo si no hay nada más.
                      !project.emblem && (
                        <div
                          className="h-full w-full"
                          dangerouslySetInnerHTML={{
                            __html: patternSvg(project.category, project.slug, 'grilla'),
                          }}
                        />
                      )
                    )}
                  </div>
                  {project.emblem && <Emblem emblem={project.emblem} />}
                </div>

                <div className="flex flex-1 flex-col px-2 pt-3.5 pb-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                      {project.categoryLabel}
                    </span>
                    {project.status && (
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                        title={project.status}
                      >
                        <span className="sr-only">{project.status}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-[0.975rem] leading-tight text-text transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted">
                    {project.summary}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
