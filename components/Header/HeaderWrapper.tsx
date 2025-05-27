'use client';

import Header from './Header';
import { useEffect, useState } from 'react';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';

export default function HeaderWrapper() {
  const [menu, setMenu] = useState<Menu[] | null>(null);

  useEffect(() => {
    getMenu('main-menu').then(setMenu);
  }, []);

  if (!menu) return null;

  return <Header menu={menu} />;
}
