import { saleOf } from "@/lib/menu";

/**
 * Renders a menu item's price. When the item is on sale, the regular price is
 * shown struck through (გადახაზული) next to the discounted price.
 *
 * `className` styles the active/current price (size + colour per context);
 * `oldClassName` styles the struck-through regular price.
 */
export function PriceTag({
  price,
  salePrice,
  className = "",
  oldClassName = "",
}: {
  price: number;
  salePrice?: number | null;
  className?: string;
  oldClassName?: string;
}) {
  const sale = saleOf({ price, salePrice });

  if (sale == null) {
    return <span className={className}>{price} ₾</span>;
  }

  return (
    <span className="inline-flex items-baseline gap-2">
      {/* Sale price on the left, struck-through old price (red) on the right. */}
      <span className={className}>{sale} ₾</span>
      <span className={`line-through ${oldClassName}`}>{price} ₾</span>
    </span>
  );
}
