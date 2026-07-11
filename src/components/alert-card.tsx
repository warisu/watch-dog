import { AlertDTO } from "@/lib/types";
import { SeverityBadge } from "./severity-badge";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs}h ago`;
}

export function AlertCard({ alert }: { alert: AlertDTO }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-base-600 bg-base-900 p-4">
      <SeverityBadge severity={alert.severity} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display font-semibold">{alert.signature}</span>
          <span className="text-xs text-ink-500">· {alert.chain}</span>
          {alert.acknowledged && (
            <span className="text-xs text-ink-500">· acknowledged</span>
          )}
        </div>
        <p className="mt-1 text-sm text-ink-300">{alert.summary}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink-500">
          <span>contract {alert.contract}</span>
          <span>tx {alert.txHash}</span>
        </div>
      </div>
      <span className="shrink-0 text-xs text-ink-500 font-mono">{timeAgo(alert.createdAt)}</span>
    </div>
  );
}
