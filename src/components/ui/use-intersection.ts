"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersection<T extends HTMLElement = HTMLDivElement>(options: UseIntersectionOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        if (isVisible && triggerOnce) {
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting: triggerOnce ? hasAnimated : isIntersecting };
}

