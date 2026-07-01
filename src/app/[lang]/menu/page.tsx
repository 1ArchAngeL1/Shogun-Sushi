import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeigahaBand } from "@/components/SeigahaBand";
import { FlipCard } from "@/components/FlipCard";
import { categoryEmoji } from "@/components/ItemArt";
import { PineBranch, CliffPagoda } from "@/components/SumiE";
import { getMenuData } from "@/lib/menu-store";
import { isVisibleNow, nowMinutesInTz } from "@/lib/availability";
import { getDictionary, hasLocale, t } from "@/lib/i18n";

// Read the editable menu store fresh on every request so admin edits show live.
export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/[lang]/menu">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.menuTitle, description: dict.meta.menuDesc };
}

export default async function MenuPage(props: PageProps<"/[lang]/menu">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { categories, items } = await getMenuData();
  // Time-restricted items are still shown, just dimmed as "unavailable" when
  // outside their window. Evaluate once against the restaurant clock.
  const nowMin = nowMinutesInTz();

  return (
    <main className="bg-shogun-cream text-shogun-black min-h-screen">
      <SiteHeader lang={lang} dict={dict} />

      {/* ─── Seigaiha band — sits directly below the header ─ */}
      <SeigahaBand />

      {/* ─── Menu hero — packaging style ──────────────── */}
      <section className="relative overflow-hidden bg-shogun-cream border-b border-shogun-black/10">

        <div className="relative grain mx-auto max-w-6xl px-6 py-14 md:py-20">
          {/* Right cliff art */}
          <div className="absolute right-0 top-0 bottom-0 text-shogun-black opacity-90 pointer-events-none hidden md:block">
            <CliffPagoda width={200} className="h-full w-auto" />
          </div>
          {/* Left pine */}
          <div className="absolute -left-6 -bottom-2 text-shogun-black opacity-90 pointer-events-none">
            <PineBranch width={360} className="hidden sm:block" />
          </div>

          <div className="relative">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider leading-[0.95]">
              {dict.menu.title}
            </h1>
            <p className="mt-5 max-w-lg text-shogun-charcoal/80">
              {dict.menu.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Sticky category nav ──────────────────────── */}
      <nav
        aria-label="Menu categories"
        className="sticky top-16 z-30 bg-shogun-cream/95 backdrop-blur border-b border-shogun-black/10"
      >
        <div className="mx-auto max-w-6xl px-2 sm:px-6">
          <ul className="flex gap-1 overflow-x-auto no-scrollbar py-2 -mx-2 sm:mx-0 px-2 sm:px-0">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="block whitespace-nowrap px-4 py-2.5 font-display tracking-[0.18em] text-xs sm:text-sm text-shogun-black/70 hover:text-shogun-red transition"
                >
                  {t(c.label, lang).toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── Category sections ────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 space-y-20">
        {categories.map((cat) => {
          const catItems = items.filter((m) => m.category === cat.id);
          if (catItems.length === 0) return null;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-32 sm:scroll-mt-36">
              <div className="flex items-end justify-between mb-8 sm:mb-10">
                <h2 className="font-display text-3xl sm:text-5xl tracking-wider">
                  {t(cat.label, lang).toUpperCase()}
                </h2>
                <div className="hidden sm:block text-shogun-black/40 font-display tracking-[0.25em] text-xs">
                  {String(catItems.length).padStart(2, "0")} {dict.menu.items}{" "}
                  {categoryEmoji(cat.id)}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {catItems.map((item, i) => (
                  <FlipCard
                    key={item.slug}
                    item={item}
                    index={i}
                    name={t(item.name, lang)}
                    ingredients={t(item.ingredients, lang)}
                    unavailable={!isVisibleNow(item, nowMin)}
                    unavailableLabel={dict.availability.unavailable}
                    availableLabel={dict.availability.available}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <SeigahaBand flipped />

      <SiteFooter lang={lang} dict={dict} />
    </main>
  );
}
