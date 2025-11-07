"use client";

import { cn } from "@/lib/utils";
import { useGlassEffect } from "@/components/ui/use-glass-effect";

interface GlassIconProps {
  className?: string;
  children: React.ReactNode;
  label?: string;
}

export function GlassIcon({ className, children, label }: GlassIconProps) {
  const { specularRef, handlePointerLeave, handlePointerMove } = useGlassEffect<HTMLDivElement>();

  return (
    <div
      className={cn("glass-icon", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-distortion-overlay" />
      <div ref={specularRef} className="glass-specular" />
      <div className="glass-content">{children}</div>
    </div>
  );
}

