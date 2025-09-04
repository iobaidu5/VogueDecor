"use client";

import { useEffect, useState } from "react";

interface ShopifyProduct {
  id: string;
  title: string;
  variants: { id: string; title: string; price: string }[];
}

export default function CreateBundlePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bundlePrice, setBundlePrice] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [selectedItems, setSelectedItems] = useState<
    { productId: string; variantId: string; quantity: number }[]
  >([]);

  // Fetch Shopify products
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/shopify/products");
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  const toggleProduct = (product: ShopifyProduct) => {
    const existing = selectedItems.find((i) => i.productId === product.id);
    if (existing) {
      setSelectedItems(selectedItems.filter((i) => i.productId !== product.id));
    } else {
      setSelectedItems([
        ...selectedItems,
        { productId: product.id, variantId: product.variants[0]?.id, quantity: 1 },
      ]);
    }
  };

  const handleQuantityChange = (index: number, qty: number) => {
    const updated = [...selectedItems];
    updated[index].quantity = qty;
    setSelectedItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let uploadedImageBase64 = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
      
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
      
        if (!uploadRes.ok) {
          throw new Error(`Image upload failed: ${uploadRes.statusText}`);
        }
      
        const uploadData = await uploadRes.json();
        console.log("upload response ->", uploadData);
      
        // Your API returns { url: base64Image }
        uploadedImageBase64 = uploadData.url;
      }
      


      const generatedSlug =
        slug.trim() || title.trim().toLowerCase().replace(/\s+/g, "-");


      const newBundle = {
        title: title.trim(),
        slug: generatedSlug,
        description: description.trim(),
        imageUrl: uploadedImageBase64,
        // bundlePrice: parseFloat(bundlePrice) || 0,
        discountCode: discountCode.trim() || null,
        items: selectedItems,
      };

      const res = await fetch("/api/bundles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBundle),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Error saving bundle");
      }

      const savedBundle = await res.json();
      alert(`Bundle "${savedBundle.title}" saved successfully!`);

      // reset form
      setTitle("");
      setSlug("");
      setDescription("");
      setImageFile(null);
      setBundlePrice("");
      setDiscountCode("");
      setSelectedItems([]);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6">Create New Bundle</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-black"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
            }}
            placeholder="Bundle title"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-black"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-black"
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-md border px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-black-50 file:px-3 file:py-2 file:text-black-700 hover:file:bg-black-100"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Price */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Bundle Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-black"
            value={bundlePrice}
            onChange={(e) => setBundlePrice(e.target.value)}
          />
        </div> */}

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium mb-1">Discount Code</label>
          <input
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-black"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
        </div>

        {/* Product selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Add Products</label>
          <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-sm text-gray-500">No products found.</p>
            ) : (
              products.map((p) => {
                const isChecked = !!selectedItems.find((i) => i.productId === p.id);
                return (
                  <label
                    key={p.id}
                    className="flex items-center gap-2 cursor-pointer mb-2"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={isChecked}
                      onChange={() => toggleProduct(p)}
                    />
                    <span>{p.title}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <div className="bg-gray-50 border rounded-md p-4 space-y-3">
            <h3 className="font-semibold text-lg">Selected Items</h3>
            {selectedItems.map((item, idx) => {
              const product = products.find((p) => p.id === item.productId);
              const variant = product?.variants.find((v) => v.id === item.variantId);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between border rounded-md p-2 bg-white"
                >
                  <div>
                    <p className="font-medium">{product?.title}</p>
                    <p className="text-sm text-gray-600">
                      {variant?.title} — ${variant?.price}
                    </p>
                  </div>
                  <input
                    type="number"
                    min={1}
                    className="w-20 rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-black"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(idx, parseInt(e.target.value))
                    }
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-2 text-white font-medium hover:bg-black-700 focus:outline-none focus:ring"
        >
          Create Bundle
        </button>
      </form>
    </div>
  );
}
