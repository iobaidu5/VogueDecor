// app/components/HeaderWrapper.tsx (or wherever you use Header)

import Header from './Header';
import { getMenu } from 'lib/shopify';

export default async function HeaderWrapper() {
  const menu = await getMenu('main-menu');
  return <Header menu={menu} />;
}
