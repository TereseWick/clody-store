import Link from 'next/link';
import Image from 'next/image';
import { nok } from '@/lib/format';
import type { ProductCardData } from '@/lib/schemas/product';


export default function ProductCard({ product }: { product: ProductCardData }) {
  const raw = product.images[0]?.url ?? '/placeholder.png';
  const img = raw.startsWith('http') || raw.startsWith('/') ? raw : `/${raw}`;

  return (
    <Link href={`/product/${product.slug}`} className="block group rounded-2xl overflow-hidden border border-brand-200 bg-white hover:shadow-md transition">
      <div className="aspect-square relative bg-brand-100/40">
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
