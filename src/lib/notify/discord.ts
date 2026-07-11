import { AlertDTO } from "../types";

const SEVERITY_EMOJI: Record<string, string> = {
  INFO: "🔵",
  WARNING: "🟠",
  CRITICAL: "🚨",
};

export async function sendDiscordAlert(alert: AlertDTO) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return { skipped: true, reason: "DISCORD_WEBHOOK_URL not configured" };

  const emoji = SEVERITY_EMOJI[alert.severity] ?? "🔵";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: `${emoji} ${alert.severity}: ${alert.signature}`,
          description: alert.summary,
          color: alert.severity === "CRITICAL" ? 0xff5d3a : alert.severity === "WARNING" ? 0xf5b942 : 0x4fa3ff,
          fields: [
            { name: "Chain", value: alert.chain, inline: true },
            { name: "Contract", value: alert.contract, inline: true },
            { name: "Tx", value: alert.txHash, inline: false },
          ],
          timestamp: alert.createdAt,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Discord webhook failed: ${res.status} ${await res.text()}`);
  }
  return { skipped: false };
}
