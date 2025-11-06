// app/bundles/page.tsx
import { listBundles } from 'lib/bundles';
import { getBundleWithPrice } from "lib/bundlesWithPrice";
import BundlesPageClient from './BundlesPageClient';

export default async function BundlesPage() {
  try {
    const bundles = await listBundles();
    
    if (!bundles || !Array.isArray(bundles)) {
      console.error("Invalid bundles data:", bundles);
      return <BundlesPageClient initialBundles={[]} />;
    }

    const bundlesWithPrice = await Promise.all(bundles.map(getBundleWithPrice));
    
    console.log("bundlesWithPrice -> ", bundlesWithPrice);

    return <BundlesPageClient initialBundles={bundlesWithPrice || []} />;
  } catch (error) {
    console.error("Error fetching bundles:", error);
    return <BundlesPageClient initialBundles={[]} />;
  }
}