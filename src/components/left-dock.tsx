"use client";

import { useWindowContext } from "@/components/window-context";
import { RefreshCw } from "lucide-react";

export function LeftDock() {
  const { windows, metaMap, restoreWindow, restoreAll } = useWindowContext();

  const closedEntries = Object.entries(windows).filter(
    ([, state]) => state.isClosed
  );

  if (closedEntries.length === 0) return null;

  return (
    <aside className="fixed right-3 bottom-4 md:right-auto md:bottom-auto md:left-3 md:top-1/2 md:-translate-y-1/2 z-50 flex flex-col gap-2 font-mono text-xs select-none transition-all duration-300 ease-out">
      <div className="bg-[#1f2335] border border-[#414868] shadow-[4px_4px_0px_#101014] rounded-[4px] p-2 flex flex-col gap-2 min-w-[130px] max-w-[160px]">
        {/* Dock Header */}
        <div className="flex items-center justify-between gap-1 border-b border-[#3b4261] pb-1.5 px-1 text-[10px] text-[#565f89]">
          <span className="text-[#7dcfff] font-bold">DOCK [{closedEntries.length}]</span>
          {closedEntries.length > 1 && (
            <button
              onClick={restoreAll}
              title="Restore all closed windows"
              className="text-[#e0af68] hover:text-[#7dcfff] cursor-pointer"
            >
              <RefreshCw className="size-3" />
            </button>
          )}
        </div>

        {/* Closed Window Dock Buttons */}
        <div className="flex flex-col gap-1.5">
          {closedEntries.map(([id]) => {
            const meta = metaMap[id] || {
              title: id,
              shortTitle: id.toUpperCase(),
              icon: "󰆍",
            };
            return (
              <button
                key={id}
                onClick={() => restoreWindow(id)}
                title={`Click to reopen ${meta.title}`}
                className="flex items-center gap-2 bg-[#24283b] hover:bg-[#292e42] border border-[#414868] hover:border-[#7aa2f7] text-[#c0caf5] hover:text-[#7dcfff] shadow-[2px_2px_0px_#101014] active:translate-x-[1px] active:translate-y-[1px] rounded-[4px] px-2.5 py-1.5 text-left text-xs cursor-pointer group transition-all duration-200 md:hover:translate-x-1"
              >
                <span className="font-['Iosevka_Nerd_Font','Iosevka_Nerd_Font',monospace] text-sm text-[#7dcfff] group-hover:scale-110">
                  {meta.icon || "󰆍"}
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
