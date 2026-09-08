"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-context";
import { THEMES } from "@/lib/themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Wallpaper() {
  const { theme } = useTheme();
  const wallpaper = theme.wallpaper;
  const [hasMounted, setHasMounted] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setHasMounted(true);
    // Delay wallpaper to let solid color paint first — blank color for selected theme is already correct via cookie
    const t = setTimeout(() => setShowWallpaper(true), 350);
    return () => clearTimeout(t);
  }, []);

  // After theme changes, also delay slightly so solid shows briefly before new wallpaper
  useEffect(() => {
    if (!hasMounted) return;
    // Keep solid until new image is actually loaded, then crossfade
    if (wallpaper && loadedMap[wallpaper]) {
      setShowWallpaper(true);
      return;
    }
    setShowWallpaper(false);
    const t = setTimeout(() => setShowWallpaper(true), 80);
    return () => clearTimeout(t);
  }, [wallpaper, hasMounted, loadedMap]);

  // Preload other wallpapers after idle for instant theme switching (common folder is small ~315KB total)
  useEffect(() => {
    if (!hasMounted) return;
    const idle = (cb: () => void) => {
      if ("requestIdleCallback" in window) (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(cb);
      else setTimeout(cb, 1200);
    };
    idle(() => {
      THEMES.forEach((t) => {
        if (t.wallpaper && t.wallpaper !== wallpaper) {
          const img = new window.Image();
          img.decoding = "async";
          // Use low priority fetch
          (img as unknown as { fetchPriority?: string }).fetchPriority = "low";
          img.src = t.wallpaper;
        }
      });
    });
  }, [wallpaper, hasMounted]);

  // Loaded tracking — don't crossfade until image is actually decoded, else animation skips and pops
  const isLoaded = wallpaper ? !!loadedMap[wallpaper] : false;
  // Unified render — solid first paint, then crossfade to wallpaper only after loaded.
  // hasMounted false => server + hydration first paint is solid (no flash of wrong image)
  // showWallpaper false => still solid, true + loaded => wallpaper with smooth scale/blur crossfade
  const showImage = hasMounted && showWallpaper && !!wallpaper && isLoaded;
  // Kick off load as soon as showWallpaper true, even before isLoaded
  const shouldLoad = hasMounted && showWallpaper && !!wallpaper;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Hidden loader — fetches full wallpaper at high priority as soon as showWallpaper, so visible crossfade never pops */}
      {shouldLoad && !isLoaded && (
        <Image
          src={wallpaper}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          onLoad={() => setLoadedMap((prev) => ({ ...prev, [wallpaper]: true }))}
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" } as React.CSSProperties}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {!showImage ? (
          <motion.div
            key="solid"
            initial={{ opacity: hasMounted ? 0 : 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: hasMounted ? 0.7 : 0, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ backgroundColor: "var(--th-bg)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--th-dot) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key={wallpaper}
            initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
            transition={{
              opacity: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
              filter: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
            }}
            className="absolute inset-0 will-change-transform"
          >
            {/* Image layer — Next Image for optimized fast loading (priority + WebP) */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ willChange: "transform" }}
            >
              <Image
                src={wallpaper}
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={75}
                onLoad={() => setLoadedMap((prev) => ({ ...prev, [wallpaper]: true }))}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </motion.div>
            {/* Theme tint — washes wallpaper in current colorscheme so it feels native, not pasted — kept subtle */}
            <div
              className="absolute inset-0 transition-colors duration-400"
              style={{
                backgroundColor: "color-mix(in srgb, var(--th-bg) 58%, transparent)",
              }}
            />
            {/* Second tint for depth — surfaceAlt at very low opacity adds warmth per theme */}
            <div
              className="absolute inset-0 transition-colors duration-400"
              style={{
                backgroundColor: "color-mix(in srgb, var(--th-surfaceAlt) 10%, transparent)",
              }}
            />
            {/* Vignette to keep cards readable at edges — very subtle */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, transparent 68%, color-mix(in srgb, var(--th-bg) 40%, transparent) 100%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
