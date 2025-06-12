import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCacheEntry, setCacheEntry } from "./cache";
import { QuestionType, type ClassificationResult } from "./types";

/**
 * Classify a question about a GitHub repository
 */
export async function classifyQuestion(
  question: string
): Promise<ClassificationResult> {
  // Check cache first
  const cacheKey = `question:${question}`;
  const cached = getCacheEntry<ClassificationResult>(cacheKey);
  if (cached) {
    console.log("Using cached classification for question");
    return cached;
  }

  try {
    const result = await classifyWithGemini(question);

    // Cache the result
    setCacheEntry(cacheKey, result, "CLASSIFICATION");

    return result;
  } catch (error) {
    console.error("Question classification error:", error);

    // Fallback to keyword-based classification
    return fallbackClassification(question);
  }
}

/**
 * Classify a question using Gemini
 */
async function classifyWithGemini(
  question: string
): Promise<ClassificationResult> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `
Classify the following question about a GitHub repository into one of these categories:

1. OVERVIEW - Questions asking what the repository does, its purpose, or general description
   Examples: "What does this repo do?", "What is this project about?", "Explain this repository"

2. FUNCTIONALITY - Questions asking about features, capabilities, or what functionality is implemented
   Examples: "What functionality is implemented?", "What features does this have?", "What can this app do?"

3. IMPLEMENTATION - Questions asking how specific functionality is implemented, requiring code details
   Examples: "How is authentication implemented?", "How does the payment system work?", "Show me the login code"

4. FILE_ANALYSIS - Questions asking about specific files
   Examples: "What does app.js do?", "Explain the utils.ts file", "What is in the config file?"

5. CODE_LOCATION - Questions asking where specific code or functionality is located
   Examples: "Where is the user authentication code?", "In which file is the API handling?", "Where is the database connection?"

Question: "${question}"

Respond with a JSON object containing:
- type: one of the categories above
- confidence: a number between 0 and 1
- extractedEntity: if the question mentions a specific functionality, file, or feature, extract it (optional)

Examples:
- "What does this repo do?" → {"type": "OVERVIEW", "confidence": 0.95}
- "How is user authentication implemented?" → {"type": "IMPLEMENTATION", "confidence": 0.9, "extractedEntity": "user authentication"}
- "What does app.js do?" → {"type": "FILE_ANALYSIS", "confidence": 0.95, "extractedEntity": "app.js"}
- "Where is the payment processing code?" → {"type": "CODE_LOCATION", "confidence": 0.9, "extractedEntity": "payment processing"}
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
    },
  });

  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  const parsed = JSON.parse(text);

  // Validate the response
  if (!Object.values(QuestionType).includes(parsed.type)) {
    throw new Error("Invalid question type returned");
  }

  return {
    type: parsed.type as QuestionType,
    confidence: parsed.confidence || 0.5,
    extractedEntity: parsed.extractedEntity,
  };
}

/**
 * Fallback classification based on keywords
 */
function fallbackClassification(question: string): ClassificationResult {
  const lowerQuestion = question.toLowerCase();

  // Simple keyword-based fallback
  if (lowerQuestion.includes("what does") && lowerQuestion.includes("repo")) {
    return { type: QuestionType.OVERVIEW, confidence: 0.7 };
  }

  if (
    lowerQuestion.includes("functionality") ||
    lowerQuestion.includes("features")
  ) {
    return { type: QuestionType.FUNCTIONALITY, confidence: 0.7 };
  }

  if (lowerQuestion.includes("how is") || lowerQuestion.includes("how does")) {
    return { type: QuestionType.IMPLEMENTATION, confidence: 0.7 };
  }

  if (
    lowerQuestion.includes(".js") ||
    lowerQuestion.includes(".ts") ||
    lowerQuestion.includes("file")
  ) {
    return { type: QuestionType.FILE_ANALYSIS, confidence: 0.7 };
  }

  if (lowerQuestion.includes("where") || lowerQuestion.includes("which file")) {
    return { type: QuestionType.CODE_LOCATION, confidence: 0.7 };
  }

  // Default to functionality if unsure
  return { type: QuestionType.FUNCTIONALITY, confidence: 0.5 };
}
