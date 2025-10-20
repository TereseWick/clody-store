import Link from 'next/link';
import Image from 'next/image';
import { nok } from '@/lib/format';
import type { Product } from '@prisma/client';

type P = {
  product: Product & { images: { url: string; alt: string | null }[] };
};

export default function ProductCard({ product }: P) {
  const img = product.images[0]?.url ?? '/placeholder.png';
  return (
    <Link href={`/product/${product.slug}`} className="block group rounded-2xl overflow-hidden border">
      <div className="aspect-square relative bg-gray-50">
        <Image src={img} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <span className="text-sm">{nok(product.priceNok)}</span>
        </div>
      </div>
    </Link>
  );
}
