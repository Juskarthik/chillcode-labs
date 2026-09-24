"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Logo, ArrowIcon } from "@/components/assets/Icons";
import { brand, chapters, contact } from "@/lib/content";
import { lenisScrollTo } from "@/lib/lenisController";

/** The mirror of the hero's boot sequence: the page powers itself down. */
const SHUTDOWN_LINES = [
  "saving session",
  "flushing glow to disk",
  "parking the lo-fi loop",
  "unmounting neon",
];
const TICK_MS = 340;
/** cmd line + one tick for each log line + one to flip the last to [ ok ] */
const HALT_TICK = SHUTDOWN_LINES.length + 2;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Wall-clock time plus seconds spent on the page (null until mounted). */
function useClock() {
  const [now, setNow] = useState<{ time: string; elapsed: number } | null>(
    null
  );
  useEffect(() => {
    const start = Date.now();
    const read = () => {
      const d = new Date();
      return {
        time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
        elapsed: Math.floor((d.getTime() - start) / 1000),
      };
    };
    const id = setInterval(() => setNow(read()), 1000);
    const first = setTimeout(() => setNow(read()), 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);
  return now;
}

/** Tracks which chapter sections the visitor has scrolled past. */
function useChaptersRead() {
  const [seen, setSeen] = useState<ReadonlySet<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).map((e) => e.target.id);
        if (hit.length) setSeen((prev) => new Set([...prev, ...hit]));
      },
      { threshold: 0.15 }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return seen.size;
}

function vibesFor(read: number) {
  if (read >= chapters.length) return "immaculate";
  if (read >= 4) return "high";
  if (read >= 2) return "warming up";
  return "just landed";
}

export default function ShutdownFooter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const [tick, setTick] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);
  const clock = useClock();
  const chaptersRead = useChaptersRead();
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const halted = tick >= HALT_TICK;

  // replay the shutdown log each time the footer scrolls into view
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => {
        setTick(inView ? HALT_TICK : 0);
        if (!inView) setReconnecting(false);
      }, 0);
      return () => clearTimeout(id);
    }
    const id = setInterval(() => {
      setTick((t) => {
        if (t + 1 >= HALT_TICK) clearInterval(id);
        return t + 1;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [inView]);

  const reconnect = () => {
    if (reconnecting) return;
    setReconnecting(true);
    setTimeout(() => {
      if (!lenisScrollTo("#boot")) window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  // Enter reconnects, but only while the footer is actually on screen
  useEffect(() => {
    if (!halted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const r = ref.current?.getBoundingClientRect();
      if (r && r.top < window.innerHeight && r.bottom > 0) reconnect();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [halted, reconnecting]);

  // the spotlight tracks the pointer's x across the whole footer
  const glow = (e: React.PointerEvent<HTMLElement>) => {
    const w = wordmarkRef.current;
    if (!w) return;
    const r = w.getBoundingClientRect();
    const y = Math.min(Math.max(e.clientY - r.top, 0), r.height);
    w.style.setProperty("--mx", `${e.clientX - r.left}px`);
    w.style.setProperty("--my", `${y}px`);
    w.dataset.active = "true";
  };
  const unglow = () => {
    const w = wordmarkRef.current;
    if (w) delete w.dataset.active;
  };

  return (
    <footer
      ref={ref}
      className="mt-28"
      onPointerMove={glow}
      onPointerLeave={unglow}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-line bg-elev/40 p-6 font-mono text-sm backdrop-blur-sm sm:p-8">
          {/* title bar with live status */}
          <div className="flex items-center gap-2 border-b border-line pb-4">
            <span className="h-3 w-3 rounded-full bg-magenta" />
            <span className="h-3 w-3 rounded-full bg-amber" />
            <span className="h-3 w-3 rounded-full bg-cyan" />
            <span className="ml-3 truncate text-faint">
              chillcode_labs — session
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-2 text-[12px] text-faint">
              <span className="tabular-nums" suppressHydrationWarning>
                {clock?.time ?? "--:--:--"}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-700 ${
                  halted ? "bg-amber" : "animate-blink bg-cyan"
                }`}
              />
              <span className="hidden sm:inline">
                {halted ? "halted" : "online"}
              </span>
            </span>
          </div>

          {/* shutdown log */}
          <div
            className="mt-5 min-h-[9.5rem] space-y-1 text-[13px]"
            aria-live="polite"
          >
            <p className={tick >= 0 && inView ? "text-soft" : "opacity-0"}>
              <span className="text-cyan">$</span> shutdown -h now
              {!halted && inView && (
                <span className="ml-1 inline-block animate-blink text-magenta">
                  ▍
                </span>
              )}
            </p>
            {SHUTDOWN_LINES.map((line, i) => {
              const visible = tick >= i + 1;
              const done = tick >= i + 2;
              return (
                <p
                  key={line}
                  className={`transition-opacity duration-200 ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className={done ? "text-cyan" : "text-amber"}>
                    [ {done ? "ok" : ".."} ]
                  </span>{" "}
                  <span className="text-muted">{line}</span>
                  {!done && "…"}
                </p>
              );
            })}
            <p
              className={`pt-2 text-soft transition-opacity duration-500 ${
                halted ? "opacity-100" : "opacity-0"
              }`}
            >
              {reconnecting
                ? "reconnecting… booting from the top."
                : "system halted — thanks for staying up with us."}
            </p>
          </div>

          {/* contact details stay readable but dim until the system has halted */}
          <div
            className={`transition-opacity duration-700 ${
              halted ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="mt-6 grid gap-8 border-t border-line pt-6 sm:grid-cols-[1.4fr_1fr_1fr]">
              <div>
                <div className="flex items-center gap-2 text-soft">
                  <Logo size={24} />
                  <span className="font-display text-base font-semibold">
                    {brand.name}
                  </span>
                </div>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted">
                  A small studio coding warm software in {brand.location}. We
                  code at 2am with lo-fi on and good intentions.
                </p>
              </div>

              <div>
                <p className="text-faint">{"// reach us"}</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="mt-2 block text-soft transition-colors hover:text-cyan"
                >
                  {brand.email}
                </a>
              </div>

              <div>
                <p className="text-faint">{"// elsewhere"}</p>
                <ul className="mt-2 space-y-1.5">
                  {contact.socials.map((s) => (
                    <li key={s.label}>
                      <span className="text-soft transition-colors hover:text-magenta">
                        {s.label}
                      </span>{" "}
                      <span className="text-faint">{s.handle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* session receipt */}
            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-dashed border-line pt-5 text-[12px] sm:grid-cols-3">
              {[
                ["chapters read", `${chaptersRead}/${chapters.length}`],
                [
                  "time on site",
                  clock ? `${pad(Math.floor(clock.elapsed / 60))}:${pad(clock.elapsed % 60)}` : "--:--",
                ],
                ["vibes detected", vibesFor(chaptersRead)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <dt className="text-faint">{k}</dt>
                  <span
                    aria-hidden
                    className="min-w-4 flex-1 border-b border-dotted"
                    style={{ borderColor: "var(--line-strong)" }}
                  />
                  <dd className="tabular-nums text-soft">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 border-t border-line pt-4 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
              <span>
                © {new Date().getFullYear()} {brand.name} — concept site.
              </span>
              <button
                type="button"
                onClick={reconnect}
                className="group inline-flex items-center gap-2 self-start text-soft transition-colors hover:text-cyan sm:self-auto"
              >
                <span className="text-cyan">[</span>{" "}
                <span className="pointer-coarse:hidden">press ENTER to reconnect</span>
                <span className="hidden pointer-coarse:inline">tap to reconnect</span>{" "}
                <span className="text-cyan">]</span>
                <ArrowIcon className="-rotate-90 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* giant wordmark bleeding off the bottom edge; a phosphor spotlight
          follows the pointer, and drifts on its own when there's no pointer
          (touch screens, or the mouse is elsewhere on the page) */}
      <div
        aria-hidden
        ref={wordmarkRef}
        className="footer-wordmark relative mt-16 select-none overflow-hidden"
      >
        <div className="footer-wordmark-text footer-wordmark-outline">
          {brand.wordmark}
        </div>
        <div className="footer-wordmark-text footer-wordmark-fill">
          {brand.wordmark}
        </div>
      </div>
    </footer>
  );
}
