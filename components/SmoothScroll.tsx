"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth-scroll provider. Disables itself when the user prefers
 * reduced motion so the native (instant) scroll is honored.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // expose scroll progress as a CSS var for the global progress line
    lenis.on("scroll", ({ progress }: { progress: number }) => {
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(progress)
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
