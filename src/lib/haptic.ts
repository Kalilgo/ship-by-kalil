type HapticPattern = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error' | 'swipe';

const PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: [30, 20, 30],
  selection: 8,
  success: [20, 30, 20],
  error: [50, 40, 50],
  swipe: 12,
};

export function triggerHaptic(pattern: HapticPattern = 'light'): void {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  try {
    navigator.vibrate(PATTERNS[pattern]);
  } catch {
    /* Silently fail */
  }
}

export function useHaptic() {
  return { triggerHaptic };
}
