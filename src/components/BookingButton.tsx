'use client';

import { Calendar, ArrowRight } from 'lucide-react';

const translations = {
  es: {
    title: 'Agendar Reunión',
    subtitle: 'Elige un horario que te funcione',
    cta: 'Reservar',
    duration: 'Duración',
    minutes: 'min',
  },
  en: {
    title: 'Schedule Meeting',
    subtitle: 'Pick a time that works for you',
    cta: 'Book Now',
    duration: 'Duration',
    minutes: 'min',
  },
};

interface BookingButtonProps {
  locale?: 'es' | 'en';
  variant?: 'navbar' | 'inline';
  size?: 'sm' | 'md';
}

export default function BookingButton({
  locale = 'es',
  variant = 'navbar',
  size = 'sm',
}: BookingButtonProps) {
  const t = translations[locale];
  const CAL_URL = 'https://cal.com/matias-gomez-ugzqgi';

  const baseClasses = {
    navbar:
      'flex items-center gap-2 px-4 py-2 bg-accent-cyan text-background rounded-lg hover:bg-accent-cyan/80 transition-all font-medium text-sm',
    inline:
      'group inline-flex items-center gap-3 px-6 py-3 bg-accent-cyan text-background rounded-xl hover:bg-accent-cyan/90 transition-all font-medium shadow-[0_0_0_1px_rgba(6,182,212,0.35),0_8px_24px_-8px_rgba(6,182,212,0.35)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.5),0_12px_32px_-10px_rgba(6,182,212,0.45)]',
    inlineOutline:
      'group inline-flex items-center gap-3 px-6 py-3 border border-border bg-surface-2/60 backdrop-blur-sm rounded-xl hover:border-accent-cyan/70 hover:text-accent-cyan transition-all font-medium',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  if (variant === 'navbar') {
    return (
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label={t.title}
        className={baseClasses.navbar}
      >
        <Calendar className={iconSize} />
        <span className={sizeClasses[size]}>{t.title}</span>
      </a>
    );
  }

  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={baseClasses[variant]}
    >
      <Calendar className={iconSize} />
      <span className={sizeClasses[size]}>{t.title}</span>
      <ArrowRight
        className={`${iconSize} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}
      />
    </a>
  );
}

export function BookingInline({
  locale = 'es',
  className = '',
}: BookingButtonProps & { className?: string }) {
  const t = translations[locale];
  const CAL_URL = 'https://cal.com/matias-gomez-ugzqgi';

  return (
    <div className={className}>
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="group inline-flex items-center gap-3 px-6 py-3 bg-accent-cyan text-background rounded-xl hover:bg-accent-cyan/90 transition-all font-medium shadow-[0_0_0_1px_rgba(6,182,212,0.35),0_8px_24px_-8px_rgba(6,182,212,0.35)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.5),0_12px_32px_-10px_rgba(6,182,212,0.45)]"
      >
        <Calendar className="w-5 h-5" />
        <span>{t.title}</span>
        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </a>
    </div>
  );
}
