/**
 * Comunicación entre la isla del dock global y la isla de Proyectos (Astro no comparte React Context).
 */

export const DOCK_META_EVENT = 'portfolio:dock-meta';

export const DOCK_PROJECT_ACTIVATE_EVENT = 'portfolio:dock-project-activate';

/** Callback registrado por Projects para sincronizar refs del dock (animación minimize). */
export const DOCK_REGISTER_REF_KEY = '__portfolioRegisterDockProjectRef';

export type DockMetaSlot = {
  id: number;
  emoji: string;
  title: string;
  /** Miniatura capturada al minimizar (jpeg data URL). */
  thumbnailDataUrl?: string | null;
};

export const DOCK_HERO_META_EVENT = 'portfolio:dock-hero-meta';

export const DOCK_HERO_ACTIVATE_EVENT = 'portfolio:dock-hero-activate';

/** Elemento del botón del Hero en el Dock (para vector de minimizar). */
export const DOCK_HERO_DOCK_BUTTON_KEY = '__portfolioHeroDockButtonEl';

export type DockHeroMetaDetail = {
  state: 'open' | 'minimized' | 'closed' | 'maximized';
  title: string;
  thumbnailDataUrl?: string | null;
};
