import type { MenuItem } from "./menu";

const PRODUCT_FOLDER = "/სუში გლოვოსთვის";

const filenameBySlug: Record<string, string> = {
  // Nigiri
  "salmon-nigiri": "ორაგულის ნიგირი.webp",
  "unagi-nigiri": "უნაგის ნიგირი.webp",

  // Sashimi
  "salmon-sashimi": "ორაგულის საშიმი.webp",
  "unagi-sashimi": "უნაგის საშიმი.webp",

  // Maki
  "salmon-maki": "ორაგულის მაკი.webp",
  "cucumber-maki": "კიტრის მაკი.webp",
  "unagi-maki": "უნაგის მაკი.webp",
  "avocado-maki": "ავოკადოს მაკი.webp",
  "hiyashi-maki": "ჰიაშის მაკი.webp",
  "shrimp-maki": "კრევეტის მაკი.webp",

  // Uramaki
  california: "კალიფორნია როლი.webp",
  philadelphia: "ფილადელფია როლი.webp",
  "dragon-roll": "დრაგონ როლი.webp",
  "veggie-roll": "ვეჯი როლი.webp",
  "ronin-roll": "საფირმო რონინ როლი.webp",
  "taicho-roll": "საფირმო ტაიჩო როლი.webp",
  "shogun-roll": "საფირმო შოგუნ როლი.webp",

  // Futomaki
  "salmon-futomaki": "ორაგულის ფუტომაკი.webp",
  "shrimp-futomaki": "კრევეტის ფუტომაკი.webp",
  "unagi-futomaki": "უნაგის ფუტომაკი.webp",

  // Fried rolls
  "crispy-salmon-maki": "ხრაშუნა ორაგულის მაკი.webp",
  "crispy-salmon-futomaki": "ხრაშუნა ორაგულის ფუტომაკი.webp",
  "crispy-unagi-futomaki": "ხრაშუნა უნაგის ფუტომაკი.webp",
  "crispy-salmon-keito": "ხრაშუნა ორაგულის კეიტო.webp",
  "crispy-shrimp-keito": "ხრაშუნა კრევეტის კეიტო.webp",

  // Push-up tubes — all share the single push-up product shot
  "california-pushup": "ფუშ-აფ როლი.webp",
  "philadelphia-pushup": "ფუშ-აფ როლი.webp",
  "dragon-pushup": "ფუშ-აფ როლი.webp",
  "veggie-pushup": "ფუშ-აფ როლი.webp",
  "tensei-pushup": "ფუშ-აფ როლი.webp",
  "shogun-pushup": "ფუშ-აფ როლი.webp",

  // Sets
  "salmon-set": "ორაგულის სეტი.webp",
  "unagi-set": "უნაგის სეტი.webp",
  "crispy-set": "ხრაშუნა სეტი.webp",
  "shogun-set": "შოგუნ სეტი.webp",
  "signature-set": "საფირმო სეტი.webp",

  // Drinks
  water: "წყალი.webp",
  nabeghlavi: "ნაბეღლავი.webp",
  "coca-cola-classic": "კოლა კლასიკი.webp",
  "coca-cola-zero": "კოლა ზერო.webp",
  sprite: "სპრაიტი.webp",
  fanta: "ფანტა.webp",
  "orange-juice": "ფორთოხლის წვენი.webp",
  "peach-juice": "ატმის წვენი.webp",
  "cherry-juice": "ალუბლისწ ვენი.webp",
  "apple-juice": "ვაშლის წვენი.webp",
  "mixed-juice": "შერეული ხილის წვენი.webp",
};

export function productImage(item: Pick<MenuItem, "slug">): string | null {
  const name = filenameBySlug[item.slug];
  if (!name) return null;
  return encodeURI(`${PRODUCT_FOLDER}/${name}`);
}
