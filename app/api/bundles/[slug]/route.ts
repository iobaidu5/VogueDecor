import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const bundle = await prisma.bundle.findUnique({
      where: { slug: params.slug },
      include: { items: true },
    });

    if (!bundle) {
      return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
    }

    return NextResponse.json(bundle);
  } catch (error) {
    console.error("Error fetching bundle:", error);
    return NextResponse.json({ error: "Failed to fetch bundle" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();

    const updatedBundle = await prisma.bundle.update({
      where: { slug: params.slug },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        bundlePrice: body.bundlePrice,
        discountCode: body.discountCode,
        items: {
          deleteMany: {}, // remove old items
          create: body.items.map((i: any) => ({
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

    return NextResponse.json(updatedBundle);
  } catch (error) {
    console.error("Error updating bundle:", error);
    return NextResponse.json({ error: "Failed to update bundle" }, { status: 500 });
  }
}
