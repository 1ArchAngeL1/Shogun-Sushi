import type { MenuItem } from "./menu";

const PRODUCT_FOLDER = "/სუში გლოვოსთვის";

const filenameBySlug: Record<string, string> = {
  // Nigiri
  "salmon-nigiri": "ორაგულის ნიგირი.png",
  "unagi-nigiri": "უნაგის ნიგირი.png",

  // Sashimi
  "salmon-sashimi": "ორაგულის საშიმი.png",
  "unagi-sashimi": "უნაგის საშიმი.png",

  // Maki
  "salmon-maki": "ორაგულის მაკი.png",
  "cucumber-maki": "კიტრის მაკი.png",
  "unagi-maki": "უნაგის მაკი.png",
  "avocado-maki": "ავოკადოს მაკი.png",
  "hiyashi-maki": "ჰიაშის მაკი.png",
  "shrimp-maki": "კრევეტის მაკი.png",

  // Uramaki
  california: "კალიფორნია როლი.png",
  philadelphia: "ფილადელფია როლი.png",
  "dragon-roll": "დრაგონ როლი.png",
  "veggie-roll": "ვეჯი როლი.png",
  "ronin-roll": "საფირმო რონინ როლი.png",
  "taicho-roll": "საფირმო ტაიჩო როლი.png",
  "shogun-roll": "საფირმო შოგუნ როლი.png",

  // Futomaki
  "salmon-futomaki": "ორაგულის ფუტომაკი.png",
  "shrimp-futomaki": "კრევეტის ფუტომაკი.png",
  "unagi-futomaki": "უნაგის ფუტომაკი.png",

  // Fried rolls
  "crispy-salmon-maki": "ხრაშუნა ორაგულის მაკი.png",
  "crispy-salmon-futomaki": "ხრაშუნა ორაგულის ფუტომაკი.png",
  "crispy-unagi-futomaki": "ხრაშუნა უნაგის ფუტომაკი.png",
  "crispy-salmon-keito": "ხრაშუნა ორაგულის კეიტო.png",
  "crispy-shrimp-keito": "ხრაშუნა კრევეტის კეიტო.png",

  // Push-up tubes — all share the single push-up product shot
  "california-pushup": "ფუშ-აფ როლი.png",
  "philadelphia-pushup": "ფუშ-აფ როლი.png",
  "dragon-pushup": "ფუშ-აფ როლი.png",
  "veggie-pushup": "ფუშ-აფ როლი.png",
  "tensei-pushup": "ფუშ-აფ როლი.png",
  "shogun-pushup": "ფუშ-აფ როლი.png",

  // Sets
  "salmon-set": "ორაგულის სეტი.png",
  "unagi-set": "უნაგის სეტი.png",
  "crispy-set": "ხრაშუნა სეტი.png",
  "shogun-set": "შოგუნ სეტი.png",
  "signature-set": "საფირმო სეტი.png",

  // Drinks
  water: "წყალი.jpeg",
  nabeghlavi: "ნაბეღლავი.jpeg",
  "coca-cola-classic": "კოლა კლასიკი.png",
  "coca-cola-zero": "კოლა ზერო.png",
  sprite: "სპრაიტი.png",
  fanta: "ფანტა.png",
  "orange-juice": "ფორთოხლის წვენი.png",
  "peach-juice": "ატმის წვენი.png",
  "cherry-juice": "ალუბლისწ ვენი.png",
  "apple-juice": "ვაშლის წვენი.png",
  "mixed-juice": "შერეული ხილის წვენი.png",
};

export function productImage(item: Pick<MenuItem, "slug">): string | null {
  const name = filenameBySlug[item.slug];
  if (!name) return null;
  return encodeURI(`${PRODUCT_FOLDER}/${name}`);
}
