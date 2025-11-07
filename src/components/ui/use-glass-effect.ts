"use client";

import { type PointerEvent as ReactPointerEvent, useCallback, useRef } from "react";

export function useGlassEffect<T extends HTMLElement>() {
  const specularRef = useRef<HTMLDivElement | null>(null);

  const updateDisplacement = useCallback((value: number) => {
    if (typeof window === "undefined") return;
    const displacement = document.getElementById("glass-distortion-displacement");
    if (displacement instanceof SVGFEDisplacementMapElement) {
      displacement.setAttribute("scale", value.toString());
    }
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<T>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const intensity = Math.max(45, Math.min(110, ((x / rect.width) + (y / rect.height)) * 60));
    updateDisplacement(intensity);
    if (specularRef.current) {
      specularRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 60%)`;
    }
  }, [updateDisplacement]);

  const handlePointerLeave = useCallback(() => {
    updateDisplacement(77);
    if (specularRef.current) {
      specularRef.current.style.background = "";
    }
  }, [updateDisplacement]);

  return { specularRef, handlePointerMove, handlePointerLeave };
}

