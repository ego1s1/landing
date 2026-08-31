"use client";

import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("w-full max-w-3xl mx-auto p-5 font-mono", className)}>
      <div className="bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--th-text-muted)]">
          <span className="text-[var(--th-cyan)]">user@{SITE_CONFIG.username}:~$</span>
          <span>Built with ❤️ by {SITE_CONFIG.displayName}</span>
        </div>
        <div className="mt-2 text-[10px] text-[var(--th-text-dim)] flex items-center justify-center gap-3">
          <span>PROCESS: EXIT 0</span>
          <span>•</span>
          <span>TTY: /dev/pts/0</span>
          <span>•</span>
          <span>TOKYONIGHT STORM</span>
        </div>
      </div>
    </footer>
  );
}
