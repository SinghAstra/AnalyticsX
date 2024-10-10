import { DocsPageHeader } from "@/components/docs-page-header";
import MdxSection from "@/components/MdxSection";
import { DocsPager } from "@/components/pager";
import { DashboardTableOfContents } from "@/components/table-of-contents";
import { getAllDocs } from "@/lib/fetchMDX";
import { getMdxSource } from "@/lib/mdx";
import { getTableOfContents } from "@/lib/toc";
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

  const toc = await getTableOfContents(doc.content);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <MdxSection code={await getMdxSource(doc.content)} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
};

export default DocPage;
