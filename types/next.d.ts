// types/next.d.ts
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

declare module 'next' {
  export type PageProps = {
    params: Params;
    searchParams: { [key: string]: string | string[] | undefined };
  };
}