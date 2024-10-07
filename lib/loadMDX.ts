import { Post } from "@/types";

const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");

const CONTENT_DIR = path.join(process.cwd(), "../content/blog");

export const getAllPosts = () => {
  const filenames = fs.readdirSync(CONTENT_DIR);

  const posts = filenames.map((filename: string, index: number) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
      slug: filename.replace(/\.mdx$/, ""),
    };
  });

  console.log("posts[0] is ", posts[0]);

  return posts.filter((post: Post) => post.published);
};
