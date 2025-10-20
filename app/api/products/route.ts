import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const p = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      priceNok: data.priceNok,
      stock: data.stock,
      description: data.description,
      active: data.active,
    }
  });
  return NextResponse.json(p);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const p = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      slug: data.slug,
      priceNok: data.priceNok,
      stock: data.stock,
      description: data.description,
      active: data.active,
    }
  });
  return NextResponse.json(p);
}
