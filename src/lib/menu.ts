import type { Translatable } from "./i18n.client";

export type Category =
  | "nigiri"
  | "sashimi"
  | "maki"
  | "uramaki"
  | "futomaki"
  | "fried-rolls"
  | "pushup"
  | "sets"
  | "drinks";

export type Badge = "signature" | "veggie" | "spicy" | "new" | "popular" | "gluten-free";

export const allBadges: Badge[] = [
  "signature",
  "veggie",
  "spicy",
  "new",
  "popular",
  "gluten-free",
];

export type MenuItem = {
  slug: string;
  name: Translatable<string>;
  japaneseName: string;
  // Category id. Built-in ids are listed in `Category`, but the admin panel can
  // create custom categories, so any string is valid at runtime.
  category: Category | (string & {});
  ingredients: Translatable<string[]>;
  description: Translatable<string>;
  price: number;
  // Optional discounted price. When set (and lower than `price`), the item is
  // "on sale": `price` is shown struck through and `salePrice` is the new price.
  salePrice?: number | null;
  badges?: Badge[];
  // Path to the product image, usable directly as a `next/image` src
  // (e.g. "/uploads/foo.png"). Null/undefined falls back to generated art.
  image?: string | null;
};

// ── Editable-store shapes (client-safe) ────────────────────────────────
// The live menu is persisted as JSON and edited through the admin panel.
// These types describe that document; the store lives in `menu-store.ts`.

export type StoredCategory = {
  /** Stable id used in URLs / anchors and referenced by items. */
  id: string;
  /** Bilingual display label. */
  label: Translatable<string>;
};

export type StoredItem = MenuItem;

export type MenuData = {
  categories: StoredCategory[];
  items: StoredItem[];
};

export const categoryOrder: Category[] = [
  "nigiri",
  "sashimi",
  "maki",
  "uramaki",
  "futomaki",
  "fried-rolls",
  "pushup",
  "sets",
  "drinks",
];

export const badgeColor: Record<Badge, string> = {
  signature: "bg-shogun-red text-shogun-cream",
  veggie: "bg-green-700 text-shogun-cream",
  spicy: "bg-shogun-orange text-shogun-black",
  new: "bg-shogun-cream text-shogun-black",
  popular: "bg-shogun-orange text-shogun-black",
  "gluten-free":
    "bg-shogun-cream/20 text-shogun-cream border border-shogun-cream/30",
};

export const menu: MenuItem[] = [
  // ─── Nigiri ───────────────────────────────────────
  {
    slug: "salmon-nigiri",
    name: {
      en: "Salmon Nigiri",
      ka: "ორაგულის ნიგირი",
    },
    japaneseName: "サーモン握り",
    category: "nigiri",
    ingredients: {
      en: ["Rice", "Salmon"],
      ka: ["ბრინჯი", "ორაგული"],
    },
    description: {
      en: "A slice of fresh salmon over hand-pressed rice. Pure and clean.",
      ka: "ერთი ნაჭერი ახალი ორაგული ხელით დაპრესილ ბრინჯზე.",
    },
    price: 8.9,
    badges: ["popular"],
  },
  {
    slug: "unagi-nigiri",
    name: {
      en: "Unagi Nigiri",
      ka: "უნაგის ნიგირი",
    },
    japaneseName: "うなぎ握り",
    category: "nigiri",
    ingredients: {
      en: ["Nori", "Rice", "Eel"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა"],
    },
    description: {
      en: "Charcoal-grilled eel over shari rice, wrapped with nori.",
      ka: "ნახშირზე შემწვარი გველთევზა შარის ბრინჯზე, ნორით შემოხვეული.",
    },
    price: 7.9,
  },

  // ─── Sashimi ──────────────────────────────────────
  {
    slug: "salmon-sashimi",
    name: {
      en: "Salmon Sashimi",
      ka: "ორაგულის საშიმი",
    },
    japaneseName: "サーモン刺身",
    category: "sashimi",
    ingredients: {
      en: ["Salmon", "Lemon zest", "Himalayan salt"],
      ka: ["ორაგული", "ლიმნის ცედრა", "ჰიმალაის მარილი"],
    },
    description: {
      en: "Cold-cut salmon finished with lemon zest and Himalayan salt.",
      ka: "ცივად დაჭრილი ორაგული, ლიმნის ცედრითა და ჰიმალაის მარილით.",
    },
    price: 21.9,
    badges: ["signature"],
  },
  {
    slug: "unagi-sashimi",
    name: {
      en: "Unagi Sashimi",
      ka: "უნაგის საშიმი",
    },
    japaneseName: "うなぎ刺身",
    category: "sashimi",
    ingredients: {
      en: ["Eel", "Teriyaki", "Sesame seeds"],
      ka: ["გველთევზა", "ტერიაკი", "სეზამის მარცვლები"],
    },
    description: {
      en: "Grilled eel with teriyaki glaze, finished with toasted sesame.",
      ka: "შემწვარი გველთევზა ტერიაკის სოუსით, შემწვარი სეზამის მარცვლებით.",
    },
    price: 15.9,
  },

  // ─── Maki ─────────────────────────────────────────
  {
    slug: "salmon-maki",
    name: {
      en: "Salmon Maki",
      ka: "ორაგულის მაკი",
    },
    japaneseName: "サーモン巻き",
    category: "maki",
    ingredients: {
      en: ["Nori", "Rice", "Salmon"],
      ka: ["ნორი", "ბრინჯი", "ორაგული"],
    },
    description: {
      en: "Simple, clean, classic — sushi rice rolled with fresh salmon.",
      ka: "მარტივი, სუფთა, კლასიკური — სუშის ბრინჯი ახალი ორაგულის ნაჭრით.",
    },
    price: 15.9,
    badges: ["popular"],
  },
  {
    slug: "cucumber-maki",
    name: {
      en: "Cucumber Maki",
      ka: "კიტრის მაკი",
    },
    japaneseName: "きゅうり巻き",
    category: "maki",
    ingredients: {
      en: ["Nori", "Rice", "Cucumber"],
      ka: ["ნორი", "ბრინჯი", "კიტრი"],
    },
    description: {
      en: "Crisp cucumber and seasoned rice. Light and refreshing.",
      ka: "ხრაშუნა კიტრი და ნელ-ნელა შაშხამდებული ბრინჯი.",
    },
    price: 7.9,
    badges: ["veggie"],
  },
  {
    slug: "unagi-maki",
    name: {
      en: "Unagi Maki",
      ka: "უნაგის მაკი",
    },
    japaneseName: "うなぎ巻き",
    category: "maki",
    ingredients: {
      en: ["Nori", "Rice", "Eel"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა"],
    },
    description: {
      en: "Grilled eel rolled with seasoned rice and nori.",
      ka: "შემწვარი გველთევზა, ბრინჯში დახვეული, ნორის ფურცელში.",
    },
    price: 14.9,
  },
  {
    slug: "avocado-maki",
    name: {
      en: "Avocado Maki",
      ka: "ავოკადოს მაკი",
    },
    japaneseName: "アボカド巻き",
    category: "maki",
    ingredients: {
      en: ["Nori", "Rice", "Avocado"],
      ka: ["ნორი", "ბრინჯი", "ავოკადო"],
    },
    description: {
      en: "Creamy avocado wrapped in seasoned rice — a plant-forward classic.",
      ka: "ნაზი ავოკადო შაშხამდებულ ბრინჯში — მცენარეული კლასიკა.",
    },
    price: 8.9,
    badges: ["veggie"],
  },
  {
    slug: "hiyashi-maki",
    name: {
      en: "Hiyashi Maki",
      ka: "ჰიაშის მაკი",
    },
    japaneseName: "ひやし巻き",
    category: "maki",
    ingredients: {
      en: ["Nori", "Rice", "Hiyashi wakame"],
      ka: ["ნორი", "ბრინჯი", "ჰიაში"],
    },
    description: {
      en: "Chilled sesame-dressed wakame rolled with seasoned rice.",
      ka: "გრილი სეზამიანი ვაკამე შაშხამდებულ ბრინჯში.",
    },
    price: 9.9,
    badges: ["veggie"],
  },
  {
    slug: "shrimp-maki",
    name: {
      en: "Shrimp Maki",
      ka: "კრევეტის მაკი",
    },
    japaneseName: "海老巻き",
    category: "maki",
    ingredients: {
      en: ["Nori", "Rice", "Tempura shrimp", "Cream cheese"],
      ka: ["ნორი", "ბრინჯი", "კრევეტის ტემპურა", "კრემყველი"],
    },
    description: {
      en: "Crispy tempura shrimp and cream cheese rolled in seasoned rice.",
      ka: "ხრაშუნა ტემპურის კრევეტი და კრემყველი შაშხამდებულ ბრინჯში.",
    },
    price: 10.9,
  },

  // ─── Uramaki ──────────────────────────────────────
  {
    slug: "california",
    name: {
      en: "California",
      ka: "კალიფორნია",
    },
    japaneseName: "カリフォルニア",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Tempura shrimp", "Crab", "Cucumber", "Tobiko", "Sweet-spicy mayo"],
      ka: ["ნორი", "ბრინჯი", "კრევეტის ტემპურა", "კრაბი", "კიტრი", "ტობიკო", "ტკბილ-ცხარე მაიონეზი"],
    },
    description: {
      en: "The timeless inside-out roll. Sweet shrimp and crab with crisp cucumber.",
      ka: "კლასიკური ინსაიდ-აუთ რულეტი. ტკბილი კრევეტი და კრაბი, ხრაშუნა კიტრით.",
    },
    price: 26.9,
    badges: ["popular"],
  },
  {
    slug: "philadelphia",
    name: {
      en: "Philadelphia",
      ka: "ფილადელფია",
    },
    japaneseName: "フィラデルフィア",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Cream cheese", "Green onion", "Tobiko", "Teriyaki"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "კრემყველი", "მწვანე ხახვი", "ტობიკო", "ტერიაკი"],
    },
    description: {
      en: "Buttery salmon and cream cheese, finished with teriyaki and bright tobiko.",
      ka: "ნაზი ორაგული და კრემყველი, ტერიაკითა და კაშკაშა ტობიკოთი.",
    },
    price: 34.9,
    badges: ["signature", "popular"],
  },
  {
    slug: "dragon-roll",
    name: {
      en: "Dragon Roll",
      ka: "დრაგონ როლი",
    },
    japaneseName: "ドラゴンロール",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Eel", "Tempura shrimp", "Cream cheese", "Avocado", "Teriyaki"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა", "კრევეტის ტემპურა", "კრემყველი", "ავოკადო", "ტერიაკი"],
    },
    description: {
      en: "Dramatic dragon-style roll with eel, tempura shrimp, and creamy avocado.",
      ka: "დრამატული დრაკონის სტილის რულეტი გველთევზით, ტემპურის კრევეტითა და ნაზი ავოკადოთი.",
    },
    price: 31.9,
    badges: ["signature"],
  },
  {
    slug: "veggie-roll",
    name: {
      en: "Veggie Roll",
      ka: "ვეჯი როლი",
    },
    japaneseName: "ベジロール",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Takuan", "Cucumber", "Iceberg", "Hiyashi wakame", "Sesame seeds"],
      ka: ["ნორი", "ბრინჯი", "ტეკუანი", "კიტრი", "აისბერგი", "ჰიაში", "სეზამის მარცვლები"],
    },
    description: {
      en: "Plant-forward roll with pickled daikon, iceberg, and chilled wakame.",
      ka: "მცენარეული რულეტი მარინადებული დაიკონით, აისბერგითა და გრილი ვაკამეთი.",
    },
    price: 22.9,
    badges: ["veggie"],
  },
  {
    slug: "ronin-roll",
    name: {
      en: "Ronin Signature Roll",
      ka: "საფირმო როლი რონინი",
    },
    japaneseName: "看板ロール 浪人",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Eel", "Cream cheese", "Avocado", "Teriyaki", "Mango sauce"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "გველთევზა", "კრემყველი", "ავოკადო", "ტერიაკი", "მანგოს სოუსი"],
    },
    description: {
      en: "Double-fish signature — salmon and eel, mango sauce and teriyaki glaze.",
      ka: "ორთევზიანი ფირმული — ორაგული და გველთევზა, მანგოს სოუსი და ტერიაკი.",
    },
    price: 36.9,
    badges: ["signature"],
  },
  {
    slug: "taicho-roll",
    name: {
      en: "Taicho Signature Roll",
      ka: "საფირმო როლი ტაიჩო",
    },
    japaneseName: "看板ロール 大将",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Eel", "Cream cheese", "Avocado", "Teriyaki", "Crispy onion"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა", "კრემყველი", "ავოკადო", "ტერიაკი", "ხრაშუნა ხახვი"],
    },
    description: {
      en: "Smoky eel signature with creamy avocado and crunchy fried onion.",
      ka: "შებოლილი გველთევზის ფირმული, ნაზი ავოკადოთა და ხრაშუნა შემწვარი ხახვით.",
    },
    price: 32.9,
    badges: ["signature"],
  },
  {
    slug: "shogun-roll",
    name: {
      en: "Shogun Signature Roll",
      ka: "საფირმო როლი შოგუნი",
    },
    japaneseName: "看板ロール 将軍",
    category: "uramaki",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Tempura shrimp", "Cream cheese", "Avocado", "Teriyaki", "Mango sauce"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "კრევეტის ტემპურა", "კრემყველი", "ავოკადო", "ტერიაკი", "მანგოს სოუსი"],
    },
    description: {
      en: "Our flagship roll — salmon, tempura shrimp, avocado, mango, and teriyaki.",
      ka: "ჩვენი მთავარი რულეტი — ორაგული, ტემპურის კრევეტი, ავოკადო, მანგო და ტერიაკი.",
    },
    price: 38.9,
    badges: ["signature", "popular"],
  },

  // ─── Futomaki ─────────────────────────────────────
  {
    slug: "salmon-futomaki",
    name: {
      en: "Salmon Futomaki",
      ka: "ორაგულის ფუტომაკი",
    },
    japaneseName: "サーモン太巻き",
    category: "futomaki",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Tobiko", "Cream cheese", "Avocado", "Cucumber", "Green onion"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "ტობიკო", "კრემყველი", "ავოკადო", "კიტრი", "მწვანე ხახვი"],
    },
    description: {
      en: "Hearty thick roll with salmon, cream cheese, avocado, and tobiko.",
      ka: "მსხვილი რულეტი ორაგულით, კრემყველით, ავოკადოთი და ტობიკოთი.",
    },
    price: 28.9,
    badges: ["popular"],
  },
  {
    slug: "shrimp-futomaki",
    name: {
      en: "Shrimp Futomaki",
      ka: "კრევეტის ფუტომაკი",
    },
    japaneseName: "海老太巻き",
    category: "futomaki",
    ingredients: {
      en: ["Nori", "Rice", "Tempura shrimp", "Crab", "Tobiko", "Cream cheese", "Avocado"],
      ka: ["ნორი", "ბრინჯი", "კრევეტის ტემპურა", "კრაბი", "ტობიკო", "კრემყველი", "ავოკადო"],
    },
    description: {
      en: "Thick roll with tempura shrimp, crab, avocado, and bright tobiko.",
      ka: "მსხვილი რულეტი ტემპურის კრევეტით, კრაბით, ავოკადოთი და ტობიკოთი.",
    },
    price: 27.9,
  },
  {
    slug: "unagi-futomaki",
    name: {
      en: "Unagi Futomaki",
      ka: "უნაგის ფუტომაკი",
    },
    japaneseName: "うなぎ太巻き",
    category: "futomaki",
    ingredients: {
      en: ["Nori", "Rice", "Eel", "Crab", "Cream cheese", "Avocado", "Teriyaki"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა", "კრაბი", "კრემყველი", "ავოკადო", "ტერიაკი"],
    },
    description: {
      en: "Loaded futomaki with eel, crab, avocado, and teriyaki glaze.",
      ka: "უხვი ფუტომაკი გველთევზით, კრაბით, ავოკადოთა და ტერიაკით.",
    },
    price: 31.9,
    badges: ["signature"],
  },

  // ─── Fried Rolls ──────────────────────────────────
  {
    slug: "crispy-salmon-maki",
    name: {
      en: "Crispy Salmon Maki",
      ka: "ხრაშუნა ორაგულის მაკი",
    },
    japaneseName: "サーモン揚げ巻き",
    category: "fried-rolls",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Cream cheese", "Sesame seeds", "Teriyaki"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "კრემყველი", "სეზამის მარცვლები", "ტერიაკი"],
    },
    description: {
      en: "Tempura-fried maki with salmon and cream cheese, finished with teriyaki.",
      ka: "ტემპურაში შემწვარი მაკი ორაგულითა და კრემყველით, ტერიაკით დასრულებული.",
    },
    price: 19.9,
  },
  {
    slug: "crispy-salmon-futomaki",
    name: {
      en: "Crispy Salmon Futomaki",
      ka: "ხრაშუნა ორაგულის ფუტომაკი",
    },
    japaneseName: "サーモン揚げ太巻き",
    category: "fried-rolls",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Tobiko", "Green onion", "Cucumber", "Cream cheese"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "ტობიკო", "მწვანე ხახვი", "კიტრი", "კრემყველი"],
    },
    description: {
      en: "Crispy fried futomaki with salmon, cream cheese, and bright tobiko.",
      ka: "ხრაშუნა შემწვარი ფუტომაკი ორაგულით, კრემყველითა და ტობიკოთი.",
    },
    price: 28.9,
    badges: ["popular"],
  },
  {
    slug: "crispy-unagi-futomaki",
    name: {
      en: "Crispy Unagi Futomaki",
      ka: "ხრაშუნა უნაგის ფუტომაკი",
    },
    japaneseName: "うなぎ揚げ太巻き",
    category: "fried-rolls",
    ingredients: {
      en: ["Nori", "Rice", "Eel", "Crab", "Avocado", "Cream cheese"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა", "კრაბი", "ავოკადო", "კრემყველი"],
    },
    description: {
      en: "Crispy futomaki with eel, crab, and creamy avocado.",
      ka: "ხრაშუნა ფუტომაკი გველთევზით, კრაბითა და ნაზი ავოკადოთი.",
    },
    price: 26.9,
  },
  {
    slug: "crispy-salmon-keito",
    name: {
      en: "Crispy Salmon Keito",
      ka: "ხრაშუნა ორაგულის კეიტო",
    },
    japaneseName: "サーモン揚げケイト",
    category: "fried-rolls",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Cream cheese", "Green onion", "Teriyaki"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "კრემყველი", "მწვანე ხახვი", "ტერიაკი"],
    },
    description: {
      en: "Fried keito-style roll with salmon, cream cheese, and teriyaki glaze.",
      ka: "შემწვარი კეიტო რულეტი ორაგულით, კრემყველითა და ტერიაკით.",
    },
    price: 30.9,
    badges: ["new"],
  },
  {
    slug: "crispy-shrimp-keito",
    name: {
      en: "Crispy Shrimp Keito",
      ka: "ხრაშუნა კრევეტის კეიტო",
    },
    japaneseName: "海老揚げケイト",
    category: "fried-rolls",
    ingredients: {
      en: ["Nori", "Rice", "Tempura shrimp", "Sweet-spicy mayo"],
      ka: ["ნორი", "ბრინჯი", "კრევეტის ტემპურა", "ტკბილ-ცხარე მაიონეზი"],
    },
    description: {
      en: "Fried keito with crispy shrimp and sweet-spicy mayo.",
      ka: "შემწვარი კეიტო ხრაშუნა კრევეტითა და ტკბილ-ცხარე მაიონეზით.",
    },
    price: 24.9,
    badges: ["new", "spicy"],
  },

  // ─── Push-up Tubes ────────────────────────────────
  {
    slug: "california-pushup",
    name: {
      en: "California Push-up",
      ka: "ფუშ-აფ კალიფორნია",
    },
    japaneseName: "カリフォルニア・チューブ",
    category: "pushup",
    ingredients: {
      en: ["Nori", "Rice", "Tempura shrimp", "Crab", "Cucumber", "Tobiko", "Sweet-spicy mayo"],
      ka: ["ნორი", "ბრინჯი", "კრევეტის ტემპურა", "კრაბი", "კიტრი", "ტობიკო", "ტკბილ-ცხარე მაიონეზი"],
    },
    description: {
      en: "California reimagined in our signature push-up tube. Eat on the move.",
      ka: "კალიფორნია ჩვენი ფირმული მილში. შეჭამე გზაში.",
    },
    price: 27,
    badges: ["signature"],
  },
  {
    slug: "philadelphia-pushup",
    name: {
      en: "Philadelphia Push-up",
      ka: "ფუშ-აფ ფილადელფია",
    },
    japaneseName: "フィラデルフィア・チューブ",
    category: "pushup",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Cream cheese", "Green onion", "Tobiko", "Teriyaki"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "კრემყველი", "მწვანე ხახვი", "ტობიკო", "ტერიაკი"],
    },
    description: {
      en: "Philadelphia served in our signature push-up tube — portable and fresh.",
      ka: "ფილადელფია ჩვენი ფირმული მილში — საყვარელი რულეტი, წასაღები.",
    },
    price: 31,
    badges: ["signature", "popular"],
  },
  {
    slug: "dragon-pushup",
    name: {
      en: "Dragon Push-up",
      ka: "ფუშ-აფ დრაგონ როლი",
    },
    japaneseName: "ドラゴン・チューブ",
    category: "pushup",
    ingredients: {
      en: ["Nori", "Rice", "Eel", "Cream cheese", "Avocado", "Teriyaki", "Sesame seeds"],
      ka: ["ნორი", "ბრინჯი", "გველთევზა", "კრემყველი", "ავოკადო", "ტერიაკი", "სეზამის მარცვლები"],
    },
    description: {
      en: "Eel-forward dragon roll, push-up style — sealed fresh in our tube.",
      ka: "გველთევზის გემო, დრაკონის რულეტი მილში — ჩვენი ფირმული შეფუთვით.",
    },
    price: 28,
    badges: ["signature"],
  },
  {
    slug: "veggie-pushup",
    name: {
      en: "Veggie Push-up",
      ka: "ფუშ-აფ ვეჯი როლი",
    },
    japaneseName: "ベジ・チューブ",
    category: "pushup",
    ingredients: {
      en: ["Nori", "Rice", "Takuan", "Cucumber", "Iceberg", "Hiyashi wakame", "Sesame seeds"],
      ka: ["ნორი", "ბრინჯი", "ტეკუანი", "კიტრი", "აისბერგი", "ჰიაში", "სეზამის მარცვლები"],
    },
    description: {
      en: "Plant-based push-up with pickled daikon, iceberg, and chilled wakame.",
      ka: "მცენარეული მილი მარინადებული დაიკონით, აისბერგითა და გრილი ვაკამეთი.",
    },
    price: 24,
    badges: ["veggie"],
  },
  {
    slug: "tensei-pushup",
    name: {
      en: "Tensei Signature Push-up",
      ka: "საფირმო ფუშ-აფ ტენსეი",
    },
    japaneseName: "看板チューブ 天聖",
    category: "pushup",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Eel", "Cream cheese", "Avocado", "Sesame seeds"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "უნაგი", "კრემყველი", "ავოკადო", "სეზამის მარცვლები"],
    },
    description: {
      en: "Signature push-up — salmon and eel together, sealed in the tube.",
      ka: "საფირმო მილი — ორაგული და გველთევზა ერთად, ფირმულ შეფუთვაში.",
    },
    price: 34,
    badges: ["signature"],
  },
  {
    slug: "shogun-pushup",
    name: {
      en: "Shogun Signature Push-up",
      ka: "საფირმო ფუშ-აფ შოგუნი",
    },
    japaneseName: "看板チューブ 将軍",
    category: "pushup",
    ingredients: {
      en: ["Nori", "Rice", "Salmon", "Tempura shrimp", "Avocado", "Cream cheese", "Mango sauce"],
      ka: ["ნორი", "ბრინჯი", "ორაგული", "კრევეტის ტემპურა", "ავოკადო", "კრემყველი", "მანგოს სოუსი"],
    },
    description: {
      en: "Our flagship push-up — salmon, tempura shrimp, avocado, bright mango.",
      ka: "ჩვენი მთავარი მილი — ორაგული, ტემპურის კრევეტი, ავოკადო და კაშკაშა მანგო.",
    },
    price: 39,
    badges: ["signature", "popular"],
  },

  // ─── Sets ─────────────────────────────────────────
  {
    slug: "salmon-set",
    name: {
      en: "Salmon Set",
      ka: "ორაგულის სეტი",
    },
    japaneseName: "サーモンセット",
    category: "sets",
    ingredients: {
      en: ["Philadelphia", "Salmon Maki", "Salmon Nigiri ×3", "Salmon Gunkan ×2"],
      ka: ["ფილადელფია", "ორაგულის მაკი", "ორაგულის ნიგირი 3ც.", "ორაგულის გუნკანი 2ც."],
    },
    description: {
      en: "Salmon lover's set — Philadelphia, salmon maki, salmon nigiri, and gunkan.",
      ka: "ორაგულის მოყვარულის სეტი — ფილადელფია, ორაგულის მაკი, ნიგირი და გუნკანი.",
    },
    price: 74.9,
    badges: ["popular"],
  },
  {
    slug: "unagi-set",
    name: {
      en: "Unagi Set",
      ka: "უნაგის სეტი",
    },
    japaneseName: "うなぎセット",
    category: "sets",
    ingredients: {
      en: ["Dragon Roll", "Unagi Maki", "Unagi Nigiri ×3", "Unagi Gunkan ×2"],
      ka: ["დრაგონ როლი", "უნაგი მაკი", "უნაგის ნიგირი 3ც.", "უნაგის გუნკანი 2ც."],
    },
    description: {
      en: "Eel-forward set — Dragon Roll, unagi maki, nigiri, and gunkan.",
      ka: "გველთევზის სეტი — დრაგონ როლი, უნაგი მაკი, ნიგირი და გუნკანი.",
    },
    price: 69.9,
  },
  {
    slug: "crispy-set",
    name: {
      en: "Crispy Set",
      ka: "ხრაშუნა სეტი",
    },
    japaneseName: "クリスピーセット",
    category: "sets",
    ingredients: {
      en: ["Taicho Roll", "Crispy Salmon Futomaki", "Crispy Salmon Maki", "Shrimp Keito ×4", "Salmon Keito ×4"],
      ka: ["ტაიჩო როლი", "ხრაშუნა ორაგულის ფუტო მაკი", "ხრაშუნა ორაგულის მაკი", "კრევეტის კეიტო 4ც.", "ორაგულის კეიტო 4ც."],
    },
    description: {
      en: "Fried fan's set — Taicho, crispy salmon futomaki, maki, and shrimp keito.",
      ka: "შემწვარის სეტი — ტაიჩო, ხრაშუნა ფუტომაკი, მაკი და კრევეტის კეიტო.",
    },
    price: 89.9,
    badges: ["signature"],
  },
  {
    slug: "shogun-set",
    name: {
      en: "Shogun Set",
      ka: "შოგუნ სეტი",
    },
    japaneseName: "将軍セット",
    category: "sets",
    ingredients: {
      en: [
        "Shogun Roll",
        "Ronin Roll",
        "Shrimp Maki ×4",
        "Cucumber Maki ×4",
        "Unagi Sashimi ×3",
        "Salmon Sashimi ×3",
        "Salmon Gunkan ×2",
        "Salmon Nigiri ×2",
        "Unagi Nigiri ×2",
      ],
      ka: [
        "შოგუნ როლი",
        "რონინ როლი",
        "კრევეტის მაკი 4ც.",
        "კიტრის მაკი 4ც.",
        "უნაგის საშიმი 3ც.",
        "ორაგულის საშიმი 3ც.",
        "ორაგულის გუნკანი 2ც.",
        "ორაგულის ნიგირი 2ც.",
        "უნაგის ნიგირი 2ც.",
      ],
    },
    description: {
      en: "The full Shogun feast — our flagship rolls, sashimi, nigiri, and gunkan.",
      ka: "სრული შოგუნის ნადიმი — ფირმული რულეტი, საშიმი, ნიგირი და გუნკანი.",
    },
    price: 115.9,
    badges: ["signature", "popular"],
  },
  {
    slug: "signature-set",
    name: {
      en: "Signature Set",
      ka: "საფირმო სეტი",
    },
    japaneseName: "看板セット",
    category: "sets",
    ingredients: {
      en: ["Shogun Roll", "Ronin Roll", "Taicho Roll"],
      ka: ["შოგუნ როლი", "რონინ როლი", "ტაიჩო როლი"],
    },
    description: {
      en: "Our three flagship rolls together — Shogun, Ronin, and Taicho.",
      ka: "სამი ფირმული რულეტი ერთად — შოგუნი, რონინი და ტაიჩო.",
    },
    price: 94.9,
    badges: ["signature"],
  },

  // ─── Drinks ───────────────────────────────────────
  {
    slug: "water",
    name: {
      en: "Water",
      ka: "წყალი",
    },
    japaneseName: "水",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: {
      en: "Still water.",
      ka: "მინერალური წყალი.",
    },
    price: 3,
  },
  {
    slug: "coca-cola-classic",
    name: {
      en: "Coca-Cola Classic",
      ka: "კოკა-კოლა კლასიკი",
    },
    japaneseName: "コカ・コーラ",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Coca-Cola Classic.", ka: "კოკა-კოლა კლასიკი." },
    price: 4,
  },
  {
    slug: "coca-cola-zero",
    name: {
      en: "Coca-Cola Zero",
      ka: "კოკა-კოლა ზერო",
    },
    japaneseName: "コカ・コーラ ゼロ",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Coca-Cola Zero — no sugar.", ka: "კოკა-კოლა ზერო — შაქრის გარეშე." },
    price: 4,
  },
  {
    slug: "sprite",
    name: {
      en: "Sprite",
      ka: "სპრაიტი",
    },
    japaneseName: "スプライト",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Lemon-lime Sprite.", ka: "ლიმონ-ლაიმის სპრაიტი." },
    price: 4,
  },
  {
    slug: "fanta",
    name: {
      en: "Fanta",
      ka: "ფანტა",
    },
    japaneseName: "ファンタ",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Orange Fanta.", ka: "ფორთოხლის ფანტა." },
    price: 4,
  },
  {
    slug: "nabeghlavi",
    name: {
      en: "Nabeghlavi",
      ka: "ნაბეღლავი",
    },
    japaneseName: "ナベグラビ",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: {
      en: "Nabeghlavi — Georgian sparkling mineral water.",
      ka: "ნაბეღლავი — ქართული მინერალური წყალი.",
    },
    price: 5,
  },
  {
    slug: "orange-juice",
    name: {
      en: "Orange Juice",
      ka: "ფორთოხლის წვენი",
    },
    japaneseName: "オレンジジュース",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Fresh orange juice.", ka: "ფორთოხლის წვენი." },
    price: 6,
  },
  {
    slug: "peach-juice",
    name: {
      en: "Peach Juice",
      ka: "ატმის წვენი",
    },
    japaneseName: "桃ジュース",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Peach juice.", ka: "ატმის წვენი." },
    price: 6,
  },
  {
    slug: "cherry-juice",
    name: {
      en: "Cherry Juice",
      ka: "ალუბლის წვენი",
    },
    japaneseName: "チェリージュース",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Cherry juice.", ka: "ალუბლის წვენი." },
    price: 6,
  },
  {
    slug: "apple-juice",
    name: {
      en: "Apple Juice",
      ka: "ვაშლის წვენი",
    },
    japaneseName: "りんごジュース",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Apple juice.", ka: "ვაშლის წვენი." },
    price: 6,
  },
  {
    slug: "mixed-juice",
    name: {
      en: "Mixed Fruit Juice",
      ka: "შერეული ხილის წვენი",
    },
    japaneseName: "ミックスジュース",
    category: "drinks",
    ingredients: { en: [], ka: [] },
    description: { en: "Mixed fruit juice.", ka: "შერეული ხილის წვენი." },
    price: 6,
  },
];

/**
 * An item is "on sale" only when it has a positive sale price that is strictly
 * lower than the regular price. Returns the discounted price, else null.
 */
export const saleOf = (item: {
  price: number;
  salePrice?: number | null;
}): number | null => {
  const sp = item.salePrice;
  return typeof sp === "number" && Number.isFinite(sp) && sp > 0 && sp < item.price
    ? sp
    : null;
};

export const itemsByCategory = (category: Category): MenuItem[] =>
  menu.filter((m) => m.category === category);

export const findItem = (slug: string): MenuItem | undefined =>
  menu.find((m) => m.slug === slug);
