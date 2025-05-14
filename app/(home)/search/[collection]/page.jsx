import CategoryPageClient from 'components/category-page-client';

export default async function CategoryPage({ params }) {
  const collection = params.collection;
  return <CategoryPageClient collection={collection} />;
}