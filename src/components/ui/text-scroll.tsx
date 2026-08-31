"use client";

import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site";

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
 */
export function TextScroll({ text, className, textClassName }: TextScrollProps) {
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
      className={cn("w-full font-mono", className)}
      aria-label="System quote (cowsay)"
    >
      {/* Card — same style as other GlassCards, inherits CSS var theming */}
      <div className="w-full bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] overflow-hidden">

        {/* Titlebar */}
        <div className="bg-[var(--th-surface-alt)] border-b border-[var(--th-border)] px-3.5 py-2 flex items-center gap-2 text-xs select-none">
          <span className="flex items-center gap-1.5 mr-1 shrink-0">
            <span className="size-3 rounded-full bg-[var(--th-red)] border border-[var(--th-red)]/40 opacity-60" />
            <span className="size-3 rounded-full bg-[var(--th-yellow)] border border-[var(--th-yellow)]/40 opacity-60" />
            <span className="size-3 rounded-full bg-[var(--th-green)] border border-[var(--th-green)]/40 opacity-60" />
          </span>
          <span className="text-[var(--th-text-dim)]">user@{SITE_CONFIG.username}:</span>
          <span className="text-[var(--th-accent)] font-semibold">cowsay</span>
          <span className="text-[var(--th-yellow)] truncate max-w-[40ch]">
            &quot;{trimmed.slice(0, 48)}{trimmed.length > 48 ? "…" : ""}&quot;
          </span>
        </div>

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

      </div>
    </section>
  );
}
