import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendDiscordAlert } from "@/lib/notify/discord";
import { sendTelegramAlert } from "@/lib/notify/telegram";
import { AlertDTO } from "@/lib/types";

export const runtime = "nodejs";

/**
 * This is the ingest boundary between the Vercel-hosted dashboard and a
 * separately-run mempool listener process (the "bot" from the original
 * Sentinel architecture). A long-lived RPC/websocket listener does not fit
 * Vercel's serverless model, so run that piece on a VPS, Fly.io, or Railway,
 * and have it POST each detection here.
 *
 * Requests must include an `x-sentinel-signature` header computed as
 * hex(HMAC_SHA256(INGEST_WEBHOOK_SECRET, rawBody)).
 */
function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.INGEST_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-sentinel-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const alert = await prisma.alert.create({
    data: {
      chain: payload.chain,
      txHash: payload.txHash,
      contract: payload.contract,
      signature: payload.signature,
      severity: payload.severity,
      summary: payload.summary,
      raw: payload.raw ?? undefined,
      watchlistId: payload.watchlistId ?? undefined,
    },
  });

  const dto: AlertDTO = {
    id: alert.id,
    chain: alert.chain as any,
    txHash: alert.txHash,
    contract: alert.contract,
    signature: alert.signature,
    severity: alert.severity as any,
    summary: alert.summary,
    acknowledged: alert.acknowledged,
    createdAt: alert.createdAt.toISOString(),
  };

  const results = await Promise.allSettled([sendDiscordAlert(dto), sendTelegramAlert(dto)]);

  return NextResponse.json({ alert, notifications: results.map((r) => r.status) }, { status: 201 });
}
