import React from 'react';
import { articles } from '../data';
import SingleBlog from 'screens/blogs/singleBlog';

const BlogPage = async ({ params }: any) => {
  const { slug } = await params;
  const data: any = articles?.find((item) => item.id == slug);

  return <SingleBlog data={data} />;
};

export default BlogPage;