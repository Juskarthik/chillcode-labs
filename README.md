# Chillcode Labs — concept site

A single-page, scrollytelling website for a fictional creative studio that
"vibe codes" apps, websites, and small web apps for small businesses and
dreamers. Warm-cyberpunk aesthetic, told as a story chapter by chapter.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based `@theme` tokens in `app/globals.css`)
- **React Three Fiber** + **drei** + **postprocessing** — the WebGL hero
- **Framer Motion** — scroll/entrance animations
- **Lenis** — smooth scrolling
- Fonts via `next/font`: Space Grotesk (display), Inter (body), JetBrains Mono

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

- `app/layout.tsx` — fonts, metadata, smooth-scroll provider, atmospheric overlays
- `app/globals.css` — the design system (palette, keyframes, FX overlays)
- `components/hero/` — `Hero` wrapper + `HeroScene` (R3F synthwave grid, wireframe core, bloom)
- `components/sections/` — Origin → Craft → Process → Proof → Contact (the story)
- `components/ui/` — Reveal, GlowCard, ChapterLabel, ProgressRail, Marquee
- `components/assets/Icons.tsx` — hand-authored SVG logo + icons
- `lib/content.ts` — all brand copy in one place

## Notes

- All content is invented; contact uses a placeholder address
  (`hello@chillcodelabs.studio`).
- The WebGL hero is dynamically imported (`ssr: false`) and respects
  `prefers-reduced-motion` (smooth scroll + heavy motion disabled).
