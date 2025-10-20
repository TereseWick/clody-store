import { prisma } from '@/lib/prisma';
import ProductForm from '../product-form';
import { notFound } from 'next/navigation';

export default async function EditProduct({ params }: { params: { id: string }}) {
  const product = await prisma.product.findUnique({ where: { id: params.id }});
  if (!product) return notFound();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Rediger produkt</h1>
      <ProductForm product={product} />
    </div>
  )
}
