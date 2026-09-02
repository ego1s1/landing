import { NextResponse } from "next/server";
import { getContributions, GH_REVALIDATE_SECONDS } from "@/lib/github";

export const revalidate = 21600; // 6 hours ISR — Vercel Data Cache + CDN

export async function GET() {
  try {
    const data = await getContributions();

    if (!data) {
      return NextResponse.json({ error: "Upstream failed" }, { status: 502 });
    }

    return NextResponse.json(data, {
      headers: {
        // Vercel CDN: serve stale for 1h while revalidating, allow stale-if-error for 24h
        "Cache-Control": `public, s-maxage=${GH_REVALIDATE_SECONDS}, stale-while-revalidate=3600, stale-if-error=86400`,
        "CDN-Cache-Control": `public, s-maxage=${GH_REVALIDATE_SECONDS}, stale-while-revalidate=3600`,
        "Vercel-CDN-Cache-Control": `public, s-maxage=${GH_REVALIDATE_SECONDS}, stale-while-revalidate=3600`,
      },
    });
  } catch (err) {
    const message = err instanceof Error && err.name === "AbortError" ? "Upstream timeout" : "Upstream failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
