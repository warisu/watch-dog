import Link from "next/link";

const NAV = [
  { href: "/", label: "Overview", icon: "◎" },
  { href: "/alerts", label: "Alerts", icon: "▲" },
  { href: "/watchlists", label: "Watchlists", icon: "◈" },
  { href: "/rules", label: "Rules", icon: "≡" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-base-600 bg-base-900 px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="text-radar text-lg leading-none">◉</span>
        <span className="font-display font-bold text-lg tracking-tight">Sentinel</span>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-300 hover:bg-base-800 hover:text-ink-100 transition-colors"
          >
            <span className="w-4 text-center text-radar/80">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-2 pt-6 text-xs text-ink-500 font-mono">
        v0.1.0 · watchdog scaffold
      </div>
    </aside>
  );
}
