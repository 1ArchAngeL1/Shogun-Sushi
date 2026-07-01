export const en = {
  meta: {
    siteTitle: "Shogun Sushi — Menu",
    siteDesc: "Fresh sushi crafted with the precision of a shogun.",
    menuTitle: "Menu · Shogun Sushi",
    menuDesc:
      "The full Shogun Sushi menu — maki, nigiri, sashimi, futomaki, fried rolls, uramaki, and our signature push-up tubes.",
    qrTitle: "QR Menu Poster · Shogun Sushi",
    qrDesc: "Print this QR code and place it on each table.",
  },
  nav: {
    menu: "MENU",
    visit: "VISIT",
    call: "CALL",
    backToSite: "← Back to site",
  },
  landing: {
    kanji: "寿司",
    headline1: "CRAFTED WITH",
    headline2: "THE PRECISION",
    headline3: "OF A SHOGUN.",
    subtitle:
      "Hand-rolled sushi, sustainably-sourced fish, and a menu built for the moment. Scan, browse, and order at your table.",
    viewMenu: "VIEW THE MENU",
    visitUs: "VISIT US",
    signature: {
      kanji: "看板チューブ",
      title: "PUSH-UP TUBES",
      subtitle:
        "Our signature format — premium rolls sealed inside the Shogun tube. Stay fresh, eat on the move.",
      fullMenu: "FULL MENU →",
      pieces: "TUBE →",
    },
    about: {
      kanji: "職人の技",
      title1: "EVERY ROLL",
      title2: "HAS A MAKER.",
      body:
        "Our itamae sharpen knives at dawn, source from coastal markets, and press every grain of rice by hand. No shortcuts. No mass kitchens. Just precision, patience, and the right cut.",
      stats: [
        ["12+", "YEARS OF CRAFT"],
        ["DAILY", "FISH DELIVERY"],
        ["100%", "HAND-ROLLED"],
        ["5", "SIGNATURE ROLLS"],
      ],
    },
    visit: {
      kanji: "お越しください",
      title: "FIND US.",
      address: "ADDRESS",
      hours: "HOURS",
      reservations: "RESERVATIONS",
      qrPanel: {
        kanji: "QR メニュー",
        body: "Already here? Scan the table QR or tap the menu below.",
      },
    },
  },
  menu: {
    kanji: "お品書き",
    title: "THE MENU",
    subtitle:
      "Hand-rolled daily. Tap any item for the full ingredient list. Ask your server for today's catch.",
    items: "ITEMS",
    pieces: "PCS",
  },
  availability: {
    unavailable: "Currently unavailable",
    available: "Available",
  },
  detail: {
    breadcrumbMenu: "MENU",
    ingredientsKanji: "材料",
    ingredientsTitle: "INGREDIENTS",
    relatedKanji: "続けて",
    relatedTitle: "YOU MIGHT ALSO LIKE",
    pieces: "PIECES",
    view: "VIEW →",
    allInCategory: "ALL",
  },
  footer: {
    tagline:
      "Hand-rolled daily. Sustainably-sourced fish. Crafted with the precision of a shogun.",
    hours: "HOURS",
    visit: "CONTACT",
    follow: "FOLLOW",
    qrPoster: "QR menu poster",
    rights: "All rights reserved.",
    craftedWith: "Crafted with precision.",
  },
  hours: {
    daily: "Every day · 12:00 – 23:00",
  },
  qr: {
    kanji: "スキャンしてください",
    title: "SCAN TO ORDER",
    subtitle:
      "Point your camera at the code. The menu opens in your browser — no app required.",
    tableKanji: "テーブル",
    table: "TABLE",
    steps: ["OPEN CAMERA", "SCAN CODE", "TAP THE LINK"],
    menuLabel: "メニュー",
    print: "PRINT",
    update: "UPDATE",
    urlLabel: "Menu URL",
    tableLabel: "Table",
    tablePlaceholder: "e.g. 7",
    instructions:
      "Set a different URL or a table number in the top bar. Then use File → Print (or ⌘P) and choose portrait, no margins for a clean poster.",
    multiInstructions:
      "Need codes for every table? Visit /qr?table=N and print each one (e.g. /qr?table=1, /qr?table=2, …).",
  },
  categories: {
    maki: { label: "Maki", tagline: "Thin classic rolls — simple and clean" },
    nigiri: { label: "Nigiri", tagline: "Hand-pressed rice, topped with fish" },
    sashimi: { label: "Sashimi", tagline: "Pure slices of the freshest fish" },
    futomaki: { label: "Futomaki", tagline: "Fat rolls, generously filled" },
    "fried-rolls": { label: "Fried Rolls", tagline: "Crisped tempura-style, served hot" },
    uramaki: { label: "Uramaki", tagline: "Inside-out rolls, rice on the outside" },
    pushup: { label: "Push-up Tubes", tagline: "Our signature tube-served rolls" },
    sets: { label: "Sets", tagline: "Curated combinations for sharing" },
    drinks: { label: "Drinks", tagline: "Sodas, juices, and mineral water" },
  },
  badges: {
    signature: "Signature",
    veggie: "Veggie",
    spicy: "Spicy",
    new: "New",
    popular: "Popular",
    "gluten-free": "Gluten-Free",
  },
};

export type Dictionary = typeof en;
