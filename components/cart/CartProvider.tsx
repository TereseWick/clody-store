'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = { id: string; name: string; priceNok: number; quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalNok: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('cart');
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const add = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(p => p.id == item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p);
      }
      return [...prev, item];
    });
  };

  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const totalNok = useMemo(() => items.reduce((sum, it) => sum + it.priceNok * it.quantity, 0), [items]);

  return <Ctx.Provider value={{ items, add, remove, clear, totalNok }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
