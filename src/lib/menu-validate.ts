import { allBadges, type Availability, type Badge } from "./menu";
import type { MenuData, StoredCategory, StoredItem } from "./menu-store";

/**
 * Validate + normalize an incoming menu document from the admin panel before it
 * is persisted. Returns a cleaned `MenuData` or throws an Error with a
 * human-readable message describing the first problem found.
 */
export function validateMenuData(input: unknown): MenuData {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid payload: expected an object.");
  }
  const data = input as Record<string, unknown>;

  if (!Array.isArray(data.categories)) {
    throw new Error("`categories` must be an array.");
  }
  if (!Array.isArray(data.items)) {
    throw new Error("`items` must be an array.");
  }

  const categories = data.categories.map(normalizeCategory);
  const ids = new Set<string>();
  for (const c of categories) {
    if (ids.has(c.id)) throw new Error(`Duplicate category id: "${c.id}".`);
    ids.add(c.id);
  }

  const items = data.items.map((item, i) => normalizeItem(item, i, ids));
  const slugs = new Set<string>();
  for (const it of items) {
    if (slugs.has(it.slug)) throw new Error(`Duplicate item slug: "${it.slug}".`);
    slugs.add(it.slug);
  }

  return { categories, items };
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function normalizeCategory(raw: unknown): StoredCategory {
  if (!raw || typeof raw !== "object") {
    throw new Error("Each category must be an object.");
  }
  const c = raw as Record<string, unknown>;
  const id = asString(c.id).trim();
  if (!id) throw new Error("Every category needs a non-empty id.");
  if (!/^[a-z0-9-]+$/.test(id)) {
    throw new Error(
      `Category id "${id}" may only contain lowercase letters, numbers, and dashes.`,
    );
  }
  const label = (c.label ?? {}) as Record<string, unknown>;
  const en = asString(label.en).trim();
  const ka = asString(label.ka).trim();
  if (!en && !ka) {
    throw new Error(`Category "${id}" needs at least one label.`);
  }
  return { id, label: { en: en || ka, ka: ka || en } };
}

function normalizeItem(
  raw: unknown,
  index: number,
  categoryIds: Set<string>,
): StoredItem {
  if (!raw || typeof raw !== "object") {
    throw new Error(`Item #${index + 1} must be an object.`);
  }
  const it = raw as Record<string, unknown>;

  const slug = asString(it.slug).trim();
  if (!slug) throw new Error(`Item #${index + 1} needs a slug.`);
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(
      `Item slug "${slug}" may only contain lowercase letters, numbers, and dashes.`,
    );
  }

  const category = asString(it.category).trim();
  if (!categoryIds.has(category)) {
    throw new Error(
      `Item "${slug}" references unknown category "${category}".`,
    );
  }

  const name = (it.name ?? {}) as Record<string, unknown>;
  const nameEn = asString(name.en).trim();
  const nameKa = asString(name.ka).trim();
  if (!nameEn && !nameKa) {
    throw new Error(`Item "${slug}" needs a name.`);
  }

  const price = typeof it.price === "number" ? it.price : Number(it.price);
  if (!Number.isFinite(price) || price < 0) {
    throw new Error(`Item "${slug}" has an invalid price.`);
  }

  // Optional sale price. Only kept when it's a positive number strictly below
  // the regular price; anything else (empty, zero, or ≥ price) clears the sale.
  let salePrice: number | null = null;
  if (it.salePrice !== null && it.salePrice !== undefined && it.salePrice !== "") {
    const sp =
      typeof it.salePrice === "number" ? it.salePrice : Number(it.salePrice);
    if (Number.isFinite(sp) && sp > 0 && sp < price) {
      salePrice = sp;
    }
  }

  const desc = (it.description ?? {}) as Record<string, unknown>;
  const ingredients = (it.ingredients ?? {}) as Record<string, unknown>;

  const badges = Array.isArray(it.badges)
    ? (it.badges.filter(
        (b): b is Badge => typeof b === "string" && allBadges.includes(b as Badge),
      ) as Badge[])
    : [];

  const image =
    typeof it.image === "string" && it.image.trim() ? it.image.trim() : null;

  const availability = normalizeAvailability(it.availability);

  return {
    slug,
    name: { en: nameEn || nameKa, ka: nameKa || nameEn },
    japaneseName: asString(it.japaneseName).trim(),
    category,
    ingredients: {
      en: toStringArray(ingredients.en),
      ka: toStringArray(ingredients.ka),
    },
    description: {
      en: asString(desc.en),
      ka: asString(desc.ka),
    },
    price,
    salePrice,
    badges,
    image,
    availability,
  };
}

/** Normalize an "HH:MM" 24h time, or return null if it can't be parsed. */
function normalizeTime(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(v.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (!Number.isInteger(h) || !Number.isInteger(min)) return null;
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

/**
 * Normalize the optional per-item availability window. Returns `null` (no
 * restriction) unless the admin has meaningfully configured it. Malformed times
 * fall back to a full day so a bad value never silently hides an item.
 */
function normalizeAvailability(raw: unknown): Availability | null {
  if (!raw || typeof raw !== "object") return null;
  const a = raw as Record<string, unknown>;
  const from = normalizeTime(a.from);
  const to = normalizeTime(a.to);
  const timed = a.timed === true;
  // Nothing set at all → treat as "no restriction" and drop the object.
  if (!timed && from == null && to == null) return null;
  return { timed, from: from ?? "00:00", to: to ?? "23:59" };
}

function toStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => asString(x).trim())
    .filter((x) => x.length > 0);
}
