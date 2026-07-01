import Image from "next/image";
import logoSrc from "../../public/logo.png";
import type { MenuItem } from "@/lib/menu";
import { PriceTag } from "./PriceTag";

/** Small inline clock glyph used on time-restricted items. */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FlipCard({
  item,
  index,
  name,
  ingredients,
  unavailable = false,
  unavailableLabel,
  availableLabel,
}: {
  item: MenuItem;
  index: number;
  name: string;
  ingredients: string[];
  /** True when the item is outside its time-of-day window right now. */
  unavailable?: boolean;
  /** Localized "Currently unavailable" caption. */
  unavailableLabel?: string;
  /** Localized "Available" word, rendered as e.g. "Available 11:00–22:00". */
  availableLabel?: string;
}) {
  const photo = item.image ?? null;
  const win = item.availability;
  const windowText =
    win && win.timed ? `${win.from}–${win.to}` : null;

  return (
    <article
      className={`float-up flex flex-col rounded-2xl bg-shogun-black overflow-hidden ring-1 ring-shogun-black/40 shadow-[0_22px_44px_-22px_rgba(13,13,14,0.55)] transition-shadow duration-300 ${
        unavailable
          ? "ring-shogun-cream/10"
          : "hover:shadow-[0_28px_56px_-22px_rgba(165,33,38,0.45)]"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
      aria-disabled={unavailable || undefined}
    >
      {/* Image panel */}
      <div className="relative aspect-[4/3] bg-shogun-cream overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-contain p-2 ${unavailable ? "grayscale" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center px-6 py-4">
            <Image
              src={logoSrc}
              alt=""
              aria-hidden
              placeholder="blur"
              sizes="(max-width: 640px) 60vw, 220px"
              className={`h-20 sm:h-24 w-auto select-none object-contain ${
                unavailable ? "grayscale opacity-70" : ""
              }`}
            />
          </div>
        )}

        {/* Dark "unavailable" veil with the serving window */}
        {unavailable && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-shogun-black/70 backdrop-blur-[1px] text-center px-4">
            <div>
              <div className="font-display tracking-[0.22em] text-shogun-cream text-xs sm:text-sm">
                {unavailableLabel}
              </div>
              {windowText && (
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-shogun-orange text-[11px] sm:text-xs">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <span>
                    {availableLabel} {windowText}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="relative flex flex-col gap-3 bg-shogun-black px-5 pt-5 pb-5 flex-1">
        <span
          aria-hidden
          className="absolute left-5 right-5 top-0 h-px bg-shogun-red/70"
        />

        <h3
          className={`font-display text-xl sm:text-2xl tracking-[0.16em] leading-tight ${
            unavailable ? "text-shogun-cream/60" : "text-shogun-cream"
          }`}
        >
          {name.toUpperCase()}
        </h3>

        {ingredients.length > 0 ? (
          <p
            className={`text-[12px] leading-relaxed ${
              unavailable ? "text-shogun-cream/40" : "text-shogun-cream/75"
            }`}
          >
            {ingredients.join(" · ")}
          </p>
        ) : null}

        {/* Serving window, also shown in the info area so it reads without the image */}
        {unavailable && windowText && (
          <p className="inline-flex items-center gap-1.5 text-shogun-orange/90 text-[11px] font-display tracking-[0.12em]">
            <ClockIcon className="h-3 w-3" />
            <span>
              {availableLabel} {windowText}
            </span>
          </p>
        )}

        <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-shogun-cream/10">
          <PriceTag
            price={item.price}
            salePrice={item.salePrice}
            className={`font-display text-3xl leading-none ${
              unavailable ? "text-shogun-orange/60" : "text-shogun-orange"
            }`}
            oldClassName={`font-display text-3xl ${
              unavailable ? "text-shogun-red/60" : "text-shogun-red"
            }`}
          />
        </div>
      </div>
    </article>
  );
}
