import { RadarSweep } from "@/components/radar-sweep";
import { StatCard } from "@/components/stat-card";
import { AlertCard } from "@/components/alert-card";
import { MOCK_ALERTS, MOCK_WATCHLISTS } from "@/lib/mock-data";

export default function OverviewPage() {
  const critical = MOCK_ALERTS.filter((a) => a.severity === "CRITICAL" && !a.acknowledged).length;
  const open = MOCK_ALERTS.filter((a) => !a.acknowledged).length;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-base-600 bg-base-900 p-6 md:flex-row md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-radar">early warning system</p>
          <h2 className="font-display mt-2 max-w-lg text-2xl font-bold md:text-3xl">
            Threats surface in the mempool <span className="text-flare">before</span> they're final.
          </h2>
          <p className="mt-3 max-w-md text-sm text-ink-300">
            Sentinel watches pending transactions against {MOCK_WATCHLISTS.length} tracked contracts across Stellar and EVM chains, and fires an alert the moment a danger signature appears.
          </p>
        </div>
        <RadarSweep size={200} />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Open alerts" value={open} accent="amber" sublabel="awaiting review" />
        <StatCard label="Critical" value={critical} accent="flare" sublabel="last 24 hours" />
        <StatCard label="Watchlists" value={MOCK_WATCHLISTS.length} accent="radar" sublabel="contracts tracked" />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-ink-300">Recent alerts</h3>
          <a href="/alerts" className="text-xs text-signal hover:underline">
            View all
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {MOCK_ALERTS.slice(0, 4).map((a) => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
