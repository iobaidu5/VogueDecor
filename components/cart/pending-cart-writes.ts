'use client';

import { addItem, updateItemQuantity } from 'components/cart/actions';

// Rapid +/- clicks used to fire one server write per click. The writes overlap,
// each carries an absolute quantity, and stale ones can land after newer ones —
// so a burst of 50 clicks could settle at 15-20 in the real Shopify cart.
// Instead we accumulate a burst client-side and send ONE write with the final
// value once clicks stop (or immediately on checkout via flushPendingCartWrites).

const DEBOUNCE_MS = 600;

const pendingAdds: { counts: Record<string, number>; seq: number } = {
  counts: {},
  seq: 0
};

const pendingQuantities = new Map<string, { target: number; seq: number }>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// "Add to cart" clicks: accumulate per-variant counts, send one addToCart
// with the total once the burst ends. Returns an error message or undefined.
export async function queueAdd(merchandiseId: string): Promise<string | undefined> {
  pendingAdds.counts[merchandiseId] = (pendingAdds.counts[merchandiseId] || 0) + 1;
  const seq = ++pendingAdds.seq;

  await sleep(DEBOUNCE_MS);
  if (seq !== pendingAdds.seq) return; // superseded by a newer click

  return sendPendingAdds();
}

// Cart +/- buttons: track the target quantity across both buttons of a line,
// send one absolute update once the burst ends. `currentQuantity` is the
// rendered quantity at the moment of the first click of a burst.
export async function queueQuantityUpdate(
  merchandiseId: string,
  currentQuantity: number,
  delta: 1 | -1
): Promise<string | undefined> {
  let entry = pendingQuantities.get(merchandiseId);
  if (!entry) {
    entry = { target: currentQuantity, seq: 0 };
    pendingQuantities.set(merchandiseId, entry);
  }
  entry.target = Math.max(0, entry.target + delta);
  const seq = ++entry.seq;

  await sleep(DEBOUNCE_MS);
  if (seq !== entry.seq) return; // superseded by a newer click

  pendingQuantities.delete(merchandiseId);
  return updateItemQuantity(null, { merchandiseId, quantity: entry.target });
}

async function sendPendingAdds(): Promise<string | undefined> {
  const lines = Object.entries(pendingAdds.counts).map(([merchandiseId, quantity]) => ({
    merchandiseId,
    quantity
  }));
  pendingAdds.counts = {};
  pendingAdds.seq++;
  if (lines.length === 0) return;
  return addItem(null, lines);
}

// Called before checkout so a write still waiting out its debounce is not lost.
export async function flushPendingCartWrites(): Promise<void> {
  await sendPendingAdds();

  const entries = Array.from(pendingQuantities.entries());
  pendingQuantities.clear();
  for (const [merchandiseId, entry] of entries) {
    entry.seq++; // cancel the sleeping debounced action
    await updateItemQuantity(null, { merchandiseId, quantity: entry.target });
  }
}
