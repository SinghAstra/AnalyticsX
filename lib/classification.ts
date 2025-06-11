import { GoogleGenAI, Type } from "@google/genai";

import { QuestionType } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const modelName = "gemini-1.5-flash";

export async function classifyQuestion(question: string) {
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

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: {
              type: Type.STRING,
              enum: [
                "OVERVIEW",
                "FUNCTIONALITY",
                "IMPLEMENTATION",
                "FILE_ANALYSIS",
                "CODE_LOCATION",
              ],
            },
            confidence: {
              type: Type.NUMBER,
              minimum: 0,
              maximum: 1,
            },
            extractedEntity: {
              type: Type.STRING,
              description: "Optional extracted entity from the question",
            },
          },
          required: ["type", "confidence"],
        },
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const parsed = JSON.parse(text);
    console.log("parsed is ", parsed);

    // Validate the response
    if (!Object.values(QuestionType).includes(parsed.type)) {
      throw new Error("Invalid question type returned");
    }

    return {
      type: parsed.type as QuestionType,
      confidence: parsed.confidence || 0.5,
      extractedEntity: parsed.extractedEntity,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }

    // Fallback classification based on keywords
    return fallbackClassification(question);
  }
}

function fallbackClassification(question: string) {
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
