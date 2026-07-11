import { Severity } from "@/lib/types";

const STYLES: Record<Severity, string> = {
  INFO: "bg-signal/10 text-signal border-signal-dim",
  WARNING: "bg-amber/10 text-amber border-amber/30",
  CRITICAL: "bg-flare/10 text-flare border-flare-dim",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono uppercase tracking-wide ${STYLES[severity]}`}>
      {severity}
    </span>
  );
}
