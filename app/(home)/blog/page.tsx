import { getAllPosts } from "@/lib/fetchMDX";
import { Post } from "@/types";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts() as Post[];

  return <BlogClient posts={posts} />;
}
