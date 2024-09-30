import { Icons } from "@/components/Icons";
import MainNav from "@/components/MainNav";
import { buttonVariants } from "@/components/ui/button";
import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <MainNav />
      <GridSmallBackground />
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 z-10">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium flex gap-4"
            target="_blank"
          >
            <Icons.sparkle /> Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Streamline Your Form Creation Process!
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 14, NextAuth, MongoDB and
            open sourcing everything. Follow along as we figure this out
            together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
