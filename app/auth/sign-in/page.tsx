"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Deep Code Analysis",
    description: "Advanced AI parsing of repository structure and content",
    icon: <Icons.gitLogo className="w-5 h-5" />,
  },
  {
    title: "Context Retention",
    description:
      "Intelligent conversation memory across repository discussions",
    icon: <MessagesSquare className="w-5 h-5" />,
  },
];

export default function SignIn() {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Info Section */}
      <div className="hidden lg:flex bg-gradient-to-br from-background via-secondary to-background relative">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="z-10 w-full p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary">
              {siteConfig.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="space-y-8 max-w-2xl">
            <h2 className="text-3xl font-semibold text-foreground">
              {siteConfig.headline}
            </h2>
            <p className="text-muted-foreground text-lg">
              {siteConfig.subHeadline}
            </p>

            <div className="grid gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50 backdrop-blur-sm shadow-sm shadow-primary"
                >
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2024 {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold">
                Welcome to{" "}
                <span className="text-primary">{siteConfig.name}</span>
              </h2>
              <p className="text-muted-foreground">
                Sign in to start analyzing your repositories
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-[#24292F] text-white hover:bg-[#24292F]/90 hover:text-white"
              >
                <Icons.gitLogo className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full text-primary ">
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                Continue with Google
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By continuing, you agree to our{" "}
                <a href="#" className="underline hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-primary">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
