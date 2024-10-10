import { Icons } from "@/components/Icons";
import MdxSection from "@/components/MdxSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getAllAuthors, getAllPosts } from "@/lib/fetchMDX";
import { getMdxSource } from "@/lib/mdx";
import { absoluteUrl, cn, formatDate } from "@/lib/utils";
import { Author, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: { slug: string[] }) {
  const slug = params?.slug[0];
  const post = getAllPosts().find((post: Post) => post.slug === slug);

  if (!post) {
    null;
  }

  const mdxSource = await getMdxSource(post.content);

  return { ...post, mdxSource };
}

export async function generateMetadata({ params }: BlogPageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;
  const ogUrl = new URL(`${url}/api/og`);

  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", siteConfig.name);

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl("/blog/" + page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  return allPosts.map((post: Post) => {
    return {
      slug: [post.slug],
    };
  });
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const post = await getPageFromParams(params);

  if (!post) {
    notFound();
  }

  const authors = post.authors.map((author: string) =>
    getAllAuthors().find(({ title }: { title: string }) => {
      return title === author;
    })
  );
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.backArrow className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div className="space-y-4">
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-muted-foreground">{post.description}</p>
        )}
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author: Author) =>
              author ? (
                <Link
                  key={author.title}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      <hr className="my-4" />
      <MdxSection code={post.mdxSource} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.backArrow className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
      <ScrollToTopButton />
    </article>
  );
};

export default BlogPage;
