"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWindowContext } from "@/components/window-context";

interface WindowFrameProps {
  id: string;
  title: string;
  shortTitle?: string;
  nerdIcon?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function WindowFrame({
  id,
  title,
  shortTitle,
  nerdIcon = "󰆍",
  icon,
  className,
  contentClassName,
  children,
}: WindowFrameProps) {
  const windowCtx = useWindowContext();

  useEffect(() => {
    windowCtx.registerWindow(id, {
      title,
      shortTitle: shortTitle || title.replace(/^(cat|ls -la ~\/)\s*/, "").replace(/\.(md)$/, ""),
      icon: nerdIcon,
    });
  }, [id, title, shortTitle, nerdIcon, windowCtx]);

  const state = windowCtx.windows[id];
  const isClosed = state?.isClosed ?? false;
  const isMinimized = state?.isMinimized ?? false;

  return (
    <div
      id={id}
      className={cn(
        "bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[3px_3px_0px_var(--th-shadow)] rounded-[4px] overflow-hidden w-full transition-all duration-300 ease-out origin-left",
        isClosed
          ? "opacity-0 -translate-x-16 scale-95 max-h-0 border-transparent shadow-none pointer-events-none p-0 m-0"
          : isMinimized
            ? "max-h-[42px] opacity-100 translate-x-0 scale-100"
            : "max-h-[2500px] opacity-100 translate-x-0 scale-100",
        className
      )}
    >
      <div className="bg-[var(--th-surface-alt)] border-b border-[var(--th-border-subtle)]/20 px-3.5 py-2 flex items-center justify-between gap-2 text-xs font-mono select-none">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1.5 mr-1 shrink-0">
            <button
              type="button"
              onClick={() => windowCtx.closeWindow(id)}
              title="Close — dock to sidebar"
              className="size-3 rounded-full bg-[var(--th-red)] hover:brightness-110 active:scale-90 border border-[var(--th-red)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
            >
              <span className="opacity-0 group-hover:opacity-100">✕</span>
            </button>
            <button
              type="button"
              onClick={() => windowCtx.minimizeWindow(id)}
              title="Minimise"
              className="size-3 rounded-full bg-[var(--th-yellow)] hover:brightness-110 active:scale-90 border border-[var(--th-yellow)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
            >
              <span className="opacity-0 group-hover:opacity-100">─</span>
            </button>
            <button
              type="button"
              onClick={() => windowCtx.restoreWindow(id)}
              title="Expand"
              className="size-3 rounded-full bg-[var(--th-green)] hover:brightness-110 active:scale-90 border border-[var(--th-green)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
            >
              <span className="opacity-0 group-hover:opacity-100">┼</span>
            </button>
          </span>
          {icon && <span className="text-[var(--th-cyan)] inline-flex items-center shrink-0">{icon}</span>}
          <span className="font-semibold text-[var(--th-accent)] tracking-wide truncate">{title}</span>
          {isMinimized && (
            <span className="text-[10px] text-[var(--th-yellow)] bg-[var(--th-bg)] border border-[var(--th-border-subtle)] px-1.5 py-0.2 rounded-none font-mono">
              [MINIMIZED]
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--th-text-dim)] shrink-0">
          {isMinimized ? (
            <button
              type="button"
              onClick={() => windowCtx.minimizeWindow(id)}
              className="text-[var(--th-cyan)] hover:underline cursor-pointer font-bold"
            >
              [EXPAND]
            </button>
          ) : (
            <>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-none bg-[var(--th-bg)] border border-[var(--th-border-subtle)]">UTF-8</span>
              <span className="px-1.5 py-0.5 rounded-none bg-[var(--th-bg)] border border-[var(--th-border-subtle)] text-[var(--th-cyan)]">RO</span>
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className={cn("p-5 md:p-6 text-[var(--th-text)]", contentClassName)}>{children}</div>
      )}
    </div>
  );
}
