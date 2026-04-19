/** Stagger delay for list items; zero when user prefers reduced motion. */
export function staggerDelay(index: number, step: number, reducedMotion: boolean | null): number {
  if (reducedMotion) return 0;
  return index * step;
}
