import { SeverityBadge } from "@/components/severity-badge";
import { MOCK_RULES } from "@/lib/mock-data";
import { DANGER_SIGNATURES } from "@/lib/scanners/signatures";

export default function RulesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-xl font-bold">Rules</h2>
        <p className="text-sm text-ink-500">Which danger signatures trigger an alert, and at what severity.</p>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_RULES.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-xl border border-base-600 bg-base-900 p-4">
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="font-mono text-xs text-ink-500">{r.signature}</p>
            </div>
            <div className="flex items-center gap-3">
              <SeverityBadge severity={r.severity} />
              <span className={`text-xs font-mono ${r.enabled ? "text-radar" : "text-ink-500"}`}>
                {r.enabled ? "enabled" : "disabled"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-display mb-3 text-sm font-semibold text-ink-300">Available signatures</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {DANGER_SIGNATURES.map((s) => (
            <div key={s.id} className="rounded-xl border border-base-600 bg-base-950 p-4">
              <p className="font-mono text-sm text-ink-100">{s.id}</p>
              <p className="mt-1 text-xs text-ink-500">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
