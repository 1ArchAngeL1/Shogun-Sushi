import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeigahaBand } from "@/components/SeigahaBand";
import { FlipCard } from "@/components/FlipCard";
import { CategoryNav } from "@/components/CategoryNav";
import { getMenuData } from "@/lib/menu-store";
import { isVisibleNow, nowMinutesInTz } from "@/lib/availability";
import { getDictionary, hasLocale, t } from "@/lib/i18n";

// Read the editable menu store fresh on every request so admin edits show live.
export const dynamic = "force-dynamic";

export default async function LandingPage(props: PageProps<"/[lang]">) {
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

      {/* ─── Slogan ───────────────────────────────────── */}
      <section className="bg-shogun-cream py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="brush-slab py-7 sm:py-10 px-6 sm:px-10 text-center">
            <p className="font-display text-white tracking-[0.12em] sm:tracking-[0.18em] text-xl sm:text-3xl md:text-5xl leading-tight whitespace-nowrap">
              HONOUR <span className="text-shogun-orange">IN EVERY</span> ROLL
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-shogun-cream/40">
              <span className="h-px w-10 bg-current" />
              <span className="font-display tracking-[0.45em] text-[10px] sm:text-xs">
                SHOGUN SUSHI
              </span>
              <span className="h-px w-10 bg-current" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sticky category nav ──────────────────────── */}
      <CategoryNav
        categories={categories.map((c) => ({
          slug: c.id,
          label: t(c.label, lang),
        }))}
      />

      {/* ─── Menu — directly rendered with float-up ───── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 space-y-20">
        {categories.map((cat) => {
          const catItems = items.filter((m) => m.category === cat.id);
          if (catItems.length === 0) return null;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-36 sm:scroll-mt-40">
              <div className="flex items-end justify-between mb-8 sm:mb-10">
                <h2 className="font-display text-3xl sm:text-5xl tracking-wider">
                  {t(cat.label, lang).toUpperCase()}
                </h2>
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
