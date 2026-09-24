import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/assets/Icons";
import ShutdownFooter from "@/components/ui/ShutdownFooter";
import { brand, contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="transmit" className="story-section overflow-hidden pb-0!">
      {/* phosphor horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%]"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 120%, rgba(255,255,255,0.18), rgba(255,255,255,0.08) 40%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            {contact.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-soft sm:text-6xl">
            Let&apos;s <span className="gradient-text text-glow-magenta">vibe code</span>{" "}
            your story.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            {contact.body}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={`mailto:${brand.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-magenta px-8 py-4 text-base font-semibold text-void transition-transform hover:scale-[1.03]"
              style={{ boxShadow: "0 0 40px var(--glow-magenta)" }}
            >
              {contact.cta}
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="font-mono text-sm text-muted transition-colors hover:text-cyan"
            >
              {contact.secondary} → {brand.email}
            </a>
          </div>
        </Reveal>
      </div>

      <ShutdownFooter />
    </section>
  );
}
