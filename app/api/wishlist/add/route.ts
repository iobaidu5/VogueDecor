// /app/api/wishlist/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const body = await req.json();

    if (!body?.productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const { productId } = body;

    // const existing = await prisma.wishlist.findUnique({
    //   where: {
    //     userId_productId: {
    //       userId,
    //       productId,
    //     },
    //   },
    // });

    const existing = await prisma.wishlist.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already in wishlist' });
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return NextResponse.json({ wishlist });
  } catch (error: any) {
    console.error('Wishlist error:', error.message, error.stack);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
