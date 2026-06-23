import Reveal from "./Reveal";

const accentClass: Record<string, string> = {
  magenta: "text-magenta",
  cyan: "text-cyan",
  amber: "text-amber",
  violet: "text-violet",
};

/** Terminal-style chapter heading: `NN // label` + section title. */
export default function ChapterLabel({
  index,
  label,
  title,
  accent = "cyan",
  align = "left",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  accent?: keyof typeof accentClass | string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <div
          className={`mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className={accentClass[accent] ?? "text-cyan"}>{index}</span>
          <span className="h-px w-8 hairline" />
          <span className="text-faint">// {label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight text-soft sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
