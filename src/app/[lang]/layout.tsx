import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bebas_Neue, Inter, Caveat, Noto_Sans_Georgian } from "next/font/google";
import { getDictionary, hasLocale, locales, localeMeta } from "@/lib/i18n";
import "../globals.css";

const display = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const brush = Caveat({
  variable: "--font-brush",
  subsets: ["latin"],
});

const georgian = Noto_Sans_Georgian({
  variable: "--font-georgian",
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDesc,
  };
}

export default async function LangLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={localeMeta[lang].htmlLang}
      className={`${display.variable} ${body.variable} ${brush.variable} ${georgian.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-shogun-cream text-shogun-black">
        {props.children}
      </body>
    </html>
  );
}
