'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';


export default function AllBundleCard({ bundle }: { bundle: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const buttonClasses =
    'w-full rounded-md bg-gray-200 py-3 text-sm font-semibold uppercase text-black transition-colors duration-300 hover:bg-red hover:text-black';

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

      router.refresh();
    } catch (error) {
      alert('Something went wrong while deleting.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleNavigate = () => {
  //   setLoading(true);
  //   router.push(`/bundles/${bundle.slug}`);
  // };

  const handleNavigate = () => {
    setLoading(true);
    const price =
      typeof bundle.totalPrice === "object" && "toNumber" in bundle.totalPrice
        ? bundle.totalPrice.toNumber()
        : Number(bundle.totalPrice || 0);

    const url = `/bundles/${bundle.slug}?totalPrice=${encodeURIComponent(price)}`;
    router.push(url);
  };



  return (
    <div className="w-full">
      <div
        className="group relative w-full flex flex-col overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div
          className="relative w-full aspect-square bg-white cursor-pointer"
          onClick={handleNavigate}
        >
          {bundle.imageUrl ? (
            <Image
              src={bundle.imageUrl}
              alt={bundle.title}
              fill
              className={`object-contain lg:object-cover transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-90' : 'opacity-100'
                }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
              No image
            </div>
          )}

          {/* Loader overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            </div>
          )}

          {/* Actions */}
          {JSON.parse(localStorage?.getItem('user') || '{}')?.username ===
            'Gary' ? (
            <div
              className={`absolute bottom-0 left-0 right-0 z-10 mx-auto flex items-center justify-center gap-2 transition-all duration-500 ease-in-out ${isHovered
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
                }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/bundles/${bundle.slug}/edit`);
                }}
                className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={loading}
                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ) : (
            <div
              className={`absolute bottom-0 left-0 right-0 z-10 mx-auto transition-all duration-500 ease-in-out ${isHovered
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
                } flex items-center justify-center`}
            >
              <button
                onClick={handleNavigate}
                className={clsx(buttonClasses)}
              >
                {loading ? 'Loading...' : 'Show Bundle'}
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 p-3 items-start md:items-center text-left lg:text-center">
          <p className="w-full text-xs lg:text-sm md:text-base lg:font-medium text-black">
            {bundle.title}
          </p>
          <div className="flex items-center justify-start md:justify-center space-x-2">
            <p className="text-sm text-left lg:text-center font-medium text-[#878787]">

              {bundle.totalPrice
                ? `$${(
                  typeof bundle.totalPrice === "object" && "toNumber" in bundle.totalPrice
                    ? bundle.totalPrice.toNumber()
                    : Number(bundle.totalPrice)
                ).toFixed(2)}`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}