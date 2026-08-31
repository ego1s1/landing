import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limit for /api/contributions — 10 req/min per IP
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/contributions") {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || now > entry.reset) {
      hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    } else {
      entry.count += 1;
      if (entry.count > RATE_LIMIT) {
        return NextResponse.json({ error: "Rate limited" }, { status: 429, headers: { "Retry-After": "60" } });
      }
    }

    // Cleanup old entries occasionally to avoid memory leak
    if (hits.size > 1000) {
      for (const [k, v] of hits.entries()) {
        if (now > v.reset) hits.delete(k);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/contributions"],
};
