import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GetStarted from "./GetStarted";

export default function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-8 text-center">
          <HoverBorderGradient>
            <Link
              href={siteConfig.links.twitter}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium flex gap-4"
              target="_blank"
            >
              <Icons.sparkle className="animate-spin mr-2" /> Follow along on
              Twitter
            </Link>
          </HoverBorderGradient>
          <HeroHighlight>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Fuel Your{" "}
              <Highlight className="rounded-r-full pr-4"> Curiosity</Highlight>
            </h1>
          </HeroHighlight>
          <TextGenerateEffect
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            words="I'm building a web app with Next.js 14, NextAuth, MongoDB and
            open sourcing everything. Follow along as we figure this out
            together."
          />

          <div className="flex items-center justify-center gap-4">
            <GetStarted />
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
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {siteConfig.name} is open source and powered by open source
            software. <br />
            The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
