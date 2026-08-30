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
        "inline-flex items-center justify-center bg-[#24283b] border border-[#414868] hover:border-[#7aa2f7] hover:bg-[#292e42] shadow-[2px_2px_0px_#101014] rounded-[4px] p-2",
        className
      )}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="flex items-center justify-center font-mono">{children}</div>
    </div>
  );
}
