import { getRepository, parseRepoUrl } from "@/lib/github";
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

    // For now, we'll just validate the repository exists
    // In future days, we'll add caching and more sophisticated analysis
    const repository = await getRepository(owner, name);

    console.log(
      `Successfully analyzed repository: ${repository.owner}/${repository.name}`
    );
    console.log(`Description: ${repository.description}`);
    console.log(`Language: ${repository.language}`);
    console.log(`Stars: ${repository.stars}`);

    // TODO: Add caching logic here in future iterations
    const cached = false;

    const response = {
      status: "success",
      cached,
      message: `Repository ${repository.owner}/${repository.name} analyzed successfully`,
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
