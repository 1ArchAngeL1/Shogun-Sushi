import Image from "next/image";
import seigahaSrc from "../../public/SHOGUN SHUSHI-03.png";

/**
 * Vertical seigaiha (青海波) side strip rendered from the brand pattern PNG.
 * `side="left"` shows the natural orientation; `side="right"` mirrors it so
 * the pattern reads inward from both edges.
 */
export function SeigahaSide({
  side,
  className = "w-12 sm:w-16",
}: {
  side: "left" | "right";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 ${
        side === "left" ? "left-0" : "right-0 scale-x-[-1]"
      } ${className}`}
    >
      <Image
        src={seigahaSrc}
        alt=""
        fill
        sizes="80px"
        className="object-cover object-top select-none"
      />
    </div>
  );
}
