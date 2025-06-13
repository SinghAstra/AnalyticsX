import { getTier1Data, parseRepoUrl } from "@/lib/github";
import { type NextRequest, NextResponse } from "next/server";

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
    const { owner, name } = parseRepoUrl(repoUrl);

    console.log(`Analyzing repository: ${owner}/${name}`);

    // Fetch the repository data
    const repositoryData = await getTier1Data(owner, name);

    console.log(
      `Successfully analyzed repository: ${repositoryData.repository.owner}/${repositoryData.repository.name}`
    );
    console.log(`Description: ${repositoryData.repository.description}`);
    console.log(`Language: ${repositoryData.repository.language}`);
    console.log(`Stars: ${repositoryData.repository.stars}`);
    console.log(`Files in repository: ${repositoryData.fileTree.length}`);
    console.log(
      `Top-level structure: ${repositoryData.topLevelStructure.join(", ")}`
    );

    const response = {
      status: "success",
      message: `Repository ${repositoryData.repository.owner}/${repositoryData.repository.name} analyzed successfully`,
      data: {
        repository: repositoryData.repository,
        fileCount: repositoryData.fileTree.length,
        topLevelStructure: repositoryData.topLevelStructure,
        hasReadme: !!repositoryData.readme,
        hasPackageJson: !!repositoryData.packageJson,
        language: repositoryData.repository.language,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }

    return NextResponse.json(
      {
        message: "Failed to analyze repo",
      },
      { status: 500 }
    );
  }
}
