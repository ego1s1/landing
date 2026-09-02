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
      <AnimatePresence mode="wait" initial={false}>
        {wallpaper ? (
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
            {/* Image layer — subtle blur + scale to hide blur edges, now animated via parent */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(6px) brightness(0.92) saturate(1.02)",
                willChange: "transform",
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
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
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
