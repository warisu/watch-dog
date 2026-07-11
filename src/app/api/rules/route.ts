import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const CreateRuleSchema = z.object({
  name: z.string().min(1),
  signature: z.string().min(1),
  severity: z.enum(["INFO", "WARNING", "CRITICAL"]).default("WARNING"),
  enabled: z.boolean().default(true),
  watchlistId: z.string().optional(),
});

export async function GET() {
  try {
    const rules = await prisma.rule.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ rules });
  } catch {
    return NextResponse.json({ rules: [], warning: "DATABASE_URL not reachable." });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = CreateRuleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const rule = await prisma.rule.create({ data: parsed.data });
  return NextResponse.json({ rule }, { status: 201 });
}
