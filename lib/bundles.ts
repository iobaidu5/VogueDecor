import { prisma } from './db';
import { Prisma } from "@prisma/client";

export async function listBundles() {
  return prisma.bundle.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });
}

// export async function getBundleBySlug(slug: string) {
//   return prisma.bundle.findUnique({ where: { slug }, include: { items: true } });
// }

export async function createBundle(input: {
  slug: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  bundlePrice?: string | null;
  discountCode?: string | null;
  items: Array<{ productId: string; variantId: string; quantity: number; titleSnap?: string; priceSnap?: string | null }>;
}) {
  return prisma.bundle.create({
    data: {
      slug: input.slug,
      title: input.title,
      description: input.description ?? undefined,
      imageUrl: input.imageUrl ?? undefined,
      bundlePrice: input.bundlePrice ? (input.bundlePrice as any) : undefined,
      discountCode: input.discountCode ?? undefined,
      items: { create: input.items.map(i => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
        titleSnap: i.titleSnap,
        priceSnap: i.priceSnap ? (i.priceSnap as any) : undefined,
      }))},
    },
    include: { items: true },
  });
}



export async function getBundleBySlug(slug: string) {
  const bundle = await prisma.bundle.findUnique({
    where: { slug },
    include: { items: true },
  });

  if (!bundle) return null;

  return serializeBundle(bundle);
}

export async function deleteBundle(id: string) {
  return prisma.bundle.delete({
    where: { id },
  });
}

// function serializeBundle(bundle: any) {
//   return {
//     ...bundle,
//     bundlePrice: bundle.bundlePrice?.toNumber() ?? null, // ✅ convert Decimal → number
//     createdAt: bundle.createdAt.toISOString(),
//     updatedAt: bundle.updatedAt.toISOString(),
//     items: bundle.items.map((i: any) => ({
//       ...i,
//       priceSnap: i.priceSnap?.toNumber() ?? null, // ✅ convert Decimal → number
//     })),
//   };
// }


function serializeBundle(bundle: any) {
  return {
    ...bundle,
    totalPrice:
      bundle.totalPrice instanceof Prisma.Decimal
        ? parseFloat(bundle.totalPrice.toString())
        : bundle.totalPrice,
    items: bundle.items?.map((item: any) => ({
      ...item,
      priceSnap:
        item.priceSnap instanceof Prisma.Decimal
          ? parseFloat(item.priceSnap.toString())
          : item.priceSnap,
    })),
  };
}
