import ChapterLabel from "@/components/ui/ChapterLabel";
import Reveal from "@/components/ui/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import { iconMap, ArrowIcon } from "@/components/assets/Icons";
import { services } from "@/lib/content";

const accentText: Record<string, string> = {
  magenta: "text-magenta",
  cyan: "text-cyan",
  amber: "text-amber",
};

export default function Craft() {
  return (
    <section id="craft" className="story-section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <ChapterLabel
            index="02"
            label="craft"
            accent="magenta"
            title={
              <>
                Three ways we make the{" "}
                <span className="gradient-text">neon</span> happen.
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Whatever the shape of your idea, we meet it where it lives — in a
              pocket, in a browser, or in the quiet tools that keep a business
              running.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <Reveal key={s.name} delay={i * 0.12}>
                <GlowCard accent={s.accent} className="h-full">
                  <div className="flex h-full flex-col">
                    <div className={`mb-6 ${accentText[s.accent]}`}>
                      <Icon size={44} />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                      {s.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-soft">
                      {s.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                      {s.body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div
                      className={`mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] ${accentText[s.accent]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    >
                      let&apos;s build it <ArrowIcon size={14} />
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
