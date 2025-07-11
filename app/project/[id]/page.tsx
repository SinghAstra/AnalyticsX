import { TrackingCodeDialog } from "@/components/tracking-code-dialog";
import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { BarChart3 } from "lucide-react";
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
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/");
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
          <div className="flex flex-col rounded border px-3 py-2 bg-muted/20 hover:bg-muted/40 transition-all duration-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Total Page Views
              </h2>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {project._count.pageViews}
            </div>
          </div>
        </div>

        {/* Recent Page Views */}
        <div className="bg-muted/20 rounded border px-3 py-2">
          <h2 className="text-xl">Recent Page Views</h2>
          <p className="text-sm text-muted-foreground">
            Latest page views from your website
          </p>
          <div>
            {project.pageViews.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No views yet.
                </h3>
                <p className="text-muted-foreground mb-4">
                  Install the tracking code to start collecting analytics
                </p>
                <TrackingCodeDialog project={project} />
              </div>
            ) : (
              <div className="space-y-4">
                {project.pageViews.map((pageView) => (
                  <div
                    key={pageView.id}
                    className="flex items-center justify-between p-4  rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {pageView.url}
                      </div>
                      {pageView.title && (
                        <div className="text-sm text-muted-foreground">
                          {pageView.title}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(pageView.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
