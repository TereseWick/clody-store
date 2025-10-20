import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border p-8 text-center">
        <h1 className="text-3xl font-semibold">Håndlagde vesker</h1>
        <p className="text-gray-600 mt-2">Små serier, laget i Norge. Limited drops.</p>
        <Link href="/shop" className="inline-block mt-6 rounded-full border px-5 py-2">Se butikken</Link>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Nye produkter</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
