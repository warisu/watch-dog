import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const CreateAlertSchema = z.object({
  chain: z.enum(["STELLAR", "ETHEREUM", "POLYGON", "BASE", "ARBITRUM", "OPTIMISM"]),
  txHash: z.string().min(1),
  contract: z.string().min(1),
  signature: z.string().min(1),
  severity: z.enum(["INFO", "WARNING", "CRITICAL"]),
  summary: z.string().min(1),
  watchlistId: z.string().optional(),
  raw: z.unknown().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const severity = searchParams.get("severity") ?? undefined;
  const limit = Number(searchParams.get("limit") ?? 50);

  try {
    const alerts = await prisma.alert.findMany({
      where: severity ? { severity: severity as any } : undefined,
      orderBy: { createdAt: "desc" },
      take: Math.min(limit, 200),
    });
    return NextResponse.json({ alerts });
  } catch (err) {
    // Database not yet provisioned — this keeps local/dev usable before DATABASE_URL is set.
    return NextResponse.json(
      { alerts: [], warning: "DATABASE_URL not reachable; connect a Postgres instance to persist alerts." },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = CreateAlertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const alert = await prisma.alert.create({ data: parsed.data as any });
  return NextResponse.json({ alert }, { status: 201 });
}
