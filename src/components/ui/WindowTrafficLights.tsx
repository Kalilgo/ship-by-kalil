export function WindowTrafficLights({
  labels,
  onClose,
  onMinimize,
  onMaximize,
  hideMaximize,
}: {
  labels: { close: string; minimize: string; maximize: string };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize?: () => void;
  hideMaximize?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={labels.close}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="group/dot relative flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-red-500/90 transition hover:bg-red-500 active:scale-90 active:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80"
      >
        <span className="pointer-events-none absolute inset-0 grid place-items-center text-[9px] font-bold leading-none text-red-950 opacity-0 transition group-hover/dot:opacity-100">
          ×
        </span>
      </button>
      <button
        type="button"
        aria-label={labels.minimize}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        className="group/dot relative flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-yellow-500/90 transition hover:bg-yellow-500 active:scale-90 active:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
      >
        <span className="pointer-events-none absolute inset-0 grid place-items-center text-[9px] font-bold leading-none text-amber-950 opacity-0 transition group-hover/dot:opacity-100">
          −
        </span>
      </button>
      {!hideMaximize && onMaximize ? (
        <button
          type="button"
          aria-label={labels.maximize}
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          className="group/dot relative flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-green-500/90 transition hover:bg-green-500 active:scale-90 active:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80"
        >
          <span className="pointer-events-none absolute inset-0 grid place-items-center text-[8px] font-bold leading-none text-emerald-950 opacity-0 transition group-hover/dot:opacity-100">
            +
          </span>
        </button>
      ) : null}
    </div>
  );
}
