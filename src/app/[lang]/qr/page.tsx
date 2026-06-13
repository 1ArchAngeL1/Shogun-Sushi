import QRCode from "qrcode";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PrintButton } from "@/components/PrintButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PineBranch, CliffPagoda } from "@/components/SumiE";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[lang]/qr">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.qrTitle, description: dict.meta.qrDesc };
}

async function defaultMenuUrl() {
  const h = await headers();
  const host = h.get("host") ?? "shogunsushi.com";
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  // No locale prefix on purpose — proxy.ts auto-redirects scanners to their locale.
  return `${proto}://${host}/menu`;
}

export default async function QrPage(props: PageProps<"/[lang]/qr">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const sp = await props.searchParams;

  const explicit = typeof sp.url === "string" ? sp.url : undefined;
  const menuUrl = explicit && explicit.length > 0 ? explicit : await defaultMenuUrl();
  const table = typeof sp.table === "string" ? sp.table : "";
  const finalUrl = table
    ? `${menuUrl}${menuUrl.includes("?") ? "&" : "?"}table=${encodeURIComponent(table)}`
    : menuUrl;

  const qrDataUrl = await QRCode.toDataURL(finalUrl, {
    margin: 1,
    width: 720,
    color: { dark: "#0d0d0e", light: "#FAF3E1" },
    errorCorrectionLevel: "H",
  });

  return (
    <main className="bg-shogun-cream text-shogun-black min-h-screen print:bg-white">
      {/* Screen-only toolbar */}
      <div className="print:hidden bg-shogun-black text-shogun-cream">
        <div className="mx-auto max-w-4xl px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
          <Link href={`/${lang}`} className="text-shogun-cream/70 text-sm hover:text-shogun-cream">
            {dict.nav.backToSite}
          </Link>
          <form className="flex flex-wrap items-center gap-2 text-sm">
            <label className="opacity-70">{dict.qr.urlLabel}</label>
            <input
              name="url"
              defaultValue={menuUrl}
              className="bg-shogun-charcoal border border-shogun-cream/20 px-3 py-1.5 rounded w-72"
              type="url"
            />
            <label className="opacity-70 ml-2">{dict.qr.tableLabel}</label>
            <input
              name="table"
              defaultValue={table}
              placeholder={dict.qr.tablePlaceholder}
              className="bg-shogun-charcoal border border-shogun-cream/20 px-3 py-1.5 rounded w-24"
            />
            <button
              type="submit"
              className="bg-shogun-orange text-shogun-black font-display tracking-[0.2em] px-4 py-1.5 hover:bg-shogun-cream transition"
            >
              {dict.qr.update}
            </button>
          </form>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={lang} variant="light" />
            <PrintButton label={dict.qr.print} />
          </div>
        </div>
      </div>

      {/* ─── Bilingual poster ─────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 py-10 print:py-0 print:px-0">
        <article
          className="relative bg-shogun-cream border-4 border-shogun-black p-10 md:p-14 overflow-hidden grain print:border-0 print:p-12 print:shadow-none shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
          style={{ aspectRatio: "3 / 4" }}
        >
          <div className="absolute right-2 top-16 text-shogun-black opacity-90 hidden md:block pointer-events-none">
            <CliffPagoda width={120} />
          </div>
          <div className="absolute left-2 bottom-12 text-shogun-black opacity-90 hidden md:block pointer-events-none">
            <PineBranch width={220} />
          </div>

          <div className="relative pt-12 flex flex-col items-center text-center">
            <Logo variant="dark" size={64} />

            <div className="mt-8">
              {/* Bilingual headline on the printed poster — both languages always visible */}
              <h1 className="font-display text-4xl md:text-5xl tracking-wider">
                SCAN TO ORDER
              </h1>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider mt-1 text-shogun-red">
                დაასკანერე და შეუკვეთე
              </h2>
              <p className="mt-3 text-shogun-charcoal/70 max-w-md mx-auto text-sm">
                {dict.qr.subtitle}
              </p>
            </div>

            <div className="mt-8 relative inline-block">
              <div className="absolute -inset-3 bg-shogun-red"
                style={{
                  clipPath:
                    "polygon(0 4%, 6% 0, 18% 6%, 32% 1%, 48% 5%, 65% 0, 80% 4%, 92% 1%, 100% 5%, 100% 96%, 92% 100%, 80% 95%, 65% 100%, 48% 95%, 32% 100%, 18% 94%, 6% 100%, 0 96%)",
                }} />
              <div className="relative bg-shogun-cream p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt={`QR code for ${finalUrl}`} width={320} height={320} />
              </div>
            </div>

            {table && (
              <div className="mt-6">
                <div className="font-display text-5xl tracking-wider">
                  {dict.qr.table} {table}
                </div>
              </div>
            )}

            <div className="mt-8 max-w-md text-shogun-charcoal/70 text-xs break-words">
              {finalUrl}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6 text-shogun-charcoal/80 text-xs font-display tracking-widest w-full max-w-md">
              {dict.qr.steps.map((step, i) => (
                <div key={step}>
                  <div className="text-shogun-red text-2xl font-display">
                    0{i + 1}
                  </div>
                  <div className="mt-1">{step}</div>
                </div>
              ))}
            </div>
          </div>

        </article>

        <div className="print:hidden mt-8 text-shogun-charcoal/70 text-sm space-y-2">
          <p>⚙️ {dict.qr.instructions}</p>
          <p>{dict.qr.multiInstructions}</p>
        </div>
      </div>
    </main>
  );
}
