import ChapterLabel from "@/components/ui/ChapterLabel";
import Reveal from "@/components/ui/Reveal";
import { origin } from "@/lib/content";

export default function Origin() {
  return (
    <section id="origin" className="story-section">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {/* left: chapter heading */}
        <div className="md:sticky md:top-32 md:self-start">
          <ChapterLabel
            index="01"
            label="origin"
            accent="amber"
            title={
              <>
                It started with a <span className="text-glow-amber gradient-text">glow</span> on
                the ceiling.
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {origin.kicker}
            </p>
          </Reveal>
        </div>

        {/* right: the narrative */}
        <div className="space-y-7 border-l border-line pl-8 md:pl-12">
          {origin.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-muted [&>strong]:text-soft">
                {i === 0 ? (
                  <span className="float-left mr-3 font-display text-6xl font-bold leading-none text-magenta text-glow-magenta">
                    {p.charAt(0)}
                  </span>
                ) : null}
                {i === 0 ? p.slice(1) : p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <p className="pt-2 font-display text-xl italic text-soft">
              {origin.signature}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
