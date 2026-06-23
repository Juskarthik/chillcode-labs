"use client";

import { useTheme } from "@/components/ThemeProvider";

/** Sun / moon switch that flips the site between warm-night and warm-day. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative inline-flex h-8 w-[60px] items-center rounded-full border border-line bg-elev/60 px-1 backdrop-blur-sm transition-colors hover:border-[color:var(--line-strong)]"
    >
      {/* sliding knob */}
      <span
        className="absolute flex h-6 w-6 items-center justify-center rounded-full text-void transition-all duration-300"
        style={{
          transform: isDark ? "translateX(0)" : "translateX(28px)",
          background: isDark ? "var(--neon-cyan)" : "var(--warm-amber)",
          boxShadow: isDark
            ? "0 0 12px var(--glow-cyan)"
            : "0 0 12px var(--glow-amber)",
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
      {/* faint track icons */}
      <span className="ml-1 text-faint opacity-60">
        <MoonIcon small />
      </span>
      <span className="ml-auto mr-1 text-faint opacity-60">
        <SunIcon small />
      </span>
    </button>
  );
}

function MoonIcon({ small }: { small?: boolean }) {
  const s = small ? 12 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunIcon({ small }: { small?: boolean }) {
  const s = small ? 12 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </g>
    </svg>
  );
}
