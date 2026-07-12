export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-base-600 bg-base-900/60 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-display text-lg font-semibold">Overview</h1>
        <p className="text-xs text-ink-500">Mempool watchdog for Stellar &amp; EVM contracts</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-radar-dim bg-radar/10 px-3 py-1.5 text-xs font-mono text-radar">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-radar opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-radar" />
        </span>
        LIVE
      </div>
    </header>
  );
}
