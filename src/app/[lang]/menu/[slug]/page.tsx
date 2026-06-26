import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ItemArt } from "@/components/ItemArt";
import { PineBranch } from "@/components/SumiE";
import { badgeColor } from "@/lib/menu";
import { getMenuData } from "@/lib/menu-store";
import { getDictionary, hasLocale, t } from "@/lib/i18n";

// Read the editable menu store fresh on every request so admin edits show live.
export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/[lang]/menu/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) return {};
  const { items } = await getMenuData();
  const item = items.find((m) => m.slug === slug);
  if (!item) return { title: "Not found · Shogun Sushi" };
  return {
    title: `${t(item.name, lang)} · Shogun Sushi`,
    description: t(item.description, lang),
  };
}

const badgeColorLight: Record<string, string> = {
  signature: "bg-shogun-red text-shogun-cream",
  veggie: "bg-green-700 text-shogun-cream",
  spicy: "bg-shogun-orange text-shogun-black",
  new: "bg-shogun-black text-shogun-cream",
  popular: "bg-shogun-orange text-shogun-black",
  "gluten-free":
    "bg-shogun-cream text-shogun-black border border-shogun-black/30",
};

export default async function ItemPage(
  props: PageProps<"/[lang]/menu/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { categories, items } = await getMenuData();
  const item = items.find((m) => m.slug === slug);
  if (!item) notFound();

  const dict = await getDictionary(lang);
  const category = categories.find((c) => c.id === item.category);
  const catLabel = category ? t(category.label, lang) : item.category;
  const photo = item.image ?? null;
  const related = items
    .filter((m) => m.category === item.category && m.slug !== item.slug)
    .slice(0, 3);

  return (
    <main className="bg-shogun-cream text-shogun-black min-h-screen">
      <SiteHeader lang={lang} dict={dict} />

      {/* breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pt-6 text-shogun-black/55 text-xs font-display tracking-[0.2em]">
        <Link href={`/${lang}/menu`} className="hover:text-shogun-red">
          {dict.detail.breadcrumbMenu}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/${lang}/menu#${item.category}`}
          className="hover:text-shogun-red"
        >
          {catLabel.toUpperCase()}
        </Link>
      </div>

      {/* ─── Detail hero ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-shogun-cream">
        <div className="relative grain mx-auto max-w-6xl px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="absolute -left-6 -bottom-2 text-shogun-black opacity-90 pointer-events-none hidden lg:block">
            <PineBranch width={300} />
          </div>

          {/* Hero visual */}
          {photo ? (
            <div className="relative aspect-square bg-shogun-cream border border-shogun-black/15 rounded-3xl overflow-hidden shadow-[0_28px_60px_-40px_rgba(0,0,0,0.35)]">
              <Image
                src={photo}
                alt={t(item.name, lang)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                preload
                className="object-contain p-6 md:p-10"
              />
            </div>
          ) : (
            <div className="relative bg-shogun-cream border border-shogun-black/15 rounded-3xl p-8 md:p-12 grid place-items-center min-h-[260px] shadow-[0_28px_60px_-40px_rgba(0,0,0,0.35)]">
              <ItemArt item={item} width={360} />
            </div>
          )}

          {/* Info */}
          <div className="relative">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider leading-[0.95]">
              {t(item.name, lang).toUpperCase()}
            </h1>

            {item.badges && item.badges.length > 0 && (
              <div className="mt-5 flex gap-2 flex-wrap">
                {item.badges.map((b) => (
                  <span
                    key={b}
                    className={`text-[10px] tracking-[0.18em] font-display px-2.5 py-1 ${
                      badgeColorLight[b] ?? badgeColor[b]
                    }`}
                  >
                    {dict.badges[b].toUpperCase()}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-6 text-lg text-shogun-charcoal/85 max-w-lg">
              {t(item.description, lang)}
            </p>

            <div className="mt-8 flex items-baseline gap-6">
              <div className="font-display text-6xl text-shogun-red">
                {item.price} ₾
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ─── Ingredients ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl tracking-wider">
          {dict.detail.ingredientsTitle}
        </h2>
        <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl">
          {t(item.ingredients, lang).map((ing) => (
            <li
              key={ing}
              className="flex items-baseline gap-4 border-b border-shogun-black/10 pb-3"
            >
              <span className="font-display text-shogun-red text-sm">·</span>
              <span className="text-shogun-charcoal/90">{ing}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Related ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-shogun-black/10">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-3xl tracking-wider">
                {dict.detail.relatedTitle}
              </h2>
            </div>
            <Link
              href={`/${lang}/menu#${item.category}`}
              className="font-display tracking-[0.2em] text-shogun-red hover:text-shogun-black text-sm"
            >
              {dict.detail.allInCategory} {catLabel.toUpperCase()} →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => {
              const relatedPhoto = r.image ?? null;
              return (
                <Link
                  key={r.slug}
                  href={`/${lang}/menu/${r.slug}`}
                  className="group bg-shogun-cream border border-shogun-black/15 rounded-2xl overflow-hidden hover:border-shogun-red transition"
                >
                  {relatedPhoto ? (
                    <div className="relative aspect-[4/3] bg-shogun-cream border-b border-shogun-black/10 overflow-hidden">
                      <Image
                        src={relatedPhoto}
                        alt={t(r.name, lang)}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <div className="bg-shogun-cream p-5 grid place-items-center min-h-[120px] border-b border-shogun-black/10">
                      <ItemArt item={r} width={180} />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="font-display text-xl tracking-wider">
                      {t(r.name, lang).toUpperCase()}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-2xl text-shogun-red">
                        {r.price} ₾
                      </span>
                      <span className="font-display tracking-[0.25em] text-xs text-shogun-black/50">
                        {dict.detail.view}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <SiteFooter lang={lang} dict={dict} />
    </main>
  );
}
