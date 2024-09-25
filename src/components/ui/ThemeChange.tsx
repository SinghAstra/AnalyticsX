import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Palette } from "lucide-react";
import React from "react";

const ThemeChange = () => {
  const handleChange = (e) => {
    console.log("e is ", e);
    // TODO: Implement theme switching logic
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
