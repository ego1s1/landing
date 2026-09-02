"use client";

import { useEffect } from "react";
import { useWindowContext } from "@/components/window-context";
import { TrafficLights } from "@/components/ui/traffic-lights";
import { cn } from "@/lib/utils";

interface WindowShellProps {
  id: string;
  title: string; // for dock / meta
  shortTitle?: string;
  nerdIcon?: string;
  headerTitle?: React.ReactNode; // rendered in title bar
  headerRight?: React.ReactNode;
  minimizedHint?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  collapsedMaxHeight?: string; // default max-h-[42px]
  expandedMaxHeight?: string; // default max-h-[2500px] or smaller per widget
  defaultMinimized?: boolean;
  onCloseExtra?: () => void;
  onMinimizeExtra?: () => void;
  onExpandExtra?: () => void;
  children: React.ReactNode;
  headerClickableWhenMinimized?: boolean; // click header to expand (easter egg)
}

export function WindowShell({
  id,
  title,
  shortTitle,
  nerdIcon = "󰆍",
  headerTitle,
  headerRight,
  minimizedHint,
  className,
  headerClassName,
  contentClassName,
  collapsedMaxHeight = "max-h-[42px]",
  expandedMaxHeight = "max-h-[2500px]",
  defaultMinimized = false,
  onCloseExtra,
  onMinimizeExtra,
  onExpandExtra,
  children,
  headerClickableWhenMinimized = false,
}: WindowShellProps) {
  const windowCtx = useWindowContext();

  useEffect(() => {
    windowCtx.registerWindow(
      id,
      {
        title,
        shortTitle: shortTitle || title.replace(/^(cat|ls -la ~\/)\s*/, "").replace(/\.(md)$/, ""),
        icon: nerdIcon,
      },
      { isMinimized: defaultMinimized }
    );
  }, [id, title, shortTitle, nerdIcon, defaultMinimized, windowCtx]);

  const state = windowCtx.windows[id];
  // Before registration, fall back to defaultMinimized so first paint is correct (no flash)
  const isClosed = state?.isClosed ?? false;
  const isMinimized = state ? state.isMinimized : defaultMinimized;

  const handleHeaderClick = () => {
    if (headerClickableWhenMinimized && isMinimized) {
      windowCtx.restoreWindow(id);
      onExpandExtra?.();
    }
  };

  return (
    <section
      id={id}
      aria-label={title}
      className={cn(
        "w-full bg-[var(--th-surface)] border border-[var(--th-border)] rounded-[4px] overflow-hidden font-mono transition-all duration-300 ease-out origin-left",
        // softer, diffused shadow to complement wallpaper blur — not the old hard pixel 3px
        "shadow-[0_10px_30px_rgba(0,0,0,0.32),0_2px_8px_rgba(0,0,0,0.22),0_0_0_1px_color-mix(in_srgb,var(--th-border)_12%,transparent)]",
        isClosed
          ? "opacity-0 -translate-x-16 scale-95 max-h-0 border-transparent shadow-none pointer-events-none p-0 m-0"
          : isMinimized
            ? `${collapsedMaxHeight} opacity-100 translate-x-0 scale-100`
            : `${expandedMaxHeight} opacity-100 translate-x-0 scale-100`,
        className
      )}
    >
      <div
        className={cn(
          "bg-[var(--th-surface-alt)] border-b border-[var(--th-border-subtle)]/20 px-3.5 py-2 flex items-center justify-between gap-2 text-xs select-none",
          headerClickableWhenMinimized && isMinimized && "cursor-pointer hover:bg-[var(--th-surface-alt)]/80",
          headerClassName
        )}
        onClick={headerClickableWhenMinimized && isMinimized ? handleHeaderClick : undefined}
        role={headerClickableWhenMinimized && isMinimized ? "button" : undefined}
        tabIndex={headerClickableWhenMinimized && isMinimized ? 0 : undefined}
        onKeyDown={
          headerClickableWhenMinimized && isMinimized
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleHeaderClick();
                }
              }
            : undefined
        }
      >
        <div className="flex items-center gap-2 min-w-0">
          <TrafficLights id={id} onCloseExtra={onCloseExtra} onMinimizeExtra={onMinimizeExtra} onExpandExtra={onExpandExtra} />
          {headerTitle ?? <span className="font-semibold text-[var(--th-accent)] tracking-wide truncate">{title}</span>}
          {isMinimized && minimizedHint}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--th-text-dim)] shrink-0">
          {headerRight ??
            (isMinimized ? (
              <button type="button" onClick={() => windowCtx.restoreWindow(id)} className="text-[var(--th-cyan)] hover:underline cursor-pointer font-bold">
                [EXPAND]
              </button>
            ) : (
              <>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-none bg-[var(--th-bg)] border border-[var(--th-border-subtle)]">UTF-8</span>
                <span className="px-1.5 py-0.5 rounded-none bg-[var(--th-bg)] border border-[var(--th-border-subtle)] text-[var(--th-cyan)]">RO</span>
              </>
            ))}
        </div>
      </div>

      {!isMinimized && <div className={cn("text-[var(--th-text)]", contentClassName)}>{children}</div>}
    </section>
  );
}
