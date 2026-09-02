"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useWindowContext } from "@/components/window-context";
import { SITE_CONFIG } from "@/lib/site";
import LZString from "lz-string";
import { WindowShell } from "@/components/ui/window-shell";

export function BadAppleSkeleton() {
  return (
    <div className="w-full bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] overflow-hidden font-mono">
      <div className="bg-[var(--th-surface-alt)] border-b border-[var(--th-border-subtle)]/20 px-2.5 py-1.5 flex items-center gap-2 text-xs select-none">
        <span className="flex items-center gap-1.5 mr-1 shrink-0">
          <span className="size-3 rounded-full bg-[var(--th-red)]/60" />
          <span className="size-3 rounded-full bg-[var(--th-yellow)]/60" />
          <span className="size-3 rounded-full bg-[var(--th-green)]/60" />
        </span>
        <span className="text-[var(--th-text-dim)] text-[11px] tracking-wide">∷</span>
      </div>
      <div className="bg-[var(--th-bg)] p-6 flex items-center justify-center min-h-[280px]">
        <div className="size-2 rounded-full bg-[var(--th-cyan)]/40 animate-pulse" />
      </div>
    </div>
  );
}

export function BadAppleWindow({ className }: { className?: string }) {
  const windowCtx = useWindowContext();
  const [frames, setFrames] = useState<string[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const outRef = useRef<HTMLPreElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const playingRef = useRef(false);
  const prevMinimizedRef = useRef(true);

  const fps = 30;
  const frameDuration = 1000 / fps;

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const state = windowCtx.windows["badapple"];
  const isClosed = state?.isClosed ?? false;
  // Before registration, defaultMinimized true => treat as minimized
  const isMinimized = state ? state.isMinimized : true;

  // Fetch & decompress — cached by browser/Vercel edge
  useEffect(() => {
    let cancelled = false;
    fetch("/bad_apple/framesData.lz")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((data) => {
        if (cancelled) return;
        const decompressed = LZString.decompressFromBase64(data);
        if (!decompressed) throw new Error("decompress failed");
        const parsed = JSON.parse(decompressed) as string[];
        if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("empty frames");
        setFrames(parsed);
      })
      .catch((e) => {
        if (!cancelled) setLoadError((e as Error).message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Responsive sizing — 100 cols × 41 rows
  useEffect(() => {
    if (isMinimized || isClosed) return;
    const el = outRef.current;
    const container = viewportRef.current;
    if (!el || !container) return;
    const adjust = () => {
      if (!el || !container) return;
      const w = Math.min(container.clientWidth - 16, 640);
      const size = Math.max(3.0, Math.min(5.8, w / 100));
      el.style.fontSize = size + "px";
      el.style.lineHeight = "1";
      el.style.letterSpacing = "0";
    };
    adjust();
    const ro = new ResizeObserver(adjust);
    ro.observe(container);
    window.addEventListener("resize", adjust);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", adjust);
    };
  }, [isMinimized, isClosed, frames]);

  const renderAt = useCallback(
    (elapsed: number) => {
      if (!frames || !outRef.current) return;
      const idx = Math.min(Math.floor(elapsed / frameDuration), frames.length - 1);
      const pct = frames.length ? (idx / (frames.length - 1)) * 100 : 0;
      setProgress(pct);
      outRef.current.textContent = frames[idx].replace(/\\n/g, "\n");
    },
    [frames, frameDuration]
  );

  const start = useCallback(() => {
    if (!frames?.length) return;
    const audio = audioRef.current;
    setPlaying(true);
    startTimeRef.current = performance.now() - (audio?.currentTime || 0) * 1000;
    const tick = () => {
      const audioEl = audioRef.current;
      const elapsed = performance.now() - startTimeRef.current;
      const t = audioEl && !audioEl.paused && audioEl.currentTime ? audioEl.currentTime * 1000 : elapsed;
      renderAt(t);
      if (t < frames.length * frameDuration - 16) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPlaying(false);
        setProgress(100);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    if (audio) audio.play().catch(() => {});
  }, [frames, frameDuration, renderAt]);

  const pause = useCallback(() => {
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
    if (audioRef.current) audioRef.current.pause();
  }, []);

  const toggle = useCallback(() => {
    if (playingRef.current) pause();
    else start();
  }, [start, pause]);

  // Auto-play only on transition from minimised -> expanded
  useEffect(() => {
    const wasMinimized = prevMinimizedRef.current;
    prevMinimizedRef.current = isMinimized;
    if (isClosed || isMinimized) {
      pause();
      return;
    }
    if (wasMinimized && !isMinimized && frames?.length && !playingRef.current) {
      const id = setTimeout(() => start(), 220);
      return () => clearTimeout(id);
    }
  }, [isMinimized, isClosed, frames, start, pause]);

  // Audio event sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(100);
      cancelAnimationFrame(rafRef.current);
    };
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [frames]);

  // Keyboard
  useEffect(() => {
    if (isMinimized || isClosed) return;
    const el = viewportRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") pause();
    };
    // Focus the viewport so space works without extra tab
    el.focus();
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [isMinimized, isClosed, toggle, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  return (
    <WindowShell
      id="badapple"
      title={`user@${SITE_CONFIG.username}: ~/.secret — zsh`}
      shortTitle="∷"
      nerdIcon="󰊠"
      defaultMinimized
      headerClickableWhenMinimized
      headerTitle={
        <>
          <span className="text-[var(--th-text-dim)] hidden sm:inline text-[11px]">∷</span>
          <span className="text-[var(--th-text-dim)] hidden sm:inline">·</span>
          <span className="text-[var(--th-text-dim)] text-[11px] truncate hidden sm:inline">.secret</span>
          <span className="text-[var(--th-text-dim)]/50 text-[10px] truncate sm:hidden">∷</span>
        </>
      }
      headerRight={
        isMinimized ? (
          <span className="flex items-center gap-1.5 text-[10px] text-[var(--th-text-dim)]/60">
            <span className="hidden sm:inline">—</span>
            <span className="text-[var(--th-cyan)]/70 hidden sm:inline">click to reveal</span>
            <span className="sm:hidden text-[var(--th-cyan)]/70">○</span>
          </span>
        ) : (
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-[var(--th-text-dim)]/70 shrink-0">
            <span className={`size-1.5 rounded-full ${playing ? "bg-[var(--th-green)] animate-pulse" : "bg-[var(--th-border-subtle)]"}`} />
            <span className="tabular-nums">{playing ? "●" : "○"}</span>
          </span>
        )
      }
      minimizedHint={null}
      className={className}
      headerClassName="px-2.5 py-1.5"
      contentClassName="!p-0"
      expandedMaxHeight="max-h-[760px]"
      onCloseExtra={pause}
      onMinimizeExtra={pause}
    >
      <div className="bg-[var(--th-bg)] transition-colors duration-400">
        {!frames && !loadError ? (
          <div className="flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] p-6 bg-[var(--th-bg)]">
            <div className="flex flex-col items-center gap-3">
              <span className="size-1.5 rounded-full bg-[var(--th-cyan)]/50 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] text-[var(--th-text-dim)]/50">∷</span>
            </div>
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center min-h-[320px] p-6 text-center gap-2 bg-[var(--th-bg)]">
            <span className="text-[var(--th-red)] text-[11px] font-bold">∷ error</span>
            <span className="text-[var(--th-text-dim)] text-[10px] font-mono break-all">{loadError}</span>
          </div>
        ) : (
          <div
            ref={viewportRef}
            tabIndex={0}
            className="relative group/viewport bg-[var(--th-bg)] flex justify-center items-center overflow-hidden transition-colors duration-400 outline-none"
          >
            <pre
              ref={outRef}
              className="m-0 p-2 sm:p-3 font-mono whitespace-pre text-center overflow-hidden flex justify-center items-center w-full select-none transition-colors duration-400"
              style={{
                fontSize: "4px",
                lineHeight: "1",
                minHeight: "320px",
                width: "100%",
                backgroundColor: "var(--th-bg)",
                color: "var(--th-cyan)",
              }}
            >
              {frames?.[0]?.replace(/\\n/g, "\n") ?? ""}
            </pre>

            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--th-bg)]/45 backdrop-blur-[0.5px] pointer-events-none transition-colors duration-400">
                <span className="size-9 sm:size-10 rounded-full bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[2px_2px_0px_var(--th-shadow)] text-[var(--th-cyan)] flex items-center justify-center text-[11px] pl-0.5">
                  ▶
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={toggle}
              className="absolute inset-0 w-full h-full bg-transparent border-0 cursor-pointer"
              aria-label={playing ? "Pause" : "Play"}
            />
            <audio ref={audioRef} preload="auto" className="hidden">
              <source src="/bad_apple/bad_apple.mp3" type="audio/mpeg" />
            </audio>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--th-border-subtle)]/20">
              <div className="h-full bg-[var(--th-cyan)] transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </WindowShell>
  );
}
