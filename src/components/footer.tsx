"use client";

import { cn } from "@/lib/utils";
import { useGlassEffect } from "@/components/ui/use-glass-effect";

export function Footer({ className }: { className?: string }) {
  const { specularRef, handlePointerLeave, handlePointerMove } = useGlassEffect<HTMLElement>();

  return (
    <footer
      className={cn(
        "w-full max-w-3xl mx-auto p-5",
        className,
      )}
    >
      <div
        className="glass-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="glass-filter" />
        <div className="glass-overlay" />
        <div className="glass-distortion-overlay" />
        <div ref={specularRef} className="glass-specular" />
        <div className="glass-content">
          <p className="text-center text-sm text-foreground/70">
            Built with ❤️ by Priyanshu Sharma
          </p>
        </div>
      </div>
    </footer>
  );
}
