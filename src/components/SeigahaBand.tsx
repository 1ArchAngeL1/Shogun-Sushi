import seigahaSrc from "../../public/SHOGUN SHUSHI-03.png";

/**
 * Minimal horizontal seigaiha banner — the brand PNG (841×3819) rotated 90°
 * via inline SVG so the natural vertical strip reads left-to-right. Aspect
 * ratio preserved, no cropping, no tiling.
 */
export function SeigahaBand({
  className = "",
  flipped = false,
}: {
  className?: string;
  flipped?: boolean;
}) {
  return (
    <svg
      aria-hidden
      role="presentation"
      className={`block w-full ${flipped ? "-scale-y-100" : ""} ${className}`}
      viewBox="0 420 3819 421"
      preserveAspectRatio="xMidYMid meet"
    >
      <image
        href={seigahaSrc.src}
        width="841"
        height="3819"
        transform="translate(3819 0) rotate(90)"
      />
    </svg>
  );
}
