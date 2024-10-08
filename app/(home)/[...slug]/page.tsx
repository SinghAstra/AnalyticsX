import { getAllPosts } from "@/lib/loadMDX";
import { Post } from "@/types";
import React from "react";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: { slug: string[] }) {
  const slug = params?.slug[1];
  const page = getAllPosts().find((page: Post) => page.slug === slug);

  if (!page) {
    null;
  }

  return page;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const page = await getPageFromParams(params);
  return <div>BlogPage</div>;
};

export default BlogPage;
