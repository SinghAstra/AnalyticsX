import { CreateProjectDialog } from "@/components/create-project-dialog";
import { ProjectCard } from "@/components/project-card";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { BarChart3, Globe, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      projects: {
        include: {
          _count: {
            select: { pageViews: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  const totalPageViews = user.projects.reduce(
    (sum, project) => sum + project._count.pageViews,
    0
  );

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name || user.email}
            </p>
          </div>
          <CreateProjectDialog />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium text-gray-400">
                Total Projects
              </h2>
              <Globe className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {user.projects.length}
            </div>
          </div>

          <div className="bg-gray-900 border-gray-800">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-400">
                Total Page Views
              </div>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {totalPageViews.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-900 border-gray-800">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-400">
                Active Projects
              </div>
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {user.projects.filter((p) => p._count.pageViews > 0).length}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {/* <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          {user.projects.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Globe className="h-12 w-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-500 text-center mb-4">
                  Create your first project to start tracking analytics
                </p>
                <CreateProjectDialog />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
