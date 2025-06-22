"use client";

import { BackgroundShine } from "@/components/ui/background-shine";
import { LightBulbGradient } from "@/components/ui/light-bulb-gradient";
import { siteConfig } from "@/config/site";
import { blurOutSlideInVariant } from "@/lib/variant";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-4">
      <LightBulbGradient />
      <motion.h1
        className="text-8xl font-medium tracking-wider"
        variants={blurOutSlideInVariant}
        initial="hidden"
        whileInView="visible"
      >
        {siteConfig.name}
      </motion.h1>
      <BackgroundShine className="rounded-md">
        {/* <Link
          href={isAuthenticated ? "/dashboard" : "/auth/sign-in"}
          className="flex items-center group"
        >
          Get started for free
          <ArrowRightIcon
            className="ml-1 size-4 transition-transform duration-300 
            ease-in-out group-hover:translate-x-2"
          />
        </Link> */}
        Hey There
      </BackgroundShine>
    </div>
  );
};

export default HeroSection;
