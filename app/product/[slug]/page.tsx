import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { nok } from '@/lib/format';
import AddToCart from './AddToCart';


export default async function ProductPage({ 
  params,
}:  {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { images: true } });
  if (!product || !product.active) return notFound();

  const img = product.images[0]?.url ?? '/placeholder.png';

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="aspect-square relative border rounded-2xl overflow-hidden">
        <Image src={img} alt={product.name} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 text-lg">{nok(product.priceNok)}</p>
        <p className="mt-1 text-sm text-gray-500">På lager: {product.stock}</p>
        <div className="mt-6">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
