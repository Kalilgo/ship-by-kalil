import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

export default function Counter({ end, label, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
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
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div
      ref={ref}
      className="glass-panel border border-border rounded-xl p-4"
      style={{
        opacity: hasAnimated.current ? 1 : 0,
        transform: hasAnimated.current ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <p className="text-2xl font-heading text-text-primary">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-text-secondary">{label}</p>
    </div>
  );
}
