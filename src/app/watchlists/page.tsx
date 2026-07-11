import { MOCK_WATCHLISTS } from "@/lib/mock-data";

export default function WatchlistsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold">Watchlists</h2>
        <p className="text-sm text-ink-500">Contracts Sentinel is tracking across chains.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-base-600">
        <table className="w-full text-left text-sm">
          <thead className="bg-base-900 text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Chain</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_WATCHLISTS.map((w) => (
              <tr key={w.id} className="border-t border-base-600 bg-base-950 hover:bg-base-900">
                <td className="px-4 py-3 font-medium">{w.label}</td>
                <td className="px-4 py-3 text-ink-300">{w.chain}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-300">{w.address}</td>
                <td className="px-4 py-3 text-ink-500">{w.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
