import { classifyQuestion } from "@/lib/classification";
import { parseRepoUrl } from "@/lib/github";
import { QuestionType } from "@/lib/types";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl, question } = body;

    if (!repoUrl || !question) {
      return NextResponse.json(
        { error: "Repository URL and question are required" },
        { status: 400 }
      );
    }

    // Step 1: Parse repository URL
    const { owner, name } = parseRepoUrl(repoUrl);

    // Step 2: Classify the question
    const classification = await classifyQuestion(question);

    console.log(
      `Question classified as: ${classification.type} (confidence: ${classification.confidence})`
    );
    if ("extractedEntity" in classification) {
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
          "extractedEntity" in classification || "the requested functionality";
        answer = `This question asks how ${entity} is implemented in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push("Source code", "Implementation files");
        break;

      case QuestionType.FILE_ANALYSIS:
        // TODO: Implement with specific file content analysis
        const file =
          "extractedEntity" in classification || "the specified file";
        answer = `This question asks about what ${file} does in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push(file as string);
        break;

      case QuestionType.CODE_LOCATION:
        // TODO: Implement with file search and pattern matching
        const feature =
          "extractedEntity" in classification || "the requested code";
        answer = `This question asks where ${feature} is located in ${owner}/${name}. Full implementation coming in next iteration.`;
        sources.push("File tree", "Code search results");
        break;

      default:
        answer =
          "I could not classify your question. Please try rephrasing it.";
    }

    const response = {
      answer,
      sources,
      questionType: classification.type,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }

    return NextResponse.json({ message: "Failed to Chat" }, { status: 500 });
  }
}
