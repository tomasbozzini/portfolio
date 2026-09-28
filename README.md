# Portfolio — Tomás Bozzini

Sitio estático hecho con Astro, Tailwind CSS y una isla de React para el filtro de
proyectos. Sin base de datos ni backend: las consultas van por WhatsApp y mail.

## Requisitos

Node 22.12 o superior. Si usás nvm en Windows, la versión ya está instalada:

```
nvm use 22.23.3
```

## Comandos

| Comando           | Qué hace                                              |
| ----------------- | ----------------------------------------------------- |
| `npm install`     | Instala las dependencias                              |
| `npm run dev`     | Levanta el sitio en http://localhost:4321             |
| `npm run build`   | Genera el sitio estático en `dist/`                   |
| `npm run preview` | Sirve `dist/` para revisar el build final             |
| `npm run check`   | Revisa tipos y errores de Astro                       |
| `npm run og`      | Regenera `public/og.png` (la imagen de compartir)     |

## Dónde se cambia cada cosa

| Qué                                       | Archivo                        |
| ----------------------------------------- | ------------------------------ |
| Mail, WhatsApp, GitHub, LinkedIn          | `src/config/site.ts`           |
| Textos de servicios y mensajes de WhatsApp | `src/config/site.ts`           |
| Stack que se muestra en la home           | `src/config/site.ts`           |
| Categorías de proyectos                   | `src/config/site.ts` + `src/content.config.ts` |
| Párrafo de "Sobre mí"                     | `src/components/About.astro`   |
| Colores y tipografías                     | `src/styles/global.css`        |
| Dominio del sitio (canonical, sitemap)    | `astro.config.mjs`             |

## Agregar un proyecto nuevo

1. Creá un archivo en `src/content/proyectos/mi-proyecto.md`.
2. Copiá el frontmatter de un proyecto existente y completalo:

```yaml
---
title: Nombre del proyecto
slug: mi-proyecto # define la URL: /proyectos/mi-proyecto
category: Sistemas # una de las categorías de src/config/site.ts
featured: false # true lo sube a las tarjetas grandes de arriba
status: En desarrollo # opcional; si no está, no se muestra la etiqueta
summary: Una o dos líneas que se ven en la tarjeta.
stack:
  - Python
  - PostgreSQL
order: 10 # menor número = más arriba en la grilla
links:
  demo: https://ejemplo.com # opcional
  repo: https://github.com/... # opcional
---
```

3. Debajo del frontmatter escribí el cuerpo con estos títulos:

```markdown
## Problema

Qué problema resolvía.

## Solución

Cómo lo resolviste.
```

El resto de la página de detalle (stack, capturas, enlaces, navegación entre proyectos)
se arma solo.

**Destacados:** la home muestra en grande todos los que tengan `featured: true`. Hoy son
cuatro y el diseño está pensado para eso; si ponés más, se acomodan de a dos por fila.

## Agregar capturas

Mientras un proyecto no tiene imágenes, se dibuja un patrón generado según su categoría.
No hace falta hacer nada para que se vea bien. Cuando tengas capturas:

1. Guardalas en `src/assets/projects/<slug>/`, por ejemplo
   `src/assets/projects/merval-bot/panel.png`.
2. Referencialas en el frontmatter del proyecto:

```yaml
cover: ../../assets/projects/merval-bot/panel.png
gallery:
  - src: ../../assets/projects/merval-bot/alertas.png
    alt: Mail de alerta con la señal del día
  - src: ../../assets/projects/merval-bot/backtest.png
    alt: Resultado del backtest de la estrategia
```

Las rutas son relativas al archivo `.md`. El `alt` es obligatorio: describí qué se ve,
no repitas el nombre del proyecto.

Astro optimiza las imágenes en el build (las convierte a WebP y genera varios tamaños).
Subí la captura en buena resolución y no te preocupes por el peso.

### Foto personal

En `src/components/About.astro` hay un bloque comentado listo para la foto. Guardala en
`src/assets/foto.jpg` (cuadrada, mínimo 600×600) y descomentá el import y el `<div>`.

## Deploy en Vercel

El sitio es estático: Vercel lo detecta solo, sin adaptador ni configuración extra.

**Primera vez, desde la web:**

1. Subí el repo a GitHub.
2. En vercel.com → *Add New* → *Project* → importá el repo.
3. Vercel detecta Astro y propone `npm run build` con salida en `dist/`. Aceptá.
4. Deploy. Cada push a la rama principal actualiza el sitio solo.

**Desde la terminal:**

```
npm i -g vercel
vercel          # deploy de preview
vercel --prod   # deploy a producción
```

**Después del primer deploy:** cambiá el dominio en `astro.config.mjs` (constante `SITE`)
por el definitivo. De eso dependen el canonical, el sitemap y los links de la imagen de
compartir.

`vercel.json` solo agrega cache largo para los assets con hash. Node se fija en el
`engines` del `package.json`.

## Qué falta completar

Están marcados con `<!-- TODO -->` en el código. Buscá "TODO" en el proyecto para verlos
todos. Los principales:

- **LinkedIn** (`src/config/site.ts`): mientras esté vacío, el enlace no aparece.
- **Dominio final** (`astro.config.mjs`).
- **Estado de uso** de cuatro proyectos: analizador de documentos, gestión de clubes, web
  de Elisa Medici y finanzas del hogar. La línea `status:` está comentada en cada
  frontmatter.
- **Problema** del analizador de documentos y de la posada.
- **URLs** de la web de Elisa Medici y de la posada, si están publicadas
  (`links.demo`).
- Detalles opcionales en el cuerpo de varios proyectos, señalados uno por uno.

## Estructura

```
src/
├─ assets/
│  ├─ fonts/          Archivo variable (peso + ancho), auto-alojada
│  └─ projects/       capturas, una carpeta por proyecto
├─ components/        piezas de la home y de las páginas de detalle
├─ config/site.ts     datos de contacto, servicios, stack, categorías
├─ content/proyectos/ un .md por proyecto
├─ content.config.ts  esquema (zod) del frontmatter
├─ layouts/Base.astro estructura HTML, SEO y Open Graph
├─ lib/
│  ├─ pattern.ts      patrones generados que reemplazan capturas
│  └─ projects.ts     carga y ordena los proyectos
├─ pages/
│  ├─ index.astro     home
│  ├─ 404.astro
│  └─ proyectos/[slug].astro
└─ styles/global.css  paleta, tipografía, utilidades
scripts/generate-og.mjs  genera public/og.png
```
