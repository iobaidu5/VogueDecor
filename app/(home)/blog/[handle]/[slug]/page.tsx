import Blog from '../../../../../screens/blog/[handle]/[slug]/page';


export default function Page() {
  return <Blog params={{
    handle: '',
    slug: ''
  }} />;
}