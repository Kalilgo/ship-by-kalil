/**
 * Íconos compactos por nombre de tecnología (tarjetas del grid).
 * Etiquetas desconocidas: iniciales en círculo.
 */

import { useId } from 'react';

const iconClass = 'size-5 shrink-0';

function Fallback({ label }: { label: string }) {
  const t = label.slice(0, 3).toUpperCase();
  return (
    <span
      className={`${iconClass} grid place-items-center rounded-md border border-border/80 bg-background/60 font-mono text-[9px] font-semibold text-text-muted`}
      title={label}
    >
      {t}
    </span>
  );
}

export function TechTagIcon({ tag }: { tag: string }) {
  const gid = useId().replace(/:/g, '');
  const k = tag.trim().toLowerCase();

  if (k.includes('react') && !k.includes('native')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#61DAFB]`} aria-hidden>
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (k.includes('astro')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <defs>
          <linearGradient id={`ta-${gid}`} x1="6" y1="4" x2="18" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff5d01" />
            <stop offset="1" stopColor="#ffc107" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#ta-${gid})`}
          d="M10.2 4.2 4 17.3c-.5 1.2.1 2.6 1.3 3.1l5.4 2.3c.8.3 1.7.3 2.5 0l5.5-2.3c1.2-.5 1.8-1.9 1.3-3.1L13.8 4.2c-.6-1.4-2.5-1.4-3.1 0z"
        />
      </svg>
    );
  }

  if (k.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#38bdf8]`} aria-hidden>
        <path
          fill="currentColor"
          d="M12 6c-3 0-4.5 1.5-5 4 1-.8 2.2-1 3.5-.6 1 .4 1.7 1 2.5 1.7.9.9 2 1.4 3.5 1.4 3 0 4.5-1.5 5-4-1 .8-2.2 1-3.5.6-1-.4-1.7-1-2.5-1.7C14.6 6.6 13.5 6 12 6zm-5 6c-3 0-4.5 1.5-5 4 1-.8 2.2-1 3.5-.6 1 .4 1.7 1 2.5 1.7.9.9 2 1.4 3.5 1.4 3 0 4.5-1.5 5-4-1 .8-2.2 1-3.5.6-1-.4-1.7-1-2.5-1.7C9.6 12.6 8.5 12 7 12z"
        />
      </svg>
    );
  }

  if (k.includes('typescript') || k === 'ts') {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <rect width="24" height="24" rx="4" fill="#3178c6" />
        <path fill="#fff" d="M14 10v4h2v6h2v-6h2v-4h-6zm-6 0h4v2h-2v7h-2v-9z" />
      </svg>
    );
  }

  if (k.includes('next')) {
    return (
      <span className={`${iconClass} grid place-items-center rounded-md bg-zinc-800`} title={tag}>
        <svg viewBox="0 0 24 24" className="size-[85%]" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <path fill="#000" d="M8 8h3.5v8H8V8zm5.5 0H17v8h-2.5v-5l-3 5H8l4.5-8z" />
        </svg>
      </span>
    );
  }

  if (k.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#339933]`} aria-hidden>
        <path
          fill="currentColor"
          d="M12 2 4 6v12l8 4 8-4V6l-8-4zm0 2.2 5.8 3v6.6l-5 2.5V9.7l5-2.6zm-7 3.4 5 2.5v7.3L5 17.4V7.6zm14 0v9.8l-5 2.5v-7.3l5-2.5z"
        />
      </svg>
    );
  }

  if (k.includes('vercel')) {
    return (
      <span className={`${iconClass} grid place-items-center rounded-md bg-zinc-800`} title={tag}>
        <svg viewBox="0 0 24 24" className="size-[70%] text-white" aria-hidden>
          <path fill="currentColor" d="M12 3 22 21H2L12 3z" />
        </svg>
      </span>
    );
  }

  if (k.includes('.net') || k.includes('dotnet')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path fill="#512BD4" d="M4 4h16v16H4V4zm3.5 11.5h2L12 9l2.5 6.5h2L21 6h-2.5l-2 6-2-6h-2l-2 6-2-6H6l3.5 9.5z" />
      </svg>
    );
  }

  if (k.includes('sql')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#cc2927]`} aria-hidden>
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (k.includes('aws')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="#FF9900"
          d="M6 14l2.5 3h2L8 14l2.5-3h-2L6 14zm8-7v10l3-1.5V8.5L14 7zm-4 3l4 6h2l-5-8h-2l1 2z"
        />
      </svg>
    );
  }

  return <Fallback label={tag} />;
}
