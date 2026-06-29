export type ProductId =
  | "single"
  | "double"
  | "blades"
  | "guards"
  | "case"
  | "dock"
  | "care"
  | "beard";

export type ProductCategory = "Clippers" | "Accessories";

export type Product = {
  id: ProductId;
  title: string;
  usd: number;
  was?: number;
  sub: string;
  image: string;
  category: ProductCategory;
  badge?: string;
  /** Extra terms the search field matches against. */
  keywords?: string[];
};

export const PRODUCTS: Record<ProductId, Product> = {
  single: {
    id: "single",
    title: "1 FadeClipper",
    usd: 59,
    was: 99,
    sub: "Auto-fading cordless hair clipper",
    image: "/assets/img/product-front.jpg",
    category: "Clippers",
    badge: "Bestseller",
    keywords: ["clipper", "fade", "cordless", "trimmer", "starter", "hair"],
  },
  double: {
    id: "double",
    title: "2 FadeClippers",
    usd: 99,
    was: 198,
    sub: "Two clippers — keep one, gift one",
    image: "/assets/img/packaging.jpg",
    category: "Clippers",
    badge: "Best value",
    keywords: ["clipper", "fade", "gift", "bundle", "two", "pair", "couple"],
  },
  blades: {
    id: "blades",
    title: "Auto-Fade Replacement Blade",
    usd: 24,
    sub: "Keep every fade razor-sharp",
    image: "/assets/img/blade.jpg",
    category: "Accessories",
    keywords: ["blade", "replacement", "spare", "sharp", "cutter", "titanium"],
  },
  guards: {
    id: "guards",
    title: "Precision Guard Set",
    usd: 19,
    sub: "Eight magnetic length guards, 1.5–24 mm",
    image: "/assets/img/product-45.jpg",
    category: "Accessories",
    keywords: ["guard", "comb", "length", "attachment", "set", "magnetic"],
  },
  case: {
    id: "case",
    title: "Waterproof Travel Case",
    usd: 29,
    sub: "Hard shell that holds the full kit",
    image: "/assets/img/product-linen.jpg",
    category: "Accessories",
    keywords: ["case", "travel", "storage", "waterproof", "bag", "carry"],
  },
  dock: {
    id: "dock",
    title: "Charging Dock + USB-C",
    usd: 25,
    sub: "Magnetic stand with fast USB-C charging",
    image: "/assets/img/product-dock.jpg",
    category: "Accessories",
    keywords: ["dock", "charger", "charging", "stand", "usb-c", "cable", "power"],
  },
  care: {
    id: "care",
    title: "Blade Care & Cleaning Kit",
    usd: 15,
    sub: "Brush, blade oil and cleaning spray",
    image: "/assets/img/product-grad.jpg",
    category: "Accessories",
    keywords: ["clean", "care", "oil", "brush", "maintenance", "spray"],
  },
  beard: {
    id: "beard",
    title: "Beard & Detail Attachment",
    usd: 22,
    sub: "Snap-on head for edges, beard and detailing",
    image: "/assets/img/fade-closeup.jpg",
    category: "Accessories",
    keywords: ["beard", "detail", "edge", "trim", "attachment", "lineup"],
  },
};

/** Every product, in display order. */
export const ALL_PRODUCTS: Product[] = Object.values(PRODUCTS);

/** Cross-sell add-ons (everything that isn't a clipper). */
export const ACCESSORIES: Product[] = ALL_PRODUCTS.filter((p) => p.category === "Accessories");

export const CATEGORIES: ProductCategory[] = ["Clippers", "Accessories"];
