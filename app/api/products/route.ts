// app/api/products/route.ts
import { getProductsByIds } from "lib/shopify/product";
import { NextResponse } from "next/server";

// Helper: Convert BigInt & other non-JSON-safe values
function toJSONSafe(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Invalid request. Expected { ids: string[] }" },
        { status: 400 }
      );
    }

    const products = await getProductsByIds(ids);

    // Sanitize result to make it JSON-safe
    const safeProducts = toJSONSafe(products);

    return NextResponse.json(safeProducts);
  } catch (err: any) {
    console.error("API /products error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
