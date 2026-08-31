"use client";

import { useState } from "react";
import { useTheme, THEMES } from "@/components/theme-context";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

/** A small color swatch row for a theme preview */
function ThemeSwatch({ colors }: { colors: { accent: string; accentGreen: string; accentYellow: string; accentRed: string; accentPurple: string } }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[colors.accentRed, colors.accentYellow, colors.accentGreen, colors.accent, colors.accentPurple].map((c, i) => (
        <span key={i} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: c }} />
      ))}
    </span>
  );
}

export function ThemeSwitcher() {
  const { theme, setThemeById } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full font-mono">
      {/* Terminal titlebar — always visible, click to toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between bg-[var(--th-surface-alt,#24283b)] border border-[var(--th-border,#414868)] px-3.5 py-2 text-xs cursor-pointer hover:border-[var(--th-cyan,#7dcfff)] transition-colors duration-150 select-none group"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2 text-[var(--th-accent,#7aa2f7)]">
          <Palette className="size-3.5 shrink-0" />
          <span className="font-bold tracking-wide">COLORSCHEME</span>
          <span className="text-[var(--th-text-dim,#565f89)]">::</span>
          <span className="text-[var(--th-cyan,#7dcfff)]">{theme.name}</span>
        </span>
        <span className="flex items-center gap-2">
          <ThemeSwatch colors={theme.colors} />
          <span className="text-[var(--th-text-dim,#565f89)] text-[10px] font-bold ml-1">
            {expanded ? "[-]" : "[+]"}
          </span>
        </span>
      </button>

      {/* Expandable theme grid */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          expanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border border-t-0 border-[var(--th-border,#414868)] bg-[var(--th-surface,#1f2335)] p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {THEMES.map((t) => {
            const isActive = t.id === theme.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setThemeById(t.id);
                  setExpanded(false);
                }}
                className={cn(
                  "flex items-center justify-between gap-2 px-2.5 py-2 text-xs cursor-pointer rounded-[2px] border transition-all duration-150 text-left",
                  isActive
                    ? "bg-[var(--th-surface-alt,#24283b)] border-[var(--th-cyan,#7dcfff)] text-[var(--th-cyan,#7dcfff)]"
                    : "bg-[var(--th-bg,#1a1b26)] border-[var(--th-border-subtle,#3b4261)] text-[var(--th-text-muted,#a9b1d6)] hover:border-[var(--th-accent,#7aa2f7)] hover:text-[var(--th-text,#c0caf5)]"
                )}
                style={{ backgroundColor: t.colors.surface }}
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  {isActive && <span className="text-[var(--th-green,#9ece6a)] font-bold shrink-0">❯</span>}
                  <span
                    className="font-semibold truncate"
                    style={{ color: isActive ? t.colors.accentCyan : t.colors.text }}
                  >
                    {t.name}
                  </span>
                </span>
                <ThemeSwatch colors={t.colors} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
