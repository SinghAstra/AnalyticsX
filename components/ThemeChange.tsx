"use client";
import {
  blueTheme,
  neutralTheme,
  orangeTheme,
  redTheme,
  slateTheme,
  violetTheme,
} from "@/app/actions/theme";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Palette } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeChange = () => {
  const storedThemeString =
    typeof window !== "undefined"
      ? localStorage?.getItem("AutoForm-Theme")
      : null;
  const initialTheme = storedThemeString
    ? JSON.parse(storedThemeString)
    : blueTheme;

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === "string") {
        document.documentElement.style.setProperty(`--${key}`, value as string);
      }
    });
  }, [theme]);

  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedTheme = (e.target as HTMLElement).textContent;
    if (selectedTheme === "Slate") {
      setTheme(slateTheme);
      localStorage.setItem("AutoForm-Theme", JSON.stringify(slateTheme));
    } else if (selectedTheme === "Violet") {
      setTheme(violetTheme);
      localStorage.setItem("AutoForm-Theme", JSON.stringify(violetTheme));
    } else if (selectedTheme === "Red") {
      setTheme(redTheme);
      localStorage.setItem("AutoForm-Theme", JSON.stringify(redTheme));
    } else if (selectedTheme == "Blue") {
      setTheme(blueTheme);
      localStorage.setItem("AutoForm-Theme", JSON.stringify(blueTheme));
    } else if (selectedTheme == "Orange") {
      setTheme(orangeTheme);
      localStorage.setItem("AutoForm-Theme", JSON.stringify(orangeTheme));
    } else if (selectedTheme == "Neutral") {
      setTheme(neutralTheme);
      localStorage.setItem("AutoForm-Theme", JSON.stringify(neutralTheme));
    }
  };

  return (
    <Menubar onClick={(e) => handleChange(e)}>
      <MenubarMenu>
        <MenubarTrigger>
          <span className="flex items-center cursor-pointer">
            <span className="md:mr-2">
              <Palette />
            </span>
            <span className="hidden md:inline-block">Themes</span>
          </span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup onChange={handleChange}>
            <MenubarRadioItem className="cursor-pointer" value="slate">
              <span className="w-3 h-3 rounded-full bg-slate-900 mr-4"></span>
              Slate
            </MenubarRadioItem>
            <MenubarRadioItem className="cursor-pointer" value="red">
              <span className="w-3 h-3 rounded-full bg-red-900 mr-4"></span>
              Red
            </MenubarRadioItem>
            <MenubarRadioItem className="cursor-pointer" value="orange">
              <span className="w-3 h-3 rounded-full bg-orange-900 mr-4"></span>
              Orange
            </MenubarRadioItem>
            <MenubarRadioItem className="cursor-pointer" value="blue">
              <span className="w-3 h-3 rounded-full bg-blue-900 mr-4"></span>
              Blue
            </MenubarRadioItem>
            <MenubarRadioItem className="cursor-pointer" value="violet">
              <span className="w-3 h-3 rounded-full bg-violet-900 mr-4"></span>
              Violet
            </MenubarRadioItem>
            <MenubarRadioItem className="cursor-pointer" value="neutral">
              <span className="w-3 h-3 rounded-full bg-neutral-900 mr-4"></span>
              Neutral
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeChange;
