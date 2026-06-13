/**
 * Sumi-e (ink wash) illustrations recreated in SVG from the Shogun Sushi
 * brand book — pine branch, cliff with pagoda silhouette, and flocking birds.
 *
 * All shapes use currentColor so they inherit the parent text color.
 */

export function PineBranch({
  width = 320,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 220"
      width={width}
      height={(width * 220) / 320}
      className={className}
      aria-hidden
    >
      <g fill="currentColor">
        {/* Main bough — broken brush stroke */}
        <path d="M0 132 C 40 122, 78 130, 116 124 C 150 118, 188 126, 224 118 C 260 110, 292 116, 320 108 L 320 116 C 290 124, 260 120, 228 128 C 196 136, 162 130, 130 138 C 96 146, 60 142, 28 150 C 18 152, 8 150, 0 146 Z" />
        {/* Sub-branch up */}
        <path d="M150 124 C 158 110, 168 96, 176 78 C 178 74, 182 74, 184 78 C 178 96, 170 112, 160 128 Z" />
        {/* Sub-branch down */}
        <path d="M214 124 C 222 138, 232 152, 238 168 C 240 172, 236 174, 232 172 C 224 158, 218 144, 210 128 Z" />
        {/* Sub-branch up right */}
        <path d="M268 116 C 274 102, 282 88, 290 76 C 292 72, 296 74, 296 78 C 290 92, 282 106, 274 120 Z" />

        {/* Pine-needle clusters — fan shapes */}
        <NeedleCluster cx={180} cy={70} r={26} rot={-20} />
        <NeedleCluster cx={158} cy={108} r={20} rot={10} />
        <NeedleCluster cx={232} cy={170} r={24} rot={40} />
        <NeedleCluster cx={290} cy={70} r={22} rot={-5} />
        <NeedleCluster cx={108} cy={128} r={18} rot={-30} />
        <NeedleCluster cx={56} cy={150} r={20} rot={20} />
      </g>
    </svg>
  );
}

function NeedleCluster({ cx, cy, r, rot }: { cx: number; cy: number; r: number; rot: number }) {
  const lines = Array.from({ length: 14 }, (_, i) => {
    const a = (-Math.PI / 2) + (i - 7) * (Math.PI / 22);
    return { x2: cx + Math.cos(a) * r, y2: cy + Math.sin(a) * r };
  });
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`} stroke="currentColor" strokeWidth="1.4" fill="none">
      {lines.map((l, i) => (
        <line key={i} x1={cx} y1={cy} x2={l.x2} y2={l.y2} />
      ))}
    </g>
  );
}

export function CliffPagoda({
  width = 320,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 480"
      width={width}
      height={(width * 480) / 320}
      className={className}
      aria-hidden
    >
      <g fill="currentColor">
        {/* Main cliff shape — jagged, dynamic */}
        <path d="M 140 0 L 168 4 L 184 24 L 200 8 L 216 48 L 232 30 L 248 76 L 264 60 L 276 112 L 288 96 L 296 156 L 308 140 L 314 196 L 320 184 L 320 480 L 130 480 L 138 432 L 122 420 L 132 380 L 116 360 L 130 320 L 114 300 L 128 260 L 116 240 L 130 200 L 116 180 L 134 140 L 122 120 L 138 80 L 124 56 L 138 24 Z" />
        {/* Cliff shading splatter */}
        <g opacity="0.5">
          <circle cx="160" cy="120" r="3" />
          <circle cx="180" cy="200" r="2" />
          <circle cx="155" cy="280" r="2.5" />
          <circle cx="200" cy="360" r="3" />
          <circle cx="170" cy="420" r="2" />
        </g>
      </g>

      {/* Pagoda silhouette — perched near top */}
      <g fill="currentColor" transform="translate(208, 260)">
        {/* Two-tier pagoda */}
        <path d="M -22 0 L 22 0 L 18 -4 L -18 -4 Z" />
        <path d="M -16 -4 L 16 -4 L 16 -22 L -16 -22 Z" />
        <path d="M -26 -22 L 26 -22 L 18 -30 L -18 -30 Z" />
        <path d="M -14 -30 L 14 -30 L 14 -48 L -14 -48 Z" />
        <path d="M -22 -48 L 22 -48 L 14 -58 L -14 -58 Z" />
        <path d="M -3 -58 L 3 -58 L 3 -66 L -3 -66 Z" />
      </g>

      {/* Tree silhouette near the top */}
      <g fill="currentColor" transform="translate(196, 140)">
        <path d="M 0 0 L -2 -30 L 4 -32 L 2 0 Z" />
        <circle cx="0" cy="-32" r="6" />
        <circle cx="-6" cy="-28" r="5" />
        <circle cx="6" cy="-30" r="5" />
      </g>
    </svg>
  );
}

export function FlyingBirds({
  width = 160,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 80"
      width={width}
      height={(width * 80) / 160}
      className={className}
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M 10 50 Q 18 38 26 48 Q 34 38 42 50" />
        <path d="M 50 30 Q 58 20 66 30 Q 74 20 82 30" />
        <path d="M 92 56 Q 100 46 108 56 Q 116 46 124 56" />
        <path d="M 124 24 Q 132 14 140 24 Q 148 14 156 24" />
      </g>
    </svg>
  );
}

/**
 * Vertical "SHOGUN SUSHI" wordmark — orientation mirrors the brand packaging.
 * The salmon-disc-with-katana sits on top, then the rotated wordmark.
 */
export function VerticalLogoMark({
  height = 340,
  className = "",
  color = "currentColor",
}: {
  height?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 360"
      height={height}
      width={(height * 120) / 360}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="salmonV" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F8945C" />
          <stop offset="100%" stopColor="#E65D26" />
        </radialGradient>
      </defs>

      {/* Salmon disc */}
      <circle cx="60" cy="38" r="22" fill="url(#salmonV)" />
      <path
        d="M40 38 Q60 24 80 38 M42 46 Q60 36 78 46 M42 30 Q60 40 78 30"
        stroke="#FAF3E1"
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
      />

      {/* Vertical katana (down) */}
      <path
        d="M 60 62 Q 58 160 60 260"
        stroke={color}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="56" y="190" width="8" height="2.4" fill={color} rx="0.5" />
      <circle cx="60" cy="260" r="1.6" fill={color} />

      {/* Rotated wordmark "SHOGUN" stacked vertically */}
      <g transform="translate(60 130) rotate(90)" fill={color}>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="44"
          letterSpacing="3"
        >
          SHOGUN
        </text>
      </g>
      <g transform="translate(60 250) rotate(90)" fill={color}>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="18"
          letterSpacing="6"
        >
          SUSHI
        </text>
      </g>
    </svg>
  );
}
