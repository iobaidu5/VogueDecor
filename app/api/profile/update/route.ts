// app/api/profile/update/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; // Format: Bearer <token>

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  let userId: string;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    userId = decoded.userId;
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  const body = await req.json();
  const { firstName, lastName, phone, address, image } = body;

  try {
    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: { firstName, lastName, phone, address, image },
      create: {
        userId,
        firstName,
        lastName,
        phone,
        address,
        image,
      },
    });

    return NextResponse.json({ profile: updatedProfile });
  } catch (err) {
    console.error('[PROFILE_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
