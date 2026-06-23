/** Infinite horizontal marquee of client names (CSS-animated, duplicated track). */
export default function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
        {track.map((name, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-xl font-medium text-faint transition-colors hover:text-soft"
          >
            {name}
            <span className="text-magenta">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
