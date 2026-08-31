"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site";
import { useWindowContext } from "@/components/window-context";

interface TextScrollProps {
  text: string;
  className?: string;
  textClassName?: string;
}

/**
 * Word-wrap text to a given column width (like real cowsay does).
 * Returns an array of lines, each at most `maxWidth` chars.
 */
function wordWrap(text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (current.length === 0) {
      current = word;
    } else if (current.length + 1 + word.length <= maxWidth) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * CowsayQuote — renders the site quote in a proper cowsay terminal card.
 * Text is word-wrapped at 55 chars so it always fits inside the speech bubble.
 * Now window-aware: traffic lights close/minimize/restore via window-context
 */
export function TextScroll({ text, className, textClassName }: TextScrollProps) {
  const windowCtx = useWindowContext();

  useEffect(() => {
    windowCtx.registerWindow("cowsay", {
      title: `user@${SITE_CONFIG.username}: cowsay`,
      shortTitle: "QUOTE",
      icon: "󰈙",
    });
  }, [windowCtx]);

  const windowState = windowCtx.windows["cowsay"];
  const isClosed = windowState?.isClosed ?? false;
  const isMinimized = windowState?.isMinimized ?? false;

  const trimmed = text.trim();
  const WRAP_AT = 55;

  const lines = wordWrap(trimmed, WRAP_AT);
  // Box width = longest line length
  const maxLen = Math.max(...lines.map((l) => l.length));
  const innerWidth = maxLen + 4; // 2 spaces padding each side
  const topBar = "─".repeat(innerWidth);
  const bottomBar = "─".repeat(innerWidth);

  const isMultiLine = lines.length > 1;
  const bubbleLines = lines.map((line) => {
    if (!isMultiLine) return ` <  ${line.padEnd(maxLen)}  >`;
    const padded = line + " ".repeat(maxLen - line.length);
    return ` │  ${padded}  │`;
  });

  const topLine = ` ╭${topBar}╮`;
  const bottomLine = ` ╰${bottomBar}╯`;

  // Proper cowsay bubble: rounded top/bottom + bubble lines (single uses < >, multi uses │)
  const boxLines = [topLine, ...bubbleLines, bottomLine].join("\n");

  const cow = `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

  return (
    <section
      id="cowsay"
      aria-label="System quote (cowsay)"
      className={cn(
        "w-full font-mono transition-all duration-300 ease-out origin-left",
        isClosed
          ? "opacity-0 -translate-x-16 scale-95 max-h-0 border-transparent shadow-none pointer-events-none p-0 m-0 overflow-hidden"
          : isMinimized
          ? "max-h-[42px] opacity-100 translate-x-0 scale-100"
          : "max-h-[2500px] opacity-100 translate-x-0 scale-100",
        className
      )}
    >
      {/* Card — same style as other GlassCards, inherits CSS var theming */}
      <div className="w-full bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] overflow-hidden">
        {/* Titlebar — now with functional traffic lights */}
        <div className="bg-[var(--th-surface-alt)] border-b border-[var(--th-border)] px-3.5 py-2 flex items-center justify-between gap-2 text-xs select-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex items-center gap-1.5 mr-1 shrink-0">
              <button
                type="button"
                onClick={() => windowCtx.closeWindow("cowsay")}
                title="Close — dock to sidebar"
                className="size-3 rounded-full bg-[var(--th-red)] hover:bg-[#ff5555] active:scale-90 border border-[var(--th-red)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
              >
                <span className="opacity-0 group-hover:opacity-100">✕</span>
              </button>
              <button
                type="button"
                onClick={() => windowCtx.minimizeWindow("cowsay")}
                title="Minimise — collapse in-place"
                className="size-3 rounded-full bg-[var(--th-yellow)] hover:bg-[#ffb86c] active:scale-90 border border-[var(--th-yellow)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
              >
                <span className="opacity-0 group-hover:opacity-100">─</span>
              </button>
              <button
                type="button"
                onClick={() => windowCtx.restoreWindow("cowsay")}
                title="Expand — restore window"
                className="size-3 rounded-full bg-[var(--th-green)] hover:bg-[#50fa7b] active:scale-90 border border-[var(--th-green)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
              >
                <span className="opacity-0 group-hover:opacity-100">┼</span>
              </button>
            </span>
            <span className="text-[var(--th-text-dim)]">user@{SITE_CONFIG.username}:</span>
            <span className="text-[var(--th-accent)] font-semibold">cowsay</span>
            <span className="text-[var(--th-yellow)] truncate max-w-[40ch]">
              &quot;{trimmed.slice(0, 48)}{trimmed.length > 48 ? "…" : ""}&quot;
            </span>
            {isMinimized && (
              <span className="text-[10px] text-[var(--th-yellow)] ml-2">[MINIMIZED]</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isMinimized ? (
              <button
                type="button"
                onClick={() => windowCtx.minimizeWindow("cowsay")}
                className="text-[var(--th-cyan)] hover:underline cursor-pointer text-[10px] font-bold"
              >
                [EXPAND]
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-[var(--th-text-dim)]">
                <span className="px-1.5 py-0.5 rounded-none bg-[var(--th-bg)] border border-[var(--th-border-subtle)]">
                  UTF-8
                </span>
                <span className="px-1.5 py-0.5 rounded-none bg-[var(--th-bg)] border border-[var(--th-border-subtle)] text-[var(--th-cyan)]">
                  RO
                </span>
              </span>
            )}
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Cowsay output body */}
            <div className="p-5 overflow-x-auto">
              <pre
                className={cn(
                  "font-mono text-xs md:text-sm leading-relaxed text-[var(--th-text)] whitespace-pre",
                  textClassName
                )}
              >
                {`${boxLines}\n${cow}`}
              </pre>
              <div className="mt-3 border-t border-[var(--th-border-subtle)] pt-2 text-[10px] text-[var(--th-text-dim)] flex items-center gap-2">
                <span className="text-[var(--th-cyan)]">❯</span>
                <span>cowsay completed — exit 0</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
