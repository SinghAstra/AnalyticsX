import { siteConfig } from "@/config/site";
import { connectMongoose } from "@/db/connectMongoose";
import Post from "@/db/models/Post";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: `Blog | ${siteConfig.name}`,
};

const BlogPage = async () => {
  await connectMongoose();
  const posts = await Post.find({ published: true }).sort({ date: -1 }).exec();

  console.log("posts is ", posts);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {/* {post.createdAt && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.createdAt)}
                </p>
              )} */}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
};

export default BlogPage;
