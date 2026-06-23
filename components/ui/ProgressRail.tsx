"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/lib/content";

/**
 * Fixed left rail showing chapter chips + a scroll-progress glow line.
 * Highlights whichever chapter section is currently in view.
 */
export default function ProgressRail() {
  const [active, setActive] = useState("boot");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* top scroll-progress glow line */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${progress})`,
            background:
              "linear-gradient(90deg, var(--neon-magenta), var(--warm-gold), var(--neon-cyan))",
            boxShadow: "0 0 12px var(--glow-magenta)",
          }}
        />
      </div>

      {/* side chapter rail (hidden on small screens) */}
      <nav
        aria-label="Chapters"
        className="fixed left-6 top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      >
        {chapters.map((c) => {
          const on = active === c.id;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="group flex items-center gap-3"
            >
              <span
                className="relative h-2 w-2 rounded-full transition-all duration-300"
                style={{
                  background: on ? "var(--neon-magenta)" : "var(--text-faint)",
                  boxShadow: on ? "0 0 12px var(--glow-magenta)" : "none",
                  transform: on ? "scale(1.4)" : "scale(1)",
                }}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  on
                    ? "text-soft opacity-100"
                    : "text-faint opacity-0 group-hover:opacity-100"
                }`}
              >
                {c.index} {c.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
