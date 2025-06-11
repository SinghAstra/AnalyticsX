import { classifyQuestion } from "@/lib/classification";
import { GitHubService } from "@/lib/github";
import { type ChatRequest, type ChatResponse, QuestionType } from "@/lib/types";
import { type NextRequest, NextResponse } from "next/server";

const githubService = new GitHubService(process.env.GITHUB_TOKEN);

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { repoUrl, question } = body;

    if (!repoUrl || !question) {
      return NextResponse.json(
        { error: "Repository URL and question are required" },
        { status: 400 }
      );
    }

    // Step 1: Parse repository URL
    const { owner, name } = githubService.parseRepoUrl(repoUrl);

    // Step 2: Classify the question
    const classification = await classifyQuestion(question);

    console.log(
      `Question classified as: ${classification.type} (confidence: ${classification.confidence})`
    );
    if (classification.extractedEntity) {
      console.log(`Extracted entity: ${classification.extractedEntity}`);
    }

    // Step 3: For Day 1, we'll provide basic responses based on classification
    // In future days, we'll implement proper data fetching and analysis
    let answer = "";
    const sources: string[] = [];

    switch (classification.type) {
      case QuestionType.OVERVIEW:
        // TODO: Implement with README + repo metadata
        answer = `This appears to be a question about what the repository ${owner}/${name} does. Full implementation coming in next iteration.`;
        sources.push("README.md", "Repository metadata");
        break;

      case QuestionType.FUNCTIONALITY:
        // TODO: Implement with file structure + key files analysis
        answer = `This question asks about the functionality implemented in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push("File structure", "Key components");
        break;

      case QuestionType.IMPLEMENTATION:
        // TODO: Implement with specific code search and analysis
        const entity =
          classification.extractedEntity || "the requested functionality";
        answer = `This question asks how ${entity} is implemented in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push("Source code", "Implementation files");
        break;

      case QuestionType.FILE_ANALYSIS:
        // TODO: Implement with specific file content analysis
        const file = classification.extractedEntity || "the specified file";
        answer = `This question asks about what ${file} does in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push(file);
        break;

      case QuestionType.CODE_LOCATION:
        // TODO: Implement with file search and pattern matching
        const feature = classification.extractedEntity || "the requested code";
        answer = `This question asks where ${feature} is located in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push("File tree", "Code search results");
        break;

      default:
        answer =
          "I could not classify your question. Please try rephrasing it.";
    }

    const response: ChatResponse = {
      answer,
      sources,
      questionType: classification.type,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
