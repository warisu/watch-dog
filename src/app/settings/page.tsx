export default function SettingsPage() {
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold">Settings</h2>
        <p className="text-sm text-ink-500">Notification channels are configured via environment variables, not this UI, so secrets never pass through the browser.</p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-base-600 bg-base-900 p-5">
        <Row name="DISCORD_WEBHOOK_URL" desc="Posts an embed to a Discord channel for every alert." />
        <Row name="TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID" desc="Sends a Markdown message to a Telegram chat." />
        <Row name="INGEST_WEBHOOK_SECRET" desc="Shared secret your mempool bot process signs alerts with." />
      </div>
    </div>
  );
}

function Row({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="border-b border-base-600 pb-3 last:border-0 last:pb-0">
      <p className="font-mono text-sm text-signal">{name}</p>
      <p className="mt-1 text-xs text-ink-500">{desc}</p>
    </div>
  );
}
