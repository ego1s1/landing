"use client";

import { type PointerEvent as ReactPointerEvent, useCallback, useRef } from "react";

export function useGlassEffect<T extends HTMLElement>() {
  const specularRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback((event: ReactPointerEvent<T>) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const target = event.currentTarget as HTMLElement | null;
      if (!target) return;
      
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      if (specularRef.current) {
        specularRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`;
      }
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (specularRef.current) {
      specularRef.current.style.background = "";
    }
  }, []);

  return { specularRef, handlePointerMove, handlePointerLeave };
}

