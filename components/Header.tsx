"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/assets/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { brand } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border border-line bg-void/70 backdrop-blur-md"
            : "border border-transparent"
        }`}
        style={{ width: "calc(100% - 2rem)" }}
      >
        <a href="#boot" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="font-mono text-sm font-medium text-soft">
            {brand.wordmark}
          </span>
        </a>

        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.15em] text-muted sm:flex">
          <a href="#craft" className="transition-colors hover:text-cyan">
            craft
          </a>
          <a href="#process" className="transition-colors hover:text-cyan">
            the vibe
          </a>
          <a href="#signals" className="transition-colors hover:text-cyan">
            signals
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#transmit"
            className="rounded-full bg-magenta/90 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-void transition-transform hover:scale-105"
            style={{ boxShadow: "0 0 18px var(--glow-magenta)" }}
          >
            say hi
          </a>
        </div>
      </div>
    </header>
  );
}
