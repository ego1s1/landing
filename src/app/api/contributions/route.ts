import { NextResponse } from "next/server";
import { z } from "zod";
import { SITE_CONFIG } from "@/lib/site";

export const revalidate = 21600; // 6 hours ISR

const ContributionDaySchema = z.object({
  date: z.string(),
  count: z.number().int().min(0).max(100),
  level: z.number().int().min(0).max(4),
});

const ContributionsResponseSchema = z.object({
  total: z.union([z.number(), z.record(z.string(), z.number())]),
  contributions: z.array(ContributionDaySchema).max(500),
});

export async function GET() {
  const username = SITE_CONFIG.githubUsername;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 });
    }

    const json = await res.json();
    const parsed = ContributionsResponseSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid upstream shape" }, { status: 502 });
    }

    // Cap to avoid DOM DoS if upstream is poisoned
    const capped = {
      total: parsed.data.total,
      contributions: parsed.data.contributions.slice(-400),
    };

    return NextResponse.json(capped, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error && err.name === "AbortError" ? "Upstream timeout" : "Upstream failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
