/**
 * Aproximación al minimize “genie” de macOS (sin mesh warp nativo).
 * Perspectiva + rotateX + escala asimétrica + trayectoria en curva hacia el icono del dock.
 */

export const DOCK_MINIMIZE_MS = 520;

/** Curva tipo succión al final (rápido al inicio, desacelera al llegar al dock). */
const EASE_SUCTION: [number, number, number, number] = [0.22, 0.82, 0.28, 0.98];

export type DockMinimizeBorderStart = 12 | 16 | 24;

export function dockMinimizeTransition(minimizeActive: boolean) {
  if (minimizeActive) {
    return {
      duration: DOCK_MINIMIZE_MS / 1000,
      times: [0, 0.28, 0.62, 1],
      ease: ['easeOut', 'easeInOut', EASE_SUCTION] as const,
    };
  }
  return { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
}

/** Keyframes para ventanas con scaleX / scaleY separados (cards hero / grid). */
export function dockMinimizeKeyframeXY(
  dx: number,
  dy: number,
  borderStart: DockMinimizeBorderStart
) {
  return {
    x: [0, dx * 0.22, dx * 0.55, dx] as const,
    y: [0, dy * 0.12, dy * 0.45, dy] as const,
    scaleX: [1, 0.72, 0.38, 0.1] as const,
    scaleY: [1, 0.68, 0.32, 0.036] as const,
    rotateX: [0, 10, 32, 58] as const,
    opacity: [1, 0.95, 0.62, 0.18] as const,
    borderRadius: [borderStart, 28, 80, 999] as const,
  };
}

/** Keyframes para modal que usa `scale` uniforme (compat. con layout actual). */
export function dockMinimizeKeyframeUniform(dx: number, dy: number, borderStart: DockMinimizeBorderStart) {
  return {
    x: [0, dx * 0.22, dx * 0.55, dx] as const,
    y: [0, dy * 0.12, dy * 0.45, dy] as const,
    scale: [1, 0.78, 0.42, 0.12] as const,
    rotateX: [0, 10, 32, 56] as const,
    opacity: [1, 0.95, 0.6, 0.2] as const,
    borderRadius: [borderStart, 28, 80, 999] as const,
  };
}

export const dockMinimizeMotionStyle = {
  transformOrigin: '50% 92%',
  transformStyle: 'preserve-3d' as const,
};

export const dockMinimizePerspectiveClass =
  '[perspective:1500px] [transform-style:preserve-3d] [perspective-origin:50%_0%]';
