"use client";

import { useEffect, useRef, useState } from "react";

/**
 * true una sola vez que el elemento entra en viewport, y para siempre — es
 * lo que necesita un fade-in de scroll, no una revelación que se repite cada
 * vez que se sale y se vuelve a entrar.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
