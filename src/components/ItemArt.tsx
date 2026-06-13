import { SushiTube, fillingFor } from "./SushiTube";
import type { Category, MenuItem } from "@/lib/menu";

/** Nigiri — rice pillow with a topping slice. */
function Nigiri({
  tone = "salmon",
  width = 220,
}: {
  tone?: "salmon" | "tuna" | "eel" | "shrimp" | "yellowtail";
  width?: number;
}) {
  const fish: Record<string, string> = {
    salmon: "#E65D26",
    tuna: "#A52126",
    eel: "#3a1f12",
    shrimp: "#F8945C",
    yellowtail: "#f1c089",
  };
  const c = fish[tone];
  return (
    <svg
      viewBox="0 0 220 100"
      width={width}
      height={(width * 100) / 220}
      aria-hidden
    >
      <ellipse cx="110" cy="78" rx="86" ry="14" fill="#000" opacity="0.4" filter="blur(8px)" />
      <path
        d="M30 70 Q30 50 50 46 Q110 36 170 46 Q190 50 190 70 Q190 84 170 86 Q110 92 50 86 Q30 84 30 70 Z"
        fill="#FAF3E1"
      />
      <g fill="#0d0d0e" opacity="0.08">
        <circle cx="55" cy="68" r="2.5" />
        <circle cx="75" cy="74" r="2.5" />
        <circle cx="100" cy="70" r="2.5" />
        <circle cx="125" cy="76" r="2.5" />
        <circle cx="150" cy="68" r="2.5" />
        <circle cx="170" cy="74" r="2.5" />
      </g>
      <path
        d="M40 52 Q40 32 65 32 L165 32 Q188 32 188 50 Q188 60 170 60 L48 60 Q40 60 40 52 Z"
        fill={c}
      />
      <g stroke="#FAF3E1" strokeWidth="1.5" fill="none" opacity="0.55">
        <path d="M58 38 Q110 28 168 38" />
        <path d="M58 48 Q110 40 168 48" />
        <path d="M58 56 Q110 50 168 56" />
      </g>
    </svg>
  );
}

/** Sashimi — three stacked slices on a slate. */
function Sashimi({
  tone = "salmon",
  width = 220,
}: {
  tone?: "salmon" | "eel";
  width?: number;
}) {
  const palettes: Record<string, string[]> = {
    salmon: ["#E65D26", "#F8945C", "#E65D26"],
    eel: ["#3a1f12", "#5a3220", "#3a1f12"],
  };
  const [a, b, c] = palettes[tone];
  return (
    <svg
      viewBox="0 0 220 100"
      width={width}
      height={(width * 100) / 220}
      aria-hidden
    >
      <rect x="14" y="72" width="192" height="14" rx="2" fill="#0d0d0e" opacity="0.85" />
      <rect x="14" y="70" width="192" height="4" fill="#0d0d0e" />
      <path d="M40 66 Q56 30 96 30 Q116 30 122 50 Q124 66 100 70 Z" fill={a} />
      <path d="M88 66 Q104 28 144 28 Q164 28 170 48 Q172 64 148 68 Z" fill={b} />
      <path d="M136 66 Q152 30 192 30 Q210 30 212 48 Q214 66 188 70 Z" fill={c} />
      <g stroke="#FAF3E1" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M52 50 Q80 42 110 52" />
        <path d="M100 48 Q128 40 158 50" />
        <path d="M148 48 Q176 40 200 50" />
      </g>
    </svg>
  );
}

/**
 * Picks the right illustration for an item.
 * All roll-type categories use the signature SushiTube — it's the brand's hero packaging.
 */
export function ItemArt({
  item,
  width = 220,
  className = "",
}: {
  item: MenuItem;
  width?: number;
  className?: string;
}) {
  const wrap = (children: React.ReactNode) => (
    <div className={className}>{children}</div>
  );

  if (item.category === "nigiri") {
    const tone = item.slug.includes("salmon")
      ? "salmon"
      : item.slug.includes("eel") || item.slug.includes("unagi")
      ? "eel"
      : item.slug.includes("shrimp")
      ? "shrimp"
      : "salmon";
    return wrap(<Nigiri tone={tone} width={width} />);
  }

  if (item.category === "sashimi") {
    const tone =
      item.slug.includes("eel") || item.slug.includes("unagi") ? "eel" : "salmon";
    return wrap(<Sashimi tone={tone} width={width} />);
  }

  // maki, futomaki, fried-rolls, uramaki, pushup — all use the SushiTube
  return wrap(<SushiTube filling={fillingFor(item.slug)} width={width} />);
}

export function categoryEmoji(category: Category): string {
  switch (category) {
    case "maki":
      return "🍣";
    case "nigiri":
      return "🍱";
    case "sashimi":
      return "🐟";
    case "futomaki":
      return "🍣";
    case "fried-rolls":
      return "🔥";
    case "uramaki":
      return "🍣";
    case "pushup":
      return "🥢";
    case "sets":
      return "🍱";
    case "drinks":
      return "🥤";
  }
}
