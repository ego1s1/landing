"use client";

import { cn } from "@/lib/utils";
import { useGlassEffect } from "@/components/ui/use-glass-effect";
import { useIntersection } from "@/components/ui/use-intersection";

interface GlassCardProps {
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function GlassCard({ title, icon, className, contentClassName, children }: GlassCardProps) {
  const { specularRef, handlePointerLeave, handlePointerMove } = useGlassEffect<HTMLDivElement>();
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ threshold: 0.1, rootMargin: "-50px", triggerOnce: false });

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card animate-bubble",
        isIntersecting ? "animate-bubble-in-active" : "animate-bubble-out-active",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-distortion-overlay" />
      <div ref={specularRef} className="glass-specular" />
      <div className="glass-content">
        {title && (
          <div className="glass-card-header">
            {icon && <span className="glass-card-icon">{icon}</span>}
            <span className="glass-card-title">{title}</span>
          </div>
        )}
        <div className={cn("glass-card-content", contentClassName)}>{children}</div>
      </div>
    </div>
  );
}

