"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { locales, localeMeta, type Locale } from "@/lib/i18n.client";

export function LanguageSwitcher({
  current,
  variant = "dark",
}: {
  current: Locale;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname() ?? "/";
  const search = useSearchParams();
  const query = search?.toString();

  const swap = (next: Locale) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) parts.push(next);
    else parts[0] = next;
    const url = "/" + parts.join("/");
    return query ? `${url}?${query}` : url;
  };

  const onLight = variant === "light";

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full p-0.5 border ${
        onLight
          ? "border-shogun-cream/20 bg-shogun-black/40"
          : "border-shogun-black/20 bg-shogun-cream"
      }`}
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={swap(loc)}
            scroll={false}
            aria-current={active ? "true" : undefined}
            aria-label={`Switch to ${localeMeta[loc].label}`}
            className={`relative px-3 py-1 text-xs font-display tracking-[0.18em] rounded-full transition ${
              active
                ? onLight
                  ? "bg-shogun-orange text-shogun-black"
                  : "bg-shogun-red text-shogun-cream"
                : onLight
                ? "text-shogun-cream/70 hover:text-shogun-cream"
                : "text-shogun-black/60 hover:text-shogun-black"
            }`}
          >
            {localeMeta[loc].short}
          </Link>
        );
      })}
    </div>
  );
}
