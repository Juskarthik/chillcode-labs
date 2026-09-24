"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowIcon } from "@/components/assets/Icons";
import { brand, chapters, contact } from "@/lib/content";
import { lenisScrollTo, startLenis, stopLenis } from "@/lib/lenisController";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.21, 0.6, 0.35, 1] },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.25, ease: [0.21, 0.6, 0.35, 1] },
  },
};

/** Live HH:MM:SS clock, hydration-safe (renders a placeholder until mounted). */
function LocalClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{now ?? "--:--:--"}</span>;
}

export default function MenuOverlay({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // lock background scroll + pause Lenis while the menu is open
  useEffect(() => {
    if (!open) return;
    stopLenis();
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      startLenis();
    };
  }, [open]);

  // escape to close, return focus to the trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, triggerRef]);

  function goTo(e: React.MouseEvent, id: string) {
    e.preventDefault();
    onClose();
    triggerRef.current?.focus();
    // let the overlay's exit animation clear the scroll lock first
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!lenisScrollTo(el, -12)) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 420);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-0 z-10 flex flex-col overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* backdrop — fixed (not absolute) so it stays put while the
              dialog's own content scrolls */}
          <div className="fixed inset-0 -z-10 bg-void" />
          <div
            aria-hidden
            className="fixed inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(120,160,255,0.05) 3px, transparent 4px)",
            }}
          />
          <div
            aria-hidden
            className="fixed inset-0 -z-10"
            style={{ background: "var(--hero-fallback)" }}
          />

          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 pb-16 pt-28 sm:px-8 sm:pt-32 md:flex-row md:items-center md:gap-16">
            {/* nav column */}
            <motion.nav
              aria-label="Chapters"
              className="flex-1"
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              <ul>
                {chapters.map((c, i) => (
                  <motion.li
                    key={c.id}
                    variants={itemVariants}
                    className="border-b border-line first:border-t"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${c.id}`}
                      onClick={(e) => goTo(e, c.id)}
                      className="group flex items-baseline gap-4 py-4 transition-colors sm:py-5"
                    >
                      <span className="w-7 shrink-0 font-mono text-xs text-faint">
                        {c.index}
                      </span>
                      <span className="flex-1 font-display text-[clamp(1.9rem,7vw,3.75rem)] font-semibold leading-none tracking-tight text-soft transition-all duration-300 group-hover:translate-x-2 group-hover:text-magenta">
                        {c.label}
                      </span>
                      <ArrowIcon
                        size={22}
                        className="-translate-x-2 text-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* status column */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-7 font-mono text-sm md:w-72"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-faint">
                  {"// status"}
                </p>
                <p className="mt-2 text-soft">
                  <LocalClock /> local
                </p>
                <p className="text-muted">{brand.location}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-faint">
                  {"// reach us"}
                </p>
                <a
                  href={`mailto:${brand.email}`}
                  className="mt-2 block break-all text-soft transition-colors hover:text-cyan"
                >
                  {brand.email}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-faint">
                  {"// elsewhere"}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {contact.socials.map((s) => (
                    <li key={s.label}>
                      <span className="text-soft">{s.label}</span>{" "}
                      <span className="text-faint">{s.handle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#transmit"
                onClick={(e) => goTo(e, "transmit")}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-magenta/90 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-void transition-transform hover:scale-[1.03]"
                style={{ boxShadow: "0 0 22px var(--glow-magenta)" }}
              >
                {contact.cta}
                <ArrowIcon size={16} />
              </a>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-1.5 border-t border-line px-6 py-4 font-mono text-[11px] text-faint">
            <span className="text-cyan">$</span>
            <span>{brand.wordmark}</span>
            <span className="animate-blink text-magenta">▍</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
