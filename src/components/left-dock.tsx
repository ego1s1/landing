"use client";

import { useWindowContext } from "@/components/window-context";
import { RefreshCw } from "lucide-react";

/**
 * LeftDock — floating panel of docked (closed) windows.
 *
 * On mobile (< md): anchors to bottom-right (thumb-friendly).
 *   - Slide animation: translate-y so items fly up from below.
 * On desktop (>= md): anchors to left-center of viewport.
 *   - Slide animation: translate-x so restore buttons nudge right on hover.
 *
 * Windows stay mounted in the DOM (isClosed = true) so CSS transitions play
 * without React unmount jitter.
 */
export function LeftDock() {
  const { windows, metaMap, restoreWindow, restoreAll } = useWindowContext();

  const closedEntries = Object.entries(windows).filter(
    ([, state]) => state.isClosed
  );

  if (closedEntries.length === 0) return null;

  return (
    <aside
      aria-label="Docked windows"
      className="
        fixed z-50 select-none font-mono text-[11px] sm:text-xs
        /* Mobile: bottom-right, compact */
        right-2 bottom-2 sm:right-3 sm:bottom-4
        /* Desktop: left-center, original position */
        md:right-auto md:bottom-auto md:left-3 md:top-1/2 md:-translate-y-1/2
        flex flex-col gap-1.5 sm:gap-2
        transition-all duration-300 ease-out
      "
    >
      <div className="bg-[var(--th-surface)] border border-[var(--th-border)] shadow-[4px_4px_0px_var(--th-shadow)] rounded-[4px] p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 min-w-[110px] max-w-[130px] sm:min-w-[130px] sm:max-w-[160px]">
        {/* Dock header */}
        <div className="flex items-center justify-between gap-1 border-b border-[var(--th-border-subtle)] pb-1.5 px-1 text-[10px] text-[var(--th-text-dim)]">
          <span className="text-[var(--th-cyan)] font-bold">DOCK [{closedEntries.length}]</span>
          {closedEntries.length > 1 && (
            <button
              type="button"
              onClick={restoreAll}
              title="Restore all windows"
              className="text-[var(--th-yellow)] hover:text-[var(--th-cyan)] cursor-pointer"
            >
              <RefreshCw className="size-3" />
            </button>
          )}
        </div>

        {/* Docked window restore buttons */}
        <div className="flex flex-col gap-1.5">
          {closedEntries.map(([id]) => {
            const meta = metaMap[id] ?? {
              title: id,
              shortTitle: id.toUpperCase(),
              icon: "󰆍",
            };
            return (
              <button
                key={id}
                type="button"
                onClick={() => restoreWindow(id)}
                title={`Restore: ${meta.title}`}
                className="
                  flex items-center gap-2
                  bg-[var(--th-surface-alt)] hover:bg-[var(--th-surface)]
                  border border-[var(--th-border)] hover:border-[var(--th-accent)]
                  text-[var(--th-text)] hover:text-[var(--th-cyan)]
                  shadow-[2px_2px_0px_var(--th-shadow)]
                  /* Mobile: lift up on hover (matching bottom-right dock) */
                  active:translate-y-[1px]
                  /* Desktop: nudge right on hover */
                  md:active:translate-y-0 md:active:translate-x-[1px]
                  md:hover:translate-x-1
                  rounded-[4px] px-2 py-1 sm:px-2.5 sm:py-1.5 text-left text-[11px] sm:text-xs cursor-pointer
                  group transition-all duration-200
                "
              >
                <span className="font-['Iosevka_Nerd_Font',monospace] text-sm text-[var(--th-cyan)] group-hover:scale-110 transition-transform duration-150">
                  {meta.icon ?? "󰆍"}
                </span>
                <span className="truncate font-semibold text-[11px]">
                  {meta.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
