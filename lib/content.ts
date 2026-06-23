/**
 * All invented brand copy for Chillcode Labs lives here so the section
 * components stay clean and the story stays editable in one place.
 */

export const brand = {
  name: "Chillcode Labs",
  wordmark: "chillcode_labs",
  email: "hello@chillcodelabs.studio",
  location: "a warm little corner of the internet",
  taglines: [
    "We vibe code your world into being.",
    "Neon dreams, shipped clean.",
    "Small studio. Big glow.",
  ],
};

export const chapters = [
  { id: "boot", index: "00", label: "boot" },
  { id: "origin", index: "01", label: "origin" },
  { id: "craft", index: "02", label: "craft" },
  { id: "process", index: "03", label: "the vibe" },
  { id: "signals", index: "04", label: "signals" },
  { id: "transmit", index: "05", label: "transmit" },
] as const;

export const origin = {
  kicker: "// once upon a 2am",
  title: "It started with a glow on the ceiling.",
  paragraphs: [
    "Chillcode Labs began the way most good things do — late at night, with lo-fi humming and a half-finished idea refusing to let anyone sleep.",
    "We noticed that the people with the warmest ideas — the corner bakery, the tarot reader, the kid with a notebook full of apps — were the ones told that good software was out of reach. Too slow. Too pricey. Too serious.",
    "So we built a studio for them. We call what we do vibe coding: we feel the heart of your idea first, then let the neon follow. Craft with the rigor of engineers, warmth of friends.",
  ],
  signature: "— the Chillcode crew",
};

export const services = [
  {
    icon: "app",
    name: "Apps",
    tagline: "Pocket-sized magic",
    body: "iOS, Android & cross-platform apps that feel alive in the hand. From first sketch to the App Store, we make tools people actually want to open.",
    tags: ["Mobile", "PWA", "Prototype → Ship"],
    accent: "magenta",
  },
  {
    icon: "web",
    name: "Websites",
    tagline: "Your story, lit up",
    body: "Sites that don't just inform — they make people feel something. Story-driven, fast, animated, and unmistakably you.",
    tags: ["Marketing", "Portfolio", "Storytelling"],
    accent: "cyan",
  },
  {
    icon: "spark",
    name: "Small web apps",
    tagline: "Tiny tools, huge relief",
    body: "Booking flows, dashboards, calculators, members-only nooks — the little custom tools that quietly run a whole small business.",
    tags: ["Dashboards", "Booking", "Automations"],
    accent: "amber",
  },
];

export const steps = [
  {
    no: "01",
    title: "Tune in",
    body: "A relaxed chat — no jargon, no pressure. We listen for the feeling underneath the feature list.",
  },
  {
    no: "02",
    title: "Sketch the dream",
    body: "Mood, motion and a clickable shape. You see and feel the vibe before a line of production code exists.",
  },
  {
    no: "03",
    title: "Vibe code",
    body: "Heads-down, lo-fi on. We build in tight, visible loops so it never feels like a black box.",
  },
  {
    no: "04",
    title: "Ship the glow",
    body: "Launch, polish, and a little care package so you can keep it glowing long after we high-five.",
  },
];

export const caseStudies = [
  {
    client: "Lumen & Loaf",
    kind: "Neighborhood bakery",
    result: "Order-ahead app",
    blurb:
      "A cozy pre-order app that cut the morning line in half and tripled the croissant pre-sales.",
    metric: "+212%",
    metricLabel: "pre-orders",
    accent: "amber",
  },
  {
    client: "Nova Tarot",
    kind: "Solo reader",
    result: "Booking web app",
    blurb:
      "A dreamy booking flow with moon-phase scheduling that filled her calendar three weeks out.",
    metric: "3 wks",
    metricLabel: "booked ahead",
    accent: "violet",
  },
  {
    client: "Driftwood Surf Co.",
    kind: "Tiny surf shop",
    result: "Storefront site",
    blurb:
      "A wave-animated storefront that doubled online revenue in its first season.",
    metric: "2×",
    metricLabel: "online revenue",
    accent: "cyan",
  },
];

export const testimonials = [
  {
    quote:
      "They got the feeling of my shop before they got the brief. The site feels like walking in on a sunny day.",
    name: "Mara V.",
    role: "Owner, Driftwood Surf Co.",
  },
  {
    quote:
      "I'm one person with a big idea. Chillcode made me feel like I had a whole team that actually cared.",
    name: "Devon R.",
    role: "Founder, indie app",
  },
  {
    quote:
      "Fast, kind, and a little bit magic. My booking app just works and looks gorgeous doing it.",
    name: "Nova S.",
    role: "Nova Tarot",
  },
];

export const clientMarquee = [
  "Lumen & Loaf",
  "Nova Tarot",
  "Driftwood Surf Co.",
  "Pixel Pantry",
  "Midnight Mochi",
  "Glow Garden",
  "Static & Stone",
  "Honeycomb Studio",
  "Velvet Transit",
  "Backyard Arcade",
];

export const stats = [
  { value: "60+", label: "ideas shipped" },
  { value: "100%", label: "small & indie" },
  { value: "2am", label: "peak focus" },
  { value: "∞", label: "lo-fi played" },
];

export const contact = {
  kicker: "// 05 — transmit",
  title: "Let's vibe code your story.",
  body: "Got a glimmer of an idea? A business that deserves to glow? Send a signal — we read everything, and we reply like humans.",
  cta: "Start a transmission",
  secondary: "or just say hi",
  socials: [
    { label: "Instagram", handle: "@chillcode.labs" },
    { label: "Dribbble", handle: "chillcodelabs" },
    { label: "GitHub", handle: "chillcode-labs" },
  ],
};
