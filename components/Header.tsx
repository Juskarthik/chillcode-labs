"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/assets/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MenuOverlay from "@/components/ui/MenuOverlay";
import { brand } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`relative z-20 mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled || menuOpen
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

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#transmit"
            className="hidden rounded-full bg-magenta/90 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-void transition-transform hover:scale-105 sm:inline-block"
            style={{ boxShadow: "0 0 18px var(--glow-magenta)" }}
          >
            say hi
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex items-center gap-2.5 rounded-full border border-line bg-elev/60 py-2 pl-3.5 pr-2.5 font-mono text-xs uppercase tracking-[0.15em] text-soft backdrop-blur-sm transition-colors hover:border-[color:var(--line-strong)]"
          >
            <span className="hidden sm:inline">
              {menuOpen ? "close" : "menu"}
            </span>
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                aria-hidden
                className="absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300"
                style={{
                  transform: menuOpen
                    ? "rotate(45deg)"
                    : "translateY(-3.5px)",
                }}
              />
              <span
                aria-hidden
                className="absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300"
                style={{
                  transform: menuOpen
                    ? "rotate(-45deg)"
                    : "translateY(3.5px)",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={triggerRef}
      />
    </header>
  );
}
