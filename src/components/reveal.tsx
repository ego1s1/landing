"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** y offset in px, keep tiny for terminal feel */
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section";
}

export function Reveal({ children, delay = 0, y = 16, duration = 0.55, className, as = "div" }: RevealProps) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Tag = motion[as];

  return (
    <Tag
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -10% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

interface StaggerProps {
  children: ReactNode[];
  stagger?: number;
  className?: string;
}

export function Stagger({ children, stagger = 0.06, className }: StaggerProps) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.06 } },
      }}
      className={className}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
