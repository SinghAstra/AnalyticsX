import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/loadMDX";
import { absoluteUrl } from "@/lib/utils";
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

export async function generateMetadata({ params }: BlogPageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;
  const ogUrl = new URL(`${url}/api/og`);

  console.log("ogUrl is ", ogUrl);
  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  console.log("updated ogUrl is ", ogUrl);

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

const BlogPage = async ({ params }: BlogPageProps) => {
  const page = await getPageFromParams(params);
  return <div>BlogPage</div>;
};

export default BlogPage;
