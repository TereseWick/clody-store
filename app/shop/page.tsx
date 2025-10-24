import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { ProductCardSchema } from '@/lib/schemas/product';


export default async function ShopPage() {
  const rows = await prisma.product.findMany({ 
    where: { active: true }, 
    orderBy: { createdAt: 'desc' },
    select:{
      id: true,
      name: true,
      slug: true,
      priceNok: true,
      images: {
      select: {url: true, alt: true}, 
      orderBy: {order: 'asc'} 
    },
    },
  });

  const products = rows.map((row: unknown) => ProductCardSchema.parse(row));
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Butikk</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
