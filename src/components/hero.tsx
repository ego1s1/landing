"use client";

import { GitHub } from "./logos/github";
import { LinkedIn } from "./logos/linkedin";
import { Gmail } from "./logos/gmail";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useWindowContext } from "@/components/window-context";
import { SITE_CONFIG } from "@/lib/site";
import { WindowShell } from "@/components/ui/window-shell";

function HeroHeaderRight() {
  const { windows, minimizeWindow } = useWindowContext();
  const isMinimized = windows["hero"]?.isMinimized ?? false;
  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => minimizeWindow("hero")}
        className="text-[var(--th-cyan)] hover:underline cursor-pointer text-[10px] font-bold"
      >
        [EXPAND]
      </button>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--th-green)]">
      <span className="size-1.5 rounded-full bg-[var(--th-green)]" />
      ONLINE
    </span>
  );
}

export function Hero({ contributionsSlot }: { contributionsSlot?: React.ReactNode }) {
  return (
    <WindowShell
      id="hero"
      title={`user@${SITE_CONFIG.username}: ~ (hero.zsh)`}
      shortTitle="HOME"
      nerdIcon="󰋜"
      headerTitle={
        <>
          <span className="text-[var(--th-text-dim)]">user@{SITE_CONFIG.username}:</span>
          <span className="text-[var(--th-cyan)]">~/system_info.zsh</span>
        </>
      }
      minimizedHint={<span className="text-[10px] text-[var(--th-yellow)] ml-2">[MINIMIZED]</span>}
      headerRight={<HeroHeaderRight />}
      contentClassName="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4"
      expandedMaxHeight="max-h-[2500px]"
    >
      {/* Hero identity block — cozy, compact, mobile-optimized */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-[var(--th-border-subtle)]/10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="size-16 sm:size-20 md:size-24 shrink-0 overflow-hidden rounded-[4px] border border-[var(--th-border-subtle)]/30 bg-[var(--th-bg)] shadow-[2px_2px_0px_var(--th-shadow)]/50">
            <Image
              src={SITE_CONFIG.avatar}
              alt={SITE_CONFIG.displayName}
              width={96}
              height={96}
              priority
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center gap-0.5 sm:gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--th-cyan)] font-bold text-sm sm:text-base">❯</span>
              <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[var(--th-text)] tracking-tight">
                {SITE_CONFIG.displayName}
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-[var(--th-cyan)] tracking-wide leading-tight">
              Upcoming Embedded Software Intern @ Honeywell Aerospace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-end">
          <Button href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 p-0" title="GitHub Profile">
            <GitHub className="size-3.5 sm:size-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 p-0" title="LinkedIn Profile">
            <LinkedIn className="size-3.5 sm:size-4" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button href={`mailto:${SITE_CONFIG.email}`} className="w-8 h-8 sm:w-9 sm:h-9 p-0" title="Send Email">
            <Gmail className="size-3.5 sm:size-4" />
            <span className="sr-only">Email</span>
          </Button>
        </div>
      </div>

      <div className="bg-[var(--th-surface)]/40 rounded-[4px] p-1.5 font-mono grid grid-cols-1 lg:grid-cols-12 gap-2 items-stretch">
        <div className="lg:col-span-6 flex flex-col select-none p-1 bg-[var(--th-bg)] rounded-[3px] overflow-hidden h-full min-h-[180px] self-stretch w-full max-w-[420px] mx-auto lg:mx-0 lg:max-w-none border border-[var(--th-border-subtle)]/15">
          {contributionsSlot ?? null}
        </div>

        <div className="lg:col-span-6 space-y-1 text-[11px] lg:text-xs text-[var(--th-text-muted)] flex flex-col justify-center">
          <div className="text-[var(--th-accent)] font-bold border-b border-[var(--th-border-subtle)] pb-1 flex justify-between text-[11px]">
            <span>
              {SITE_CONFIG.shortName.toLowerCase()}@{SITE_CONFIG.username}
            </span>
            <span className="text-[var(--th-cyan)]">──────────────────</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-[var(--th-yellow)] w-14 sm:w-16 shrink-0 font-bold">OS:</span>
            <span className="text-[var(--th-text)] leading-tight">Arch Linux / macOS</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-[var(--th-purple)] w-14 sm:w-16 shrink-0 font-bold">DEVICE:</span>
            <span className="text-[var(--th-text)] leading-tight">Apple MacBook Air M2</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-[var(--th-green)] w-14 sm:w-16 shrink-0 font-bold">HOST:</span>
            <span className="text-[var(--th-text)] leading-tight">MIT Manipal ECE &apos;27 — CGPA 7.33</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-[var(--th-cyan)] w-14 sm:w-16 shrink-0 font-bold">ROLE:</span>
            <span className="text-[var(--th-green)] font-semibold leading-tight">Upcoming Embedded Intern @ Honeywell Aerospace</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-[var(--th-purple)] w-14 sm:w-16 shrink-0 font-bold">PREV:</span>
            <span className="text-[var(--th-text)] leading-tight">IT Intern @ Kotak Life · SWE Intern @ Awkward Studio</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-[var(--th-red)] w-14 sm:w-16 shrink-0 font-bold">HONORS:</span>
            <span className="text-[var(--th-yellow)] leading-tight">IEEE Hacksagon &apos;25 Winner</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--th-surface-alt)]/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[var(--th-text-dim)] rounded-[2px]">
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
    </WindowShell>
  );
}
