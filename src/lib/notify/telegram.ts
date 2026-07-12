import { AlertDTO } from "../types";

export async function sendTelegramAlert(alert: AlertDTO) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true, reason: "Telegram env vars not configured" };

  const text = [
    `*${alert.severity}*: ${alert.signature}`,
    alert.summary,
    `Chain: ${alert.chain}`,
    `Contract: \`${alert.contract}\``,
    `Tx: \`${alert.txHash}\``,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });

  if (!res.ok) {
    throw new Error(`Telegram send failed: ${res.status} ${await res.text()}`);
  }
  return { skipped: false };
}
