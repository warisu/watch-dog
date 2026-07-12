export function StatCard({ label, value, sublabel, accent = "ink" }: { label: string; value: string | number; sublabel?: string; accent?: "ink" | "flare" | "radar" | "amber" }) {
  const accentClass = { ink: "text-ink-100", flare: "text-flare", radar: "text-radar", amber: "text-amber" }[accent];
  return (
    <div className="rounded-xl border border-base-600 bg-base-900 p-5 shadow-panel">
      <p className="text-xs uppercase tracking-wide text-ink-500">{label}</p>
      <p className={`font-display mt-2 text-3xl font-bold ${accentClass}`}>{value}</p>
      {sublabel && <p className="mt-1 text-xs text-ink-500">{sublabel}</p>}
    </div>
  );
}
