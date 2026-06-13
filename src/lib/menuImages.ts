import type { Category, MenuItem } from "./menu";

// Placeholder photography from Unsplash. Swap to local files in /public when
// the real product shots are ready — just change the URL to a `/img/...` path.
const photoQuery = "?w=720&q=80&auto=format&fit=crop";

const byCategory: Record<Category, string[]> = {
  maki: [
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
    "https://images.unsplash.com/photo-1607247098984-d8c4b3eb0e5b",
  ],
  nigiri: [
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252",
    "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
  ],
  sashimi: [
    "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
    "https://images.unsplash.com/photo-1534482421-64566f976cfa",
  ],
  futomaki: [
    "https://images.unsplash.com/photo-1583032015879-e5022cb87c6b",
    "https://images.unsplash.com/photo-1607301405390-d831c242f59a",
  ],
  "fried-rolls": [
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  ],
  uramaki: [
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
    "https://images.unsplash.com/photo-1626082896492-766af4eb6501",
  ],
  pushup: [
    "https://images.unsplash.com/photo-1607301405390-d831c242f59a",
    "https://images.unsplash.com/photo-1581781870027-04dca055ea1c",
  ],
  sets: [
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252",
    "https://images.unsplash.com/photo-1583032015879-e5022cb87c6b",
  ],
  drinks: [
    "https://images.unsplash.com/photo-1554866585-cd94860890b7",
    "https://images.unsplash.com/photo-1437418747212-8d9709afab22",
    "https://images.unsplash.com/photo-1437418747212-8d9709afab22",
  ],
};

export function placeholderImage(item: MenuItem): string {
  const pool = byCategory[item.category];
  const hash = item.slug
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[hash % pool.length] + photoQuery;
}
