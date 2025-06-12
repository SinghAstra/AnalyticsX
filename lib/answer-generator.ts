import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCacheEntry, setCacheEntry } from "./cache";
import { ContextData, QuestionType } from "./types";

/**
 * Generate an answer to a question about a repository
 */
export async function generateAnswer(
  question: string,
  questionType: QuestionType,
  context: ContextData,
  repoOwner: string,
  repoName: string
): Promise<string> {
  // Check cache first
  const cacheKey = `answer:${repoOwner}/${repoName}:${question}`;
  const cached = getCacheEntry<string>(cacheKey);
  if (cached) {
    console.log("Using cached answer");
    return cached;
  }

  try {
    const answer = await generateWithGemini(
      question,
      questionType,
      context,
      repoOwner,
      repoName
    );

    // Cache the result
    setCacheEntry(cacheKey, answer, "ANALYSIS");

    return answer;
  } catch (error) {
    console.error("Answer generation error:", error);
    return generateFallbackAnswer(
      question,
      questionType,
      context,
      repoOwner,
      repoName
    );
  }
}

/**
 * Generate an answer using Gemini
 */
async function generateWithGemini(
  question: string,
  questionType: QuestionType,
  context: ContextData,
  repoOwner: string,
  repoName: string
): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  // Build prompt based on question type
  const prompt = buildPrompt(
    question,
    questionType,
    context,
    repoOwner,
    repoName
  );

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2048,
    },
  });

  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  return text;
}

/**
 * Build a prompt based on question type
 */
function buildPrompt(
  question: string,
  questionType: QuestionType,
  context: ContextData,
  repoOwner: string,
  repoName: string
): string {
  let prompt = `You are an AI assistant that analyzes GitHub repositories. Answer the following question about the repository ${repoOwner}/${repoName} based on the provided context.\n\n`;

  prompt += `Question: ${question}\n\n`;
  prompt += `Context:\n`;

  // Add relevant context based on question type
  switch (questionType) {
    case QuestionType.OVERVIEW:
      prompt += context.overview;
      break;

    case QuestionType.FUNCTIONALITY:
      prompt += context.overview;
      prompt += context.fileStructure;
      prompt += context.keyFiles;
      break;

    case QuestionType.IMPLEMENTATION:
      prompt += context.overview.split("\n").slice(0, 3).join("\n"); // Just basic repo info
      prompt += context.specificContent;
      break;

    case QuestionType.FILE_ANALYSIS:
      prompt += context.specificContent;
      break;

    case QuestionType.CODE_LOCATION:
      prompt += context.fileStructure;
      prompt += context.specificContent;
      break;
  }

  // Add instructions based on question type
  switch (questionType) {
    case QuestionType.OVERVIEW:
      prompt += `\nProvide a concise overview of what this repository does, its purpose, and main features. Focus on the high-level functionality.`;
      break;

    case QuestionType.FUNCTIONALITY:
      prompt += `\nList and explain the main functionality implemented in this repository. Focus on features, capabilities, and what the software can do.`;
      break;

    case QuestionType.IMPLEMENTATION:
      prompt += `\nExplain how the specific functionality is implemented. Include code snippets where relevant and explain the implementation details.`;
      break;

    case QuestionType.FILE_ANALYSIS:
      prompt += `\nAnalyze the provided file. Explain what it does, its purpose in the project, and key components or functions.`;
      break;

    case QuestionType.CODE_LOCATION:
      prompt += `\nIdentify where the requested functionality or code is located. List the relevant files and briefly explain their role.`;
      break;
  }

  prompt += `\nBe specific and provide details based on the code and context provided. If you're not sure about something, say so rather than making things up.`;

  return prompt;
}

/**
 * Generate a fallback answer when Gemini fails
 */
function generateFallbackAnswer(
  question: string,
  questionType: QuestionType,
  context: ContextData,
  repoOwner: string,
  repoName: string
): string {
  switch (questionType) {
    case QuestionType.OVERVIEW:
      return `This appears to be a repository owned by ${repoOwner} called ${repoName}. ${context.overview
        .split("\n")
        .slice(1, 2)
        .join("")}`;

    case QuestionType.FUNCTIONALITY:
      return `The repository ${repoOwner}/${repoName} implements various functionality. Based on the file structure, it appears to be a software project with multiple components.`;

    case QuestionType.IMPLEMENTATION:
      return `The implementation details can be found in the repository code. Please check the specific files mentioned in the sources for more information.`;

    case QuestionType.FILE_ANALYSIS:
      return `The file contains code that is part of the ${repoOwner}/${repoName} repository. For detailed analysis, please review the file content directly.`;

    case QuestionType.CODE_LOCATION:
      return `The code you're looking for might be located in one of the files listed in the sources. Please check those files for more information.`;

    default:
      return `I couldn't generate a detailed answer to your question about ${repoOwner}/${repoName}. Please try rephrasing or asking a different question.`;
  }
}
