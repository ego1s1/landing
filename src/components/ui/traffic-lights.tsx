"use client";

import { useWindowContext } from "@/components/window-context";

interface TrafficLightsProps {
  id: string;
  onCloseExtra?: () => void;
  onMinimizeExtra?: () => void;
  onExpandExtra?: () => void;
}

export function TrafficLights({ id, onCloseExtra, onMinimizeExtra, onExpandExtra }: TrafficLightsProps) {
  const { closeWindow, minimizeWindow, restoreWindow } = useWindowContext();

  return (
    <span className="flex items-center gap-1.5 mr-1 shrink-0">
      <button
        type="button"
        onClick={() => {
          closeWindow(id);
          onCloseExtra?.();
        }}
        title="Close — dock to sidebar"
        className="size-3 rounded-full bg-[var(--th-red)] hover:brightness-110 active:scale-90 border border-[var(--th-red)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
      >
        <span className="opacity-0 group-hover:opacity-100">✕</span>
      </button>
      <button
        type="button"
        onClick={() => {
          minimizeWindow(id);
          onMinimizeExtra?.();
        }}
        title="Minimise"
        className="size-3 rounded-full bg-[var(--th-yellow)] hover:brightness-110 active:scale-90 border border-[var(--th-yellow)]/40 flex items-center justify-center cursor-pointer text-[8px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
      >
        <span className="opacity-0 group-hover:opacity-100">─</span>
      </button>
      <button
        type="button"
        onClick={() => {
          restoreWindow(id);
          onExpandExtra?.();
        }}
        title="Expand — restore window"
        className="size-3 rounded-full bg-[var(--th-green)] hover:brightness-110 active:scale-90 border border-[var(--th-green)]/40 flex items-center justify-center cursor-pointer text-[7px] text-[var(--th-bg)] font-bold opacity-90 hover:opacity-100 group"
      >
        <span className="opacity-0 group-hover:opacity-100 leading-none">+</span>
      </button>
    </span>
  );
}
