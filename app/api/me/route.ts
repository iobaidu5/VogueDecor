// app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; // Expecting Bearer <token>

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { profile: true },
    });

    if (!user?.profile) {
      return NextResponse.json({ profile: null });
    }

    return NextResponse.json({ profile: user.profile });
  } catch (error) {
    console.error('[PROFILE_GET_ERROR]', error);
    return NextResponse.json({ error: 'Unauthorized or Server Error' }, { status: 401 });
  }
}