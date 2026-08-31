"use client";

import { cn } from "@/lib/utils";

interface GlassIconProps {
  className?: string;
  children: React.ReactNode;
  label?: string;
}

export function GlassIcon({ className, children, label }: GlassIconProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-[var(--th-surface-alt)] border border-[var(--th-border)] hover:border-[var(--th-accent)] hover:bg-[var(--th-surface)] shadow-[2px_2px_0px_var(--th-shadow)] rounded-[4px] p-2",
        className
      )}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="flex items-center justify-center font-mono">{children}</div>
    </div>
  );
}
