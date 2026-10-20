export function bundleName(t: any, title: string | undefined | null): string {
  if (!title) return '';
  const bundles = t('bundleTitles', { returnObjects: true });
  if (bundles && typeof bundles === 'object') {
    const match = (bundles as Record<string, string>)[title];
    if (typeof match === 'string') return match;
  }
  return title;
}
