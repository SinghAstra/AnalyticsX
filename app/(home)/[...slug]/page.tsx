import MdxSection from "@/components/MdxSection";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/loadMDX";
import { absoluteUrl } from "@/lib/utils";
import { Post } from "@/types";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import React from "react";
import rehypeHighlight from "rehype-highlight";

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

  const mdxSource = await serialize(page.content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });

  return { ...page, mdxSource };
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
      url: absoluteUrl(page.slug),
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
      slug: ["blog", post.slug],
    };
  });
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }
  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <MdxSection code={page.mdxSource} />
    </article>
  );
};

export default BlogPage;
