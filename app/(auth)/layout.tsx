import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
