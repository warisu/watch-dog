import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const CreateWatchlistSchema = z.object({
  label: z.string().min(1),
  chain: z.enum(["STELLAR", "ETHEREUM", "POLYGON", "BASE", "ARBITRUM", "OPTIMISM"]),
  address: z.string().min(1),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const watchlists = await prisma.watchlist.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ watchlists });
  } catch {
    return NextResponse.json({ watchlists: [], warning: "DATABASE_URL not reachable." });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = CreateWatchlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const watchlist = await prisma.watchlist.create({ data: parsed.data });
  return NextResponse.json({ watchlist }, { status: 201 });
}
