import BlogPage from '../../../../screens/blog/[handle]/[slug]/page';


export default function Page() {
  return <BlogPage params={{
    handle: '',
    slug: ''
  }} />;
}