"use client";

import { useEffect, useState } from "react";

interface BundleItem {
  id: string;
  productId: string;
  title: string;
  price: number;
}

interface Bundle {
  id: string;
  productId: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  bundlePrice?: number;
  discountCode?: string;
  items: BundleItem[];
}

export default function EditBundlePage({ slug }: { slug: string }) {
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [allProducts, setAllProducts] = useState<BundleItem[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchBundle() {
      const res = await fetch(`/api/bundles/${slug}`);
      if (!res.ok) return;
      setBundle(await res.json());
    }
    async function fetchProducts() {
      const res = await fetch("/api/shopify/products");
      const data = await res.json();
      setAllProducts(data.products);
    }

    fetchBundle();
    fetchProducts();
  }, [slug]);

  const toggleItemSelection = (item: BundleItem) => {
    if (!bundle) return;
    setBundle(prev =>
      prev
        ? {
          ...prev,
          items: prev.items.some(i => i.id === item.id)
            ? prev.items.filter(i => i.id !== item.id)
            : [...prev.items, item],
        }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundle) return;

    let uploadedImageBase64 = bundle.imageUrl || "";
    if (imageFile) {
      uploadedImageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    }

    const res = await fetch(`/api/bundles/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...bundle, imageUrl: uploadedImageBase64 }),
    });

    if (!res.ok) {
      alert("Error updating bundle");
      return;
    }

    const saved = await res.json();
    alert(`Bundle "${saved.title}" updated successfully!`);
  };

  const [query, setQuery] = useState("");

  const filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!bundle) return <p>Loading...</p>;


  console.log("bundle to edit ", bundle)

  console.log("filteredProductst ", filteredProducts)

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6">Edit Bundle</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Bundle Title</label>
          <input
            type="text"
            value={bundle.title}
            onChange={e => setBundle({ ...bundle, title: e.target.value })}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* Slug (disabled) */}
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={bundle.slug}
            disabled
            className="mt-1 w-full rounded border px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={bundle.description}
            onChange={e => setBundle({ ...bundle, description: e.target.value })}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium">Bundle Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
          />
          {(imageFile || bundle.imageUrl) && (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : bundle.imageUrl}
              alt="Preview"
              className="mt-2 w-40 rounded"
            />
          )}
        </div>


        {/* Products */}
        <div>
          <label className="block text-sm font-medium">Select Products</label>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-2 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Product list */}
          <div className="mt-3 grid grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded p-2">
            {filteredProducts.map((p) => (
              <label
                key={p.id}
                className={`flex items-center space-x-2 border p-2 rounded cursor-pointer ${bundle.items.some((i) => i.productId === p.id)
                    ? "bg-blue-50 border-blue-400"
                    : ""
                  }`}
              >
                <input
                  type="checkbox"
                  checked={bundle.items.some((i) => i.productId === p.id)}
                  onChange={() => toggleItemSelection(p)}
                />
                <span className="truncate">{p.title}</span>
              </label>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-2 text-sm text-gray-500 text-center py-4">
                No products found
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-gray-800 py-2 text-white hover:bg-gray-700"
        >
          Update Bundle
        </button>
      </form>
    </div>
  );
}
