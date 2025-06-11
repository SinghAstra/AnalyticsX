export interface Repository {
  owner: string;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
}

export interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  download_url?: string;
}

export interface FileContent {
  path: string;
  content: string;
  encoding: string;
}

export enum QuestionType {
  OVERVIEW = "OVERVIEW",
  FUNCTIONALITY = "FUNCTIONALITY",
  IMPLEMENTATION = "IMPLEMENTATION",
  FILE_ANALYSIS = "FILE_ANALYSIS",
  CODE_LOCATION = "CODE_LOCATION",
}

export interface ClassificationResult {
  type: QuestionType;
  confidence: number;
  extractedEntity?: string; // For questions like "How is X implemented" or "What does X file do"
}

export interface ChatRequest {
  repoUrl: string;
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
  questionType: QuestionType;
}
