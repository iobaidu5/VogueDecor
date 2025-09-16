import EditBundlePage from "components/EditBundlePage";


export default function EditBundlePageWrapper({ params }: { params: { slug: string } }) {
  return <EditBundlePage slug={params.slug} />;
}
