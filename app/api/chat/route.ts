import { generateAnswer } from "@/lib/answer-generator";
import { classifyQuestion } from "@/lib/classification";
import { buildContext } from "@/lib/context-builder";
import {
  getTier1Data,
  getTier2Data,
  getTier3Data,
  parseRepoUrl,
  searchFiles,
} from "@/lib/github";
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
    if (classification.extractedEntity) {
      console.log(`Extracted entity: ${classification.extractedEntity}`);
    }

    // Step 3: Fetch appropriate data based on question type
    let answer = "";
    let sources: string[] = [];

    switch (classification.type) {
      case QuestionType.OVERVIEW: {
        console.log("Fetching Tier 1 data for overview question");
        const data = await getTier1Data(owner, name);
        const context = buildContext(classification.type, data);
        sources = context.sources;
        answer = await generateAnswer(
          question,
          classification.type,
          context,
          owner,
          name
        );
        break;
      }

      case QuestionType.FUNCTIONALITY: {
        console.log("Fetching Tier 2 data for functionality question");
        const data = await getTier2Data(owner, name);
        const context = buildContext(classification.type, data);
        sources = context.sources;
        answer = await generateAnswer(
          question,
          classification.type,
          context,
          owner,
          name
        );
        break;
      }

      case QuestionType.IMPLEMENTATION: {
        console.log("Fetching Tier 3 data for implementation question");
        const entity =
          classification.extractedEntity || "the requested functionality";

        // Search for files related to the entity
        const searchResults = await searchFiles(owner, name, entity);
        const specificPaths = searchResults.slice(0, 5).map((f) => f.path);

        const data = await getTier3Data(owner, name, specificPaths);
        const context = buildContext(classification.type, data, entity);
        sources = context.sources;
        answer = await generateAnswer(
          question,
          classification.type,
          context,
          owner,
          name
        );
        break;
      }

      case QuestionType.FILE_ANALYSIS: {
        console.log("Fetching specific file for analysis");
        const fileName = classification.extractedEntity || "the specified file";

        // Try to find the exact file or similar files
        const data = await getTier1Data(owner, name);
        const matchingFiles = data.fileTree.filter(
          (f) =>
            f.name.toLowerCase().includes(fileName.toLowerCase()) ||
            f.path.toLowerCase().includes(fileName.toLowerCase())
        );

        if (matchingFiles.length > 0) {
          const specificData = await getTier3Data(owner, name, [
            matchingFiles[0].path,
          ]);
          const context = buildContext(
            classification.type,
            specificData,
            fileName
          );
          sources = context.sources;
          answer = await generateAnswer(
            question,
            classification.type,
            context,
            owner,
            name
          );
        } else {
          answer = `Could not find a file matching "${fileName}" in the repository.`;
        }
        break;
      }

      case QuestionType.CODE_LOCATION: {
        console.log("Searching for code location");
        const feature = classification.extractedEntity || "the requested code";

        const searchResults = await searchFiles(owner, name, feature);
        const specificPaths = searchResults.slice(0, 5).map((f) => f.path);

        if (searchResults.length > 0) {
          const data = await getTier3Data(owner, name, specificPaths);
          const context = buildContext(classification.type, data, feature);
          sources = context.sources;
          answer = await generateAnswer(
            question,
            classification.type,
            context,
            owner,
            name
          );
        } else {
          answer = `Could not find code related to "${feature}" in the repository.`;
          sources = ["Search results"];
        }
        break;
      }

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
