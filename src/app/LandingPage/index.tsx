"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import React from "react";
import FormGenerator from "../FormGenerator";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <BackgroundBeams />
      <h1 className="text-3xl text-center tracking-tighter sm:text-3xl md:text-6xl leading-6">
        Streamline Your Form Creation Process!
      </h1>
      <p className="max-w-[600px] text-center text-gray-500 md:text-xl sm:text-sm">
        Effortlessly create, customize, and manage forms with AI. Dive into
        powerful analytics and insights with ease.
      </p>
      <FormGenerator />
    </div>
  );
};

export default LandingPage;
