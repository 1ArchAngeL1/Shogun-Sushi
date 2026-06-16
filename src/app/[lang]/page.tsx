import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeigahaBand } from "@/components/SeigahaBand";
import { FlipCard } from "@/components/FlipCard";
import { categoryEmoji } from "@/components/ItemArt";
import { categoryOrder, itemsByCategory } from "@/lib/menu";
import { getDictionary, hasLocale, t } from "@/lib/i18n";

export default async function LandingPage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

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
      <nav
        aria-label="Menu categories"
        className="sticky top-20 sm:top-24 z-30 bg-shogun-cream/95 backdrop-blur border-b border-shogun-black/10"
      >
        <div className="mx-auto max-w-6xl px-2 sm:px-6">
          <ul className="flex gap-1 overflow-x-auto no-scrollbar py-2 -mx-2 sm:mx-0 px-2 sm:px-0">
            {categoryOrder.map((c) => (
              <li key={c}>
                <a
                  href={`#${c}`}
                  className="block whitespace-nowrap px-4 py-2.5 font-display tracking-[0.18em] text-xs sm:text-sm text-shogun-black/70 hover:text-shogun-red transition"
                >
                  {dict.categories[c].label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── Menu — directly rendered with float-up ───── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 space-y-20">
        {categoryOrder.map((cat) => {
          const items = itemsByCategory(cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} id={cat} className="scroll-mt-36 sm:scroll-mt-40">
              <div className="flex items-end justify-between mb-8 sm:mb-10">
                <h2 className="font-display text-3xl sm:text-5xl tracking-wider">
                  {dict.categories[cat].label.toUpperCase()}
                </h2>
                <div className="hidden sm:block text-shogun-black/40 font-display tracking-[0.25em] text-xs">
                  {String(items.length).padStart(2, "0")} {dict.menu.items}{" "}
                  {categoryEmoji(cat)}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {items.map((item, i) => (
                  <FlipCard
                    key={item.slug}
                    item={item}
                    index={i}
                    name={t(item.name, lang)}
                    ingredients={t(item.ingredients, lang)}
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
