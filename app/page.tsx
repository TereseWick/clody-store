import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import VideoBanner from '@/components/VideoBanner';



export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border p-8 border-brand-200 text-center">
        <h1 className="text-3xl text-brand-300 font-semibold">Håndlagde vesker</h1>
        <p className="text-brand-300 mt-2">Håndbroderte og heklede vesker med personlige preg. Limited drops.</p>
        <Link href="/shop" className="inline-block mt-6 rounded-full border px-5 py-2">Se butikken</Link>
      </section>

      <section className="space-y-8">
       <VideoBanner />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brand-300">Nye produkter</h2>
        <Link className="underline" href="/shop">Butikk</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
