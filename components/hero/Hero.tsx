"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brand } from "@/lib/content";
import { useTheme } from "@/components/ThemeProvider";

// the WebGL scene never renders on the server
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ background: "var(--hero-fallback)" }}
    />
  );
}

/** Types out a string character-by-character (skipped under reduced motion). */
function useTypewriter(text: string, speed = 70, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!start) return;
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

export default function Hero() {
  const typed = useTypewriter(brand.wordmark, 65);
  const { theme } = useTheme();

  return (
    <section
      id="boot"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D layer */}
      <div className="absolute inset-0">
        <HeroScene theme={theme} />
      </div>

      {/* readability gradient between scene and text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-veil)" }}
      />

      {/* overlay copy */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan chip-line"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan animate-glow-pulse" />
          00 // boot sequence
        </motion.span>

        <h1 className="font-mono text-base text-muted sm:text-lg">
          <span className="text-soft">{typed}</span>
          <span className="ml-0.5 inline-block w-[0.6ch] animate-blink text-magenta">
            ▍
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          We <span className="gradient-text text-glow-magenta">vibe code</span>{" "}
          your world into being.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.9 }}
          className="mt-6 max-w-xl text-base text-muted sm:text-lg"
        >
          A small studio building apps, websites & tiny web apps for small
          businesses and dreamers. Neon dreams, shipped clean.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#transmit"
            className="group relative inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            style={{ boxShadow: "0 0 30px var(--glow-magenta)" }}
          >
            Start a transmission
          </a>
          <a
            href="#origin"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-soft chip-line transition-colors hover:text-cyan"
          >
            Read the story
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint"
      >
        <div className="flex flex-col items-center gap-2">
          scroll to begin
          <span className="block h-8 w-px bg-gradient-to-b from-cyan to-transparent animate-float" />
        </div>
      </motion.div>
    </section>
  );
}
