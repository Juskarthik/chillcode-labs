import Reveal from "@/components/ui/Reveal";
import { Logo, ArrowIcon } from "@/components/assets/Icons";
import { brand, contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="transmit" className="story-section overflow-hidden">
      {/* warm horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%]"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 120%, rgba(255,46,151,0.22), rgba(255,180,84,0.12) 40%, transparent 70%)",
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

      {/* terminal-style footer */}
      <footer className="mx-auto mt-28 max-w-6xl px-6">
        <div className="rounded-2xl border border-line bg-elev/40 p-6 font-mono text-sm backdrop-blur-sm sm:p-8">
          <div className="flex items-center gap-2 border-b border-line pb-4">
            <span className="h-3 w-3 rounded-full bg-magenta" />
            <span className="h-3 w-3 rounded-full bg-amber" />
            <span className="h-3 w-3 rounded-full bg-cyan" />
            <span className="ml-3 text-faint">chillcode_labs — session</span>
          </div>

          <div className="grid gap-8 pt-6 sm:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2 text-soft">
                <Logo size={24} />
                <span className="font-display text-base font-semibold">
                  {brand.name}
                </span>
              </div>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted">
                A small studio coding warm software in {brand.location}. We code
                at 2am with lo-fi on and good intentions.
              </p>
            </div>

            <div>
              <p className="text-faint">// reach us</p>
              <a
                href={`mailto:${brand.email}`}
                className="mt-2 block text-soft transition-colors hover:text-cyan"
              >
                {brand.email}
              </a>
            </div>

            <div>
              <p className="text-faint">// elsewhere</p>
              <ul className="mt-2 space-y-1.5">
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <span className="text-soft transition-colors hover:text-magenta">
                      {s.label}
                    </span>{" "}
                    <span className="text-faint">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-line pt-4 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {brand.name} — concept site.
            </span>
            <span className="flex items-center gap-1">
              <span className="text-cyan">$</span> echo &quot;made with neon
              &amp; care&quot;
              <span className="ml-0.5 inline-block animate-blink text-magenta">
                ▍
              </span>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
