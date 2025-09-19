// app/bundles/BundleCard.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AllBundleCard({ bundle }: { bundle: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${bundle.title}"?`
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/bundles/${bundle.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      router.refresh(); // ✅ Refresh data
    } catch (error) {
      alert('Something went wrong while deleting.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Image */}
      <Link href={`/bundles/${bundle.slug}`} className="block">
        {bundle.imageUrl ? (
          <img
            src={bundle.imageUrl}
            alt={bundle.title}
            className="h-[450px] w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/bundles/${bundle.slug}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-gray-900">
            {bundle.title}
          </h2>
          {bundle.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {bundle.description}
            </p>
          )}
        </Link>

        {/* Actions */}

        {/* {JSON.parse(localStorage?.getItem("user") || "{}")?.username === "Gary" && (
        <div className="mt-4 flex gap-2">
          <Link
            href={`/bundles/${bundle.slug}/edit`}
            className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        )} */}
      </div>
    </div>
  );
}
