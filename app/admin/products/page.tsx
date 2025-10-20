import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }});
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Produkter</h1>
        <Link className="underline" href="/admin/products/new">Nytt produkt</Link>
      </div>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="border rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">/{p.slug} • {p.active ? 'Aktiv' : 'Skjult'} • {p.stock} på lager</div>
            </div>
            <Link className="underline text-sm" href={`/admin/products/${p.id}`}>Rediger</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
