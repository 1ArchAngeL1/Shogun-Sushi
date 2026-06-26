import Image from "next/image";
import logoSrc from "../../public/logo.png";
import type { MenuItem } from "@/lib/menu";
import { PriceTag } from "./PriceTag";

export function FlipCard({
  item,
  index,
  name,
  ingredients,
}: {
  item: MenuItem;
  index: number;
  name: string;
  ingredients: string[];
}) {
  const photo = item.image ?? null;

  return (
    <article
      className="float-up flex flex-col rounded-2xl bg-shogun-black overflow-hidden ring-1 ring-shogun-black/40 shadow-[0_22px_44px_-22px_rgba(13,13,14,0.55)] hover:shadow-[0_28px_56px_-22px_rgba(165,33,38,0.45)] transition-shadow duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image panel */}
      <div className="relative aspect-[4/3] bg-shogun-cream overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center px-6 py-4">
            <Image
              src={logoSrc}
              alt=""
              aria-hidden
              placeholder="blur"
              sizes="(max-width: 640px) 60vw, 220px"
              className="h-20 sm:h-24 w-auto select-none object-contain"
            />
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="relative flex flex-col gap-3 bg-shogun-black px-5 pt-5 pb-5 flex-1">
        <span
          aria-hidden
          className="absolute left-5 right-5 top-0 h-px bg-shogun-red/70"
        />

        <h3 className="font-display text-xl sm:text-2xl tracking-[0.16em] text-shogun-cream leading-tight">
          {name.toUpperCase()}
        </h3>

        {ingredients.length > 0 ? (
          <p className="text-shogun-cream/75 text-[12px] leading-relaxed">
            {ingredients.join(" · ")}
          </p>
        ) : null}

        <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-shogun-cream/10">
          <PriceTag
            price={item.price}
            salePrice={item.salePrice}
            className="font-display text-3xl text-shogun-orange leading-none"
            oldClassName="font-display text-lg text-shogun-cream/40"
          />
        </div>
      </div>
    </article>
  );
}
