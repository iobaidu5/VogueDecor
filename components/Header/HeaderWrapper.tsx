'use client';

import Header from './Header';
import { useEffect, useState } from 'react';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';

export default function HeaderWrapper() {
  const [menu, setMenu] = useState<Menu[]>([]);

  // Render the header immediately; Shopify menu links fill in once loaded
  useEffect(() => {
    getMenu('main-menu')
      .then(setMenu)
      .catch((error) => console.error('Failed to load main menu', error));
  }, []);

  return <Header menu={menu} />;
}
