"use client";

import { GitHub } from "./logos/github";
import { LinkedIn } from "./logos/linkedin";
import { Gmail } from "./logos/gmail";
import { GlassButton } from "@/components/ui/glass-button";

export function Hero() {
  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-6 rounded-none border-none bg-transparent p-0">
      <div className="flex items-center gap-4">
        <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-2xl border border-white/30 dark:border-white/15 bg-gradient-to-br from-white/70 to-white/40 dark:from-white/10 dark:to-white/5 text-xs font-medium uppercase tracking-[0.4em] text-foreground/60">
          IMG
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-lg font-semibold text-foreground">Priyanshu Sharma</h1>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-foreground/55">
            SOFTWARE DEVELOPER INTERN
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <GlassButton
          href="https://github.com/ego1s1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 p-0"
        >
          <span className="glass-button-icon">
            <GitHub className="size-5" />
          </span>
          <span className="sr-only">GitHub Account</span>
        </GlassButton>
        <GlassButton
          href="https://www.linkedin.com/in/ego1s1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 p-0"
        >
          <span className="glass-button-icon">
            <LinkedIn className="size-5" />
          </span>
          <span className="sr-only">LinkedIn Account</span>
        </GlassButton>
        <GlassButton
          href="mailto:priyanshusharma1803@outlook.com"
          className="w-11 h-11 p-0"
        >
          <span className="glass-button-icon">
            <Gmail className="size-5" />
          </span>
          <span className="sr-only">Send a Mail</span>
        </GlassButton>
      </div>
    </section>
  );
}
