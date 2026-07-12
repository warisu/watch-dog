# Sentinel Web

A Next.js dashboard for the Sentinel smart-contract watchdog, scaffolded to deploy on Vercel.

## What this is (and isn't)

Vercel runs serverless functions, not long-lived processes. The original Sentinel
architecture's **mempool listener** needs an always-on RPC/websocket connection —
that piece does not belong on Vercel. This scaffold splits the system accordingly:

| Piece | Where it runs | Status here |
|---|---|---|
| **Dashboard** (alerts, watchlists, rules, settings) | Vercel (this repo) | ✅ scaffolded |
| **Alert storage + API** (`/api/alerts`, `/api/watchlists`, `/api/rules`) | Vercel (this repo) | ✅ scaffolded, needs a Postgres URL |
| **Ingest webhook** (`/api/webhooks/mempool`) | Vercel (this repo) | ✅ scaffolded |
| **Mempool listener bot** (connects to RPC nodes, scans pending txs, POSTs to the webhook above) | A long-running host — Railway, Fly.io, a small VPS, or a container | ❌ not included; this is the `apps/bot` piece from the original repo and needs its own deployment target |

So: deploy this repo to Vercel for the dashboard + alert API, then run the actual
mempool-scanning bot elsewhere and point it at `POST /api/webhooks/mempool`.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Prisma + PostgreSQL** for alerts/watchlists/rules storage (works with Vercel Postgres, Neon, or Supabase)
- **Discord / Telegram** notification providers, triggered on ingest

## Local development

```bash
npm install
cp .env.example .env       # fill in DATABASE_URL at minimum
npx prisma migrate dev     # creates tables
npm run dev
```

The dashboard currently renders from mock data in `src/lib/mock-data.ts` so the UI
works before you've connected a database — swap those imports for fetches against
`/api/alerts`, `/api/watchlists`, `/api/rules` once you're ready.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add a Postgres database (Vercel Postgres, or paste a Neon/Supabase `DATABASE_URL`) and set the environment variables from `.env.example` in the Vercel project settings.
4. Deploy. Vercel runs `prisma generate && next build` automatically via the `build` script.
5. Run `npx prisma migrate deploy` once (locally, pointed at the production `DATABASE_URL`, or via a one-off Vercel deploy hook) to create tables in production.

## Wiring up the mempool bot

Wherever you run the actual listener, sign each detection and POST it here:

```ts
import { createHmac } from "crypto";

const body = JSON.stringify({
  chain: "ETHEREUM",
  txHash: "0x...",
  contract: "0x...",
  signature: "removeLiquidity",
  severity: "CRITICAL",
  summary: "82% of pool liquidity withdrawn",
});

const signature = createHmac("sha256", process.env.INGEST_WEBHOOK_SECRET!)
  .update(body)
  .digest("hex");

await fetch("https://your-dashboard.vercel.app/api/webhooks/mempool", {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-sentinel-signature": signature },
  body,
});
```

The route verifies the HMAC signature, stores the alert, and fires Discord/Telegram
notifications if those env vars are set.

## Project structure

```
src/
  app/
    page.tsx              # overview dashboard
    alerts/page.tsx
    watchlists/page.tsx
    rules/page.tsx
    settings/page.tsx
    api/
      alerts/route.ts
      watchlists/route.ts
      rules/route.ts
      webhooks/mempool/route.ts   # bot -> dashboard ingest
      health/route.ts
  components/              # UI: sidebar, topbar, radar signature, cards
  lib/
    prisma.ts
    types.ts
    mock-data.ts
    scanners/signatures.ts # danger signature registry
    notify/discord.ts
    notify/telegram.ts
prisma/schema.prisma        # Watchlist, Rule, Alert, AuditLog
```

## Next steps

- Swap the mock-data reads in each page for real fetches against the API routes (or use Server Components with `prisma` directly).
- Add authentication (NextAuth or Clerk both drop in cleanly) — the current `DASHBOARD_ACCESS_TOKEN` env var is a placeholder, not real auth.
- Build the standalone listener process for `apps/bot` and deploy it to a host that supports long-lived connections.
