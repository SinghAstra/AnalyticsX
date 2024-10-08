"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

const BlogLayout = ({
  layout,
  onLayoutChange,
}: {
  layout: string;
  onLayoutChange: (layout: string) => void;
}) => {
  return (
    <div className=" hidden md:flex gap-4">
      <Button
        className={`rounded-md py-4 ${
          layout === "grid-cols-1"
            ? "border-2 border-primary text-primary"
            : "border"
        }`}
        variant="outline"
        size="sm"
        onClick={() => onLayoutChange("grid-cols-1")}
      >
        <Icons.singleColumn />
      </Button>
      <Button
        className={`rounded-md py-4 ${
          layout === "grid-cols-2"
            ? "border-2 border-primary text-primary"
            : "border"
        }`}
        variant="outline"
        size="sm"
        onClick={() => onLayoutChange("grid-cols-2")}
      >
        <Icons.doubleColumn />
      </Button>
      <Button
        className={`rounded-md py-4 hidden lg:flex ${
          layout === "grid-cols-3"
            ? "border-2 border-primary text-primary"
            : "border"
        }`}
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
