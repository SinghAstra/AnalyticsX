import { GitHubService } from "@/lib/github";
import { type NextRequest, NextResponse } from "next/server";

const githubService = new GitHubService(process.env.GITHUB_TOKEN);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl } = body;

    if (!repoUrl) {
      return NextResponse.json(
        {
          message: "Repository URL is required",
        },
        {
          status: 400,
        }
      );
    }

    // Parse repository URL
    const { owner, name } = githubService.parseRepoUrl(repoUrl);

    // For now, we'll just validate the repository exists
    // In future days, we'll add caching and more sophisticated analysis
    const repository = await githubService.getRepository(owner, name);

    console.log(
      `Successfully analyzed repository: ${repository.owner}/${repository.name}`
    );
    console.log(`Description: ${repository.description}`);
    console.log(`Language: ${repository.language}`);
    console.log(`Stars: ${repository.stars}`);

    // TODO: Add caching logic here in future iterations
    const cached = false;

    const response: AnalyzeResponse = {
      status: "success",
      cached,
      message: `Repository ${repository.owner}/${repository.name} analyzed successfully`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Repository analysis error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    const response: AnalyzeResponse = {
      status: "error",
      cached: false,
      message: errorMessage,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
