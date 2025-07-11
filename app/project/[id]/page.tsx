import { TrackingCodeDialog } from "@/components/tracking-code-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { BarChart3, Copy, Globe } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  const project = await prisma.project.findFirst({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
      _count: {
        select: { pageViews: true },
      },
      pageViews: {
        take: 10,
        orderBy: { timestamp: "desc" },
      },
    },
  });

  if (!project) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="flex-1 flex items-center gap-1">
            <Link href="/dashboard" className="text-2xl tracking-wide">
              {siteConfig.name}
            </Link>
            <p className="text-muted-foreground">-</p>
            <h1 className="text-2xl tracking-wide transition-all duration-200">
              <a
                href={`https://${project.domain}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
            </h1>
          </div>

          <TrackingCodeDialog project={project} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Page Views
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {project._count.pageViews}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Status
              </CardTitle>
              <Globe className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Tracking ID
              </CardTitle>
              <Copy className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono text-white truncate">
                {project.trackingId}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Page Views */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Page Views</CardTitle>
            <CardDescription className="text-gray-400">
              Latest page views from your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            {project.pageViews.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  No data yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Install the tracking code to start collecting analytics
                </p>
                <TrackingCodeDialog project={project} />
              </div>
            ) : (
              <div className="space-y-4">
                {project.pageViews.map((pageView) => (
                  <div
                    key={pageView.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-white">
                        {pageView.url}
                      </div>
                      {pageView.title && (
                        <div className="text-sm text-gray-400">
                          {pageView.title}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(pageView.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
