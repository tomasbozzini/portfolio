/**
 * Emblemas simbólicos de los proyectos. Se muestran en lugar del patrón
 * generado, en las tarjetas y en la portada del detalle.
 *
 * Se eligen con el campo `emblem` del frontmatter. Para sumar uno, agregarlo
 * acá: el esquema de contenido toma las claves de este objeto.
 *
 * Los íconos son trazos en una grilla de 24x24 (stroke, sin relleno).
 */

export type Emblem = {
  color: string;
  svg: string;
  /** Logo de marca chico en la esquina (nombre que entienda techIcon). */
  badge?: string;
};

export const emblems = {
  // Balanza de la justicia.
  legal: {
    color: 'var(--color-accent-2)',
    svg: '<circle cx="12" cy="4" r="1.2"/><path d="M12 5.2V20M8 20h8M4 7.5h16"/><path d="M4 7.5 1.8 13a2.3 2.3 0 0 0 4.4 0Z"/><path d="M20 7.5 17.8 13a2.3 2.3 0 0 0 4.4 0Z"/>',
  },
  // Plano de una cancha, visto desde arriba.
  sports: {
    color: 'var(--color-accent)',
    svg: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M12 5v14"/><circle cx="12" cy="12" r="2.8"/><path d="M2.5 9.5h2.8v5H2.5M21.5 9.5h-2.8v5h2.8"/>',
  },
  // Globo de chat con un brote adentro: mensajes del campo.
  'agro-chat': {
    color: 'var(--color-accent-2)',
    svg: '<path d="M4.5 19.5 5.6 16A8.3 8.3 0 1 1 8.4 18.6Z"/><path d="M12 15.5v-4.2"/><path d="M12 11.3c0-2 1.5-3.6 3.5-3.6 0 2-1.5 3.6-3.5 3.6Z"/><path d="M12 12.8c0-1.7-1.3-3-3-3 0 1.7 1.3 3 3 3Z"/>',
    badge: 'WhatsApp',
  },
  // Avión: agencia de viajes.
  travel: {
    color: 'var(--color-accent-3)',
    svg: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  },
  // Billetera: finanzas del hogar.
  finance: {
    color: 'var(--color-accent-2)',
    svg: '<rect x="2.5" y="6" width="19" height="13" rx="2.5"/><path d="M5 6 15.5 3.2a1.5 1.5 0 0 1 1.9 1.1L17.8 6"/><path d="M21.5 11h-4a1.75 1.75 0 0 0 0 3.5h4"/><circle cx="17.6" cy="12.75" r=".4"/>',
  },
  // Velas de un gráfico de bolsa.
  trading: {
    color: 'var(--color-accent)',
    svg: '<path d="M6 3v3M6 14v5M12 5v4M12 17v3M18 2v2M18 12v4"/><rect x="4" y="6" width="4" height="8" rx="1"/><rect x="10" y="9" width="4" height="8" rx="1"/><rect x="16" y="4" width="4" height="8" rx="1"/>',
  },
  // Embudo de ventas.
  leads: {
    color: 'var(--color-accent-2)',
    svg: '<path d="M3 4.5h18l-7 8.5v6l-4 2v-8Z"/><path d="M7.2 9.5h9.6"/>',
  },
  // Casa de campo con un árbol: alojamiento rural.
  lodge: {
    color: 'var(--color-accent)',
    svg: '<path d="M2.5 11 10.5 4.5l8 6.5"/><path d="M4.5 9.5V20h12V9.5"/><path d="M9 20v-5h3v5"/><path d="M20.5 20v-3.5M20.5 16.5c-1.2 0-2-1-2-2.2 0-1.5 1-3.3 2-3.3s2 1.8 2 3.3c0 1.2-.8 2.2-2 2.2Z"/>',
  },
  // Robot.
  robot: {
    color: 'var(--color-accent)',
    svg: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4.5"/><circle cx="12" cy="3.5" r="1"/><circle cx="9" cy="13" r="1.3"/><circle cx="15" cy="13" r="1.3"/><path d="M9.5 16.5h5M2 12.5v3M22 12.5v3"/>',
  },
} satisfies Record<string, Emblem>;

export type EmblemKey = keyof typeof emblems;
export const emblemKeys = Object.keys(emblems) as [EmblemKey, ...EmblemKey[]];

/** Emblema listo para cruzar a la isla de React (con el logo de la esquina ya resuelto). */
export type ResolvedEmblem = {
  color: string;
  svg: string;
  badge: { path: string; color: string } | null;
};
