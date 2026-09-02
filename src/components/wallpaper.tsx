"use client";

import { useTheme } from "@/components/theme-context";
import { motion, AnimatePresence } from "framer-motion";

export function Wallpaper() {
  const { theme } = useTheme();
  const wallpaper = theme.wallpaper;

  // No wallpaper for this theme -> just let body bg + dot grid show
  // We still render a subtle themed wash so layout stays consistent
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {wallpaper ? (
          <motion.div
            key={wallpaper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            {/* Image layer — subtle blur + scale to hide blur edges */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(6px) brightness(0.92) saturate(1.02)",
                transform: "scale(1.04)",
                willChange: "filter, transform",
              }}
            />
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
            {/* Dot grid retained over wallpaper — uses theme dot color */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--th-dot) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                opacity: 0.35,
              }}
            />
            {/* Vignette to keep cards readable at edges — very subtle */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, transparent 65%, color-mix(in srgb, var(--th-bg) 35%, transparent) 100%)`,
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="solid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
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
        )}
      </AnimatePresence>
    </div>
  );
}
