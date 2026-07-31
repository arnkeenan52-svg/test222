export type ProductId = "single";

export const PRODUCTS: Record<
  ProductId,
  { id: ProductId; title: string; usd: number; sub: string }
> = {
  single: { id: "single", title: "FadeClipper", usd: 59, sub: "Auto-fading cordless hair clipper" },
};
