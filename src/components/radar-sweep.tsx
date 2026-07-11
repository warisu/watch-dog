type Blip = { angle: number; radius: number; severity: "INFO" | "WARNING" | "CRITICAL" };

const SEVERITY_COLOR: Record<Blip["severity"], string> = {
  INFO: "#4FA3FF",
  WARNING: "#F5B942",
  CRITICAL: "#FF5D3A",
};

const DEFAULT_BLIPS: Blip[] = [
  { angle: 40, radius: 62, severity: "CRITICAL" },
  { angle: 130, radius: 38, severity: "WARNING" },
  { angle: 210, radius: 78, severity: "INFO" },
  { angle: 300, radius: 50, severity: "WARNING" },
];

export function RadarSweep({ size = 220, blips = DEFAULT_BLIPS }: { size?: number; blips?: Blip[] }) {
  const c = size / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="Live mempool scan">
      <circle cx={c} cy={c} r={c - 2} fill="#0F151C" stroke="#232B35" strokeWidth={1} />
      {[0.33, 0.66, 1].map((f) => (
        <circle key={f} cx={c} cy={c} r={(c - 6) * f} fill="none" stroke="#1A222B" strokeWidth={1} />
      ))}
      <line x1={c} y1={6} x2={c} y2={size - 6} stroke="#1A222B" strokeWidth={1} />
      <line x1={6} y1={c} x2={size - 6} y2={c} stroke="#1A222B" strokeWidth={1} />

      {blips.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180;
        const x = c + b.radius * Math.cos(rad);
        const y = c + b.radius * Math.sin(rad);
        return (
          <circle
            key={i}
            className="radar-blip"
            cx={x}
            cy={y}
            r={4}
            fill={SEVERITY_COLOR[b.severity]}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        );
      })}

      <g className="radar-sweep" style={{ transformOrigin: `${c}px ${c}px` }}>
        <path d={`M ${c} ${c} L ${c} 8 A ${c - 6} ${c - 6} 0 0 1 ${c + (c - 6) * 0.5} ${c - (c - 6) * 0.87} Z`} fill="url(#sweepGradient)" opacity={0.5} />
      </g>
      <defs>
        <radialGradient id="sweepGradient">
          <stop offset="0%" stopColor="#35D28A" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#35D28A" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r={3} fill="#35D28A" />
    </svg>
  );
}
