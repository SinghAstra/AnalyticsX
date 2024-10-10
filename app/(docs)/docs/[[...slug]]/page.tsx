import { getAllDocs } from "@/lib/fetchMDX";
import { absoluteUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params: { slug?: string[] }) {
  const allDocs = getAllDocs();
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);
  if (!doc) {
    return;
  }

  if (!doc) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", doc.description ?? doc.title);
  ogUrl.searchParams.set("type", "Documentation");

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  const allDocs = getAllDocs();

  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

const DocPage = async ({ params }: DocPageProps) => {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return <div>DocPage</div>;
};

export default DocPage;
