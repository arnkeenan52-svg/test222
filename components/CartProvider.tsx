"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS, type ProductId } from "@/lib/products";

type Item = { id: ProductId; qty: number };

type CartCtx = {
  items: Item[];
  count: number;
  subtotalUsd: number;
  open: boolean;
  add: (id: ProductId) => void;
  setQty: (id: ProductId, qty: number) => void;
  remove: (id: ProductId) => void;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartCtx>({
  items: [],
  count: 0,
  subtotalUsd: 0,
  open: false,
  add: () => {},
  setQty: () => {},
  remove: () => {},
  setOpen: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("fc_cart");
      if (s) setItems(JSON.parse(s));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("fc_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (id: ProductId) => {
    setItems((prev) => {
      const e = prev.find((i) => i.id === id);
      if (e) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
    setOpen(true);
  };

  const setQty = (id: ProductId, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))));

  const remove = (id: ProductId) => setItems((prev) => prev.filter((i) => i.id !== id));

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotalUsd = items.reduce((s, i) => s + PRODUCTS[i.id].usd * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotalUsd, open, add, setQty, remove, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
