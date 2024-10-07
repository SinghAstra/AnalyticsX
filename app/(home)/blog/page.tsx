import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { getAllPosts } from "@/lib/loadMDX";
import { formatDate } from "@/lib/utils";
import { Post } from "@/types";
import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import BlogLayout from "./BlogLayout";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = getAllPosts() as Post[];

  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

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
        <BlogLayout/>
      </div>
      <hr className="my-8" />
      {sortedPosts.length ? (
        <HoverEffect posts={sortedPosts} />
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
