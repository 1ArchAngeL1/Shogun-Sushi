import "server-only";
import { en, type Dictionary } from "./dictionaries/en";
import { ka } from "./dictionaries/ka";
import type { Locale } from "./i18n.client";

export * from "./i18n.client";
export type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { en, ka };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
