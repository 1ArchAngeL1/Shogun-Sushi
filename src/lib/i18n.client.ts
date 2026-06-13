/**
 * Client-safe locale constants. Safe to import from client components.
 * The dictionary content lives in i18n.ts (server-only) so it doesn't ship to the browser.
 */

export const locales = ["en", "ka"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en" },
  ka: { label: "ქართული", short: "ქარ", htmlLang: "ka" },
};

export type Translatable<T> = Record<Locale, T>;

export function t<T>(value: Translatable<T>, locale: Locale): T {
  return value[locale];
}
