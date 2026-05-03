/**
 * Estética tipo Preferencias del Sistema (engranajes entrelazados), fondo slate.
 * Usado en el Dock (Ajustes / ventana del hero minimizada).
 */
export function SystemSettingsDockIcon({ className = '' }: { className?: string }) {
  return (
    <span
      className={`relative flex aspect-square size-[58%] min-h-[22px] min-w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-gradient-to-b from-slate-400/95 via-slate-500 to-slate-600 shadow-inner ring-1 ring-white/15 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="size-[72%] text-white drop-shadow-sm">
        <path
          fill="currentColor"
          opacity="0.92"
          d="M32 18c-2.2 0-4 1.8-4 4v2.3l-2.9 1.7-2-2.3c-1.4-1.6-3.8-1.8-5.4-.4l-2 1.7c-1.6 1.4-1.8 3.8-.4 5.4l2 2.3-1.7 2.9H12c-2.2 0-4 1.8-4 4v2.8c0 2.2 1.8 4 4 4h2.3l1.7 2.9-2.3 2c-1.6 1.4-1.8 4-.4 5.4l2 1.7c1.6 1.4 4 1.6 5.4-.4l2.3-2 2.9 1.7V46c0 2.2 1.8 4 4 4h2.8c2.2 0 4-1.8 4-4v-2.3l2.9-1.7 2 2.3c1.4 1.6 4 1.8 5.4.4l2-1.7c1.6-1.4 1.8-4 .4-5.4l-2-2.3 1.7-2.9H52c2.2 0 4-1.8 4-4v-2.8c0-2.2-1.8-4-4-4h-2.3l-1.7-2.9 2.3-2c1.6-1.4 1.8-4-.4-5.4l-2-1.7c-1.6-1.4-4-1.6-5.4.4l-2.3 2-2.9-1.7V22c0-2.2-1.8-4-4-4h-2.8z"
        />
        <circle cx="32" cy="32" r="10" fill="#1e293b" opacity="0.35" />
        <path
          fill="currentColor"
          opacity="0.55"
          d="M47 12c-1.7 0-3 1.3-3 3v1.5l-2 1.2-1.4-1.6c-1-1.2-2.7-1.3-3.9-.3l-1.3 1.1c-1.2 1-1.3 2.7-.3 3.9l1.4 1.6-1.2 2h-1.8c-1.7 0-3 1.3-3 3v1.8c0 1.7 1.3 3 3 3h1.5l1.2 2-1.6 1.4c-1 1.2-1.1 2.9-.1 4l1.3 1.1c1.1 1 2.9 1.1 4 .1l1.6-1.4 2 1.2v1.7c0 1.7 1.3 3 3 3h1.8c1.7 0 3-1.3 3-3v-1.5l2-1.2 1.4 1.6c1 1.2 2.9 1.3 4 .3l1.3-1.1c1.2-1 1.3-2.7.3-3.9l-1.6-1.4 1.2-2h1.7c1.7 0 3-1.3 3-3v-1.8c0-1.7-1.3-3-3-3h-1.5l-1.2-2 1.6-1.4c1-1.2 1.1-2.9.1-4l-1.3-1.1c-1.1-1-2.9-1.1-4-.1l-1.4 1.6-2-1.2v-1.8c0-1.7-1.3-3-3-3h-1.8z"
        />
        <circle cx="46" cy="18" r="5.5" fill="#334155" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
        <circle cx="46" cy="18" r="2.2" fill="#e2e8f0" />
      </svg>
    </span>
  );
}
