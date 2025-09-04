import { NextRequest, NextResponse } from 'next/server';
import { getBundleBySlug } from '../../../../../lib/bundles';
import { addLines, applyDiscountCodes, createCart } from '../../../../../lib/cart';

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json().catch(() => ({}));
    const inputCartId = body?.cartId as string | undefined;

    const bundle = await getBundleBySlug(params.slug);
    if (!bundle) return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });

    const lines = bundle.items.map((i: any) => ({ merchandiseId: i.variantId, quantity: i.quantity }));

    const cart = inputCartId ? { id: inputCartId } : await createCart();
    const added = await addLines(cart.id, lines);

    if (bundle.discountCode) {
      await applyDiscountCodes(cart.id, [bundle.discountCode]);
    }

    return NextResponse.json({
      cartId: cart.id,
      checkoutUrl: added?.cart?.checkoutUrl,
      totalQuantity: added?.cart?.totalQuantity,
      appliedDiscount: bundle.discountCode || null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to add bundle' }, { status: 500 });
  }
}
