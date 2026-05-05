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

  if (k.includes('sveltekit')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#ff3e00]`} aria-hidden>
        <title>{tag}</title>
        <path
          fill="currentColor"
          d="M9.8 4.2 6 9.5l5.4 3.1 3.8-5.3L15 4.2l-5.2-.02zm7.5 5.5-3.8 5.3L18 18l-5.4-3.1-5.4 3.1 3.8-5.3L8 9.7l5.4 3.1 4-5.1z"
        />
      </svg>
    );
  }

  if (k.includes('svelte')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#ff3e00]`} aria-hidden>
        <title>{tag}</title>
        <path
          fill="currentColor"
          d="M10.3 4.4c-1.8-.6-3.8.2-4.6 2L5 9.5c-.8 1.8.1 3.9 1.9 4.8l5.4 2.8c1.7.9 3.8.3 4.9-1.3l2.6-4.2c1.1-1.7.8-4-1-5.2l-4.8-2.8c-.9-.5-2-.7-3-.6z"
        />
      </svg>
    );
  }

  if (k.includes('vite')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <title>{tag}</title>
        <defs>
          <linearGradient id={`tv-${gid}`} x1="4" y1="4" x2="20" y2="20">
            <stop stopColor="#bd34fe" />
            <stop offset="1" stopColor="#41d1ff" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#tv-${gid})`}
          d="m8.5 3 9 16.5L15 21 6 4.5 8.5 3zm3 9 3 5.5L21 6h-6l-3.5 6z"
        />
      </svg>
    );
  }

  if (k.includes('bun')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#fbf0df]`} aria-hidden>
        <title>{tag}</title>
        <ellipse cx="12" cy="13" rx="9" ry="8" fill="#141416" stroke="#fbf0df" strokeWidth="1.2" />
        <ellipse cx="9" cy="11" rx="1.3" ry="1.8" fill="#fbf0df" />
        <ellipse cx="15" cy="11" rx="1.3" ry="1.8" fill="#fbf0df" />
      </svg>
    );
  }

  if (k.includes('three') || k.includes('globe.gl')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#22c55e]`} aria-hidden>
        <title>{tag}</title>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          d="M12 4 5 8v8l7 4 7-4V8l-7-4zm0 0v16m7-12-7 4m0 0-7-4"
        />
      </svg>
    );
  }

  if (k.includes('daisy')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#fbbf24]`} aria-hidden>
        <title>{tag}</title>
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <ellipse cx="12" cy="7" rx="2.5" ry="4" fill="currentColor" opacity="0.85" />
        <ellipse cx="17" cy="14" rx="2.5" ry="4" fill="currentColor" opacity="0.85" transform="rotate(72 12 12)" />
        <ellipse cx="7" cy="14" rx="2.5" ry="4" fill="currentColor" opacity="0.85" transform="rotate(-72 12 12)" />
      </svg>
    );
  }

  if (k.includes('zustand')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#433f41]`} aria-hidden>
        <title>{tag}</title>
        <path
          fill="currentColor"
          d="M8 6c0 2 2 4 4 5 2-1 4-3 4-5-2 1-4 1-6 0-1 0-2 0-2 0zm8 6c-2 1-4 2-6 2s-4-1-6-2v6h12v-6zm-8 8v2h8v-2H8z"
        />
      </svg>
    );
  }

  if (k.includes('amplify')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <title>{tag}</title>
        <defs>
          <linearGradient id={`ta2-${gid}`} x1="4" y1="20" x2="20" y2="4">
            <stop stopColor="#ff9900" />
            <stop offset="1" stopColor="#ffb84d" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#ta2-${gid})`}
          d="M6 18 12 6l3 6 3-6 6 12H6zm6-12v4l2 4h-4l2-8z"
        />
      </svg>
    );
  }

  if (k.includes('mui') || k.includes('material')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#007FFF]`} aria-hidden>
        <title>{tag}</title>
        <path fill="currentColor" d="M4 4h16v16H4V4zm3 13h4v-7l4 7h4v-7l-4 7H7v-7z" />
      </svg>
    );
  }

  if (k.includes('prisma')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <title>{tag}</title>
        <defs>
          <linearGradient id={`tp-${gid}`} x1="4" y1="20" x2="20" y2="4">
            <stop stopColor="#5a67d8" />
            <stop offset="1" stopColor="#2d3748" />
          </linearGradient>
        </defs>
        <path fill={`url(#tp-${gid})`} d="M12 3 4 20h16L12 3zm0 4.5 5.5 11h-11L12 7.5z" />
      </svg>
    );
  }

  if (k.includes('postgres')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#336791]`} aria-hidden>
        <title>{tag}</title>
        <ellipse cx="12" cy="14" rx="7" ry="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          fill="currentColor"
          d="M9 9c0-1 .8-2 2.5-2h3v3h-2c-.7 0-1 .4-1 1v2H9V9zm5 7v3h-3v-3h3z"
        />
      </svg>
    );
  }

  if (k.includes('lambda') || k === 'λ') {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#FF9900]`} aria-hidden>
        <title>{tag}</title>
        <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor" fontFamily="serif">
          λ
        </text>
      </svg>
    );
  }

  if (k.includes('emailjs')) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#00b7ff]`} aria-hidden>
        <title>{tag}</title>
        <path
          fill="currentColor"
          d="M4 7c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm2 0 6 4 6-4v10H6V7zm2.5 0L12 11l3.5-4H8.5z"
        />
      </svg>
    );
  }

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
