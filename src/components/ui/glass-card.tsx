"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWindowContext } from "@/components/window-context";

interface GlassCardProps {
  id?: string;
  title?: string;
  shortTitle?: string;
  nerdIcon?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function GlassCard({
  id,
  title,
  shortTitle,
  nerdIcon = "󰆍",
  icon,
  className,
  contentClassName,
  children,
}: GlassCardProps) {
  const windowCtx = useWindowContext();

  useEffect(() => {
    if (id && title && windowCtx) {
      windowCtx.registerWindow(id, {
        title,
        shortTitle: shortTitle || title.replace(/^(cat|ls -la ~\/)\s*/, "").replace(/\.(md)$/, ""),
        icon: nerdIcon,
      });
    }
  }, [id, title, shortTitle, nerdIcon, windowCtx]);

  const windowState = id && windowCtx ? windowCtx.windows[id] : null;
  const isClosed = windowState?.isClosed ?? false;
  const isMinimized = windowState?.isMinimized ?? false;

  return (
    <div
      id={id}
      className={cn(
        "terminal-card bg-[#1f2335] border border-[#414868] shadow-[3px_3px_0px_#101014] rounded-[4px] overflow-hidden w-full transition-all duration-300 ease-out origin-left",
        isClosed
          ? "opacity-0 -translate-x-16 scale-95 max-h-0 border-transparent shadow-none pointer-events-none p-0 m-0"
          : isMinimized
          ? "max-h-[42px] opacity-100 translate-x-0 scale-100"
          : "max-h-[2500px] opacity-100 translate-x-0 scale-100",
        className
      )}
    >
      {title && (
        <div className="terminal-card-header bg-[#24283b] border-b border-[#414868] px-3.5 py-2 flex items-center justify-between gap-2 text-xs font-mono select-none">
          <div className="flex items-center gap-2 min-w-0">
            {/* Functional Y2K Traffic Lights */}
            <span className="flex items-center gap-1.5 mr-1 shrink-0">
              <button
                type="button"
                onClick={() => id && windowCtx.closeWindow(id)}
                title="Close Window (Dock to left sidebar)"
                className="size-3 rounded-full bg-[#f7768e] hover:bg-[#ff5555] active:scale-90 border border-[#f7768e]/40 flex items-center justify-center cursor-pointer text-[8px] text-[#1a1b26] font-bold opacity-90 hover:opacity-100 group"
              >
                <span className="opacity-0 group-hover:opacity-100">✕</span>
              </button>
              <button
                type="button"
                onClick={() => id && windowCtx.minimizeWindow(id)}
                title="Minimize Window (Toggle collapse in-place)"
                className="size-3 rounded-full bg-[#e0af68] hover:bg-[#ffb86c] active:scale-90 border border-[#e0af68]/40 flex items-center justify-center cursor-pointer text-[8px] text-[#1a1b26] font-bold opacity-90 hover:opacity-100 group"
              >
                <span className="opacity-0 group-hover:opacity-100">─</span>
              </button>
              <button
                type="button"
                onClick={() => id && windowCtx.restoreWindow(id)}
                title="Maximize / Expand Window"
                className="size-3 rounded-full bg-[#9ece6a] hover:bg-[#50fa7b] active:scale-90 border border-[#9ece6a]/40 flex items-center justify-center cursor-pointer text-[8px] text-[#1a1b26] font-bold opacity-90 hover:opacity-100 group"
              >
                <span className="opacity-0 group-hover:opacity-100">┼</span>
              </button>
            </span>
            {icon && <span className="text-[#7dcfff] inline-flex items-center shrink-0">{icon}</span>}
            <span className="font-semibold text-[#7aa2f7] tracking-wide truncate">
              {title}
            </span>
            {isMinimized && (
              <span className="text-[10px] text-[#e0af68] bg-[#1a1b26] border border-[#3b4261] px-1.5 py-0.2 rounded-none font-mono">
                [MINIMIZED]
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] text-[#565f89] shrink-0">
            {isMinimized ? (
              <button
                type="button"
                onClick={() => id && windowCtx.minimizeWindow(id)}
                className="text-[#7dcfff] hover:underline cursor-pointer font-bold"
              >
                [EXPAND]
              </button>
            ) : (
              <>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-none bg-[#1a1b26] border border-[#3b4261]">
                  UTF-8
                </span>
                <span className="px-1.5 py-0.5 rounded-none bg-[#1a1b26] border border-[#3b4261] text-[#7dcfff]">
                  RO
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {!isMinimized && (
        <div className={cn("p-5 md:p-6 text-[#c0caf5]", contentClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}
