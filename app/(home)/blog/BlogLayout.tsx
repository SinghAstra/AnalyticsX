"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

const BlogLayout = ({
  onLayoutChange,
}: {
  onLayoutChange: (layout: string) => void;
}) => {
  return (
    <div className=" hidden md:flex gap-4">
      <Button
        className="rounded-md py-4"
        variant="outline"
        size="sm"
        onClick={() => onLayoutChange("grid-cols-1")}
      >
        <Icons.singleColumn />
      </Button>
      <Button
        className="rounded-md py-4"
        variant="outline"
        size="sm"
        onClick={() => onLayoutChange("grid-cols-2")}
      >
        <Icons.doubleColumn />
      </Button>
      <Button
        className="rounded-md py-4 hidden lg:flex"
        variant="outline"
        size="sm"
        onClick={() => onLayoutChange("grid-cols-3")}
      >
        <Icons.tripleColumn />
      </Button>
    </div>
  );
};

export default BlogLayout;
