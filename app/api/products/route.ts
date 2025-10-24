import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
  const data = await req.json();

  const raw = Array.isArray(data.images) ? data.images : [data.images];
  const images: string[] = (raw || []).filter(Boolean).map((s: any) => String(s));
  
  const p = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      priceNok: data.priceNok,
      stock: data.stock,
      description: data.description,
      active: data.active,
      images: images.length
        ? {
          create: images.map((url: string, i: number) => ({
            url,
            order: i, 
          })),
        }
        : undefined,
    },
    include: {
      images: true,
    },
  });

  return NextResponse.json(p);
} catch (err: any) {
  return new NextResponse('POST error: ' + err.message, { status: 500 });
}
}



export async function PUT(req: NextRequest) {
  try {
  const data = await req.json();
  const images: string[] = Array.isArray(data.images) ? data.images : [data.images];

  const p = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      slug: data.slug,
      priceNok: data.priceNok,
      stock: data.stock,
      description: data.description,
      active: data.active,
    },
  });
  
  await prisma.productImage.deleteMany({ where: { productId: data.id } });
  if (images.length) {
    await prisma.productImage.createMany({
      data: images.map((url: string, i: number) => ({
        url,
        order: i,
        productId: data.id,
      })),
    });
  }

  const updated = await prisma.product.findUnique({
    where: { id: data.id },
    include: {
      images: true,
    },
  });

  return NextResponse.json(updated);
} catch (err: any) {
  return new NextResponse ( 'Post error: ' + err.message, { status: 400 });
}
}