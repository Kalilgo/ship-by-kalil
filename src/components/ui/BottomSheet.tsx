import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../../lib/haptic';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  label?: string;
  disableDrag?: boolean;
  onAnimationComplete?: () => void;
}

const DRAG_THRESHOLD = 120;

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  label = 'Sheet',
  disableDrag = false,
  onAnimationComplete,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (disableDrag) return;
    if (info.offset.y > DRAG_THRESHOLD || info.velocity.y > 300) {
      triggerHaptic('medium');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={`Close ${label}`}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="pointer-events-auto w-full max-h-[85dvh] overflow-y-auto rounded-t-3xl border border-border/80 border-b-0 bg-surface-2/95 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-12px_60px_-24px_rgba(0,0,0,0.6)]"
              initial={{ y: '100%' }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              drag={disableDrag ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onAnimationComplete={onAnimationComplete}
              onClick={(e) => e.stopPropagation()}
            >
              {!disableDrag && (
                <div className="flex justify-center pt-2 pb-1">
                  <div className="h-1 w-10 rounded-full bg-border" />
                </div>
              )}

              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
