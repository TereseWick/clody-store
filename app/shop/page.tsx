import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await prisma.product.findMany({ where: { active: true }, include: { images: true } });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Butikk</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
