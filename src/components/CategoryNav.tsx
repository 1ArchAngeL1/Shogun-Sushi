"use client";

import { useEffect, useRef, useState } from "react";

type CategoryNavItem = {
  slug: string;
  label: string;
};

export function CategoryNav({ categories }: { categories: CategoryNavItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(categories[0]?.slug ?? "");
  const listRef = useRef<HTMLUListElement | null>(null);
  const lockUntilRef = useRef<number>(0);

  useEffect(() => {
    const visible = new Set<string>();
    const order = categories.map((c) => c.slug);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (performance.now() < lockUntilRef.current) return;
        const next = order.find((slug) => visible.has(slug));
        if (next) setActiveSlug(next);
      },
      { rootMargin: "-180px 0px -60% 0px", threshold: 0 },
    );

    const elements = order
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-slug="${activeSlug}"]`);
    if (!active) return;
    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const offset =
      activeRect.left - listRect.left - listRect.width / 2 + activeRect.width / 2;
    list.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeSlug]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-20 sm:top-24 z-30 bg-shogun-cream/95 backdrop-blur border-b border-shogun-black/10"
    >
      <div className="mx-auto max-w-6xl px-2 sm:px-6">
        <ul
          ref={listRef}
          className="flex gap-1 overflow-x-auto no-scrollbar py-2 -mx-2 sm:mx-0 px-2 sm:px-0"
        >
          {categories.map((c) => {
            const isActive = c.slug === activeSlug;
            return (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  data-slug={c.slug}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    lockUntilRef.current = performance.now() + 900;
                    setActiveSlug(c.slug);
                  }}
                  className={
                    "block whitespace-nowrap px-4 py-2.5 font-display tracking-[0.18em] text-xs sm:text-sm transition border-b-2 " +
                    (isActive
                      ? "text-shogun-red border-shogun-red"
                      : "text-shogun-black/70 border-transparent hover:text-shogun-red")
                  }
                >
                  {c.label.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
