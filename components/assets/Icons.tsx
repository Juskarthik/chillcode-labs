/**
 * Hand-authored SVG assets for Chillcode Labs.
 * All strokes use currentColor so they inherit neon accents from parents.
 */

type IconProps = { className?: string; size?: number };

/** The studio mark: a chill terminal "c" with a power-spark core. */
export function Logo({ className, size = 28 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="cl-logo" x1="4" y1="4" x2="28" y2="28">
          <stop offset="0" stopColor="var(--neon-magenta)" />
          <stop offset="0.5" stopColor="var(--warm-gold)" />
          <stop offset="1" stopColor="var(--neon-cyan)" />
        </linearGradient>
      </defs>
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="8"
        stroke="url(#cl-logo)"
        strokeWidth="1.6"
        opacity="0.9"
      />
      {/* the "c" arc */}
      <path
        d="M22 11.5a7 7 0 1 0 0 9"
        stroke="url(#cl-logo)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* spark core */}
      <path
        d="M16 9.5l1.6 4.4 4.4 1.6-4.4 1.6L16 21.5l-1.6-4.4L10 15.5l4.4-1.6z"
        fill="var(--warm-gold)"
        opacity="0.85"
      />
    </svg>
  );
}

export function AppIcon({ className, size = 40 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <rect
        x="13"
        y="5"
        width="22"
        height="38"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="24" cy="38" r="1.8" fill="currentColor" />
      <path
        d="M19 14h10M19 19h10M19 24h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M30 28l2.4 2.4L30 32.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WebIcon({ className, size = 40 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <rect
        x="5"
        y="9"
        width="38"
        height="30"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M5 17h38" stroke="currentColor" strokeWidth="2" />
      <circle cx="10.5" cy="13" r="1.4" fill="currentColor" />
      <circle cx="15.5" cy="13" r="1.4" fill="currentColor" />
      <path
        d="M14 25l-4 4 4 4M22 23l4 12M34 25l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function SparkIcon({ className, size = 40 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M24 5l3.4 10.4a8 8 0 0 0 5.2 5.2L43 24l-10.4 3.4a8 8 0 0 0-5.2 5.2L24 43l-3.4-10.4a8 8 0 0 0-5.2-5.2L5 24l10.4-3.4a8 8 0 0 0 5.2-5.2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const iconMap = {
  app: AppIcon,
  web: WebIcon,
  spark: SparkIcon,
} as const;
