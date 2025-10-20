'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { nok } from '@/lib/format';

export default function CartPage() {
  const { items, remove, totalNok } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Handlekurv</h1>
      {items.length === 0 ? (
        <p>Handlekurven er tom. <Link className="underline" href="/shop">Fortsett å handle</Link></p>
      ) : (
        <div className="space-y-4">
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">x{it.quantity} • {nok(it.priceNok)}</div>
              </div>
              <button onClick={() => remove(it.id)} className="text-sm underline">Fjern</button>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="font-medium">Totalt</div>
            <div>{nok(totalNok)}</div>
          </div>
          <form method="POST" action="/checkout">
            <button className="rounded-full border px-5 py-2">Til kassen</button>
          </form>
        </div>
      )}
    </div>
  );
}
