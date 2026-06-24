export type ProductId = "single" | "double";

export const PRODUCTS: Record<
  ProductId,
  { id: ProductId; title: string; usd: number; sub: string }
> = {
  single: { id: "single", title: "1 FadeClipper", usd: 59, sub: "Auto-fading cordless hair clipper" },
  double: { id: "double", title: "2 FadeClippers", usd: 99, sub: "Two clippers — gift one" },
};
