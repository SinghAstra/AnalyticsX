"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const BlogLayout = ({
  onLayoutChange,
}: {
  onLayoutChange: (layout: string) => void;
}) => {
  return (
    // <Menubar>
    //   <MenubarMenu>
    //     <MenubarTrigger>
    //       <span className="cursor-pointer">
    //         <Icons.layout />
    //       </span>
    //     </MenubarTrigger>
    //     <MenubarContent>
    //       <MenubarItem onClick={() => onLayoutChange("grid-cols-1")}>
    //         Single Column
    //       </MenubarItem>
    //       <MenubarItem onClick={() => onLayoutChange("grid-cols-2")}>
    //         Two Columns
    //       </MenubarItem>
    //       <MenubarItem onClick={() => onLayoutChange("grid-cols-3")}>
    //         Three Columns
    //       </MenubarItem>
    //     </MenubarContent>
    //   </MenubarMenu>
    // </Menubar>
    <div className="flex gap-4">
      <Button className="rounded-md" variant="outline" size="sm">
        <Icons.singleColumn />
      </Button>
      <Button className="rounded-md" variant="outline" size="sm">
        <Icons.doubleColumn />
      </Button>
      <Button className="rounded-md" variant="outline" size="sm">
        <Icons.tripleColumn />
      </Button>
    </div>
  );
};

export default BlogLayout;
