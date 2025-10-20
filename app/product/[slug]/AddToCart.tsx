'use client';

import { useCart } from '@/components/cart/CartProvider';
import type { Product } from '@prisma/client';

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add({ id: product.id, name: product.name, priceNok: product.priceNok, quantity: 1 })}
      className="rounded-full border px-5 py-2"
    >
      Legg i handlekurv
    </button>
  );
}
