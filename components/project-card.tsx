"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@prisma/client";
import { BarChart3, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useToastContext } from "./providers/toast";

interface ProjectCardProps {
  project: Project;
  pageViews: number;
}

export function ProjectCard({ project, pageViews }: ProjectCardProps) {
  const { setToastMessage } = useToastContext();
  const copyTrackingId = () => {
    navigator.clipboard.writeText(project.trackingId);
    setToastMessage("Tracking ID copied to clipboard");
  };

  return (
    <div className="px-3 py-2 bg-muted/20 border rounded">
      <div className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-0">
          <h2 className="text-lg text-foreground">{project.name}</h2>
          <a
            href={`https://${project.domain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200">
              {project.domain}
            </p>
          </a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-muted-foreground/60 hover:text-muted-foreground/80"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0 rounded">
            <div className="bg-muted/20 p-1">
              <DropdownMenuItem
                onClick={copyTrackingId}
                className="rounded bg-transparent hover:bg-muted/40"
              >
                <Copy className="mr-1 h-4 w-4" />
                Copy Tracking ID
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded bg-transparent hover:bg-muted/40"
              >
                <a
                  href={`https://${project.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Site
                </a>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Page Views</span>
          <Badge variant="secondary" className="rounded">
            {pageViews.toLocaleString()}
          </Badge>
        </div>

        <Link href={`/project/${project.id}`}>
          <Button
            variant="outline"
            className="w-full bg-muted/40 hover:bg-muted/60 rounded"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </Link>
      </div>
    </div>
  );
}
