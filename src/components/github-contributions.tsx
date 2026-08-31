"use client";

import { useEffect, useState, useCallback } from "react";
import { SITE_CONFIG } from "@/lib/site";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: Record<string, number> | number;
  contributions: ContributionDay[];
}

const CACHE_KEY = `gh-contribs-${SITE_CONFIG.githubUsername}`;
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

// Theme-aware level colors — uses --th-green with opacity steps
function levelClass(level: number): string {
  switch (level) {
    case 0:
      return "bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/30";
    case 1:
      return "bg-[var(--th-green)]/30 border border-[var(--th-green)]/20";
    case 2:
      return "bg-[var(--th-green)]/55 border border-[var(--th-green)]/30";
    case 3:
      return "bg-[var(--th-green)]/85 border border-[var(--th-green)]/40";
    case 4:
      return "bg-[var(--th-green)] border border-[var(--th-green)]";
    default:
      return "bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/30";
  }
}

// Fallback mock — last 26 weeks (half width, taller)
function generateMock(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 26 * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // pseudo-random but deterministic by date for stable mock
    const seed = d.getDate() + d.getMonth() * 3;
    const count = seed % 7 === 0 ? 5 : seed % 5 === 0 ? 3 : seed % 3 === 0 ? 1 : 0;
    const level = count === 0 ? 0 : count >= 5 ? 4 : count >= 3 ? 3 : count >= 1 ? 2 : 1;
    days.push({ date: d.toISOString().slice(0, 10), count, level });
  }
  return days;
}

export function GitHubContributions() {
  const [days, setDays] = useState<ContributionDay[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    // 1. Try cache first for instant paint
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { data: ContributionsData; ts: number };
        if (Date.now() - parsed.ts < CACHE_TTL_MS && parsed.data?.contributions?.length) {
          const lastWeeks = parsed.data.contributions.slice(-26 * 7);
          setDays(lastWeeks);
          const t = typeof parsed.data.total === "number" ? parsed.data.total : Object.values(parsed.data.total as Record<string, number>).reduce((a, b) => a + b, 0);
          setTotal(t);
          setLoading(false);
          if (Date.now() - parsed.ts < 1000 * 60 * 60) return;
        }
      }
    } catch {
      // ignore cache parse errors
    }

    // 2. Fetch fresh — try primary API, fallback to mock
    try {
      const username = SITE_CONFIG.githubUsername;
      // Primary: jogruber.de — CORS enabled, no auth
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ContributionsData;
      const contribs = data.contributions;
      if (!contribs?.length) throw new Error("empty");
      const lastWeeks = contribs.slice(-26 * 7);
      setDays(lastWeeks);
      const t = typeof data.total === "number" ? data.total : Object.values(data.total as Record<string, number>).reduce((a, b) => a + b, 0);
      setTotal(t);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch {
      // Fallback to mock for offline / API down — keeps UI cozy and fast
      const mock = generateMock();
      setDays(mock);
      setTotal(mock.reduce((a, d) => a + d.count, 0));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Cozy viewport — 26 weeks, 7 rows, tiny squares, no scrollbars
  const weeks: ContributionDay[][] = [];
  if (days) {
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
  }

  const totalLabel = total !== null ? `${total.toLocaleString()} contributions` : "—";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header — half width, slightly larger */}
      <div className="flex items-center justify-between px-1.5 py-1 text-[11px] font-mono shrink-0">
        <span className="flex items-center gap-1 text-[var(--th-text)] font-semibold truncate">
          <span className="text-[var(--th-green)] text-[12px]">▣</span>
          <span className="truncate">{totalLabel}</span>
          <span className="hidden sm:inline text-[var(--th-text-dim)] font-normal">· 26w</span>
        </span>
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[var(--th-text-dim)] hover:text-[var(--th-cyan)] underline decoration-dotted underline-offset-2 shrink-0 ml-2"
        >
          @{SITE_CONFIG.githubUsername} ↗
        </a>
      </div>

      {/* Grid — half width, taller, larger squares */}
      <div className="flex-1 flex items-center justify-center px-1.5 py-1 overflow-hidden">
        {loading && !days ? (
          <div className="flex gap-1 w-fit max-w-full opacity-60 animate-pulse justify-center">
            {Array.from({ length: 26 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="size-2 rounded-[1px] bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)]/20" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-1 w-fit max-w-full justify-center overflow-hidden mx-auto">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} on ${day.date}`}
                    className={`size-2 rounded-[1px] shrink-0 ${levelClass(day.level)} transition-colors`}
                  />
                ))}
                {week.length < 7 &&
                  Array.from({ length: 7 - week.length }).map((_, i) => (
                    <div key={`pad-${wi}-${i}`} className="size-2 shrink-0 bg-transparent" />
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer — legend */}
      <div className="flex items-center justify-between px-1.5 py-1 text-[10px] font-mono text-[var(--th-text-dim)] border-t border-[var(--th-border-subtle)]/15 shrink-0">
        <span className="flex items-center gap-0.5">
          <span className={`size-2.5 rounded-[1px] ${levelClass(0)}`} />
          <span className={`size-2.5 rounded-[1px] ${levelClass(1)}`} />
          <span className={`size-2.5 rounded-[1px] ${levelClass(2)}`} />
          <span className={`size-2.5 rounded-[1px] ${levelClass(3)}`} />
          <span className={`size-2.5 rounded-[1px] ${levelClass(4)}`} />
        </span>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1 text-[var(--th-text-dim)]/60 text-[10px]">
          <span className="size-1.5 rounded-full bg-[var(--th-green)] animate-pulse" />
          cached
        </span>
      </div>
    </div>
  );
}
