'use client';

import { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ChildrenWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return <Fragment key={searchParams.get('q')}>{children}</Fragment>;
}
