"use client";

import { useRef, useState } from "react";

const glowByAccent: Record<string, string> = {
  magenta: "var(--glow-magenta)",
  cyan: "var(--glow-cyan)",
  amber: "var(--glow-amber)",
  violet: "rgba(165,92,255,0.5)",
};

/**
 * Pointer-tracking tilt card with a neon glow that follows the cursor.
 * Degrades to a static panel when pointer isn't available.
 */
export default function GlowCard({
  children,
  accent = "magenta",
  className = "",
}: {
  children: React.ReactNode;
  accent?: keyof typeof glowByAccent | string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setGlowPos({ x: px * 100, y: py * 100 });
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${
        (px - 0.5) * 10
      }deg) translateY(-4px)`,
    });
  };

  const reset = () => setStyle({ transform: "perspective(900px)" });

  const glow = glowByAccent[accent] ?? glowByAccent.magenta;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-elev/60 p-7 backdrop-blur-sm transition-[transform,border-color] duration-200 will-change-transform hover:border-[color:var(--line-strong)] ${className}`}
    >
      {/* cursor-follow glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at ${glowPos.x}% ${glowPos.y}%, ${glow}, transparent 45%)`,
        }}
      />
      {/* top edge neon line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
