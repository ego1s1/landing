"use client";

import { useEffect, useState, useCallback } from "react";
import { useWindowContext } from "@/components/window-context";
import { SITE_CONFIG } from "@/lib/site";
import { cn } from "@/lib/utils";

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  previewUrl?: string | null;
  playedAt?: string;
  isPlaying: boolean;
}

const CACHE_KEY = "spotify-last-7";
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export function SpotifyWindow({ className }: { className?: string }) {
  const windowCtx = useWindowContext();
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  const [current, setCurrent] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    windowCtx.registerWindow("spotify", {
      title: `user@${SITE_CONFIG.username}: spotify — last 7 played`,
      shortTitle: "MUSIC",
      icon: "󰓇",
    });
  }, [windowCtx]);

  const windowState = windowCtx.windows["spotify"];
  const isClosed = windowState?.isClosed ?? false;
  const isMinimized = windowState?.isMinimized ?? false;

  const load = useCallback(async () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { tracks: SpotifyTrack[]; current: SpotifyTrack | null; ts: number };
        if (Date.now() - parsed.ts < CACHE_TTL && parsed.tracks?.length) {
          setTracks(parsed.tracks);
          setCurrent(parsed.current ?? null);
          setLoading(false);
          if (Date.now() - parsed.ts < 60_000) return;
        }
      }
    } catch {}
    try {
      const res = await fetch("/api/spotify", {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(6000),
      });
      if (res.status === 503) {
        setNeedsSetup(true);
        throw new Error("not configured");
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { tracks: SpotifyTrack[]; current: SpotifyTrack | null } | SpotifyTrack;
      // Backwards compat: old API returned single track
      let newTracks: SpotifyTrack[] | null = null;
      let newCurrent: SpotifyTrack | null = null;
      if (Array.isArray((data as { tracks: SpotifyTrack[] }).tracks)) {
        newTracks = (data as { tracks: SpotifyTrack[] }).tracks;
        newCurrent = (data as { tracks: SpotifyTrack[]; current: SpotifyTrack | null }).current ?? null;
      } else if ((data as SpotifyTrack).name) {
        newTracks = [data as SpotifyTrack];
      }
      if (!newTracks?.length) throw new Error("empty");
      setTracks(newTracks);
      setCurrent(newCurrent);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ tracks: newTracks, current: newCurrent, ts: Date.now() }));
      } catch {}
    } catch {
      setTracks((prev) => {
        if (prev?.length) return prev;
        // Mock 7 like reference image
        const mock: SpotifyTrack[] = [
          { name: "Machine Gun", artist: "Infraction", album: "", image: "", url: SITE_CONFIG.github, isPlaying: false },
          { name: "In the Dark", artist: "Infraction", album: "", image: "", url: SITE_CONFIG.github, isPlaying: false },
          { name: "Almost Evil", artist: "Infraction", album: "", image: "", url: SITE_CONFIG.github, isPlaying: false },
          { name: "Falling", artist: "Infraction", album: "", image: "", url: SITE_CONFIG.github, isPlaying: true },
          { name: "Shorty Party", artist: "Cartel De Santa/La Kelly", album: "", image: "", url: SITE_CONFIG.github, isPlaying: false },
          { name: "Y Lo Que Quiero Es Que Pises", artist: "Catupecu Machu", album: "", image: "", url: SITE_CONFIG.github, isPlaying: false },
          { name: "Grandes Ligas", artist: "Lupillo Rivera/Aleman/Santa Fe", album: "", image: "", url: SITE_CONFIG.github, isPlaying: false },
        ];
        setNeedsSetup(true);
        return mock;
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {}
    load();
  }, [load]);

  // Find playing index — current track is the playing one, otherwise Fallings
  const playingIdx = tracks?.findIndex((t) => t.isPlaying) ?? -1;
  const effectiveIdx = playingIdx >= 0 ? playingIdx : tracks?.findIndex((t) => t.name === "Falling") ?? 3;

  return (
    <section
      id="spotify"
      aria-label="Spotify — ncmpcpp"
      className={cn(
        "w-full font-mono transition-all duration-300 ease-out origin-left",
        isClosed
          ? "opacity-0 -translate-x-16 scale-95 max-h-0 border-transparent shadow-none pointer-events-none p-0 m-0 overflow-hidden"
          : isMinimized
            ? "max-h-[42px] opacity-100 translate-x-0 scale-100"
            : "max-h-[600px] opacity-100 translate-x-0 scale-100",
        className
      )}
    >
      <div className="w-full bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] overflow-hidden">
        {/* Header — traffic lights on left, minimal ncmpcpp */}
        <div className="bg-[var(--th-surface-alt)] border-b border-[var(--th-border-subtle)]/20 px-2.5 py-1.5 flex items-center gap-2 text-xs select-none">
          <span className="flex items-center gap-1.5 mr-1 shrink-0">
            <button
              type="button"
              onClick={() => windowCtx.closeWindow("spotify")}
              title="Close"
              className="size-3 rounded-full bg-[var(--th-red)] hover:bg-[#ff5555] border border-[var(--th-red)]/40 flex items-center justify-center cursor-pointer text-[7px] text-[var(--th-bg)] font-bold opacity-80 hover:opacity-100"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={() => windowCtx.minimizeWindow("spotify")}
              title="Minimise"
              className="size-3 rounded-full bg-[var(--th-yellow)] hover:bg-[#ffb86c] border border-[var(--th-yellow)]/40 flex items-center justify-center cursor-pointer text-[7px] text-[var(--th-bg)] font-bold opacity-80 hover:opacity-100"
            >
              ─
            </button>
            <button
              type="button"
              onClick={() => windowCtx.restoreWindow("spotify")}
              title="Expand"
              className="size-3 rounded-full bg-[var(--th-green)] hover:bg-[#50fa7b] border border-[var(--th-green)]/40 flex items-center justify-center cursor-pointer text-[7px] text-[var(--th-bg)] font-bold opacity-80 hover:opacity-100"
            >
              ┼
            </button>
          </span>
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="text-[var(--th-green)] font-bold hidden sm:inline">ncmpcpp</span>
            <span className="text-[var(--th-text-dim)] hidden sm:inline">·</span>
            <span className="text-[var(--th-accent)] font-semibold truncate">spotify — last 7 played tracks</span>
          </span>
          <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-[var(--th-text-dim)] shrink-0">
            <span className="size-1.5 rounded-full bg-[var(--th-green)] animate-pulse" />
            <span>{current?.isPlaying ? "playing" : "paused"}</span>
          </span>
        </div>

        {!isMinimized && (
          <div className="bg-[#1a1b26] sm:bg-[var(--th-bg)]">
            {loading && !tracks ? (
              <div className="p-6 flex flex-col gap-2 animate-pulse">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-3 w-full bg-[var(--th-surface-alt)]/50 rounded" />
                ))}
              </div>
            ) : tracks ? (
              <>
                {/* List — like reference: Title Artist (no album art) */}
                <div className="px-2 sm:px-4 pt-3 pb-2">
                  <div className="flex items-center justify-center gap-8 text-[11px] tracking-widest text-[var(--th-text)]/80 border-b border-[var(--th-border-subtle)]/30 pb-1.5 mb-1 font-bold">
                    <span>Title</span>
                    <span>Artist</span>
                  </div>
                  <div className="space-y-0.5 text-[12px] sm:text-[13px] leading-5 font-mono">
                    {tracks.map((t, idx) => {
                      const isActive = idx === effectiveIdx;
                      return (
                        <a
                          key={`${t.name}-${idx}`}
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`grid grid-cols-2 gap-4 px-1 py-0.5 rounded cursor-pointer transition-colors ${isActive ? "bg-[var(--th-surface-alt)]/40 text-[var(--th-cyan)]" : "text-[var(--th-text-muted)] hover:bg-[var(--th-surface-alt)]/30 hover:text-[var(--th-cyan)]"}`}
                        >
                          <span className={`truncate text-right pr-2 flex items-center justify-end gap-1 ${isActive ? "text-[var(--th-cyan)] font-bold" : ""}`}>
                            {isActive && <span className="text-[var(--th-yellow)]">››</span>}
                            <span className="truncate">{t.name}</span>
                            {isActive && <span className="text-[var(--th-yellow)]">‹‹</span>}
                          </span>
                          <span className={`truncate ${isActive ? "text-[var(--th-cyan)]" : "text-[var(--th-text-dim)] group-hover:text-[var(--th-cyan)]"}`}>{t.artist}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Footer — Playing */}
                <div className="mx-2 sm:mx-3 mb-2 border-t border-[var(--th-border-subtle)]/20 pt-2 flex items-center gap-2 text-[11px] font-mono">
                  <span className="text-[var(--th-text-dim)] hidden sm:inline">Playing:</span>
                  <span className="text-[var(--th-red)]">♥</span>
                  <span className="text-[var(--th-yellow)]">❝</span>
                  <a
                    href={tracks[effectiveIdx]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--th-cyan)] hover:underline truncate"
                  >
                    {tracks[effectiveIdx]?.name ?? "—"}
                  </a>
                  <span className="text-[var(--th-yellow)]">❞</span>
                  <span className="ml-auto text-[var(--th-text-dim)] font-mono text-[11px]">[0:02/3:02]</span>
                </div>
              </>
            ) : null}

            {needsSetup && (
              <div className="mx-2 mb-2 p-2 bg-[var(--th-surface)] border border-[var(--th-border-subtle)]/30 rounded text-[11px] leading-4 text-[var(--th-text-muted)]">
                <p className="font-bold text-[var(--th-yellow)] mb-1">Setup required — showing mock</p>
                <p className="hidden sm:block">
                  Add <code className="bg-[var(--th-bg)] px-1 rounded text-[var(--th-cyan)]">SPOTIFY_CLIENT_ID</code> /{" "}
                  <code className="bg-[var(--th-bg)] px-1 rounded">SPOTIFY_CLIENT_SECRET</code> /{" "}
                  <code className="bg-[var(--th-bg)] px-1 rounded">SPOTIFY_REFRESH_TOKEN</code> then{" "}
                  <button onClick={handleRefresh} className="underline text-[var(--th-accent)]">
                    refresh
                  </button>
                  .
                </p>
              </div>
            )}

            {/* Bottom bar — tiny refresh on left */}
            <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--th-text-dim)] border-t border-[var(--th-border-subtle)]/15 px-2 py-1 bg-[var(--th-surface-alt)]/20">
              <button
                type="button"
                onClick={handleRefresh}
                title="Refresh"
                aria-label="Refresh"
                className="size-4 flex items-center justify-center rounded bg-[var(--th-surface)] border border-[var(--th-border-subtle)] text-[var(--th-text-dim)] hover:text-[var(--th-cyan)] hover:border-[var(--th-cyan)] leading-none"
              >
                ↻
              </button>
              <span className="hidden sm:inline">ncmpcpp 0.9.2</span>
              <span className="hidden sm:inline text-[var(--th-border-subtle)]">│</span>
              <span className="hidden sm:inline">7 tracks</span>
              <span className="ml-auto text-[9px] hidden sm:inline">q: quit</span>
              <span className="ml-auto sm:hidden text-[9px]">spotify</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
