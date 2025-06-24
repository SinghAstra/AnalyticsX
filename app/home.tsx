"use client";

import AuthModal from "@/components/ui/auth-modal";
import { BackgroundShine } from "@/components/ui/background-shine";
import { LightBulbGradient } from "@/components/ui/light-bulb-gradient";
import { siteConfig } from "@/config/site";
import {
  blurOutSlideInVariant,
  containerVariants,
  scaleInVariant,
} from "@/lib/variant";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

const LandingPage = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  console.log("isDialogVisible ", isDialogVisible);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="min-h-screen relative flex flex-col items-center justify-center gap-4"
    >
      <LightBulbGradient />
      <motion.h1
        className="text-8xl font-medium tracking-wider"
        variants={blurOutSlideInVariant}
        initial="hidden"
        whileInView="visible"
      >
        {siteConfig.name}
      </motion.h1>
      <motion.button
        variants={scaleInVariant}
        className="relative border border-neutral-800/40 px-3 py-1   group flex items-center rounded-sm"
        onClick={() => setIsDialogVisible(true)}
      >
        <BackgroundShine />
        Get started for free
        <ArrowRightIcon className="ml-1 size-4 transition-all duration-300 group-hover:translate-x-2" />
      </motion.button>
      <AuthModal
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
      />
    </motion.div>
  );
};

export default LandingPage;
