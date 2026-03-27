'use client';

import { ITEMS_PER_PAGE } from 'components/layout/product-grid-items';

/** Matches ProductGridItems grid + ProductCard layout (aspect-square image + title + price rows). */

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className ?? ''}`}>
      <div
        className="absolute inset-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent"
        aria-hidden
      />
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-full">
      <div className="group relative flex w-full flex-col overflow-hidden">
        <div className="relative aspect-square w-full bg-white">
          <ShimmerBlock className="h-full w-full rounded-sm" />
        </div>
        <div className="flex flex-col items-start gap-2 p-3 md:items-start md:text-left lg:text-center">
          <ShimmerBlock className="h-4 w-full max-w-[90%] rounded-sm" />
          <ShimmerBlock className="h-4 w-2/3 rounded-sm" />
          <div className="flex w-full items-start justify-start gap-2 md:items-center">
            <ShimmerBlock className="h-4 w-16 rounded-sm" />
            <ShimmerBlock className="h-4 w-14 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductGridSkeleton() {
  return (
    <div className="my-[30px] grid grid-cols-2 justify-center gap-6 gap-y-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
