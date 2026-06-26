import "server-only";
import { promises as fs } from "fs";
import path from "path";

import {
  menu as seedItems,
  categoryOrder as seedCategoryOrder,
  type MenuData,
  type StoredCategory,
  type StoredItem,
} from "./menu";
import { productImage } from "./menuImages";
import { en } from "./dictionaries/en";
import { ka } from "./dictionaries/ka";

/**
 * Persistent, editable menu store.
 *
 * The site originally shipped its menu as a hard-coded TypeScript array. To let
 * the admin panel add/remove/edit categories and items at runtime, that data now
 * lives in a JSON file on disk (`data/menu.json`). The file is seeded once from
 * the original static data, so nothing is lost on first run.
 *
 * Both the public pages and the admin API read/write through this module.
 */

export type { MenuData, StoredCategory, StoredItem } from "./menu";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "menu.json");

/** Build the initial dataset from the original static menu + dictionaries. */
function buildSeed(): MenuData {
  const categories: StoredCategory[] = seedCategoryOrder.map((id) => ({
    id,
    label: {
      en: en.categories[id].label,
      ka: ka.categories[id].label,
    },
  }));

  const items: StoredItem[] = seedItems.map((item) => ({
    ...item,
    badges: item.badges ? [...item.badges] : [],
    image: productImage(item),
  }));

  return { categories, items };
}

/**
 * Read the full dataset. The file is read fresh each call (it's only a few KB)
 * so that edits made through the admin API are reflected immediately, without
 * relying on cross-request module caches that aren't reliably shared between
 * route handlers and server components.
 */
export async function getMenuData(): Promise<MenuData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as MenuData;
  } catch {
    // First run (or unreadable file): seed from the original static data.
    const seed = buildSeed();
    try {
      await saveMenuData(seed);
    } catch {
      // Read-only environment — fall back to in-memory seed.
    }
    return seed;
  }
}

export async function saveMenuData(data: MenuData): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// ── Read helpers used by the public pages ───────────────────────────────

export async function getCategories(): Promise<StoredCategory[]> {
  return (await getMenuData()).categories;
}

export async function getItems(): Promise<StoredItem[]> {
  return (await getMenuData()).items;
}

export async function getItemsByCategory(
  categoryId: string,
): Promise<StoredItem[]> {
  const { items } = await getMenuData();
  return items.filter((m) => m.category === categoryId);
}

export async function findItemBySlug(
  slug: string,
): Promise<StoredItem | undefined> {
  const { items } = await getMenuData();
  return items.find((m) => m.slug === slug);
}

export async function findCategory(
  id: string,
): Promise<StoredCategory | undefined> {
  const { categories } = await getMenuData();
  return categories.find((c) => c.id === id);
}
