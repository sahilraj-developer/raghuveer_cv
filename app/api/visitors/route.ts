import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const dataFile = path.join(process.cwd(), ".data", "visitors.json");

async function readCount() {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const value = JSON.parse(raw) as { count?: number };
    return Number.isFinite(value.count) ? Number(value.count) : 0;
  } catch {
    return 0;
  }
}

async function saveCount(count: number) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify({ count, updatedAt: new Date().toISOString() }), "utf8");
}

let updateQueue: Promise<void> = Promise.resolve();

async function incrementCount() {
  const count = await readCount();
  const nextCount = Math.min(Number.MAX_SAFE_INTEGER, count + 1);
  await saveCount(nextCount);
}

export async function GET(request: NextRequest) {
  const isReturningVisitor = Boolean(request.cookies.get("raghuveer_visitor")?.value);
  let count = await readCount();

  if (!isReturningVisitor) {
    const update = updateQueue.then(incrementCount, incrementCount);
    updateQueue = update;
    await update;
    count = await readCount();
  }

  const response = NextResponse.json(
    { count },
    { headers: { "Cache-Control": "no-store, private" } },
  );
  if (!isReturningVisitor) {
    response.cookies.set("raghuveer_visitor", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }
  return response;
}
