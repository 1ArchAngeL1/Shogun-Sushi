import type { Availability } from "./menu";

/**
 * Time-of-day availability for menu items.
 *
 * Some items (e.g. a lunch set) should only appear on the public site during a
 * set window. That window is stored per item as `availability` (see `menu.ts`)
 * and evaluated here against the *restaurant's* local time — not the visitor's —
 * so everyone sees the same menu regardless of their own device clock/timezone.
 *
 * These helpers are pure and dependency-free so they can run in server
 * components (the public pages) without pulling in `server-only`.
 */

/**
 * IANA timezone the availability windows are evaluated in. Defaults to the
 * restaurant's location (Tbilisi) and can be overridden with `RESTAURANT_TZ`.
 */
export const RESTAURANT_TZ =
  process.env.RESTAURANT_TZ?.trim() || "Asia/Tbilisi";

/** Parse an "HH:MM" 24h string into minutes since midnight, or null if invalid. */
export function parseTimeToMinutes(value: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (!Number.isInteger(h) || !Number.isInteger(min)) return null;
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

/** Minutes since local midnight *right now* in the given IANA timezone. */
export function nowMinutesInTz(
  tz: string = RESTAURANT_TZ,
  date: Date = new Date(),
): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(date);
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
    // `hour12: false` can emit "24" at midnight in some runtimes — normalize it.
    return (hour % 24) * 60 + minute;
  } catch {
    // Runtime without full timezone data (or an unknown tz): fall back to the
    // server's local clock rather than throwing and blanking the whole page.
    return date.getHours() * 60 + date.getMinutes();
  }
}

/**
 * Is `item` visible at `nowMin` (minutes since midnight)? Items with no window,
 * with timing turned off, or with a malformed window are always visible — the
 * feature only ever *adds* a restriction, never hides something by accident.
 */
export function isVisibleNow(
  item: { availability?: Availability | null },
  nowMin: number,
): boolean {
  const a = item.availability;
  if (!a || !a.timed) return true;

  const from = parseTimeToMinutes(a.from);
  const to = parseTimeToMinutes(a.to);
  if (from == null || to == null) return true;
  // A zero-length / full-day window carries no useful restriction.
  if (from === to) return true;

  if (from < to) {
    // Same-day window, e.g. 11:00–15:00.
    return nowMin >= from && nowMin <= to;
  }
  // Overnight window, e.g. 22:00–02:00.
  return nowMin >= from || nowMin <= to;
}

/** Keep only the items visible now (restaurant-local time by default). */
export function visibleItems<T extends { availability?: Availability | null }>(
  items: T[],
  nowMin: number = nowMinutesInTz(),
): T[] {
  return items.filter((it) => isVisibleNow(it, nowMin));
}
