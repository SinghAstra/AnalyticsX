import { Post } from "@/types";

const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "/content/blog");
const AUTHORS_DIR = path.join(process.cwd(), "/content/authors");

export const getAllPosts = () => {
  const filenames = fs.readdirSync(POSTS_DIR);

  const posts = filenames.map((filename: string, index: number) => {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
      slug: filename.replace(/\.mdx$/, ""),
    };
  });

  return posts.filter((post: Post) => post.published);
};

export const getAllAuthors = () => {
  const filenames = fs.readdirSync(AUTHORS_DIR);

  const authors = filenames.map((filename: string) => {
    const filePath = path.join(AUTHORS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);

    return {
      ...data,
      slug: filename.replace(/\.mdx$/, ""),
    };
  });

  return authors;
};
