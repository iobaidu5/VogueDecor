import { NextResponse } from "next/server";
import { prisma } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, description, imageUrl, bundlePrice, discountCode, items } = body;

    const bundle = await prisma.bundle.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        bundlePrice,
        discountCode,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            variantId: i.variantId,
            titleSnap: i.titleSnap || "",
            priceSnap: i.priceSnap ? parseFloat(i.priceSnap) : 0,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ bundle });
  } catch (error) {
    console.error("Error creating bundle:", error);
    return NextResponse.json({ error: "Failed to create bundle" }, { status: 500 });
  }
}
