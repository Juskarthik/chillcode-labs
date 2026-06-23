import ChapterLabel from "@/components/ui/ChapterLabel";
import Reveal from "@/components/ui/Reveal";
import { steps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="story-section">
      {/* soft warm wash behind this chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, rgba(165,92,255,0.1), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <ChapterLabel
          index="03"
          label="the vibe"
          accent="violet"
          title={
            <>
              How a feeling becomes{" "}
              <span className="gradient-text">software</span>.
            </>
          }
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            No black boxes, no jargon walls. Vibe coding is just four honest
            steps with the lo-fi turned up.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-8 md:grid-cols-4">
          {/* connecting line on desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 hidden h-px md:block"
            style={{
              top: "-1.5rem",
              background:
                "linear-gradient(90deg, transparent, var(--line-strong), transparent)",
            }}
          />
          {steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.12}>
              <li className="relative">
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line font-display text-lg font-bold text-soft"
                    style={{ boxShadow: "inset 0 0 18px rgba(255,46,151,0.18)" }}
                  >
                    {step.no}
                  </span>
                  <span className="h-px flex-1 hairline" />
                </div>
                <h3 className="font-display text-xl font-semibold text-soft">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
