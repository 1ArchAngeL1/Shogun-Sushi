type Filling = "salmon" | "eel" | "kani" | "veggie" | "salmon-sesame";

const fillingColors: Record<Filling, { rice: string; center: string; accent: string }> = {
  salmon: { rice: "#FAF3E1", center: "#E65D26", accent: "#6B8E23" },
  eel: { rice: "#FAF3E1", center: "#3a1f12", accent: "#6B8E23" },
  kani: { rice: "#FAF3E1", center: "#E65D26", accent: "#FAF3E1" },
  veggie: { rice: "#FAF3E1", center: "#9ACD32", accent: "#556B2F" },
  "salmon-sesame": { rice: "#FAF3E1", center: "#E65D26", accent: "#2b2520" },
};

/**
 * Horizontal sushi-roll-in-a-tube illustration — a stylized take on the
 * Shogun Sushi packaging from the brand book.
 */
export function SushiTube({
  filling = "salmon",
  width = 280,
  className = "",
}: {
  filling?: Filling;
  width?: number;
  className?: string;
}) {
  const colors = fillingColors[filling];
  return (
    <svg
      viewBox="0 0 280 80"
      width={width}
      height={(width * 80) / 280}
      className={className}
      role="img"
      aria-label={`Sushi roll with ${filling}`}
    >
      {/* Tube body (cream) */}
      <rect x="60" y="14" width="210" height="52" rx="6" fill="#FAF3E1" />
      {/* Red seigaiha band on the tube */}
      <rect x="60" y="14" width="60" height="52" fill="#A52126" />
      <g fill="#FAF3E1" opacity="0.35">
        <circle cx="68" cy="40" r="6" />
        <circle cx="84" cy="40" r="6" />
        <circle cx="100" cy="40" r="6" />
        <circle cx="116" cy="40" r="6" />
        <circle cx="76" cy="28" r="6" />
        <circle cx="92" cy="28" r="6" />
        <circle cx="108" cy="28" r="6" />
        <circle cx="76" cy="52" r="6" />
        <circle cx="92" cy="52" r="6" />
        <circle cx="108" cy="52" r="6" />
      </g>
      {/* Salmon dot logo on the tube */}
      <circle cx="148" cy="36" r="6" fill="#E65D26" />
      <path
        d="M138 36 Q148 30 158 36 M140 40 Q148 36 156 40"
        stroke="#FAF3E1"
        strokeWidth="0.6"
        fill="none"
      />
      {/* Katana on the tube */}
      <path
        d="M154 39 Q190 36 220 38"
        stroke="#0d0d0e"
        strokeWidth="1.2"
        fill="none"
      />
      <rect x="200" y="36" width="1.2" height="5" fill="#0d0d0e" />
      {/* SHOGUN text */}
      <text
        x="165"
        y="52"
        fontFamily="var(--font-display)"
        fontSize="10"
        fill="#0d0d0e"
        letterSpacing="1"
      >
        SHOGUN
      </text>
      <text
        x="218"
        y="52"
        fontFamily="var(--font-display)"
        fontSize="5"
        fill="#0d0d0e"
        letterSpacing="1.5"
      >
        SUSHI
      </text>

      {/* Sushi roll on the left tip */}
      <g>
        <circle cx="36" cy="40" r="26" fill="#1a1a1a" />
        <circle cx="36" cy="40" r="22" fill={colors.rice} />
        {/* rice texture */}
        <circle cx="30" cy="34" r="2" fill="white" opacity="0.6" />
        <circle cx="42" cy="36" r="2" fill="white" opacity="0.6" />
        <circle cx="32" cy="48" r="2" fill="white" opacity="0.6" />
        <circle cx="44" cy="46" r="2" fill="white" opacity="0.6" />
        <circle cx="36" cy="40" r="2" fill="white" opacity="0.6" />
        {/* center fill */}
        <circle cx="36" cy="40" r="9" fill={colors.center} />
        <circle cx="36" cy="40" r="5" fill={colors.accent} opacity="0.85" />
      </g>
    </svg>
  );
}

/**
 * Pick a tube-interior color based on the dominant ingredient in the slug.
 * Order matters — check more specific tokens first.
 */
export const fillingFor = (slug: string): Filling => {
  if (slug.includes("veggie") || slug.includes("cucumber") || slug.includes("avocado")) {
    return "veggie";
  }
  if (slug.includes("california") || slug.includes("crab") || slug.includes("kani")) {
    return "kani";
  }
  if (slug.includes("eel") || slug.includes("unagi") || slug.includes("dragon")) {
    return "eel";
  }
  if (slug.includes("shrimp") || slug.includes("bomba")) {
    return "salmon-sesame";
  }
  // Default: salmon — covers Philadelphia, signatures, hotdog rolls, plain maki, etc.
  return "salmon";
};
