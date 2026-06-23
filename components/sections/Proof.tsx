import ChapterLabel from "@/components/ui/ChapterLabel";
import Reveal from "@/components/ui/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import Marquee from "@/components/ui/Marquee";
import {
  caseStudies,
  testimonials,
  clientMarquee,
  stats,
} from "@/lib/content";

const accentText: Record<string, string> = {
  magenta: "text-magenta",
  cyan: "text-cyan",
  amber: "text-amber",
  violet: "text-violet",
};

export default function Proof() {
  return (
    <section id="signals" className="story-section">
      <div className="mx-auto max-w-6xl px-6">
        <ChapterLabel
          index="04"
          label="signals"
          accent="cyan"
          title={
            <>
              Small businesses,{" "}
              <span className="gradient-text">big glow-ups</span>.
            </>
          }
        />

        {/* case studies */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.1}>
              <GlowCard accent={c.accent} className="h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                      {c.kind}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-soft">
                      {c.client}
                    </h3>
                  </div>
                  <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {c.result}
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {c.blurb}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className={`font-display text-4xl font-bold ${accentText[c.accent]}`}
                  >
                    {c.metric}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-faint">
                    {c.metricLabel}
                  </span>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* stats strip */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 bg-void px-6 py-8 text-center"
            >
              <span className="gradient-text font-display text-4xl font-bold">
                {s.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-elev/40 p-7">
                <span className="font-display text-5xl leading-none text-magenta/60">
                  &ldquo;
                </span>
                <blockquote className="-mt-3 flex-1 text-[15px] leading-relaxed text-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="font-display text-sm font-semibold text-soft">
                    {t.name}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* client marquee */}
      <div className="mt-16">
        <Marquee items={clientMarquee} />
      </div>
    </section>
  );
}
