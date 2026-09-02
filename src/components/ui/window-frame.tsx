"use client";

import { cn } from "@/lib/utils";
import { WindowShell } from "@/components/ui/window-shell";

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
  return (
    <WindowShell
      id={id}
      title={title}
      shortTitle={shortTitle}
      nerdIcon={nerdIcon}
      headerTitle={
        <>
          {icon && <span className="text-[var(--th-cyan)] inline-flex items-center shrink-0">{icon}</span>}
          <span className="font-semibold text-[var(--th-accent)] tracking-wide truncate">{title}</span>
        </>
      }
      minimizedHint={
        <span className="text-[10px] text-[var(--th-yellow)] bg-[var(--th-bg)] border border-[var(--th-border-subtle)] px-1.5 py-0.2 rounded-none font-mono">
          [MINIMIZED]
        </span>
      }
      className={cn("w-full", className)}
      contentClassName={cn("p-5 md:p-6", contentClassName)}
    >
      {children}
    </WindowShell>
  );
}
