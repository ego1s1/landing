"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PageFade({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
}
