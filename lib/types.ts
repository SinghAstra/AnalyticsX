/* eslint-disable @typescript-eslint/no-explicit-any */
// Repository types
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

// Question classification types
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
  extractedEntity?: string;
}

// API request/response types
export interface AnalyzeRequest {
  repoUrl: string;
}

export interface AnalyzeResponse {
  status: "success" | "error";
  cached: boolean;
  message?: string;
  data?: any;
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

// Data tier types
export interface RepositoryTier1Data {
  repository: Repository;
  readme: FileContent[] | null;
  packageJson: FileContent[] | null;
  fileTree: GitHubFile[];
  topLevelStructure: string[];
}

export interface RepositoryTier2Data extends RepositoryTier1Data {
  keyFiles: FileContent[];
  apiRoutes: GitHubFile[];
  components: GitHubFile[];
  configFiles: GitHubFile[];
}

export interface RepositoryTier3Data extends RepositoryTier2Data {
  specificFiles: FileContent[];
  relatedFiles: FileContent[];
}

// File prioritization types
export interface FilePriority {
  file: GitHubFile;
  priority: "HIGH" | "MEDIUM" | "LOW";
  category: "API" | "COMPONENT" | "CONFIG" | "ENTRY" | "UTIL" | "TEST" | "DOC";
  score: number;
}

export enum DataTier {
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3,
}

// Context types
export interface ContextData {
  overview: string;
  fileStructure: string;
  keyFiles: string;
  specificContent: string;
  sources: string[];
}
