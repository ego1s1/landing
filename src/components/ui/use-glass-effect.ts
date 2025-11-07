"use client";

import { type PointerEvent as ReactPointerEvent, useCallback, useRef } from "react";

export function useGlassEffect<T extends HTMLElement>() {
  const specularRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const updateDisplacement = useCallback((value: number) => {
    if (typeof window === "undefined") return;
    const displacement = document.getElementById("glass-distortion-displacement");
    if (displacement instanceof SVGFEDisplacementMapElement) {
      displacement.setAttribute("scale", value.toString());
    }
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<T>) => {
    const now = performance.now();
    const isMobile = window.innerWidth <= 768;
    const throttleMs = isMobile ? 50 : 16;

    if (now - lastUpdateRef.current < throttleMs) {
      return;
    }

    lastUpdateRef.current = now;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const intensity = Math.max(45, Math.min(110, ((x / rect.width) + (y / rect.height)) * 60));
      
      if (!isMobile) {
        updateDisplacement(intensity);
      }
      
      if (specularRef.current) {
        const opacity = isMobile ? 0.1 : 0.16;
        specularRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity * 0.5}) 30%, rgba(255,255,255,0) 60%)`;
      }
    });
  }, [updateDisplacement]);

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    updateDisplacement(77);
    if (specularRef.current) {
      specularRef.current.style.background = "";
    }
  }, [updateDisplacement]);

  return { specularRef, handlePointerMove, handlePointerLeave };
}

