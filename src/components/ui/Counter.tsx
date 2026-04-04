import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

export default function Counter({ end, label, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const previousIsInView = useRef(false);

  useEffect(() => {
    if (isInView && !previousIsInView.current) {
      setCount(0);

      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }

    previousIsInView.current = isInView;
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      className="glass-panel border border-border rounded-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <p className="text-2xl font-heading text-text-primary">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-text-secondary">{label}</p>
    </motion.div>
  );
}
