"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { saleOf } from "@/lib/menu";
import type { MenuData, StoredCategory, StoredItem } from "@/lib/menu";

type SaveState = "idle" | "saving" | "saved" | "error";

const LOCALE_LABEL: Record<string, string> = { en: "English", ka: "ქართული" };

export function AdminDashboard({
  initialData,
  badges,
  locales,
}: {
  initialData: MenuData;
  badges: string[];
  locales: string[];
}) {
  const router = useRouter();
  const [data, setData] = useState<MenuData>(initialData);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<"items" | "categories">("items");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  /** Apply an immutable mutation to the whole document. */
  const mutate = useCallback((fn: (draft: MenuData) => void) => {
    setData((prev) => {
      const draft: MenuData = structuredClone(prev);
      fn(draft);
      return draft;
    });
    setDirty(true);
    setSaveState("idle");
    setMessage(null);
  }, []);

  async function save() {
    setSaveState("saving");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveState("error");
        setMessage(body.error ?? "Save failed.");
        return;
      }
      if (body.data) setData(body.data);
      setDirty(false);
      setSaveState("saved");
      setMessage("All changes saved.");
    } catch {
      setSaveState("error");
      setMessage("Network error while saving.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      {/* ── Top bar ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-shogun-graphite/95 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center gap-4">
          <div className="font-display tracking-[0.25em] text-shogun-cream">
            SHOGUN <span className="text-shogun-orange">ADMIN</span>
          </div>

          <nav className="ml-2 flex gap-1">
            {(["items", "categories"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-display tracking-[0.15em] transition ${
                  tab === t
                    ? "bg-shogun-red text-shogun-cream"
                    : "text-shogun-cream/60 hover:text-shogun-cream"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {message && (
              <span
                className={`hidden sm:inline text-xs ${
                  saveState === "error" ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {message}
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-shogun-cream/60 hover:text-shogun-cream"
            >
              View site ↗
            </a>
            <button
              onClick={save}
              disabled={saveState === "saving" || !dirty}
              className="rounded-lg bg-shogun-red hover:bg-shogun-orange transition-colors text-shogun-cream font-display tracking-[0.15em] text-sm px-4 py-2 disabled:opacity-50"
            >
              {saveState === "saving"
                ? "SAVING…"
                : dirty
                  ? "SAVE"
                  : "SAVED"}
            </button>
            <button
              onClick={logout}
              className="text-xs text-shogun-cream/60 hover:text-shogun-cream"
            >
              Log out
            </button>
          </div>
        </div>
        {message && (
          <div
            className={`sm:hidden px-4 pb-2 text-xs ${
              saveState === "error" ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {message}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {tab === "categories" ? (
          <CategoriesPanel data={data} mutate={mutate} locales={locales} />
        ) : (
          <ItemsPanel
            data={data}
            mutate={mutate}
            locales={locales}
            badges={badges}
          />
        )}
      </main>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Categories
// ───────────────────────────────────────────────────────────────────────

function CategoriesPanel({
  data,
  mutate,
  locales,
}: {
  data: MenuData;
  mutate: (fn: (draft: MenuData) => void) => void;
  locales: string[];
}) {
  const [newId, setNewId] = useState("");
  const [newLabels, setNewLabels] = useState<Record<string, string>>({});
  const [err, setErr] = useState<string | null>(null);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const it of data.items) m[it.category] = (m[it.category] ?? 0) + 1;
    return m;
  }, [data.items]);

  function addCategory() {
    const id = newId.trim().toLowerCase();
    setErr(null);
    if (!/^[a-z0-9-]+$/.test(id)) {
      setErr("Id may only contain lowercase letters, numbers, and dashes.");
      return;
    }
    if (data.categories.some((c) => c.id === id)) {
      setErr("A category with that id already exists.");
      return;
    }
    const label: Record<string, string> = {};
    for (const loc of locales) label[loc] = (newLabels[loc] ?? "").trim();
    if (!locales.some((loc) => label[loc])) {
      setErr("Add at least one label.");
      return;
    }
    mutate((d) => {
      d.categories.push({ id, label: label as StoredCategory["label"] });
    });
    setNewId("");
    setNewLabels({});
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= data.categories.length) return;
    mutate((d) => {
      const [c] = d.categories.splice(index, 1);
      d.categories.splice(target, 0, c);
    });
  }

  function remove(id: string) {
    if (counts[id]) return; // guarded by disabled button
    mutate((d) => {
      d.categories = d.categories.filter((c) => c.id !== id);
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl tracking-[0.15em] text-shogun-cream">
        CATEGORIES
      </h1>

      <ul className="space-y-3">
        {data.categories.map((cat, i) => (
          <li
            key={cat.id}
            className="bg-shogun-graphite border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <code className="text-xs text-shogun-orange bg-shogun-ink rounded px-2 py-1">
                {cat.id}
              </code>
              <span className="text-xs text-shogun-cream/50">
                {counts[cat.id] ?? 0} item(s)
              </span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="px-2 py-1 rounded text-shogun-cream/60 hover:text-shogun-cream disabled:opacity-30"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === data.categories.length - 1}
                  className="px-2 py-1 rounded text-shogun-cream/60 hover:text-shogun-cream disabled:opacity-30"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => remove(cat.id)}
                  disabled={!!counts[cat.id]}
                  className="ml-1 px-2 py-1 rounded text-red-400 hover:bg-red-500/10 disabled:opacity-30"
                  title={
                    counts[cat.id]
                      ? "Move or delete its items first"
                      : "Delete category"
                  }
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {locales.map((loc) => (
                <LabeledInput
                  key={loc}
                  label={`Label (${LOCALE_LABEL[loc] ?? loc})`}
                  value={cat.label[loc as keyof typeof cat.label] ?? ""}
                  onChange={(v) =>
                    mutate((d) => {
                      const c = d.categories.find((x) => x.id === cat.id);
                      if (c) (c.label as Record<string, string>)[loc] = v;
                    })
                  }
                />
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Add category */}
      <div className="bg-shogun-graphite border border-dashed border-white/15 rounded-xl p-4 space-y-3">
        <h2 className="font-display tracking-[0.15em] text-shogun-cream/80 text-sm">
          ADD CATEGORY
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <LabeledInput
            label="Id (e.g. desserts)"
            value={newId}
            onChange={setNewId}
          />
          {locales.map((loc) => (
            <LabeledInput
              key={loc}
              label={`Label (${LOCALE_LABEL[loc] ?? loc})`}
              value={newLabels[loc] ?? ""}
              onChange={(v) =>
                setNewLabels((prev) => ({ ...prev, [loc]: v }))
              }
            />
          ))}
        </div>
        {err && <p className="text-sm text-red-400">{err}</p>}
        <button
          onClick={addCategory}
          className="rounded-lg bg-shogun-red hover:bg-shogun-orange transition-colors text-shogun-cream font-display tracking-[0.15em] text-sm px-4 py-2"
        >
          + ADD
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Items
// ───────────────────────────────────────────────────────────────────────

function ItemsPanel({
  data,
  mutate,
  locales,
  badges,
}: {
  data: MenuData;
  mutate: (fn: (draft: MenuData) => void) => void;
  locales: string[];
  badges: string[];
}) {
  const [filter, setFilter] = useState<string>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = data.items
    .map((it, idx) => ({ it, idx }))
    .filter(({ it }) => filter === "all" || it.category === filter);

  function addItem() {
    const category =
      filter !== "all" ? filter : (data.categories[0]?.id ?? "");
    if (!category) return;
    // Unique slug.
    let n = 1;
    let slug = "new-item";
    const used = new Set(data.items.map((i) => i.slug));
    while (used.has(slug)) slug = `new-item-${n++}`;

    const blank: StoredItem = {
      slug,
      name: blankTranslatable(locales, "") as StoredItem["name"],
      japaneseName: "",
      category,
      ingredients: blankTranslatable(
        locales,
        [] as string[],
      ) as StoredItem["ingredients"],
      description: blankTranslatable(locales, "") as StoredItem["description"],
      price: 0,
      salePrice: null,
      badges: [],
      image: null,
    };
    mutate((d) => {
      d.items.push(structuredClone(blank));
    });
    setOpenSlug(slug);
  }

  function moveItem(globalIdx: number, dir: -1 | 1) {
    const item = data.items[globalIdx];
    // Find the neighbouring item in the same category to swap with.
    let target = globalIdx + dir;
    while (target >= 0 && target < data.items.length) {
      if (data.items[target].category === item.category) break;
      target += dir;
    }
    if (target < 0 || target >= data.items.length) return;
    mutate((d) => {
      const tmp = d.items[globalIdx];
      d.items[globalIdx] = d.items[target];
      d.items[target] = tmp;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="font-display text-2xl tracking-[0.15em] text-shogun-cream">
          ITEMS
        </h1>
        <span className="text-xs text-shogun-cream/40">
          {data.items.length} total
        </span>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg bg-shogun-graphite border border-white/10 text-shogun-cream text-sm px-3 py-2 outline-none focus:border-shogun-orange"
          >
            <option value="all">All categories</option>
            {data.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label[locales[0] as keyof typeof c.label] ?? c.id}
              </option>
            ))}
          </select>
          <button
            onClick={addItem}
            disabled={data.categories.length === 0}
            className="rounded-lg bg-shogun-red hover:bg-shogun-orange transition-colors text-shogun-cream font-display tracking-[0.15em] text-sm px-4 py-2 disabled:opacity-50"
          >
            + ADD ITEM
          </button>
        </div>
      </div>

      {data.categories.length === 0 && (
        <p className="text-sm text-shogun-cream/60">
          Create a category first (Categories tab) before adding items.
        </p>
      )}

      <ul className="space-y-3">
        {visible.map(({ it, idx }) => (
          <ItemCard
            key={it.slug}
            item={it}
            globalIndex={idx}
            open={openSlug === it.slug}
            onToggle={() =>
              setOpenSlug((s) => (s === it.slug ? null : it.slug))
            }
            data={data}
            mutate={mutate}
            locales={locales}
            badges={badges}
            onMove={moveItem}
          />
        ))}
      </ul>
    </div>
  );
}

function ItemCard({
  item,
  globalIndex,
  open,
  onToggle,
  data,
  mutate,
  locales,
  badges,
  onMove,
}: {
  item: StoredItem;
  globalIndex: number;
  open: boolean;
  onToggle: () => void;
  data: MenuData;
  mutate: (fn: (draft: MenuData) => void) => void;
  locales: string[];
  badges: string[];
  onMove: (globalIdx: number, dir: -1 | 1) => void;
}) {
  // All field edits locate the item by its current slug.
  const slug = item.slug;
  const setField = (fn: (it: StoredItem) => void) =>
    mutate((d) => {
      const target = d.items.find((x) => x.slug === slug);
      if (target) fn(target);
    });

  function remove() {
    mutate((d) => {
      d.items = d.items.filter((x) => x.slug !== slug);
    });
  }

  return (
    <li className="bg-shogun-graphite border border-white/10 rounded-xl overflow-hidden">
      {/* Summary row */}
      <div className="flex items-center gap-3 p-3">
        <div className="h-12 w-12 shrink-0 rounded-lg bg-shogun-ink overflow-hidden grid place-items-center">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-shogun-cream/30 text-xs">no img</span>
          )}
        </div>
        <button onClick={onToggle} className="text-left flex-1 min-w-0">
          <div className="text-shogun-cream truncate">
            {item.name[locales[0] as keyof typeof item.name] || item.slug}
          </div>
          <div className="text-xs text-shogun-cream/40 truncate">
            {item.category} ·{" "}
            {saleOf(item) != null ? (
              <>
                <span className="line-through">{item.price}</span>{" "}
                <span className="text-shogun-orange">{item.salePrice} ₾</span>
                <span className="ml-1 text-shogun-orange">· SALE</span>
              </>
            ) : (
              <>{item.price} ₾</>
            )}
          </div>
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(globalIndex, -1)}
            className="px-2 py-1 rounded text-shogun-cream/50 hover:text-shogun-cream"
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={() => onMove(globalIndex, 1)}
            className="px-2 py-1 rounded text-shogun-cream/50 hover:text-shogun-cream"
            title="Move down"
          >
            ↓
          </button>
          <button
            onClick={onToggle}
            className="px-3 py-1 rounded text-shogun-cream/70 hover:text-shogun-cream text-sm"
          >
            {open ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      {/* Editor */}
      {open && (
        <div className="border-t border-white/10 p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <LabeledInput
              label="Slug (URL id)"
              value={item.slug}
              onChange={(v) =>
                setField((it) => {
                  it.slug = v.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
                })
              }
            />
            <LabeledSelect
              label="Category"
              value={item.category}
              options={data.categories.map((c) => ({
                value: c.id,
                label:
                  (c.label[locales[0] as keyof typeof c.label] as string) ??
                  c.id,
              }))}
              onChange={(v) => setField((it) => (it.category = v))}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {locales.map((loc) => (
              <LabeledInput
                key={loc}
                label={`Name (${LOCALE_LABEL[loc] ?? loc})`}
                value={item.name[loc as keyof typeof item.name] ?? ""}
                onChange={(v) =>
                  setField(
                    (it) =>
                      ((it.name as Record<string, string>)[loc] = v),
                  )
                }
              />
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <LabeledInput
              label="Japanese name (optional)"
              value={item.japaneseName}
              onChange={(v) => setField((it) => (it.japaneseName = v))}
            />
            <LabeledNumber
              label="Price (₾)"
              value={item.price}
              onChange={(v) => setField((it) => (it.price = v))}
            />
            <LabeledNumberOptional
              label="Sale price (₾) — optional"
              value={item.salePrice ?? null}
              onChange={(v) => setField((it) => (it.salePrice = v))}
              hint={
                item.salePrice != null && item.salePrice >= item.price
                  ? "Must be lower than the price to show as a sale."
                  : "Leave empty for no sale."
              }
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {locales.map((loc) => (
              <LabeledTextarea
                key={loc}
                label={`Ingredients (${LOCALE_LABEL[loc] ?? loc}) — one per line`}
                value={(
                  item.ingredients[loc as keyof typeof item.ingredients] ?? []
                ).join("\n")}
                onChange={(v) =>
                  setField(
                    (it) =>
                      ((it.ingredients as Record<string, string[]>)[loc] = v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean)),
                  )
                }
              />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {locales.map((loc) => (
              <LabeledTextarea
                key={loc}
                label={`Description (${LOCALE_LABEL[loc] ?? loc})`}
                value={
                  item.description[loc as keyof typeof item.description] ?? ""
                }
                onChange={(v) =>
                  setField(
                    (it) =>
                      ((it.description as Record<string, string>)[loc] = v),
                  )
                }
              />
            ))}
          </div>

          {/* Badges */}
          <div>
            <div className="text-xs tracking-[0.2em] text-shogun-cream/60 font-display mb-2">
              BADGES
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => {
                const on = item.badges?.includes(b as never) ?? false;
                return (
                  <button
                    key={b}
                    onClick={() =>
                      setField((it) => {
                        const set = new Set(it.badges ?? []);
                        if (set.has(b as never)) set.delete(b as never);
                        else set.add(b as never);
                        it.badges = Array.from(set) as StoredItem["badges"];
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs border transition ${
                      on
                        ? "bg-shogun-orange text-shogun-black border-shogun-orange"
                        : "border-white/15 text-shogun-cream/60 hover:border-white/30"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <ImageField
            value={item.image ?? null}
            slug={item.slug}
            onChange={(path) => setField((it) => (it.image = path))}
          />

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={remove}
              className="text-sm text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-1.5"
            >
              Delete this item
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function ImageField({
  value,
  slug,
  onChange,
}: {
  value: string | null;
  slug: string;
  onChange: (path: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    setErr(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("slug", slug);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(body.error ?? "Upload failed.");
        return;
      }
      onChange(body.path);
    } catch {
      setErr("Network error during upload.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="text-xs tracking-[0.2em] text-shogun-cream/60 font-display mb-2">
        IMAGE
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="h-24 w-24 rounded-lg bg-shogun-ink overflow-hidden grid place-items-center border border-white/10">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-shogun-cream/30 text-xs">none</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="inline-block cursor-pointer rounded-lg bg-shogun-ink border border-white/15 hover:border-shogun-orange text-shogun-cream text-sm px-4 py-2">
            {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {value && (
            <button
              onClick={() => onChange(null)}
              className="block text-xs text-red-400 hover:underline"
            >
              Remove image
            </button>
          )}
          {err && <p className="text-xs text-red-400">{err}</p>}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Small reusable inputs
// ───────────────────────────────────────────────────────────────────────

function fieldLabel(label: string) {
  return (
    <span className="text-xs tracking-[0.15em] text-shogun-cream/60 font-display">
      {label}
    </span>
  );
}

const inputCls =
  "mt-1 w-full rounded-lg bg-shogun-ink border border-white/10 px-3 py-2 text-shogun-cream outline-none focus:border-shogun-orange";

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      {fieldLabel(label)}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

function LabeledNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      {fieldLabel(label)}
      <input
        type="number"
        step="0.1"
        min="0"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={inputCls}
      />
    </label>
  );
}

function LabeledNumberOptional({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      {fieldLabel(label)}
      <input
        type="number"
        step="0.1"
        min="0"
        value={value == null ? "" : value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? null : parseFloat(v) || 0);
        }}
        className={inputCls}
      />
      {hint && (
        <span className="mt-1 block text-[11px] text-shogun-cream/40">
          {hint}
        </span>
      )}
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      {fieldLabel(label)}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`${inputCls} resize-y`}
      />
    </label>
  );
}

function LabeledSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      {fieldLabel(label)}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// ───────────────────────────────────────────────────────────────────────

function blankTranslatable<T>(locales: string[], value: T): Record<string, T> {
  const out: Record<string, T> = {};
  for (const loc of locales) out[loc] = structuredClone(value);
  return out;
}
