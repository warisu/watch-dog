import { AlertCard } from "@/components/alert-card";
import { MOCK_ALERTS } from "@/lib/mock-data";

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold">Alerts</h2>
        <p className="text-sm text-ink-500">
          Every danger signature detected in the mempool, newest first. Wire this page up to{" "}
          <code className="font-mono text-xs text-ink-300">GET /api/alerts</code> once your database is connected.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {MOCK_ALERTS.map((a) => (
          <AlertCard key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
}
