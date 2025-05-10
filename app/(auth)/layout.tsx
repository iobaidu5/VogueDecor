import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return <main className='flex-center min-h-screen w-full'>{children}</main>;
}
