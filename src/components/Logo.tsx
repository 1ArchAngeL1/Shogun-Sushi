type LogoProps = {
  variant?: "light" | "dark";
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * Salmon-roll-with-katana mark from the Shogun Sushi brand.
 * Reproduced in SVG so it stays crisp at any size.
 */
export function LogoMark({ size = 56 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 120 60"
      width={size}
      height={(size * 60) / 120}
      aria-hidden
    >
      <defs>
        <radialGradient id="salmon" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F8945C" />
          <stop offset="100%" stopColor="#E65D26" />
        </radialGradient>
      </defs>
      {/* Salmon roll */}
      <circle cx="22" cy="30" r="18" fill="url(#salmon)" />
      {/* Roll texture lines */}
      <path
        d="M8 30 Q22 18 36 30 M10 38 Q22 28 34 38 M10 22 Q22 32 34 22"
        stroke="#FAF3E1"
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
      />
      {/* Katana blade */}
      <path
        d="M28 34 Q60 22 110 30"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tsuba (guard) */}
      <rect x="78" y="27" width="2.4" height="8" fill="currentColor" rx="0.5" />
      {/* Tip dot */}
      <circle cx="110" cy="30" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  size = 56,
  withWordmark = true,
  className = "",
}: LogoProps) {
  const color = variant === "light" ? "text-shogun-cream" : "text-shogun-black";
  return (
    <div className={`flex items-center gap-3 ${color} ${className}`}>
      <LogoMark size={size} />
      {withWordmark && (
        <div className="leading-none">
          <div
            className="font-display tracking-[0.08em]"
            style={{ fontSize: size * 0.7, lineHeight: 0.85 }}
          >
            SHOGUN
          </div>
          <div
            className="font-display tracking-[0.4em] mt-1"
            style={{ fontSize: size * 0.22 }}
          >
            SUSHI
          </div>
        </div>
      )}
    </div>
  );
}
