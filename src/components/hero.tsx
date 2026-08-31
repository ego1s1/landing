"use client";

import { GitHub } from "./logos/github";
import { LinkedIn } from "./logos/linkedin";
import { Gmail } from "./logos/gmail";
import { GlassButton } from "@/components/ui/glass-button";
import Image from "next/image";
import { useWindowContext } from "@/components/window-context";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, getUserAtHost } from "@/lib/site";

export function Hero() {
  const windowCtx = useWindowContext();

  useEffect(() => {
    windowCtx.registerWindow("hero", {
      title: `user@${SITE_CONFIG.username}: ~ (hero.zsh)`,
      shortTitle: "HOME",
      icon: "󰋜",
    });
    // registerWindow is stable (useCallback), safe to list here
  }, [windowCtx]);

  const heroState = windowCtx.windows["hero"];
  const isClosed = heroState?.isClosed ?? false;
  const isMinimized = heroState?.isMinimized ?? false;

  return (
    <section
      id="hero"
      aria-label="Hero: identity and system info"
      className={cn(
        "w-full bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] overflow-hidden font-mono transition-all duration-300 ease-out origin-left",
        isClosed
          ? "opacity-0 -translate-x-16 scale-95 max-h-0 border-transparent shadow-none pointer-events-none p-0 m-0"
          : isMinimized
          ? "max-h-[42px] opacity-100 translate-x-0 scale-100"
          : "max-h-[2500px] opacity-100 translate-x-0 scale-100"
      )}
    >
      {/* Terminal Header Bar */}
      <div className="bg-[var(--th-surface-alt)] border-b border-[var(--th-border)] px-3.5 py-2 flex items-center justify-between gap-2 text-xs select-none">
        <div className="flex items-center gap-2 min-w-0">
          {/* Traffic lights — the only touch targets in the titlebar */}
          <span className="flex items-center gap-1.5 mr-1 shrink-0">
            <button
              type="button"
              onClick={() => windowCtx.closeWindow("hero")}
              title="Close — dock to sidebar"
              className="size-3 rounded-full bg-[var(--th-red)] hover:bg-[#ff5555] active:scale-90 border border-[var(--th-red)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
            >
              <span className="opacity-0 group-hover:opacity-100">✕</span>
            </button>
            <button
              type="button"
              onClick={() => windowCtx.minimizeWindow("hero")}
              title="Minimise — collapse in-place"
              className="size-3 rounded-full bg-[var(--th-yellow)] hover:bg-[#ffb86c] active:scale-90 border border-[var(--th-yellow)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
            >
              <span className="opacity-0 group-hover:opacity-100">─</span>
            </button>
            <button
              type="button"
              onClick={() => windowCtx.restoreWindow("hero")}
              title="Expand — restore window"
              className="size-3 rounded-full bg-[var(--th-green)] hover:bg-[#50fa7b] active:scale-90 border border-[var(--th-green)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
            >
              <span className="opacity-0 group-hover:opacity-100">┼</span>
            </button>
          </span>
          <span className="text-[var(--th-text-dim)]">user@{SITE_CONFIG.username}:</span>
          <span className="text-[var(--th-cyan)]">~/system_info.zsh</span>
          {isMinimized && (
            <span className="text-[10px] text-[var(--th-yellow)] ml-2">[MINIMIZED]</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isMinimized ? (
            <button
              type="button"
              onClick={() => windowCtx.minimizeWindow("hero")}
              className="text-[var(--th-cyan)] hover:underline cursor-pointer text-[10px] font-bold"
            >
              [EXPAND]
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--th-green)]">
              <span className="size-1.5 rounded-full bg-[var(--th-green)]" />
              ONLINE
            </span>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="p-5 md:p-6 space-y-5">
          {/* Hero identity block — clean, no unnecessary boxes */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-4 border-b border-[var(--th-border-subtle)]/50">
            <div className="flex items-center gap-4">
              {/* Avatar — explicit width/height avoids fill-mode hydration mismatch */}
              <div className="size-20 md:size-24 shrink-0 overflow-hidden rounded-[4px] border border-[var(--th-border)] bg-[var(--th-bg)] shadow-[2px_2px_0px_var(--th-shadow)]">
                <Image
                  src={SITE_CONFIG.avatar}
                  alt={SITE_CONFIG.displayName}
                  width={96}
                  height={96}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Name & role text — plain, no decorative borders */}
              <div className="flex flex-col justify-center gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--th-cyan)] font-bold">❯</span>
                  <h1 className="text-xl md:text-2xl font-extrabold text-[var(--th-text)] tracking-tight">
                    {SITE_CONFIG.displayName}
                  </h1>
                </div>
                <p className="text-xs font-semibold text-[var(--th-cyan)] tracking-wide">
                  Upcoming Embedded Software Intern @ Honeywell Aerospace
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-[11px] text-[var(--th-text-dim)]">
                  <span>ECE @ MIT Manipal &apos;27</span>
                  <span className="text-[var(--th-border-subtle)]">·</span>
                  <span className="text-[var(--th-yellow)]">IEEE Hacksagon &apos;25 Winner</span>
                </div>
              </div>
            </div>

            {/* Social action buttons — boxed because they ARE touch targets */}
            <div className="flex items-center gap-2">
              <GlassButton
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 p-0"
                title="GitHub Profile"
              >
                <GitHub className="size-4" />
                <span className="sr-only">GitHub</span>
              </GlassButton>
              <GlassButton
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 p-0"
                title="LinkedIn Profile"
              >
                <LinkedIn className="size-4" />
                <span className="sr-only">LinkedIn</span>
              </GlassButton>
              <GlassButton
                href={`mailto:${SITE_CONFIG.email}`}
                className="w-9 h-9 p-0"
                title="Send Email"
              >
                <Gmail className="size-4" />
                <span className="sr-only">Email</span>
              </GlassButton>
            </div>
          </div>

          {/* Neofetch panel — ASCII rabbit + system info */}
          <div className="bg-[var(--th-bg)] border border-[var(--th-border-subtle)] rounded-[4px] p-4 font-mono grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* ASCII Rabbit mascot */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center select-none py-3 bg-[var(--th-surface)]/60 border border-[var(--th-border-subtle)]/50 rounded-[3px]">
              <pre className="text-sm text-[var(--th-cyan)] leading-tight font-mono">
{`   (\\_/)
  ( •.• )
 (>  < )
  /   \\
 (_____)`}
              </pre>
              <span className="text-[11px] text-[var(--th-text-dim)] mt-2.5 tracking-wider font-bold">
                {getUserAtHost("macos")}
              </span>
            </div>

            {/* System info fields */}
            <div className="sm:col-span-7 space-y-1.5 text-xs text-[var(--th-text-muted)]">
              <div className="text-[var(--th-accent)] font-bold border-b border-[var(--th-border-subtle)] pb-1 flex justify-between">
                <span>
                  {SITE_CONFIG.shortName.toLowerCase()}@{SITE_CONFIG.username}
                </span>
                <span className="text-[var(--th-cyan)]">──────────────────</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--th-yellow)] w-20 shrink-0 font-bold">OS:</span>
                <span className="text-[var(--th-text)]">Arch Linux / macOS</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--th-green)] w-20 shrink-0 font-bold">HOST:</span>
                <span className="text-[var(--th-text)]">MIT Manipal ECE &apos;27 — CGPA 7.33</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--th-cyan)] w-20 shrink-0 font-bold">ROLE:</span>
                <span className="text-[var(--th-green)] font-semibold">
                  Upcoming Embedded Intern @ Honeywell Aerospace
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--th-purple)] w-20 shrink-0 font-bold">PREV:</span>
                <span className="text-[var(--th-text)]">
                  IT Intern @ Kotak Life · SWE Intern @ Awkward Studio
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--th-red)] w-20 shrink-0 font-bold">HONORS:</span>
                <span className="text-[var(--th-yellow)]">IEEE Hacksagon &apos;25 Winner</span>
              </div>
            </div>
          </div>

          {/* Vim mode status bar footer */}
          <div className="bg-[var(--th-surface-alt)] border border-[var(--th-border-subtle)] px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[var(--th-text-dim)] rounded-[2px]">
            <div className="flex items-center gap-3">
              <span className="bg-[var(--th-accent)] text-[var(--th-bg)] px-1.5 font-bold">NORMAL</span>
              <span className="text-[var(--th-cyan)]">hero.zsh</span>
              <span className="text-[var(--th-green)]">100%</span>
            </div>
            <div className="flex items-center gap-3">
              <span>ln 42, col 1</span>
              <span className="text-[var(--th-yellow)]">:w</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
