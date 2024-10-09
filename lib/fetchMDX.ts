import { Post } from "@/types";

const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "/content/blog");
const AUTHORS_DIR = path.join(process.cwd(), "/content/authors");
const DOCS_DIR = path.join(process.cwd(), "/content/docs");

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

const getAllDocs = () => {
  const walkDir = (dir: string): string[] => {
    const files = fs.readdirSync(dir);
    let allFiles: string[] = [];

    files.forEach((file: string) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        allFiles = [...allFiles, ...walkDir(filePath)]; // Recursively read subdirectories
      } else if (file.endsWith(".mdx")) {
        allFiles.push(filePath);
      }
    });

    return allFiles;
  };

  const docFiles = walkDir(DOCS_DIR);

  const docs = docFiles.map((filePath: string) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const slug = filePath
      .replace(DOCS_DIR, "")
      .replace(/\\/g, "/")
      .replace(/\.mdx$/, "")
      .replace(/\/index$/, "");

    const slugAsParams = slug.split("/").filter(Boolean).join("/");

    return {
      ...data,
      slug,
      slugAsParams,
    };
  });

  return docs;
};
