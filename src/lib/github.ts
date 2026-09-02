import { z } from "zod";
import { SITE_CONFIG } from "@/lib/site";
import { GH_CACHE_TTL_MS, GH_CONTRIB_WEEKS } from "@/lib/constants";

// Shared types + fetcher for Vercel Data Cache / ISR.
// Used by both the API route and server components so the fetch is deduplicated
// via Vercel's Data Cache (next.revalidate) and only hits the upstream
// https://github-contributions-api.jogruber.de every 6 hours globally.

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionsData {
  total: Record<string, number> | number;
  contributions: ContributionDay[];
}

const ContributionDaySchema = z.object({
  date: z.string(),
  count: z.number().int().min(0).max(100),
  level: z.number().int().min(0).max(4),
});

const ContributionsResponseSchema = z.object({
  total: z.union([z.number(), z.record(z.string(), z.number())]),
  contributions: z.array(ContributionDaySchema).max(500),
});

// Revalidate window: 6h matches API route + CDN s-maxage
export const GH_REVALIDATE_SECONDS = 21600;

// Deterministic mock for build fallback / offline — same as client mock
export function generateMockContributions(): ContributionsData {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = GH_CONTRIB_WEEKS * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const seed = d.getDate() + d.getMonth() * 3;
    const count = seed % 7 === 0 ? 5 : seed % 5 === 0 ? 3 : seed % 3 === 0 ? 1 : 0;
    const level = count === 0 ? 0 : count >= 5 ? 4 : count >= 3 ? 3 : count >= 1 ? 2 : 1;
    days.push({ date: d.toISOString().slice(0, 10), count, level });
  }
  const total = days.reduce((a, d) => a + d.count, 0);
  return { total, contributions: days };
}

/**
 * Server-only fetch with Vercel Data Cache. Returns validated + capped data
 * or null on failure (caller should fallback to mock/placeholder).
 * Must be called from server components / route handlers.
 */
export async function getContributions(): Promise<ContributionsData | null> {
  const username = SITE_CONFIG.githubUsername;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      // Vercel Data Cache — globally cached 6h, no per-request upstream hit
      next: { revalidate: GH_REVALIDATE_SECONDS },
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const json = await res.json();
    const parsed = ContributionsResponseSchema.safeParse(json);
    if (!parsed.success) return null;

    const capped = {
      total: parsed.data.total,
      contributions: parsed.data.contributions.slice(-400),
    };
    return capped;
  } catch {
    return null;
  }
}

// Client helper: read cached value if fresh
export function readGhCache(): { data: ContributionsData; ts: number } | null {
  try {
    const raw = localStorage.getItem(`gh-contribs-${SITE_CONFIG.githubUsername}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: ContributionsData; ts: number };
    if (Date.now() - parsed.ts > GH_CACHE_TTL_MS) return null;
    if (!parsed.data?.contributions?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}
