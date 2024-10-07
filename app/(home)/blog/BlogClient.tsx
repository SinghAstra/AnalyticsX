"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Post } from "@/types";
import { compareDesc } from "date-fns";
import { useState } from "react";
import BlogLayout from "./BlogLayout";

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [layout, setLayout] = useState("grid-cols-3");

  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  console.log("layout is ",layout);

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <TextGenerateEffect
            className="text-xl text-muted-foreground"
            words="Learning Together, Growing Together"
          />
        </div>
        <BlogLayout onLayoutChange={setLayout} />
      </div>
      <hr className="my-8" />
      {sortedPosts.length ? (
        <HoverEffect posts={sortedPosts} layout={layout} />
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
