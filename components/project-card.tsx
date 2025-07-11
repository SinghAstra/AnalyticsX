"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart3, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useToastContext } from "./providers/toast";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    domain: string;
    trackingId: string;
    createdAt: Date;
    _count: {
      pageViews: number;
    };
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { setToastMessage } = useToastContext();
  const copyTrackingId = () => {
    navigator.clipboard.writeText(project.trackingId);
    setToastMessage("Tracking ID copied to clipboard");
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg text-white">{project.name}</CardTitle>
          <CardDescription className="text-gray-400">
            {project.domain}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-800 border-gray-700"
          >
            <DropdownMenuItem
              onClick={copyTrackingId}
              className="text-gray-300 hover:text-white"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Tracking ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`https://${project.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Site
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Page Views</span>
          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
            {project._count.pageViews.toLocaleString()}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Status</span>
          <Badge
            variant={project._count.pageViews > 0 ? "default" : "secondary"}
            className={
              project._count.pageViews > 0
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300"
            }
          >
            {project._count.pageViews > 0 ? "Active" : "No Data"}
          </Badge>
        </div>

        <Link href={`/project/${project.id}`}>
          <Button className="w-full bg-white text-black hover:bg-gray-200">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
