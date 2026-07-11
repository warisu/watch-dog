import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "connected", time: new Date().toISOString() });
  } catch {
    return NextResponse.json({ status: "degraded", db: "unreachable", time: new Date().toISOString() }, { status: 200 });
  }
}
